# ICS_4k3_2026_Grupo12

## Información General

Repositorio del Grupo N°12 con los contenidos desarrollados en la materia “Ingeniería y Calidad de Software” en la Universidad Tecnológica Nacional, Facultad Regional Córdoba.
El repositorio estará estructurado a base de directorios y contenidos, para un trabajo colaborativo estratégico y organizado.

## Integrantes

| Apellido, Nombre            | Legajo |
| --------------------------- | ------ |
| Costantino Morillo, Augusto | 407349 |
| Vicentini, Maximiliano      | 90426  |
| Rojo, Dalila                | 81846  |
| Rivarola, Aldana            | 407066 |
| Pérez, Facundo              | 401067 |
| Sánchez, Luciano Enrique   | 89734  |
| Vera, Gerónimo              | 89785  |
| Suarez Paez, Tomás Ticiano  | 401747 |
| Caccia, Juan Manuel         | 405533 |
| Quarato, Francisco Ignacio  | 55001  |

## Estructura del Repositorio

```
ICS/
├── ClasesGrabadas/
├── DocumentosDeCatedra/
├── Examenes/
│   ├── Finales/
│   ├── Parciales/
│   │   ├── Parcial1/
│   │   │   └── Ejemplos/
│   │   └── Parcial2/
│   │       └── Ejemplos/
│   └── Resumenes/
│       ├── Finales/
│       └── Parcial<N>/
├── MaterialBibliografico/
│   ├── Agilismo/
│   ├── GestionDeConfiguracionDeSoftware/
│   ├── IngenieriaDeSoftware/
│   ├── LeanYKanban/
│   ├── SoftwareTesting/
│   └── TestDrivenDevelopment/
├── MaterialPractico/
├── NotasDeClases/
│   ├── Practico.md
│   └── Teorico.md
├── TrabajosDeInvestigacion/
└── Unidades/
    └── Unidad<N>/
        ├── Apuntes/
        ├── Practico/                 (solo si hay material práctico de la unidad)
        │   └── TrabajosPracticos/    (solo si hay trabajos prácticos)
        │       └── TP_N<N>_<Tema>_<Tipo>/
        │           ├── Enunciado/
        │           ├── Produccion/
        │           │   ├── Codigo/        (si el TP incluye código)
        │           │   └── Documentacion/ (si hay documentación auxiliar)
        │           │       └── Imagenes/ (si hay recursos gráficos de apoyo)
        │           ├── Entrega/
        │           └── Retroalimentacion/ (opcional, si hay devoluciones de la cátedra)
        ├── Presentaciones/
        └── Teorico/
```

La estructura de cada unidad se crea según el material efectivamente disponible y las actividades asignadas por la cátedra; no se mantienen carpetas vacías como reserva. Por eso, una unidad que todavía no tenga prácticos (por ejemplo, Unidad1) no necesita `Practico/` ni `TrabajosPracticos/`. Cuando se publique un nuevo práctico, se crea su carpeta dentro de la unidad correspondiente y se aplica la estructura interna definida más abajo. Si un trabajo abarca varias unidades, se ubica en la última unidad que abarca. No se inventa ni se completa material faltante: se incorpora cuando la cátedra lo provee.

### Prácticos definidos por la guía

La guía `MaterialPractico/GuiaDeTrabajosPracticosEvaluables.pdf` define el tipo y la unidad de cada práctico. La tabla reúne los prácticos previstos como evaluables.

