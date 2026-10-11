const crypto = require('crypto');
const {
  ACTIVIDADES,
  TALLAS_VALIDAS,
  TERMINOS_GENERALES,
  VERSION_TERMINOS,
  buscarActividad,
  textoTerminos,
} = require('../domain/actividades');
const {
  parsearFecha,
  esHoraValida,
  aMinutos,
  formatearFecha,
  parqueAbiertoEnFecha,
  parqueAbiertoEnHora,
} = require('../domain/parque');
const { ErrorValidacion, ErrorNoEncontrado, ErrorNoDisponible, ErrorSinCupo } = require('../errors');

const MAX_PERSONAS_POR_INSCRIPCION = 10;
const REGEX_DNI = /^\d{7,8}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function codigoAleatorio() {
  return 'INS-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

/** '2026-10-10' -> 'Sábado 10/10/2026' */
function fechaLegible(fecha) {
  const d = parsearFecha(fecha);
  const [a, m, dia] = fecha.split('-');
  return `${DIAS[d.getDay()]} ${dia}/${m}/${a}`;
}

/**
 * Texto que se codifica en el QR. Es texto plano para que cualquier lector de QR
 * del celular muestre el detalle completo sin necesitar internet ni una app propia.
 */
function armarContenidoQR(inscripcion, actividad, urlDetalle) {
  const lineas = [
    'ECOHARMONY PARK - INSCRIPCIÓN CONFIRMADA',
    `Código: ${inscripcion.codigo}`,
    `Actividad: ${actividad.nombre}`,
    `Fecha: ${fechaLegible(inscripcion.fecha)}`,
    `Horario: ${inscripcion.horario} hs`,
    `Personas (${inscripcion.cantidadPersonas}):`,
    ...inscripcion.participantes.map(
      (p, i) =>
        `${i + 1}. ${p.nombre} - DNI ${p.dni} - ${p.edad} años` + (p.talla ? ` - Talla ${p.talla}` : '')
    ),
    `Email: ${inscripcion.email}`,
    'Términos y condiciones: aceptados',
  ];
  if (urlDetalle) lineas.push(`Ver detalle: ${urlDetalle}`);
  return lineas.join('\n');
}

class InscripcionService {
  /**
   * @param {object} deps
   * @param {RepositorioEnMemoria} deps.repositorio
   * @param {{enviarConfirmacion: Function}} deps.mailer
   * @param {() => Date} [deps.reloj]          inyectable para testear fechas
   * @param {() => string} [deps.generarCodigo] inyectable para testear códigos
   * @param {string} [deps.urlPublica]         URL del front (ej. http://192.168.0.10:5173) para el link del QR
   */
  constructor({ repositorio, mailer, reloj = () => new Date(), generarCodigo = codigoAleatorio, urlPublica = null }) {
    this.repositorio = repositorio;
    this.mailer = mailer;
    this.reloj = reloj;
    this.generarCodigo = generarCodigo;
    this.urlPublica = urlPublica ? urlPublica.replace(/\/+$/, '') : null;
  }

  listarActividades() {
    return ACTIVIDADES.map(({ id, nombre, descripcion, requiereTalla, motivoTalla, cupoPorHorario, horarios, terminos }) => ({
      id,
      nombre,
      descripcion,
      requiereTalla,
      motivoTalla: motivoTalla || null,
      cupoPorHorario,
      horarios,
      terminos,
      tallas: requiereTalla ? TALLAS_VALIDAS : [],
    }));
  }

  /** Detalle de una actividad con sus términos y condiciones (para la página de términos). */
  obtenerActividad(actividadId) {
    const actividad = this.listarActividades().find((a) => a.id === actividadId);
    if (!actividad) throw new ErrorNoEncontrado('La actividad seleccionada no existe.');
    return { ...actividad, terminosGenerales: TERMINOS_GENERALES, versionTerminos: VERSION_TERMINOS };
  }

  /** Inscripción guardada en la base, con el nombre de la actividad. */
  obtenerInscripcion(codigo) {
    const inscripcion = this.repositorio.buscarPorCodigo(codigo);
    if (!inscripcion) throw new ErrorNoEncontrado('No existe una inscripción con ese código.');
    return this.#respuesta(inscripcion, buscarActividad(inscripcion.actividadId));
  }

  /**
   * Inscripciones guardadas, de la más nueva a la más vieja.
   * Se puede filtrar por actividad y/o fecha (para la pestaña "Inscripciones").
   */
  listarInscripciones({ actividadId, fecha } = {}) {
    if (actividadId) this.#obtenerActividad(actividadId);
    return this.repositorio
      .listar()
      .filter((i) => (!actividadId || i.actividadId === actividadId) && (!fecha || i.fecha === fecha))
      .reverse()
      .map((i) => this.#respuesta(i, buscarActividad(i.actividadId)));
  }

  disponibilidad(actividadId, fecha) {
    const actividad = this.#obtenerActividad(actividadId);
    if (!parsearFecha(fecha)) {
      throw new ErrorValidacion([{ campo: 'fecha', mensaje: 'La fecha debe tener formato AAAA-MM-DD.' }]);
    }
    const parqueAbierto = parqueAbiertoEnFecha(fecha);
    const horarios = actividad.horarios.map((horario) => {
      const cuposRestantes = Math.max(
        0,
        actividad.cupoPorHorario - this.repositorio.cuposOcupados(actividad.id, fecha, horario)
      );
      const disponible = parqueAbierto && !this.#yaPaso(fecha, horario) && cuposRestantes > 0;
      return { horario, cupoTotal: actividad.cupoPorHorario, cuposRestantes, disponible };
    });
    return { actividadId: actividad.id, fecha, parqueAbierto, horarios };
  }

  async inscribir(solicitud = {}) {
    const actividad = this.#obtenerActividad(solicitud.actividadId);

    // 1) Datos del formulario
    const errores = this.#validarDatos(solicitud, actividad);
    if (errores.length) throw new ErrorValidacion(errores);

    // 2) Que el parque y la actividad estén disponibles en ese momento
    this.#validarDisponibilidad(actividad, solicitud.fecha, solicitud.horario);

    // 3) Cupo. Se verifica y se guarda sin "await" en medio: en Node eso es atómico
    //    y evita que dos pedidos simultáneos se lleven el mismo último lugar.
    const ocupados = this.repositorio.cuposOcupados(actividad.id, solicitud.fecha, solicitud.horario);
    const restantes = actividad.cupoPorHorario - ocupados;
    if (solicitud.cantidadPersonas > restantes) {
      throw new ErrorSinCupo(
        restantes <= 0
          ? `No quedan cupos para ${actividad.nombre} el ${solicitud.fecha} a las ${solicitud.horario}.`
          : `Solo quedan ${restantes} cupo(s) para ${actividad.nombre} en ese horario.`,
        Math.max(0, restantes)
      );
    }

    const codigo = this.generarCodigo();
    const inscripcion = {
      codigo,
      actividadId: actividad.id,
      fecha: solicitud.fecha,
      horario: solicitud.horario,
      cantidadPersonas: solicitud.cantidadPersonas,
      participantes: solicitud.participantes.map((p) => ({
        nombre: p.nombre.trim(),
        dni: String(p.dni).trim(),
        edad: Number(p.edad),
        talla: actividad.requiereTalla ? p.talla : null,
      })),
      email: solicitud.email.trim().toLowerCase(),
      aceptaTerminos: true,
      terminosAceptados: textoTerminos(actividad),
      creadaEn: this.reloj().toISOString(),
      emailEstado: 'pendiente',
      emailError: null,
    };
    inscripcion.contenidoQR = armarContenidoQR(inscripcion, actividad, this.#urlDetalle(codigo));
    this.repositorio.guardar(inscripcion);

    // 4) Email de confirmación con QR. Si falla, la reserva NO se pierde: queda registrado el motivo.
    try {
      const { modo } = (await this.mailer.enviarConfirmacion({ inscripcion, actividad, urlDetalle: this.#urlDetalle(codigo) })) || {};
      inscripcion.emailEstado = modo === 'archivo' ? 'guardado_en_archivo' : 'enviado';
    } catch (e) {
      inscripcion.emailEstado = 'error';
      inscripcion.emailError = e.message;
      console.error(`[mail] No se pudo enviar la confirmación ${codigo}:`, e.message);
    }
    this.repositorio.actualizarEstadoEmail(codigo, inscripcion.emailEstado, inscripcion.emailError);

    return this.#respuesta(inscripcion, actividad);
  }

  // ---------------------------------------------------------------- privados

  #urlDetalle(codigo) {
    return this.urlPublica ? `${this.urlPublica}/inscripcion/${codigo}` : null;
  }

  /** Lo que se devuelve al front (sin el texto completo de los términos). */
  #respuesta(inscripcion, actividad) {
    const { terminosAceptados, ...resto } = inscripcion;
    return {
      ...resto,
      actividad: { id: actividad.id, nombre: actividad.nombre, requiereTalla: actividad.requiereTalla },
      emailEnviado: inscripcion.emailEstado === 'enviado',
      urlDetalle: this.#urlDetalle(inscripcion.codigo),
    };
  }

  #obtenerActividad(id) {
    const actividad = buscarActividad(id);
    if (!actividad) throw new ErrorNoEncontrado('La actividad seleccionada no existe.');
    return actividad;
  }

  #yaPaso(fecha, horario) {
    const ahora = this.reloj();
    const hoy = formatearFecha(ahora);
    if (fecha < hoy) return true;
    if (fecha > hoy) return false;
    return aMinutos(horario) <= ahora.getHours() * 60 + ahora.getMinutes();
  }

  #validarDatos(s, actividad) {
    const errores = [];
    const err = (campo, mensaje) => errores.push({ campo, mensaje });

    if (!parsearFecha(s.fecha)) err('fecha', 'Seleccioná una fecha válida.');
    if (!esHoraValida(s.horario)) err('horario', 'Seleccioná un horario.');

    const cantidadOk =
      Number.isInteger(s.cantidadPersonas) &&
      s.cantidadPersonas >= 1 &&
      s.cantidadPersonas <= MAX_PERSONAS_POR_INSCRIPCION;
    if (!cantidadOk) {
      err('cantidadPersonas', `Indicá cuántas personas participan (entre 1 y ${MAX_PERSONAS_POR_INSCRIPCION}).`);
    }

    const participantes = Array.isArray(s.participantes) ? s.participantes : [];
    if (cantidadOk && participantes.length !== s.cantidadPersonas) {
      err('participantes', `Cargá los datos de las ${s.cantidadPersonas} persona(s).`);
    }

    const dnis = new Set();
    participantes.forEach((p = {}, i) => {
      const campo = (c) => `participantes[${i}].${c}`;
      if (typeof p.nombre !== 'string' || p.nombre.trim().length < 2) {
        err(campo('nombre'), 'Ingresá el nombre.');
      }
      const dni = String(p.dni ?? '').trim();
      if (!REGEX_DNI.test(dni)) {
        err(campo('dni'), 'El DNI debe tener 7 u 8 números, sin puntos.');
      } else if (dnis.has(dni)) {
        err(campo('dni'), 'Este DNI ya está cargado en la inscripción.');
      } else {
        dnis.add(dni);
      }
      const edad = Number(p.edad);
      if (p.edad === '' || p.edad === null || !Number.isInteger(edad) || edad < 0 || edad > 120) {
        err(campo('edad'), 'Ingresá una edad válida.');
      }
      if (actividad.requiereTalla && !TALLAS_VALIDAS.includes(p.talla)) {
        err(campo('talla'), `${actividad.nombre} requiere seleccionar la talla de vestimenta.`);
      }
    });

    if (s.aceptaTerminos !== true) {
      err('aceptaTerminos', 'Tenés que aceptar los términos y condiciones de la actividad.');
    }
    if (typeof s.email !== 'string' || !REGEX_EMAIL.test(s.email.trim())) {
      err('email', 'Ingresá un email válido para recibir la confirmación.');
    }
    return errores;
  }

  #validarDisponibilidad(actividad, fecha, horario) {
    if (!parqueAbiertoEnFecha(fecha)) {
      throw new ErrorNoDisponible(`El parque está cerrado el ${fecha}. Abre de martes a domingo.`);
    }
    if (!parqueAbiertoEnHora(horario)) {
      throw new ErrorNoDisponible(`El parque está cerrado a las ${horario}.`);
    }
    if (!actividad.horarios.includes(horario)) {
      throw new ErrorNoDisponible(`${actividad.nombre} no está disponible a las ${horario}.`);
    }
    if (this.#yaPaso(fecha, horario)) {
      throw new ErrorNoDisponible('Ese horario ya pasó. Elegí uno futuro.');
    }
  }
}

module.exports = { InscripcionService, MAX_PERSONAS_POR_INSCRIPCION, fechaLegible };
