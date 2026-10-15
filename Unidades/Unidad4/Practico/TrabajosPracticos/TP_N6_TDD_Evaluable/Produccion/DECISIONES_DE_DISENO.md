# Decisiones de diseño · Inscribirme a actividad

**Universidad Tecnológica Nacional, Facultad Regional Córdoba**  
Ingeniería en Sistemas de Información · Ingeniería y calidad de software 2026 2C

| | |
|---|---|
| **Tema** | TDD - Toma de Decisiones |
| **Unidad** | Nro. 3 |
| **Trabajo Práctico** | Nro. 4 |
| **Año** | 2026 |
| **Curso** | 4K3 |
| **Grupo** | Nro. 12 |
| **Fecha de entrega** | 21/09/2026 |

**Docentes y ayudantes alumno:** Ing. Covaro Laura, Ing. Massano Cecilia, Ing. Garnero Constanza y Ayudante Alumno Izaguirre Ezequiel.

**Integrantes:**

- 89734 - Sanchez, Luciano Enrique
- 89785 - Vera Geronimo
- 407066 - Rivarola, Aldana
- 407349 - Costantino Morillo, Augusto
- 400109 - Baravalle Graglia, Juan Cruz
- 90426 - Vicentini, Maximiliano
- 81846 - Rojo, Dalila
- 89645 - Medina Ibarra, Román
- 401067 - Pérez, Facundo
- 405533 - Caccia, Juan Manuel
- 403553 - Zangla Hernández, Juan Pablo
- 401747 - Suarez Paez, Tomás Ticiano
- 55001 - Quarato, Francisco Ignacio
- 82336 - Stura Murua, Fermín

---

## Decisiones