| Práctico | Tema                                          | Unidad indicada en la guía | Tipo y estado            |
| --------- | --------------------------------------------- | --------------------------- | ------------------------ |
| TP 4      | SCM - Herramientas de SCM                     | Unidad 3                    | Evaluable                |
| TP 5      | SCM - Uso del Repositorio                     | Unidad 3                    | Evaluable                |
| TP 6      | TDD                                           | Unidad 4                    | Evaluable                |
| TP 7      | SCRUM - Ejercicio de aplicación              | Unidad 2                    | Evaluable                |
| TP 10     | KANBAN - Ejercicio de aplicación             | Unidad 4                    | Evaluable                |
| TP 11     | SCRUM - Dinámica de Retrospectiva            | Unidad 2                    | Evaluable previsto. No realizado. |
| TP 12     | Design Thinking - Publicidad de Instagram     | Unidad 2                    | Evaluable                |
| TP 13     | SCRUM - Planificación de Release y de Sprint | Unidad 3                    | Evaluable previsto como recuperatorio. No realizado. |

Los TP 11 y 13 no se realizaron por falta de tiempo en la asignatura.

Los TP 1, 2, 3, 8 y 9 son actividades prácticas sin entrega obligatoria ni nota, según la guía. Los TP 1, 2 y 3 tienen carpeta propia en la Unidad 2, con el enunciado y la resolución del Grupo 12. Los TP 8 y 9 se guardan en la Unidad 4, con el enunciado, la resolución y la planilla de casos de prueba. Las carpetas de los evaluables se ubican en la unidad indicada en la tabla, aunque la numeración del TP no coincida con la unidad.

Si la cátedra publica un enunciado únicamente en la guía compartida, se pueden extraer las páginas correspondientes y guardarlas en `Enunciado/` con el nombre previsto para ese TP. La guía completa se conserva en `MaterialPractico/`.

`MaterialPractico/` reúne recursos de consulta compartidos que apoyan actividades prácticas (guías, casos y lineamientos generales). Por ese carácter transversal, los lineamientos para los trabajos de investigación grupal se conservan allí; las entregas de esos trabajos se organizan por separado en `TrabajosDeInvestigacion/`.

`NotasDeClases/` reúne apuntes en Markdown que abarcan varias unidades. `Practico.md` conserva las notas de las clases prácticas y `Teorico.md`, las de las clases teóricas.

En `Examenes/`, `Finales/` y `Resumenes/` son carpetas hermanas: la primera reserva los exámenes finales y la segunda contiene los resúmenes, separados por tipo de examen. Los ejemplos de parciales permanecen en `Parciales/Parcial<N>/Ejemplos/`.

Para nombrar los ejemplos de parciales se usa la fecha del examen en formato `DD-MM-YYYY`. Si hay más de un tema del mismo parcial en la misma fecha, se agrega el sufijo correspondiente a cada archivo, por ejemplo `_TemaA` y `_TemaB`.

## Línea Base

### Criterio de creación

La línea base se establecerá una vez que el entregable haya sido presentado, evaluado por el equipo docente y, en caso de corresponder, corregido y aprobado por el equipo de trabajo.

### Identificación

Las líneas base se identificarán con la siguiente etiqueta: `LineaBase_G12_<DD-MM-YYYY>`. Se usan guiones en la fecha para evitar caracteres especiales en el nombre del tag.

### Historial de cambios

| **Línea Base**        | **Fecha** | **Descripción**                                                              |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------- |
| `LineaBase_G12_23-09-2026` | 23/09/2026      | Entrega TP SCM. Estructura del repositorio actualizada según el feedback docente.  |
| `LineaBase_G12_25-09-2026` | 25/09/2026      | Entrega del TP SCRUM. Enunciado, producción y entrega incorporados al repositorio. |
| `LineaBase_G12_28-10-2026` | 28/10/2026      | Formato de los tests de inscripción a actividad corregido.                         |

## Items de Configuración

### Reglas de Nombrado y Ubicaciones

