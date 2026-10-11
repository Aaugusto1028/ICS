import { describe, test, expect } from 'vitest';
import { validarFormulario, ajustarParticipantes, armarSolicitud, hoyISO } from './validacion.js';

const tirolesa = { id: 'tirolesa', requiereTalla: true, tallas: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] };
const safari = { id: 'safari', requiereTalla: false, tallas: [] };

const formValido = (extra = {}) => ({
  actividadId: 'tirolesa',
  fecha: '2026-10-10',
  horario: '10:30',
  cantidadPersonas: 1,
  participantes: [{ nombre: 'Ana Pérez', dni: '40123456', edad: '25', talla: 'M' }],
  aceptaTerminos: true,
  email: 'ana@example.com',
  ...extra,
});

describe('validarFormulario', () => {
  test('un formulario completo no tiene errores', () => {
    expect(validarFormulario(formValido(), tirolesa)).toEqual({});
  });

  test('exige aceptar los términos y condiciones', () => {
    expect(validarFormulario(formValido({ aceptaTerminos: false }), tirolesa)).toHaveProperty('aceptaTerminos');
  });

  test('exige la talla si la actividad la requiere', () => {
    const form = formValido({ participantes: [{ nombre: 'Ana', dni: '40123456', edad: '25', talla: '' }] });
    expect(validarFormulario(form, tirolesa)).toHaveProperty(['participantes[0].talla']);
  });

  test('no exige talla si la actividad no la requiere', () => {
    const form = formValido({ actividadId: 'safari', participantes: [{ nombre: 'Ana', dni: '40123456', edad: '25', talla: '' }] });
    expect(validarFormulario(form, safari)).toEqual({});
  });

  test('exige actividad y horario', () => {
    const errores = validarFormulario(formValido({ horario: '' }), null);
    expect(errores).toHaveProperty('actividadId');
    expect(errores).toHaveProperty('horario');
  });

  test('marca DNI inválido, DNI repetido y edad inválida', () => {
    const form = formValido({
      cantidadPersonas: 2,
      participantes: [
        { nombre: 'Ana', dni: '40123456', edad: '-1', talla: 'M' },
        { nombre: 'Juan', dni: '40123456', edad: '30', talla: 'L' },
      ],
    });
    const errores = validarFormulario(form, tirolesa);
    expect(errores).toHaveProperty(['participantes[0].edad']);
    expect(errores['participantes[1].dni']).toMatch(/repetido/);
  });
});

describe('ajustarParticipantes', () => {
  test('agrega participantes vacíos y conserva los cargados', () => {
    const lista = ajustarParticipantes([{ nombre: 'Ana', dni: '1', edad: '2', talla: '' }], 3);
    expect(lista).toHaveLength(3);
    expect(lista[0].nombre).toBe('Ana');
    expect(lista[2]).toEqual({ nombre: '', dni: '', edad: '', talla: '' });
  });

  test('recorta si se reduce la cantidad', () => {
    expect(ajustarParticipantes([{}, {}, {}], 1)).toHaveLength(1);
  });
});

describe('armarSolicitud', () => {
  test('convierte números y omite la talla si no se requiere', () => {
    const s = armarSolicitud(formValido({ actividadId: 'safari' }), safari);
    expect(s.cantidadPersonas).toBe(1);
    expect(s.participantes[0]).toEqual({ nombre: 'Ana Pérez', dni: '40123456', edad: 25 });
  });
});

test('hoyISO formatea la fecha local', () => {
  expect(hoyISO(new Date(2026, 0, 5))).toBe('2026-01-05');
});
