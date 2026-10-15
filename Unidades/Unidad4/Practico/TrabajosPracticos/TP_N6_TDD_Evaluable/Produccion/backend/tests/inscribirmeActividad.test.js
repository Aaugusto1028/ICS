/*
 * User Story: Inscribirme a actividad
 * COMO visitante QUIERO inscribirme a una actividad PARA reservar mi lugar en la misma.
 *
 * Un test que PASA y uno que NO PASA por cada criterio de aceptación.
 * Nombre de cada test: test_<UserStory>_<LoQueSePrueba>_<Pasa|NoPasa>
 *
 * Precondiciones generales (se preparan antes de cada test):
 *   - La base de datos está vacía (no hay inscripciones previas).
 *   - Hoy es viernes 09/10/2026 a las 20:00.
 *   - Las inscripciones se hacen para el sábado 10/10/2026 (día en que el parque está abierto).
 *     Todos sus turnos (09:00 a 17:00) empiezan dentro de las próximas 24 hs, como pide el PO.
 *   - El correo no se envía de verdad: queda guardado en "correosEnviados" para poder revisarlo.
 */

const { InscripcionService } = require('../src/services/inscripcionService');
const { RepositorioSQLite } = require('../src/repositories/repositorioSQLite');
const { MailService } = require('../src/services/mailService');

const SABADO = '2026-10-10';

const AHORA = new Date(2026, 9, 9, 20, 0); // viernes 09/10/2026 20:00

let servicio;
let correosEnviados;

/** Arma el servicio con una base vacía y un reloj fijo. */
async function crearServicio(reloj = AHORA) {
  correosEnviados = [];
  const transporterFalso = {
    sendMail: async (correo) => {
      correosEnviados.push(correo);
      return { messageId: 'prueba' };
    },
  };

  return new InscripcionService({
    repositorio: await RepositorioSQLite.crear(),
    mailer: new MailService({ transporter: transporterFalso }),
    reloj: () => reloj,
  });
}

beforeEach(async () => {
  servicio = await crearServicio();
});

/** Intenta inscribir y devuelve el error si falla (o null si pasa). */
async function errorAlInscribir(solicitud) {
  try {
    await servicio.inscribir(solicitud);
    return null;
  } catch (error) {
    return error;
  }
}

// ---------------------------------------------------------------------------
// Criterio 1: Debe requerir seleccionar una actividad del listado (Tirolesa, Safari,
// Palestra, Jardinería) siempre y cuando tenga cupos disponibles para el horario.
// ---------------------------------------------------------------------------

test('test_InscribirmeActividad_ActividadConCupo_Pasa', async () => {
  // Precondición: la Tirolesa del sábado a las 10:00 no tiene inscriptos (10 lugares libres).

  // Pasos: inscribir 1 persona a la Tirolesa del sábado a las 10:00.
  const resultado = await servicio.inscribir({
    actividadId: 'tirolesa',
    fecha: SABADO,
    horario: '10:00',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Ana Pérez', dni: '40123456', edad: 25, talla: 'M' }],
    aceptaTerminos: true,
    email: 'ana@example.com',
  });

  // Resultado esperado: la inscripción se registra.
  expect(resultado.codigo).toBeDefined();
  expect(resultado.actividad.nombre).toBe('Tirolesa');
});

test('test_InscribirmeActividad_ActividadSinCupo_NoPasa', async () => {
  // Precondición: la Palestra del sábado a las 11:00 ya tiene sus 12 lugares ocupados.
  const doceLugares = [];
  for (let i = 1; i <= 12; i++) {
    doceLugares.push({ nombre: 'Escalador ' + i, dni: String(30000000 + i), edad: 30, talla: 'L' });
  }
  await servicio.inscribir({
    actividadId: 'palestra',
    fecha: SABADO,
    horario: '11:00',
    cantidadPersonas: 12,
    participantes: doceLugares,
    aceptaTerminos: true,
    email: 'grupo@example.com',
  });

  // Pasos: intentar inscribir 1 persona más a la Palestra del sábado a las 11:00.
  const error = await errorAlInscribir({
    actividadId: 'palestra',
    fecha: SABADO,
    horario: '11:00',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Ana Pérez', dni: '40123456', edad: 25, talla: 'M' }],
    aceptaTerminos: true,
    email: 'ana@example.com',
  });

  // Resultado esperado: la inscripción se rechaza porque no hay cupo.
  expect(error).not.toBeNull();
  expect(error.message).toMatch(/no quedan cupos/i);
});