| Nombre del ítem de configuración                  | Regla de nombrado                                                  | Ubicación física                                                                                          | Tipo de ítem          |
| --------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ---------------------- |
| Programa de la asignatura                           | `Programa_<Año>.pdf`                                            | `/ICS/DocumentosDeCatedra/`                                                                               | Cátedra               |
| Material Bibliográfico                             | `Bibliografia_<TemaCarpeta>[_<Subtema>]_<NombreLibro>_<Autores>.pdf` | `/ICS/MaterialBibliografico/<TemaCarpeta>/`                                                               | Material de Referencia |
| Lineamientos y Plan de Configuración               | `README.md`                                                      | `/ICS/`                                                                                                   | Gestión               |
| Cronograma                                          | `Cronograma_<Año>.pdf`                                          | `/ICS/DocumentosDeCatedra/`                                                                               | Cátedra               |
| Carpeta de Trabajo Práctico                        | `TP_N<Número>_<Tema>_<Tipo>/`                                   | `/ICS/Unidades/Unidad<Número>/Practico/TrabajosPracticos/`                                               | Trabajo práctico      |
| Enunciados de Trabajo Práctico                     | `Enunciado_TP_N<Número>.pdf`                                    | `/ICS/Unidades/Unidad<Número>/Practico/TrabajosPracticos/TP_N<Número>_<Tema>_<Tipo>/Enunciado/`         | Consigna               |
| Material de producción de Trabajo Práctico        | `Produccion_TP_N<Número>[_<Descripción>][_<Grupo>].<ext>`      | `/ICS/Unidades/Unidad<Número>/Practico/TrabajosPracticos/TP_N<Número>_<Tema>_<Tipo>/Produccion/`        | Material de trabajo    |
| Entregables de Trabajo Práctico                    | `TP_N<Número>_<Grupo>.<ext>`                                    | `/ICS/Unidades/Unidad<Número>/Practico/TrabajosPracticos/TP_N<Número>_<Tema>_<Tipo>/Entrega/`           | Entregable             |
| Retroalimentación de Trabajo Práctico (opcional)  | `Retroalimentacion_TP_N<Número>_<Grupo>[_<Descripción>].<ext>` | `/ICS/Unidades/Unidad<Número>/Practico/TrabajosPracticos/TP_N<Número>_<Tema>_<Tipo>/Retroalimentacion/` | Cátedra               |
| Trabajos de Investigación                          | `TrabajoDeInvestigacion_TP_N<Número>_<Tema>_<Grupo>.<ext>`      | `/ICS/TrabajosDeInvestigacion/`                                                                           | Entregable             |
| Presentaciones de clase                             | `Presentacion_<Tema>.pdf`                                        | `/ICS/Unidades/Unidad<Número>/Presentaciones/`                                                           | Material de Referencia |
| Apuntes de alumnos                                  | `Apunte_<TemaDeClase>_<FechaDeClase>_<Autor>.pdf`                | `/ICS/Unidades/Unidad<Número>/Apuntes/`                                                                  | Apunte de clase        |
| Notas de clases de varias unidades                   | `Practico.md` o `Teorico.md`                                       | `/ICS/NotasDeClases/`                                                                                     | Apunte de clase        |
| Presentación de la asignatura                      | `Presentacion_<Año>.pdf`                                        | `/ICS/DocumentosDeCatedra/`                                                                               | Cátedra               |
| Clases grabadas                                     | `ClaseGrabada_<Tema>_<Curso>_<Año>[_<Numero>].txt`              | `/ICS/ClasesGrabadas/`                                                                                    | Material de Referencia |
| Lineamientos para trabajos de investigación grupal | `LineamientosParaTrabajosDeInvestigacionGrupal.pdf`             | `/ICS/MaterialPractico/`                                                                                  | Material de Referencia |
| Guía de Trabajos Prácticos Evaluables             | `GuiaDeTrabajosPracticosEvaluables.pdf`                          | `/ICS/MaterialPractico/`                                                                                  | Material de Referencia |
| Guía de Ejercicios Prácticos Resueltos            | `GuiaDeEjerciciosPracticosResueltos.pdf`                         | `/ICS/MaterialPractico/`                                                                                  | Material de Referencia |
| Información de parciales                           | `InformacionDeParciales.pdf`                                     | `/ICS/DocumentosDeCatedra/`                                                                               | Cátedra               |
| Ejemplos de parciales                               | `EjemploParcial<Numero>_<Fecha>[_<Tema>].pdf`                    | `/ICS/Examenes/Parciales/Parcial<Numero>/Ejemplos/`                                                       | Material de Referencia |
| Resumen de parcial                                  | `ResumenParcial<Numero>_<Autor>_<Año>.pdf`                      | `/ICS/Examenes/Resumenes/Parcial<Numero>/`                                                                | Material de Referencia |
| Resumen de final                                    | `ResumenFinal_<Autor>_<Año>.pdf`                                | `/ICS/Examenes/Resumenes/Finales/`                                                                        | Material de Referencia |
| Casos de estudio                                    | `Caso_<Nombre>.pdf`                                              | `/ICS/MaterialPractico/`                                                                                  | Material de Referencia |

