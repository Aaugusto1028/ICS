/** Errores de dominio. Cada uno sabe con qué código HTTP se traduce. */

class ErrorDominio extends Error {
  constructor(mensaje, { status = 400, codigo = 'ERROR', detalles = [] } = {}) {
    super(mensaje);
    this.name = this.constructor.name;
    this.status = status;
    this.codigo = codigo;
    this.detalles = detalles;
  }
}

/** Datos mal cargados o faltantes (400). `detalles` = [{ campo, mensaje }]. */
class ErrorValidacion extends ErrorDominio {
  constructor(detalles) {
    super('Hay datos inválidos en la inscripción.', { status: 400, codigo: 'VALIDACION', detalles });
  }
}

class ErrorNoEncontrado extends ErrorDominio {
  constructor(mensaje) {
    super(mensaje, { status: 404, codigo: 'NO_ENCONTRADO' });
  }
}

/** El parque está cerrado o la actividad no se dicta en ese horario (422). */
class ErrorNoDisponible extends ErrorDominio {
  constructor(mensaje) {
    super(mensaje, { status: 422, codigo: 'NO_DISPONIBLE' });
  }
}

/** No quedan cupos suficientes para el horario elegido (409). */
class ErrorSinCupo extends ErrorDominio {
  constructor(mensaje, cuposRestantes) {
    super(mensaje, { status: 409, codigo: 'SIN_CUPO', detalles: [{ cuposRestantes }] });
  }
}

module.exports = { ErrorDominio, ErrorValidacion, ErrorNoEncontrado, ErrorNoDisponible, ErrorSinCupo };