// ---------------------------------------------------------------------------
// Criterio 2: Debe requerir seleccionar el horario dentro de los disponibles.
// ---------------------------------------------------------------------------

test('test_InscribirmeActividad_HorarioDisponible_Pasa', async () => {
  // Precondición: el Safari se dicta cada hora, de 09:00 a 17:00.

  // Pasos: inscribir 1 persona al Safari del sábado a las 14:00.
  const resultado = await servicio.inscribir({
    actividadId: 'safari',
    fecha: SABADO,
    horario: '14:00',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Juan Gómez', dni: '35111222', edad: 40 }],
    aceptaTerminos: true,
    email: 'juan@example.com',
  });

  // Resultado esperado: la inscripción se registra en ese horario.
  expect(resultado.horario).toBe('14:00');
});

test('test_InscribirmeActividad_HorarioParqueCerrado_NoPasa', async () => {
  // Precondición: el parque abre de 08:30 a 19:00.

  // Pasos: intentar inscribir 1 persona al Safari del sábado a las 19:00.
  const error = await errorAlInscribir({
    actividadId: 'safari',
    fecha: SABADO,
    horario: '19:00',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Juan Gómez', dni: '35111222', edad: 40 }],
    aceptaTerminos: true,
    email: 'juan@example.com',
  });

  // Resultado esperado: la inscripción se rechaza porque el parque está cerrado.
  expect(error).not.toBeNull();
  expect(error.message).toMatch(/parque está cerrado/i);
});

// ---------------------------------------------------------------------------
// Criterio 3: Debe indicar la cantidad de personas que participarán de la actividad.
// ---------------------------------------------------------------------------

test('test_InscribirmeActividad_CantidadPersonasIndicada_Pasa', async () => {
  // Precondición: la Jardinería del sábado a las 10:00 tiene 12 lugares libres.

  // Pasos: inscribir indicando 2 personas y cargando los datos de las 2.
  const resultado = await servicio.inscribir({
    actividadId: 'jardineria',
    fecha: SABADO,
    horario: '10:00',
    cantidadPersonas: 2,
    participantes: [
      { nombre: 'Ana Pérez', dni: '40123456', edad: 25 },
      { nombre: 'Juan Gómez', dni: '35111222', edad: 40 },
    ],
    aceptaTerminos: true,
    email: 'ana@example.com',
  });

  // Resultado esperado: la inscripción se registra para 2 personas.
  expect(resultado.cantidadPersonas).toBe(2);
});

test('test_InscribirmeActividad_CantidadPersonasSinIndicar_NoPasa', async () => {
  // Precondición: la Jardinería del sábado a las 10:00 tiene 12 lugares libres.

  // Pasos: intentar inscribir sin indicar la cantidad de personas.
  const error = await errorAlInscribir({
    actividadId: 'jardineria',
    fecha: SABADO,
    horario: '10:00',
    participantes: [{ nombre: 'Ana Pérez', dni: '40123456', edad: 25 }],
    aceptaTerminos: true,
    email: 'ana@example.com',
  });

  // Resultado esperado: la inscripción se rechaza marcando el campo "cantidadPersonas".
  expect(error).not.toBeNull();
  expect(error.detalles.map((d) => d.campo)).toContain('cantidadPersonas');
});

// ---------------------------------------------------------------------------
// Criterio 4: Para cada persona que participa, debe ingresar nombre, DNI, edad
// y talla de vestimenta si la actividad lo demanda.
// ---------------------------------------------------------------------------

test('test_InscribirmeActividad_DatosVisitanteSinTallaNoRequerida_Pasa', async () => {
  // Precondición: el Safari NO requiere talla de vestimenta.

  // Pasos: inscribir 1 persona al Safari con nombre, DNI y edad, sin talla.
  const resultado = await servicio.inscribir({
    actividadId: 'safari',
    fecha: SABADO,
    horario: '11:00',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Juan Gómez', dni: '35111222', edad: 40 }],
    aceptaTerminos: true,
    email: 'juan@example.com',
  });

  // Resultado esperado: la inscripción se registra con los datos del visitante.
  expect(resultado.participantes[0]).toMatchObject({ nombre: 'Juan Gómez', dni: '35111222', edad: 40 });
});

