/*
 * User Story: Inscribirme a actividad
 * COMO visitante QUIERO inscribirme a una actividad PARA reservar mi lugar en la misma.
 *
 * Un test que PASA y uno que NO PASA por cada criterio de aceptación.
 * Nombre de cada test: test_<UserStory>_<LoQueSePrueba>_<Pasa|NoPasa>
 *
 * Precondiciones generales (se preparan antes de cada test):
 *   - La base de datos está vacía (no hay inscripciones previas).
 *   - Hoy es viernes 09/10/2026 a las 08:00.
 *   - Las inscripciones se hacen para el sábado 10/10/2026 (día en que el parque está abierto).
 *   - El correo no se envía de verdad: queda guardado en "correosEnviados" para poder revisarlo.
 */

const { InscripcionService } = require('../src/services/inscripcionService');
const { RepositorioSQLite } = require('../src/repositories/repositorioSQLite');
const { MailService } = require('../src/services/mailService');

const SABADO = '2026-10-10';

let servicio;
let correosEnviados;

beforeEach(async () => {
  correosEnviados = [];
  const transporterFalso = {
    sendMail: async (correo) => {
      correosEnviados.push(correo);
      return { messageId: 'prueba' };
    },
  };

  servicio = new InscripcionService({
    repositorio: await RepositorioSQLite.crear(),
    mailer: new MailService({ transporter: transporterFalso }),
    reloj: () => new Date(2026, 9, 9, 8, 0), // viernes 09/10/2026 08:00
  });
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
  // Precondición: la Tirolesa del sábado a las 10:30 no tiene inscriptos (10 lugares libres).

  // Pasos: inscribir 1 persona a la Tirolesa del sábado a las 10:30.
  const resultado = await servicio.inscribir({
    actividadId: 'tirolesa',
    fecha: SABADO,
    horario: '10:30',
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
  // Precondición: la Palestra del sábado a las 11:00 ya tiene sus 8 lugares ocupados.
  const ochoPersonas = [];
  for (let i = 1; i <= 8; i++) {
    ochoPersonas.push({ nombre: 'Escalador ' + i, dni: String(30000000 + i), edad: 30, talla: 'L' });
  }
  await servicio.inscribir({
    actividadId: 'palestra',
    fecha: SABADO,
    horario: '11:00',
    cantidadPersonas: 8,
    participantes: ochoPersonas,
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
  // Precondición: el Safari se dicta a las 09:30, 11:30, 14:30 y 16:30.

  // Pasos: inscribir 1 persona al Safari del sábado a las 14:30.
  const resultado = await servicio.inscribir({
    actividadId: 'safari',
    fecha: SABADO,
    horario: '14:30',
    cantidadPersonas: 1,
    participantes: [{ nombre: 'Juan Gómez', dni: '35111222', edad: 40 }],
    aceptaTerminos: true,
    email: 'juan@example.com',
  });

  // Resultado esperado: la inscripción se registra en ese horario.
  expect(resultado.horario).toBe('14:30');
});

test('test_InscribirmeActividad_HorarioParqueCerrado_NoPasa', async () => {
  // Precondición: el parque abre de 09:00 a 18:00.

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
  // Precondición: la Jardinería del sábado a las 10:00 tiene 15 lugares libres.

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
  // Precondición: la Jardinería del sábado a las 10:00 tiene 15 lugares libres.

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
    horario: '11:30',
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
  // Precondición: la Palestra del sábado a las 15:00 tiene 8 lugares libres.

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
  // Precondición: la Palestra del sábado a las 15:00 tiene 8 lugares libres.

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