### Glosario

| Siglas     | Significado                       |
| ---------- | --------------------------------- |
| ICS        | Ingeniería y Calidad de Software |
| TIG        | Trabajo de Investigación Grupal  |
| IC         | Ítem de Configuración           |
| TP         | Trabajo Práctico                 |
| SCM        | Software Configuration Management |
| TDD        | Test Driven Development           |
| DD/MM/YYYY | Formato de fecha Dia/Mes/Año     |

### Decisiones tomadas por el Grupo

* Nombres de items de configuración en UpperCamelCase. Para separación de entidades/tópico se usa guion bajo (ej: NombreLibro_NombreAutor)
* Las carpetas de unidades y prácticos se crean cuando existe material o una actividad asignada; no se generan estructuras vacías para unidades sin prácticos.
* Si un Trabajo Práctico abarca varias unidades, se ubica en la última unidad que abarca.
* Cada carpeta de Trabajo Práctico se identifica con su número, tema y tipo indicado en la consigna (por ejemplo, Evaluable, EvaluableRecuperatorio, NoEvaluable o Entregable).
* Los archivos entregados de un Trabajo Práctico se nombran `TP_N<Número>_<Grupo>.<ext>`, de modo que el nombre identifique tanto el TP como el grupo, como en `TP_N4_Grupo12.pdf`.
* Evitar el uso de tildes o caracteres especiales en nombres de archivos y directorios para garantizar la compatibilidad con herramientas de consola, scripts y sistemas de codificación.
* En bibliografía, `<TemaCarpeta>` coincide con la carpeta inmediata. Se agrega `<Subtema>` cuando aporta una clasificación más específica. En `<Autores>` se escriben los autores en UpperCamelCase en un solo campo.

### Clases grabadas

Se mantiene un archivo `.txt` por cada clase grabada y cada archivo contiene el título de la clase y un único enlace al video. Si hay más de una grabación del mismo tema, curso y año, se agrega un número correlativo al nombre (`_1`, `_2`, etc.) para evitar colisiones. No se agrupan varios enlaces en un mismo archivo.

## Estructura interna de Trabajos Prácticos

Los TP evaluables mantienen las carpetas `Enunciado/`, `Produccion/` y `Entrega/`, incluso si aún no contienen archivos.

* **`Enunciado/`** contiene la consigna y el material base del TP.
* **`Produccion/`** contiene el material de trabajo del grupo previo a la entrega. Si el TP incluye código, se guarda en `Produccion/Codigo/`. La documentación auxiliar se guarda en `Produccion/Documentacion/` y sus recursos gráficos en `Produccion/Documentacion/Imagenes/`. Los documentos y las imágenes de esas subcarpetas siguen el patrón de nombrado del material de producción.
* **`Entrega/`** contiene la versión final del TP entregada.

La retroalimentación es opcional para todos los TP, incluidos los evaluables. La carpeta **`Retroalimentacion/`** se crea únicamente para guardar una devolución o corrección recibida de la cátedra.