test('test_InscribirmeActividad_SinTallaRequerida_NoPasa', async () => {
  // Precondición: la Tirolesa SÍ requiere talla de vestimenta.

  // Pasos: intentar inscribir 1 persona a la Tirolesa sin indicar la talla.
  const error = await errorAlInscribir({
    actividadId: 'tirolesa',
    fecha: SABADO,
    horario: '12:00',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Ana Pérez', dni: '40123456', edad: 25 }],
    aceptaTerminos: true,
    email: 'ana@example.com',
  });

  // Resultado esperado: la inscripción se rechaza marcando la talla de la persona 1.
  expect(error).not.toBeNull();
  expect(error.detalles.map((d) => d.campo)).toContain('participantes[0].talla');
});

// ---------------------------------------------------------------------------
// Criterio 5: Debe requerir aceptar los términos y condiciones específicos de la actividad.
// ---------------------------------------------------------------------------

test('test_InscribirmeActividad_AceptaTerminos_Pasa', async () => {
  // Precondición: la Palestra del sábado a las 15:00 tiene 12 lugares libres.

  // Pasos: inscribir 1 persona aceptando los términos y condiciones de la Palestra.
  const resultado = await servicio.inscribir({
    actividadId: 'palestra',
    fecha: SABADO,
    horario: '15:00',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Ana Pérez', dni: '40123456', edad: 25, talla: 'S' }],
    aceptaTerminos: true,
    email: 'ana@example.com',
  });

  // Resultado esperado: la inscripción se registra con los términos aceptados.
  expect(resultado.aceptaTerminos).toBe(true);
});

test('test_InscribirmeActividad_SinAceptarTerminos_NoPasa', async () => {
  // Precondición: la Palestra del sábado a las 15:00 tiene 12 lugares libres.

  // Pasos: intentar inscribir 1 persona SIN aceptar los términos y condiciones.
  const error = await errorAlInscribir({
    actividadId: 'palestra',
    fecha: SABADO,
    horario: '15:00',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Ana Pérez', dni: '40123456', edad: 25, talla: 'S' }],
    aceptaTerminos: false,
    email: 'ana@example.com',
  });

  // Resultado esperado: la inscripción se rechaza marcando el campo "aceptaTerminos".
  expect(error).not.toBeNull();
  expect(error.detalles.map((d) => d.campo)).toContain('aceptaTerminos');
});

// ---------------------------------------------------------------------------
// Criterio 6: Al finalizar la inscripción se debe enviar un correo electrónico con
// información de la inscripción realizada. Debe contener un código QR.
// ---------------------------------------------------------------------------

test('test_InscribirmeActividad_EnvioCorreoConQR_Pasa', async () => {
  // Precondición: todavía no se envió ningún correo.

  // Pasos: inscribir 1 persona a la Tirolesa del sábado a las 14:00.
  const resultado = await servicio.inscribir({
    actividadId: 'tirolesa',
    fecha: SABADO,
    horario: '14:00',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Ana Pérez', dni: '40123456', edad: 25, talla: 'M' }],
    aceptaTerminos: true,
    email: 'ana@example.com',
  });

  // Resultado esperado: se envía 1 correo a ana@example.com con los datos y un QR adjunto.
  expect(correosEnviados).toHaveLength(1);
  const correo = correosEnviados[0];
  expect(correo.to).toBe('ana@example.com');
  expect(correo.html).toContain(resultado.codigo);
  expect(correo.html).toContain('Tirolesa');
  expect(correo.html).toContain('14:00');
  expect(correo.html).toContain('Sábado 10/10/2026'); // día de la semana con mayúscula inicial
  expect(correo.attachments[0].contentType).toBe('image/png'); // la imagen del QR
});

test('test_InscribirmeActividad_CorreoInvalido_NoPasa', async () => {
  // Precondición: todavía no se envió ningún correo.

  // Pasos: intentar inscribir con un correo electrónico inválido.
  const error = await errorAlInscribir({
    actividadId: 'tirolesa',
    fecha: SABADO,
    horario: '14:00',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Ana Pérez', dni: '40123456', edad: 25, talla: 'M' }],
    aceptaTerminos: true,
    email: 'ana-sin-arroba',
  });

  // Resultado esperado: la inscripción se rechaza y no se envía ningún correo.
  expect(error).not.toBeNull();
  expect(error.detalles.map((d) => d.campo)).toContain('email');
  expect(correosEnviados).toHaveLength(0);
});

// ---------------------------------------------------------------------------
// Reglas definidas por el PO (FAQ de EcoHarmony Park)
// ---------------------------------------------------------------------------

