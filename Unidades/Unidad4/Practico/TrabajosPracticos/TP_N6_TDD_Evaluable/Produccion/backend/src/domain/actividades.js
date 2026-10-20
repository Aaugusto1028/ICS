/**
 * Catálogo de actividades del parque.
 * Es la única fuente de verdad sobre qué actividades existen, en qué horarios
 * se dictan, cuántos cupos tiene cada turno, si exigen talla de vestimenta,
 * desde qué edad se pueden hacer y cuáles son sus términos y condiciones.
 * (Al iniciar, el repositorio copia este catálogo a la tabla `actividades` de la base.)
 *
 * Valores definidos por el PO: cupos (FAQ 13), actividades con vestimenta (FAQ 9),
 * talles (FAQ 14), edad mínima (FAQ 15) y un turno por hora de 09 a 17 (FAQ 12).
 */

const { turnosDelDia } = require('./parque');

const TALLAS_VALIDAS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Fecha en que se redactaron los términos (AAAA-MM-DD). Se muestra en la página de términos.
const VERSION_TERMINOS = '2026-10-15';

/** Condiciones que aplican a todas las actividades. */
const TERMINOS_GENERALES = [
  'La inscripción es personal. Cada participante debe presentar su DNI junto con el código QR al ingresar a la actividad.',
  'Las actividades son para personas de hasta 100 años, además de la edad mínima que indique cada actividad.',
  'Presentarse 15 minutos antes del horario reservado. Pasados 10 minutos del inicio, el lugar puede liberarse.',
  'Los menores de 18 años deben estar acompañados por un adulto responsable inscripto en la misma actividad o autorizados por escrito.',
  'El parque puede suspender o reprogramar la actividad por razones climáticas o de seguridad. En ese caso se avisará al email registrado.',
  'Los datos personales se usan solo para gestionar la inscripción y el seguro de la actividad.',
];

const ACTIVIDADES = [
  {
    id: 'tirolesa',
    nombre: 'Tirolesa',
    descripcion: 'Recorrido de 400 metros suspendido sobre la copa de los árboles.',
    requiereTalla: true,
    motivoTalla: 'Se entrega arnés y chaleco según la talla.',
    cupoPorHorario: 10,
    edadMinima: 8,
    horarios: turnosDelDia(),
    terminos: [
      'Declaro estar en condiciones físicas para realizar la actividad y no padecer afecciones que me lo impidan.',
      'Es obligatorio usar en todo momento el arnés, el casco y el chaleco provistos, en la talla declarada.',
      'Edad mínima: 8 años. Peso máximo permitido: 110 kg.',
      'Debo seguir en todo momento las indicaciones del guía. No está permitido llevar objetos sueltos (celulares, cámaras, llaves) durante el recorrido.',
    ],
  },
  {
    id: 'safari',
    nombre: 'Safari',
    descripcion: 'Paseo guiado en vehículo abierto para observar la fauna del parque.',
    requiereTalla: false,
    cupoPorHorario: 8,
    edadMinima: 0,
    horarios: turnosDelDia(),
    terminos: [
      'Debo permanecer sentado dentro del vehículo durante todo el recorrido.',
      'Está prohibido alimentar, tocar o llamar la atención de los animales.',
      'No se permite arrojar objetos ni residuos durante el recorrido.',
      'Debo respetar las indicaciones del guía y del conductor en todo momento.',
    ],
  },
  {
    id: 'palestra',
    nombre: 'Palestra',
    descripcion: 'Muro de escalada de 12 metros con rutas para todos los niveles.',
    requiereTalla: true,
    motivoTalla: 'Se entrega arnés y calzado de escalada según la talla.',
    cupoPorHorario: 12,
    edadMinima: 12,
    horarios: turnosDelDia(),
    terminos: [
      'Declaro estar en condiciones físicas para escalar y no padecer afecciones que me lo impidan.',
      'Es obligatorio usar el arnés y el calzado de escalada provistos, en la talla declarada.',
      'No está permitido escalar sin la supervisión y el aseguramiento de un instructor.',
      'Edad mínima: 12 años.',
    ],
  },
  {
    id: 'jardineria',
    nombre: 'Jardinería',
    descripcion: 'Taller de huerta y plantas nativas. Te llevás tu plantín a casa.',
    requiereTalla: false,
    cupoPorHorario: 12,
    edadMinima: 0,
    horarios: turnosDelDia(),
    terminos: [
      'Debo utilizar las herramientas solo bajo las indicaciones del tallerista.',
      'Debo informar al tallerista cualquier alergia a plantas, polen o insectos antes de comenzar.',
      'Los menores de 12 años deben participar junto a un adulto.',
    ],
  },
];

function buscarActividad(id) {
  return ACTIVIDADES.find((a) => a.id === id) || null;
}

/** Texto completo de los términos que acepta el visitante (se guarda como constancia). */
function textoTerminos(actividad) {
  return [
    `Términos y condiciones de ${actividad.nombre} (versión ${VERSION_TERMINOS})`,
    ...actividad.terminos.map((t, i) => `${i + 1}. ${t}`),
    'Condiciones generales del parque',
    ...TERMINOS_GENERALES.map((t, i) => `${i + 1}. ${t}`),
  ].join('\n');
}

module.exports = { ACTIVIDADES, TALLAS_VALIDAS, TERMINOS_GENERALES, VERSION_TERMINOS, buscarActividad, textoTerminos };
