# ICS_4k3_2026_Grupo12

## Información General
Repositorio del Grupo N°12 con los contenidos desarrollados en la materia “Ingeniería y Calidad de Software” en la Universidad Tecnológica Nacional, Facultad Regional Córdoba.
El repositorio estará estructurado a base de directorios y contenidos, para un trabajo colaborativo estratégico y organizado.

## Integrantes
| Apellido, Nombre                        | Legajo   |
|-----------------------------------------|----------|
| Vicentini, Maximiliano                  | 90426    |
| Sanchez, Luciano Enrique                | 89734    |
| Vera, Geronimo                          | 89785    |
| Rivarola, Aldana                        | 407066   |
| Costantino Morillo, Augusto             | 407349   |
| Baravalle Graglia, Juan Cruz            | 400109   |
| Rojo, Dalila                            | 81846    |
| Medina Ibarra, Román                    | 89645    |
| Pérez, Facundo                          | 401067   |
| Caccia, Juan Manuel                     | 405533   |
| Zangla Hernández, Juan Pablo            | 403553   |
| Suarez Paez, Tomás Ticiano              | 401747   |
| Quarato, Francisco Ignacio              | 55001    |
| Stura Murua, Fermín                     | 82336    |

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
│   └── TestDrivenDevelopment/
├── MaterialPractico/
├── TrabajosDeInvestigacion/
└── Unidades/
    └── Unidad<N>/
        ├── Apuntes/
        ├── Practico/                 (solo si hay material práctico de la unidad)
        │   └── TrabajosPracticos/    (solo si hay trabajos prácticos)
        │       └── TP_N<N>_<Tema>_<Tipo>/
        │           ├── Enunciado/
        │           ├── Produccion/
        │           ├── Entrega/
        │           └── Retroalimentacion/
        ├── Presentaciones/
        └── Teorico/