/** Datos de una persona de prueba (edad y talla válidas para cualquier actividad). */
const persona = (dni, extra = {}) => ({ nombre: 'Persona ' + dni, dni, edad: 30, talla: 'M', ...extra });

/** Solicitud válida para el sábado; se pisa lo que haga falta en cada test. */
const solicitud = (extra = {}) => ({
  actividadId: 'tirolesa',
  fecha: SABADO,
  horario: '10:00',
  cantidadPersonas: 1,
  participantes: [persona('40123456')],
  aceptaTerminos: true,
  email: 'ana@example.com',
  ...extra,
});

// FAQ 15: Palestra es para 12 años o más, Tirolesa para 8 o más; Safari y Jardinería, todas las edades.

test('test_InscribirmeActividad_EdadMinimaCumplida_Pasa', async () => {
  // Precondición: la Palestra exige 12 años o más.

  // Pasos: inscribir a una persona de 12 años a la Palestra.
  const resultado = await servicio.inscribir(
    solicitud({ actividadId: 'palestra', participantes: [persona('40123456', { edad: 12 })] })
  );

  // Resultado esperado: la inscripción se registra.
  expect(resultado.participantes[0].edad).toBe(12);
});

test('test_InscribirmeActividad_EdadMenorAlMinimo_NoPasa', async () => {
  // Precondición: la Palestra exige 12 años o más.

  // Pasos: intentar inscribir a una persona de 11 años a la Palestra.
  const error = await errorAlInscribir(
    solicitud({ actividadId: 'palestra', participantes: [persona('40123456', { edad: 11 })] })
  );

  // Resultado esperado: se rechaza marcando la edad de la persona 1.
  expect(error).not.toBeNull();
  expect(error.detalles.map((d) => d.campo)).toContain('participantes[0].edad');
});

// FAQ 31: no hay máximo de personas por inscripción mientras haya cupo.

test('test_InscribirmeActividad_GrupoQueOcupaTodoElCupo_Pasa', async () => {
  // Precondición: la Jardinería del sábado a las 10:00 tiene 12 lugares libres.
  const doce = Array.from({ length: 12 }, (_, i) => persona(String(30000001 + i)));

  // Pasos: inscribir a 12 personas en una sola inscripción.
  const resultado = await servicio.inscribir(
    solicitud({ actividadId: 'jardineria', cantidadPersonas: 12, participantes: doce })
  );

  // Resultado esperado: la inscripción se registra para las 12 personas.
  expect(resultado.cantidadPersonas).toBe(12);
});

test('test_InscribirmeActividad_GrupoMayorAlCupo_NoPasa', async () => {
  // Precondición: la Safari del sábado a las 10:00 tiene 8 lugares libres.
  const nueve = Array.from({ length: 9 }, (_, i) => persona(String(30000001 + i)));

  // Pasos: intentar inscribir a 9 personas.
  const error = await errorAlInscribir(solicitud({ actividadId: 'safari', cantidadPersonas: 9, participantes: nueve }));

  // Resultado esperado: se rechaza porque solo quedan 8 lugares.
  expect(error).not.toBeNull();
  expect(error.message).toMatch(/solo quedan 8/i);
});

// FAQ 29: una persona no puede estar inscripta en dos turnos del mismo horario.

test('test_InscribirmeActividad_MismaPersonaEnOtroHorario_Pasa', async () => {
  // Precondición: la persona 40123456 ya está inscripta a la Tirolesa del sábado a las 10:00.
  await servicio.inscribir(solicitud());

  // Pasos: inscribirla al Safari del sábado a las 11:00.
  const resultado = await servicio.inscribir(solicitud({ actividadId: 'safari', horario: '11:00' }));

  // Resultado esperado: la inscripción se registra.
  expect(resultado.horario).toBe('11:00');
});

test('test_InscribirmeActividad_MismaPersonaEnElMismoHorario_NoPasa', async () => {
  // Precondición: la persona 40123456 ya está inscripta a la Tirolesa del sábado a las 10:00.
  await servicio.inscribir(solicitud());

  // Pasos: intentar inscribirla al Safari del sábado a las 10:00.
  const error = await errorAlInscribir(solicitud({ actividadId: 'safari' }));

  // Resultado esperado: se rechaza marcando el DNI de la persona 1.
  expect(error).not.toBeNull();
  expect(error.detalles.map((d) => d.campo)).toContain('participantes[0].dni');
  expect(error.detalles[0].mensaje).toMatch(/ya está inscripta/i);
});