| Número de decisión | Decisión | Quién tomó la decisión |
|:---:|---|---|
| 1 | El parque abre todos los días menos los lunes, el 25 de diciembre y el 1 de enero. | Product Owner |
| 2 | El parque abre de 08:30 a 19:00. | Product Owner |
| 3 | Las actividades se dictan de 09:00 a 18:00, con un turno por hora. A las 18:00 no hay turno, así que el último empieza a las 17:00. | Product Owner |
| 4 | Cupos por turno: Safari 8, Palestra 12, Jardinería 12 y Tirolesa 10. | Product Owner |
| 5 | Las actividades que piden talla de vestimenta son Palestra y Tirolesa. | Product Owner |
| 6 | Talles disponibles: XS, S, M, L, XL y XXL. | Product Owner |
| 7 | Edad mínima por actividad: Palestra 12 años o más, Tirolesa 8 años o más, Safari y Jardinería para todas las edades. | Product Owner |
| 8 | Solo se puede reservar un turno dentro de las 24 horas anteriores a su inicio. | Product Owner |
| 9 | La inscripción a un turno cierra 15 minutos antes de que empiece. | Product Owner |
| 10 | No hay máximo de personas por inscripción: se puede inscribir a quien se quiera mientras haya cupo en el turno. | Product Owner |
| 11 | Una persona no puede estar inscripta en dos turnos del mismo horario, aunque sean actividades distintas. | Product Owner |
| 12 | Solo se pide DNI; no se agrega un campo de pasaporte para extranjeros. | Product Owner |
| 13 | El usuario puede ver los cupos disponibles de cada turno. | Product Owner |
| 14 | Si la fecha es un día en que el parque está cerrado, el calendario la muestra deshabilitada o no deja elegirla. | Product Owner |
| 15 | El mail de confirmación incluye el resumen de la inscripción y el código QR. | Product Owner |
| 16 | No hace falta implementar registro ni login; se puede trabajar con la sesión y el usuario simulados. | Product Owner |
| 17 | Se pide una app mobile y se acepta una web responsive. | Product Owner |
| 18 | Paleta de colores: #386641, #6A994E, #A7C957, #F2E8CF y #BC4749. Tipografía: Lato. | Product Owner |
| 19 | Los términos y condiciones son uno por actividad; los redacta el equipo y se mandan al PO para su validación. | Product Owner |
| 20 | El logo lo diseña el equipo y se manda al PO para su validación. | Product Owner |
| 21 | Arquitectura: frontend en React con Vite y backend en Node.js con Express, comunicados por una API REST. | Maximiliano Vicentini |
| 22 | Base de datos local SQLite (con sql.js), que se crea sola al iniciar y no requiere instalar un motor. | Maximiliano Vicentini |
| 23 | Desarrollo con TDD: un test que pasa y uno que no pasa por cada criterio de aceptación y por cada regla del PO (Jest en el backend, Vitest en el frontend). | Maximiliano Vicentini |
| 24 | Logo con una hoja estilizada y un ícono propio para cada actividad, dibujados en SVG. | Maximiliano Vicentini |
| 25 | Formulario en cuatro pasos (actividad, fecha y horario, participantes, email y términos) con un resumen de la reserva a la derecha. | Maximiliano Vicentini |
| 26 | Botón "Registrar inscripción" también al final del formulario, además del que está en el resumen. En el celular se muestra uno solo. | Maximiliano Vicentini |
| 27 | La fecha se elige con dos botones, Hoy y Mañana, porque la regla de las 24 horas no deja reservar más adelante. | Maximiliano Vicentini |
| 28 | Cada horario muestra los lugares libres o el motivo por el que no se puede elegir: "Sin cupo", "Cerrada" o "Todavía no". | Maximiliano Vicentini |
| 29 | Se cargan nombre, DNI, edad y talla de cada participante; la talla es por persona y solo se pide si la actividad la requiere. | Maximiliano Vicentini |
| 30 | El DNI acepta de 6 a 8 dígitos, sólo números y sin puntos. | Maximiliano Vicentini |
| 31 | La edad va de 0 a 100 años; la edad máxima figura en las condiciones generales de los términos. | Maximiliano Vicentini |
| 32 | Un mismo DNI no puede repetirse dentro de una inscripción. | Maximiliano Vicentini |
| 33 | Un solo email por inscripción, el de quien completa el campo de mail. | Maximiliano Vicentini |
| 34 | Si el grupo es más grande que los lugares que quedan, se rechaza toda la inscripción y se informa cuántos lugares hay. | Maximiliano Vicentini |
| 35 | Los términos los acepta una vez quien inscribe, en nombre del grupo. Si cambia de actividad, tiene que volver a aceptarlos. | Maximiliano Vicentini |
| 36 | Los términos muestran la fecha en que se redactaron. | Maximiliano Vicentini |
| 37 | Un menor que no cumple la edad mínima se rechaza directamente; no se exige un adulto en la misma inscripción. | Maximiliano Vicentini |
| 38 | El QR contiene texto (código, turno y nombre y DNI de cada persona) para que se lea con cualquier celular sin internet. | Maximiliano Vicentini |
| 39 | El QR se dibuja con el borde blanco del estándar y a un tamaño que crece con el grupo, para que la cámara lo pueda leer. | Maximiliano Vicentini |
| 40 | Código de inscripción con el formato INS- seguido de 8 caracteres (por ejemplo, INS-439E3BBC). | Maximiliano Vicentini |
| 41 | Los mails salen desde grupoecoharmonypark@gmail.com a través de Brevo. | Maximiliano Vicentini |
| 42 | Si el mail no se puede enviar, la inscripción queda registrada igual y la pantalla muestra el QR para guardarlo. | Maximiliano Vicentini |
| 43 | Las actividades no se cobran en el sistema. | Maximiliano Vicentini |
| 44 | Fuera del alcance de esta historia: cancelar o modificar inscripciones, lista de espera y panel para el personal del parque. | Maximiliano Vicentini |
| 45 | Pestaña "Inscripciones" para ver las inscripciones registradas y la ocupación de cada turno. | Maximiliano Vicentini |
| 46 | Textos en español rioplatense con voseo ("Elegí", "Ingresá"). | Maximiliano Vicentini |