```

La estructura de cada unidad se crea según el material efectivamente disponible y las actividades asignadas por la cátedra; no se mantienen carpetas vacías como reserva. Por eso, una unidad que todavía no tenga prácticos (por ejemplo, Unidad1) no necesita `Practico/` ni `TrabajosPracticos/`. Cuando se publique un nuevo práctico, se crea su carpeta dentro de la unidad correspondiente y se aplica la estructura interna definida más abajo. Si un trabajo abarca varias unidades, se ubica en la última unidad que abarca. No se inventa ni se completa material faltante: se incorpora cuando la cátedra lo provee.

### Prácticos definidos por la guía
La guía `MaterialPractico/GuiaDeTrabajosPracticosEvaluables.pdf` es la fuente para el listado, tipo y unidad de cada práctico. Los que requieren carpeta de entrega son:

| Práctico | Tema | Unidad indicada en la guía | Estado |
|---|---|---|---|
| TP 4 | SCM - Herramientas de SCM | Unidad 3 | Evaluable |
| TP 5 | SCM - Uso del Repositorio | Unidad 3 | Evaluable |
| TP 6 | TDD | Unidad 4 | Evaluable |
| TP 7 | SCRUM - Ejercicio de aplicación | Unidad 2 | Evaluable |
| TP 10 | KANBAN - Ejercicio de aplicación | Unidad 4 | Evaluable |
| TP 11 | SCRUM - Dinámica de Retrospectiva | Unidad 2 | Evaluable |
| TP 12 | Design Thinking - Publicidad de Instagram | Unidad 2 | Evaluable |
| TP 13 | SCRUM - Planificación de Release y de Sprint | Unidad 3 | Evaluable, recuperatorio |

Los TP 1, 2, 3, 8 y 9 son actividades prácticas sin entrega ni nota, según la guía; por eso no tienen carpeta propia dentro de `TrabajosPracticos/`. Se conservan sus consignas en la guía compartida. Las carpetas de los evaluables se ubican en la unidad indicada en la tabla, aunque la numeración del TP no coincida con la unidad.

`MaterialPractico/` reúne recursos de consulta compartidos que apoyan actividades prácticas (guías, casos y lineamientos generales). Por ese carácter transversal, los lineamientos para los trabajos de investigación grupal se conservan allí; las entregas de esos trabajos se organizan por separado en `TrabajosDeInvestigacion/`.

En `Examenes/`, `Finales/` y `Resumenes/` son carpetas hermanas: la primera reserva los exámenes finales y la segunda contiene los resúmenes, separados por tipo de examen. Los ejemplos de parciales permanecen en `Parciales/Parcial<N>/Ejemplos/`.

## Línea Base 
### Criterio de creación
La línea base se establecerá una vez que el entregable haya sido presentado, evaluado por el equipo docente y, en caso de corresponder, corregido y aprobado por el equipo de trabajo.
### Identificación
Las líneas base se identificarán con la siguiente etiqueta: `LineaBase_G12_<DD-MM-YYYY>`. Se usan guiones en la fecha para evitar caracteres especiales en el nombre del tag.
### Historial de cambios
| **Línea Base** | **Fecha**   | **Descripción** |
|----------------|-------------|-----------------|
| `LineaBase_G12_23-09-2026` | 23/09/2026 | Entrega TP SCM. Estructura del repositorio actualizada según el feedback docente. |

## Items de Configuración 
### Reglas de Nombrado y Ubicaciones
| Nombre del ítem de configuración | Regla de nombrado | Ubicación física | Tipo de ítem |
|---|---|---|---|
| Programa de la asignatura | `Programa_<Año>.pdf` | `/ICS/DocumentosDeCatedra/` | Cátedra |
| Material Bibliográfico | `Bibliografia_<Tema>_<NombreLibro>_<Autores>.pdf` | `/ICS/MaterialBibliografico/<Tema>/` | Material de Referencia |
| Lineamientos y Plan de Configuración | `README.md` | `/ICS/` | Gestión |
| Cronograma | `Cronograma_<Año>.pdf` | `/ICS/DocumentosDeCatedra/` | Cátedra |
| Carpeta de Trabajo Práctico | `TP_N<Número>_<Tema>_<Evaluable/NoEvaluable>/` | `/ICS/Unidades/Unidad<Número>/Practico/TrabajosPracticos/` | Trabajo práctico |
| Trabajos de Investigación | `TrabajoDeInvestigacion_TP_N<Número>_<Tema>_<Grupo>.<ext>` | `/ICS/TrabajosDeInvestigacion/` | Entregable |
| Presentaciones de clase | `Presentacion_<Tema>.pdf` | `/ICS/Unidades/Unidad<Número>/Presentaciones/` | Material de Referencia |
| Apuntes de alumnos | `Apunte_<TemaDeClase>_<FechaDeClase>_<Autor>.pdf` | `/ICS/Unidades/Unidad<Número>/Apuntes/` | Apunte de clase |
| Presentación de la asignatura | `Presentacion_<Año>.pdf` | `/ICS/DocumentosDeCatedra/` | Cátedra |
| Clases grabadas | `ClaseGrabada_<Tema>_<Curso>_<Año>[_<Numero>].txt` | `/ICS/ClasesGrabadas/` | Material de Referencia |
| Lineamientos para trabajos de investigación grupal | `LineamientosParaTrabajosDeInvestigaciónGrupal.pdf` | `/ICS/MaterialPractico/` | Material de Referencia |
| Guía de Trabajos Prácticos Evaluables | `GuiaDeTrabajosPracticosEvaluables.pdf` | `/ICS/MaterialPractico/` | Material de Referencia |
| Guía de Ejercicios Prácticos Resueltos | `GuiaDeEjerciciosPracticosResueltos.pdf` | `/ICS/MaterialPractico/` | Material de Referencia |
| Información de parciales | `InformacionDeParciales.pdf` | `/ICS/DocumentosDeCatedra/` | Cátedra |
| Ejemplos de parciales | `EjemploParcial<Numero>_<Fecha>.pdf` | `/ICS/Examenes/Parciales/Parcial<Numero>/Ejemplos/` | Material de Referencia |
| Resumen de parcial | `ResumenParcial<Numero>_<Autor>_<Año>.pdf` | `/ICS/Examenes/Resumenes/Parcial<Numero>/` | Material de Referencia |
| Resumen de final | `ResumenFinal_<Autor>_<Año>.pdf` | `/ICS/Examenes/Resumenes/Finales/` | Material de Referencia |
| Casos de estudio | `Caso_<Nombre>.pdf` | `/ICS/MaterialPractico/` | Material de Referencia |
### Glosario
| Siglas     | Significado                            |
|------------|----------------------------------------|
| ICS        | Ingeniería y Calidad de Software       |
| TIG        | Trabajo de Investigación Grupal        |
| IC         | Ítem de Configuración                  |
| TP         | Trabajo Práctico                       |
| SCM        | Software Configuration Management      |
| TDD        | Test Driven Development                |
| DD/MM/YYYY | Formato de fecha Dia/Mes/Año           |

### Decisiones tomadas por el Grupo
* Nombres de items de configuración en UpperCamelCase. Para separación de entidades/tópico se usa guion bajo (ej: NombreLibro_NombreAutor)
* Las carpetas de unidades y prácticos se crean cuando existe material o una actividad asignada; no se generan estructuras vacías para unidades sin prácticos.
* Si un Trabajo Práctico abarca varias unidades, se ubica en la última unidad que abarca.
* Cada carpeta de Trabajo Práctico se identifica con su número, tema y tipo indicado en la consigna (por ejemplo, Evaluable, NoEvaluable o Entregable).
* Evitar el uso de tildes o caracteres especiales en nombres de archivos y directorios para garantizar la compatibilidad con herramientas de consola, scripts y sistemas de codificación.

### Clases grabadas
Se mantiene un archivo `.txt` por cada clase grabada y cada archivo contiene el título de la clase y un único enlace al video. Si hay más de una grabación del mismo tema, curso y año, se agrega un número correlativo al nombre (`_1`, `_2`, etc.) para evitar colisiones. No se agrupan varios enlaces en un mismo archivo.

## Estructura interna de Trabajos Prácticos

Todos los Trabajos Prácticos que sean del tipo Evaluable, deberán contar con la siguiente estructura, en caso de que no se necesite alguna de las carpetas, deberá conservarse para mantener consistencia
* ***Enunciado/*** : Consigna y material base del TP
* ***Produccion/*** : Material de trabajo del grupo previo a la entrega
* ***Produccion/Codigo/*** : Si el TP incluye código, deberá incluirse aqui
* ***Entrega/*** : Versión final del TP entregada
* ***Retroalimentacion/*** : Devoluciones o correcciones devueltas