// FAQ 23: solo se puede reservar dentro de las 24 hs anteriores al turno.

test('test_InscribirmeActividad_TurnoDentroDeLas24hs_Pasa', async () => {
  // Precondición: hoy es viernes 20:00; el sábado a las 17:00 faltan 21 hs.

  // Pasos: inscribir a la Tirolesa del sábado a las 17:00.
  const resultado = await servicio.inscribir(solicitud({ horario: '17:00' }));

  // Resultado esperado: la inscripción se registra.
  expect(resultado.horario).toBe('17:00');
});

test('test_InscribirmeActividad_TurnoAMasDe24hs_NoPasa', async () => {
  // Precondición: hoy es viernes 20:00; el domingo 11/10 a las 10:00 faltan 38 hs.

  // Pasos: intentar inscribir a la Tirolesa del domingo a las 10:00.
  const error = await errorAlInscribir(solicitud({ fecha: '2026-10-11' }));

  // Resultado esperado: se rechaza porque todavía no se habilitó la inscripción.
  expect(error).not.toBeNull();
  expect(error.message).toMatch(/24 hs/i);
});

// FAQ 30: la inscripción cierra 15 minutos antes del inicio del turno.

test('test_InscribirmeActividad_MasDe15MinutosAntes_Pasa', async () => {
  // Precondición: son las 09:40 del sábado; el turno de las 10:00 empieza en 20 minutos.
  servicio = await crearServicio(new Date(2026, 9, 10, 9, 40));

  // Pasos: inscribir a la Tirolesa del sábado a las 10:00.
  const resultado = await servicio.inscribir(solicitud());

  // Resultado esperado: la inscripción se registra.
  expect(resultado.horario).toBe('10:00');
});

test('test_InscribirmeActividad_MenosDe15MinutosAntes_NoPasa', async () => {
  // Precondición: son las 09:50 del sábado; el turno de las 10:00 empieza en 10 minutos.
  servicio = await crearServicio(new Date(2026, 9, 10, 9, 50));

  // Pasos: intentar inscribir a la Tirolesa del sábado a las 10:00.
  const error = await errorAlInscribir(solicitud());

  // Resultado esperado: se rechaza porque la inscripción ya cerró.
  expect(error).not.toBeNull();
  expect(error.message).toMatch(/15 minutos/i);
});

// Pedido del equipo: DNI de 6 a 8 dígitos y edad máxima de 100 años.

test('test_InscribirmeActividad_DniDe6Digitos_Pasa', async () => {
  // Precondición: se aceptan DNI de 6 a 8 números.

  // Pasos: inscribir a una persona con un DNI de 6 dígitos.
  const resultado = await servicio.inscribir(solicitud({ participantes: [persona('123456')] }));

  // Resultado esperado: la inscripción se registra.
  expect(resultado.participantes[0].dni).toBe('123456');
});

test('test_InscribirmeActividad_DniDe5Digitos_NoPasa', async () => {
  // Precondición: se aceptan DNI de 6 a 8 números.

  // Pasos: intentar inscribir a una persona con un DNI de 5 dígitos.
  const error = await errorAlInscribir(solicitud({ participantes: [persona('12345')] }));

  // Resultado esperado: se rechaza marcando el DNI de la persona 1.
  expect(error).not.toBeNull();
  expect(error.detalles.map((d) => d.campo)).toContain('participantes[0].dni');
});

test('test_InscribirmeActividad_Edad100_Pasa', async () => {
  // Precondición: la edad máxima es 100 años.

  // Pasos: inscribir a una persona de 100 años al Safari.
  const resultado = await servicio.inscribir(
    solicitud({ actividadId: 'safari', participantes: [persona('40123456', { edad: 100 })] })
  );

  // Resultado esperado: la inscripción se registra.
  expect(resultado.participantes[0].edad).toBe(100);
});

test('test_InscribirmeActividad_EdadMayorA100_NoPasa', async () => {
  // Precondición: la edad máxima es 100 años.

  // Pasos: intentar inscribir a una persona de 101 años al Safari.
  const error = await errorAlInscribir(
    solicitud({ actividadId: 'safari', participantes: [persona('40123456', { edad: 101 })] })
  );

  // Resultado esperado: se rechaza marcando la edad de la persona 1.
  expect(error).not.toBeNull();
  expect(error.detalles.map((d) => d.campo)).toContain('participantes[0].edad');
});
