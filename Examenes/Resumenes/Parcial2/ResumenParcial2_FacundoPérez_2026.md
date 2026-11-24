
### Filosofía Lean
Es un marco mental y de gestión enfocado en **reducir o eliminar el desperdicio y concentrarse estrictamente en lo esencial** para optimizar el valor real entregado al cliente

Principios:

1. Eliminar Desperdicios: Todo lo que no genera valor
2. Amplificar Aprendizaje: Conocimiento individual a organizacional
3. Embeber la Integridad conceptual: Atención continua a la excelencia tecnica, la calidad NO se negocia
4. Diferir compromisos: Información para la toma de decisiones
5. Dar poder al equipo: Personas autogestionadas, en condiciones de hacerse cargo
6. Ver el todo
7. Entregar lo antes posible

Gastos en producción Lean:

![[Pasted image 20261028101021.png]]

#### Tipos de desperdicios

1. Desperdicio necesario: minimizar porque no se puede eliminar del todo
2. Puro desperdicio:
   ![[Pasted image 20261028101132.png]]


### Kanban

Método basado en la mejora continua, busca gestionar la creación y entrega de productos
Método para definir, gestionar y mejorar servicios que entregan trabajo del conocimiento, trabajo donde intervenga el diseño tanto de software como físicos (kanban = tarjetas de visualización)

GESTIONA FLUJOS, no PROYECTOS

#### Valores
- Transparencia
- Equilibrio
- Colaboración
- Foco en el cliente
- Flujo
- Liderazgo
- Entendimiento

#### Principios

###### Gestión de cambios:
- Comenzar con lo que haces ahora -> Mejora la resistencia al cambio
		Entender los procesos actuales
		Respetar los roles actuales y responsabilidades de cada rol
		Proponer cambios evolucionarios
- Acordar la búsqueda de la mejora a través del cambio evolutivo
- Fomentar actos de liderazgo a todos los niveles

###### Entrega de servicios
- Comprender y enfocarse en cumplir las necesidades y expectativas
- Gestionar el trabajo; dejar que los trabajadores se auto organicen entorno a él
- Revisar periódicamente la red de servicios y su política para mejorar los resultados

#### Prácticas generales de Kanban

![[Pasted image 20261028103924.png]]

**Visualizar**
- Permite absorber y procesar una gran cantidad de info en un corto intervalo de tiempo
- Habilita la cooperación, ya que todo el mundo tiene la misma imagen
- Permite tomar decisiones de una manera mas rápida
- En el proceso actual se buscar generar columnas dentro del tablero
- Se busca dividir el trabajo en piezas que permita visualizarlo

**Limitar el trabajo en curso**
- Los sistemas eficaces son los que centran el flujo de trabajo y menos en tener ocupados a los trabajadores
- Cuando los recursos están ocupados completamente, no hay holgura en el sistema
- Limitar el trabajo en proceso provoca conversación y mejora
- Limitamos el trabajo en proceso para equilibrar ocupación y asegurar el flujo de trabajo
- Asignar límites explícitos en cuántos ítems pueden haber en progreso en cada estado del flujo de trabajo por cola

**Gestionar el flujo de trabajo**
- El objetivo es poder terminar el trabajo de la forma mas fluida y predecible posible
- Limitar el trabajo en curso asegurando un flujo suave y predictivo
- El seguimiento y medición del flujo da como resultado info valiosa para la gestión

**Definir tipos de trabajos**
- Requerimientos
- Defectos
- Desarrollo
- Solicitudes

**Hacer explícitas las políticas**
- Todas las políticas deben ser acordadas entre todas las partes
- Las políticas deben estar expuesta en un lugar destacado
- A nivel equipo, los acuerdos son una buena forma de introducirlas
- Deben ser:
		Pocas
		Sencillas
		Bien definidas
		Visibles
		Aplicables

**Políticas explícitas para cada clase de servicio**
![[Pasted image 20261028105733.png]]

¿Cómo aplicar Kanban? 
**Proceso**: modelar nuestro proceso. 
**Trabajo** : decidir la unidad de trabajo. 
**Límites de WIP**: limitar el WIP para ayudar al flujo de trabajo. 
**Política**: definir políticas de calidad. 
**Cuellos de Botella y Flujo**: mover recursos a los cuellos de botella. 
**Clase de Servicio**: diferentes trabajos tienen diferentes políticas – definición de hecho (“done”), para cada estado. 
**Cadencia**: Releases, planificaciones, revisiones

![[Pasted image 20261028105913.png]]![[Pasted image 20261028105920.png]]

### Métricas de software

Se divide en:

- Métricas de proceso: evaluar la salud de mi proceso
- Métricas de proyecto: Fundamental para jugar con la triple restricción
- Métricas de producto
  
**Métricas básicas para un proyecto de software**
En gestión tradicional:
1. Tamaño del producto: cant de CU, HU, cant. de lineas de código
2. Esfuerzo: Horas lineales en una determinada actividad
3. Tiempo: Cant. de recursos disponibles para ejecutar actividades, que actividades en paralelo y que secuenciales
4. Defectos

**Características de métricas tradicionales:**
1. **Periodicidad**: En un proyecto con un horizonte largo, no tiene sentido tener métricas muy frecuentes, se debe buscar periodicidad:
	   Si la métricas siempre da lo mismo, no nos da un valor agregado
	   Ítem clave es conseguir definir métricas que nos den valor agregado
	Nos permiten balancear la triple restricción
	![[Pasted image 20261028124028.png]]


##### Métricas en ambientes ágiles
Para procesos empíricos
La medición es una SALIDA, no una actividad

La filosofía minimalista sobre las métricas en agile es: Medir lo que sea necesario
2 principios ágiles fundamentales:
1. Mayor prioridad es satisfacer al cliente por medio de entregar tempranas y continuas con software valioso, funcionando
2. El software funcionando es la principal medida de progreso

###### Velocidad
La métrica fundamental acá es la VELOCIDAD, los SP quemados y aceptados por el PO

![[Pasted image 20261028124728.png]]

###### Capacidad
Sirve para estimar cuantos SP voy a ser capaz de quemar en el próximo sprint, si no tenemos esa info todavia, sera en base a horas
Se calcula en la planning para saber cuanto trabajo tomar en el mismo
![[Pasted image 20261028124911.png]]

###### Running Tested Features (RTF)
Podemos observar una medida de progreso, pero no nos determina cuanto es el software funcionando que estamos entregando, no es tan utilizada por eso y se calcula al final de cada iteración en la review, según características aprobadas y aceptadas por el PO

### Métricas en Kanban

Trabaja con procesos empíricos pero con enfoque LEAN

###### Lead Time
Es la vista del cliente
- Tiempo desde que el usuario solicita una característica y es entregada efectivamente
- Métrica que registra el tiempo que sucede entre el momento en el cual se está pidiendo un ítem de trabajo y el momento de su entrega, se mide en días de trabajo
- Ritmo de entrega

###### Cycle Time
Interno para el equipo
- Empieza a contar desde que se empieza a trabajar efectivamente en una tarjeta hasta terminarla
- Métrica que registra el tiempo que sucede entre el inicio y el final del proceso
- Se suele medir en días de trabajo o esfuerzo
- Medición más mecánica de la capacidad del proceso
- Ritmo de terminación

###### Touch Time
El tiempo en el cual un ítem de trabajo realmente fue trabajado por el equipo
Cuantos días hábiles pasó este ítem en columnas de "trabajo en curso", en oposición con columnas de cola y estado bloqueado o sin trabajo del equipo en el mismo

###### Eficiencia del Ciclo de proceso
% Eficiencia ciclo proceso = Touch time / Lead time
A mas cerca está el Lead time del touch time , quiere decir que soy más eficiente, en cuanto al trabajo que fluye y tomar una pieza de trabajo que llega

###### Métricas orientadas a servicio
En Kanban buscamos medir en base al servicio que brindamos
Nos permite gestionar en el servicio que ofrecemos:
- Expectativa de nivel de servicio que los clientes esperan
- Capacidad del nivel de servicio al que el sistema puede entregar
- Acuerdo de nivel de servicio que es acordado con el cliente
- Umbral de la adecuación del servicio el nivel por debajo del cual este es inaceptable

#### Métricas en cada enfoque

![[Pasted image 20261028130259.png]]


#### Métricas del Producto de Software

![[Pasted image 20261028172009.png]]

###### Conceptos transversales a todas las métricas
- Las métricas no sirven para medir personas o utilidad.
- Nos sirve para mejorar la forma en la que trabajamos
  

### Prácticas Continuas

###### Integración continua
Práctica de desarrollo que promueve que los desarrolladores adopten la costumbre de integrar su código a un repo compartido varias veces al día.
- Cada integración luego es verificada por una serie de pruebas automatizadas, permitiendo al equipo detectar problemas de manera temprana
- Busca asegurar que el software pueda ser desplegado en cualquier momento, o sea, que compile y sea de calidad
- Cada desarrollador en su entorno de trabajo realiza pruebas unitarias, desarrollando con TDD
- Al finalizar el desarrollo del componente y haber sido probado, sube el componente al repo de integración
![[Pasted image 20261028172853.png]]

###### Entrega continua
Disciplina de desarrollo en la que el software se construye de tal manera que puede ser liberado en producción en cualquier momento
- Suma la automatización de pruebas de aceptación
- No implica que se libere cada vez
- La integración continua es un prerrequisito para la entrega continua
- Hay que asegurarse de tener un despliegue automatizado
- El software siempre debe estar en estado de "entregable"

![[Pasted image 20261028173118.png]]

###### Despliegue continuo
Consiste en desplegar el producto de forma automatizada
- A diferencia de la entrega continua, acá no existe la intervención humana para desplegar el producto en producción
- Se utilizan pipelines que contienen una serie de pasos que deben ejecutarse en un orden determinado para que la instalación sea satisfactoria
![[Pasted image 20261028173238.png]]

###### Canary Desployment
Práctica de realizar lanzamiento por etapas, primero se implementan los cambios para una pequeña parte de los usuarios para ver su validación
Al tener la aceptación, se extiende al resto de los mismos

###### Blue-Green deployment
Modelo de lanzamiento de aplicaciones que transfiere gradualmente el tráfico de usuarios de una versión anterior de una aplicación a una nueva casi idéntica
Versión anterior - Entorno azul
Versión nueva - Entorno verde

### Calidad de producto

La calidad del software se puede enfocar en el producto, el proceso y el proyecto

###### Técnicas y Herramientas
- Para el proyecto: revisiones técnicas y auditorías.
- Para el producto:
		Aseguramiento de calidad: revisiones técnicas y auditorías
		Control de calidad: testing

**Revisiones de calidad:**
Son el principal método para validad la calidad de un proceso o producto
Un grupo examina el producto o proceso para encontrar problemas
Tipos: Inspecciones, revisiones de progreso, revisiones de calidad

###### Puntos claves
La calidad del software se puede analizar desde la perspectiva del proceso y del producto
La calidad del software es difícil de medir
El software como proceso es el fundamento para mejorar la calidad
Trabajar con calidad es más barato que hacerlo sin calidad
La mejora de procesos ha demostrado retornos de inversión sustanciales.

### Testing en Ambientes Ágiles
###### Manifiesto del Testing Ágil
El testing ágil se basa en un cambio de mentalidad, resumido en 5 valores:
1. Pruebas "durante" sobre pruebas "al final"
	   En lugar de ser una fase final, el testing es una actividad continua en paralelo al desarrollo
2. Prevenir defectos sobre encontrar defectos
	   El enfoque se mueve de la simple detección de bugs a un involucramiento temprano para evitar que se introduzcan
3. Entender lo que se está probando sobre verificar funcionalidad
		No se trata solo de marcar ítems en una checklist, si no de comprender el proposito del negocio y las necesidades del usuario
4. Construir un mejor sistema sobre romper el sistema
		El objetivo del tester es colaborar activamente para ayudar a construir el mejor producto posible
5. Responsabilidad de todo el equipo por la calidad sobre el tester es responsable de la calidad
	   La calidad deja de ser la responsabilidad de una sola persona y se convierte en una compartida por todo el equipo
	   
#### Enfoque tradicional vs Enfoque Ágil

###### Tradicional (Cascada)
- Secuencial: Fases ocurren una despues de la otra
- Testing como fase: es una fase separada después del desarrollo
- Ciclos largos: Los ciclos de feedback son muy largos

###### Enfoque Ágil
- Iterativo e incremental: El ciclo se repite en iteraciones cortas
- Testing como actividad: Esta integrada durante toda la iteración
- Ciclos cortos: feedback rápido y constante

#### Principios y Prácticas del testing ágil
9 principios claves:
1. Testing se mueve hacia adelante en el proyecto
2. Testing no es una fase
3. Todos hacen testing
4. Reducir la latencia del feedback
5. Las pruebas representan expectativas (CA)
6. Mantener el código limpio, corregir defectos rápido
7. Reducir la sobrecarga de documentación de las pruebas
8. Las pruebas son parte del "Done"
9. Se pasa de "probar al final" a un enfoque "conducido por pruebas"

6 Practicas concretas

1. TDD (Test Driven Development): desarrollo conducido por pruebas unitarias.
2. ATDD (Acceptance Test Driven Development): desarrollo conducido por PA
3. Pruebas de unidad e integración automatizadas
4. Pruebas de regresión a nivel de sistema automatizadas
5. Pruebas exploratorias: pruebas manuales creativas y de aprendizaje para descubrir lo inesperado
6. Control de versión de las pruebas junto con el código

#### ATDD (Desarrollo conducido por PA)
Es un ciclo de colaboración, inicia con una feature, se define una HU, se generan pruebas de aceptación de alto nivel, estas pruebas guían la corrección de defectos y la automatización de las pruebas
Se realizan pruebas exploratorias para validar, y finalmente se logra la aceptación de la historia

#### El rol del Tester Ágil
Es un colaborador activo que ayuda a:

- PO
  En la preparación y revisión de historias
  En la definición de CA
  A entender mejor el negocio
  
- Developers
  En la definición de estrategias de prueba
  En la automatización de pruebas (ATDD)
  Dando feedback temprano sobre las HU
  Sugiriendo mejoras de usabilidad
  
- System Team
  En la preparación y mantenimiento del Ambiente de pruebas
  Validando el "done" de las HU
  En la aceptación final de la historia con el PO
  Generando métricas de calidad. 

#### Cuadrantes del testing ágil
Modelo para clasificar pruebas y asegurar una cobertura completa. se divide en 4

###### Q1(Orientado a tecnologia/apoya al equipo): pruebas automatizadas
Pruebas unitarias
Pruebas de componente

###### Q2(Orientado a negocio/ apoya al equipo): pruebas automatizadas y manuales
Pruebas funcionales
Pruebas de Historias
Prototipos y simulaciones

###### Q3(Orientado a negocio/critica al producto): pruebas manuales
Pruebas exploratorias
Pruebas de usabilidad
UAT(User Acceptance Testing)
Pruebas alpha/beta

###### Q4(Orientado a tecnología/critica al producto): pruebas con herramientas
Pruebas de performance y carga
Pruebas de segurdiad
Pruebas de disponibilidad, escalabilidad, etc


### La pirámide del testing
###### Pirámide tradicional
- Foco: busqueda de bugs
- Base pequeña: pocas pruebas unitarias (1-5%)
- Medio: Pruebas de integración (5-15%)
- Cima grande: Muchas pruebas de GUI/End-to-End(80-90%)
- Problema: lentas, frágiles y costosas de mantener
  
###### Pirámide Ágil
- Foco: Prevención de bugs
- Base grande: Muchas pruebas unitarias (80-90%). Son rápidas y estables.
- Medio: Pruebas de servicio/aceptación/API (5-15%)
- Cima pequeña: Pocas Pruebas de GUI(1-5%). solo para flujos críticos
- Capa superior: Pruebas manuales / exploratorias

#### Automatización del testing
La automatización es clave en agilidad y ofrece múltiples beneficios:
- Ejecución rápida
- Reusabilidad de los scripts
- Mayor cobertura de pruebas
- Mayor precisión
- Mayor alcance
- Reducción de costos a largo plazo

### Testing de Software
###### Conceptos fundamentales de testing
Que es?
Es una actividad de control que intenta detectar defectos en el software, los cuales se asumen como presentes siempre, un testing exitoso es aquel que encuentra defectos
El testing no asegura calidad, sino que evidencia defectos. Es imposible asegurar la calidad total mediante testing
Que sea una actividad de control significa que realiza una comparación contra algo (requerimientos, especificaciones) y requiere el nivel de detalle más fino posible.

**Cuanto testing es suficiente?**
El testing exhaustivo es impracticable, un sistema de 20 pantallas, menus opciones y campos podria requerir 240.000 casos de prueba, y si cada una toma 10 minutos, llevaria 13.7 años.
Por esto, se deben usar métodos y estrategias para seleccionar la menor cantidad de pruebas que cubran la mayor cantidad de funcionalidades

###### Error vs defecto vs falla
- Error: Se detecta y se corrige en la misma etapa donde se introdujo
- Defecto: se traslada de etapa
- Falla: mal funcionamiento del sistema visible por el usuario

#### Proceso del testing
**Testing metodológico**
Se basa en un proceso estructurado.
1. Planificación y control
2. Análisis y diseño
   Artefactos:
		Plan de prueba: documento que guía el esfuerzo de testing
		Caso de prueba: Se crean o diseñan a partir de los escenarios identificados en las HU. paso a paso detallado que describe un escenario específico
		Contenido del caso de prueba:
			Seteo
			Escenario
			Resultado esperado
3. Ejecución: correr casos de prueba diseñados
4. Evaluación y reportes: documentar los defectos encontrados

Ciclo de ejecución: contempla los pasos de ejecución y seguimiento. Esto representa el 50% del proceso. El otro 50% es la planificación y diseño, que no forma parte del ciclo de ejecución.

Testing Ad Hoc: Testing fuerza bruta o sin un plan, su principal problema es que es difícil reproducir un defecto encontrado, ya que no se siguieron pasos predefinidos.

#### Niveles de prueba

1. Prueba unitaria: Hechas por el desarrollador
2. Prueba de integración: Se enfoca en la interacción entre componentes o módulos. Lo hace testing
3. Pruebas de sistema: se prueba el sistema como un todo, de forma integral. lo hace testing
4. Pruebas UAT: Se valida que el software cumple con las necesidades del usuario. se lleva a cabo en el despliegue

#### Entornos
- Desarrollo: donde los desarrolladores realizan pruebas unitarias
- Prueba: Donde se realizan pruebas de integración y de sistema
- Pre-producción: Donde se realizan las pruebas de UAT
- Producción: Ambiente real del cliente

### Estrategias de caja negra
Se centran en probar la funcionalidad basándose en las especificaciones, sin mirar el código interno, se dividen en dos grandes grupos

#### 1. Técnica basadas en especificaciones
**A. Partición de equivalencias:**
Divide todos los datos de entrada posibles en "clases de equivalencia". Se asume que si un valor de una clase funciona, todos los valores de esa clase funcionarán
2 pasos: Identificar las clases de equivalencia válidas y no válidas, e identificar los casos de prueba (1 por cada clase identificada)

Tipos de clase a identificar:
- Rango de valores continuos (edad 18-65)
- Valores discretos (0,1,2,3,4,5,6)
- Selección simple ("Rojo","Verde")
- Selección múltiple (tildar varias opciones)
  
**B. Análisis de valores límites**
Es una variante de la partición de equivalencias. en lugar de tomar cualquier valor de la clase, se seleccionan los bordes de cada clase
La experiencia demuestra que los errores ocurren con mayor frecuencia en los límites de las clases.

#### 2. Técnicas basadas en la experiencia
**A. Adivinanza de defectos**
El tester usa su experiencia, intuición y conocimiento del sistema para "adivinar" donde es probable que haya errores.

**B. Testing exploratorio**
Es un testing simultáneo de aprendizaje, diseño de pruebas y ejecución.
No se parte de casos de prueba detallados, sino de una "misión" o "charter"
El tester explora la aplicación y va documentando lo que encuentra.

#### Tipos de pruebas (funcional y no funcional)
A Nivel Funcional 
Requerimientos de Negocio 
Funcionalidad: 
	Operación normal (caminos felices). 
	Tests Negativos (qué pasa si falla). 
Documentación: (Ej. Manual de Usuario).

A Nivel No Funcional 
Prueba de Estrés: Utilizar a la máxima capacidad comprometida (y superarla) para ver cómo responde el hardware/software. 
Prueba de Escala Completa: Se lleva a la máxima capacidad, pero sin exigir más. 
Pruebas de Interfaces 
Pruebas de Seguridad 
Pruebas de Volumen de Datos

Otros Tipos 
Smoke Test: Prueba rápida y superficial para verificar que las funcionalidades principales del sistema funcionan (ej. "enciende"). Se hace antes de aceptar una nueva versión para pruebas más profundas. 
Exploratorias: (Ver sección de Caja Negra).

#### Gestión de defectos (severidad vs prioridad)
**Severidad**: Lo define el equipo de testing
Mide el impacto técnico del defecto en el sistema
	Bloqueante: Impide continuar pruebas
	Grave: Funcionalidad principal no opera
	Leve: Funcionalidad secundaria no opera
	Cosmética: Error visual, de texto, etc

**Prioridad**: Lo define el cliente (o PO en scrum)
Mide la urgencia de negocio para corregir el defecto
Urgente, media o baja.

El equipo de desarrollo priorizará qué corregir basándose en una combinación de la Severidad (definida por QA) y la Prioridad (definida por el Negocio).

### Revisiones Técnicas

###### Verificación y validación
Es un proceso que dura todo el ciclo de vida, desde la revisión de requisitos hasta las pruebas.
Validación: Estamos construyendo el producto correcto?
Verificación: Estamos construyendo el producto correctamente?

Las Revisiones Técnicas son un proceso de V&V estático (no se ejecuta el código). Su objetivo principal es detectar y corregir defectos en etapas tempranas. 
Ventajas: 
- Se pueden descubrir muchos errores. 
- Se pueden inspeccionar versiones incompletas del producto.
- Se pueden considerar otros atributos de calidad (mantenibilidad, claridad). 
Desventajas: 
- Requieren tiempo para organizarse. 
- Pueden parecer que ralentizan el proceso al inicio. 
- Implican costos de entrenamiento e infraestructura.

###### Tipos de revisiones
Destacan dos:
**Walkthoughs**
Capacitar desarrolladores, obtener un retorno rápido
Atributos: es un proceso informal, poca preparación, no se toman métricas y el autor dirige la sesión y los participantes hacen preguntas.

**Inspecciones**
Detectar y remover todos los defectos de forma eficiente
Atributos: Proceso formal y controlado, requiere preparación individual, se usan checklist y se miden métricas (esfuerzo por defecto)

###### El Proceso de Inspección Formal 
La inspección es una actividad clave de garantía de calidad.
Qué SÍ es: La forma más barata y efectiva de encontrar fallas, una forma de proveer métricas, promover el trabajo en grupo y mejorar la calidad. 
Qué NO es: Una reunión para encontrar soluciones, una evaluación del desempeño del autor, o una reunión para aprobar un producto.

**Roles Clave**
Autor: Creador del producto a inspeccionar. 
Moderador: Lidera y planifica la revisión (rol clave). 
Anotador: Registra los hallazgos. Lector: Lee el producto durante la reunión. 
Inspector: Examina el producto antes de la reunión para encontrar defectos.

**Pasos del Proceso de Inspección** 
1. Planificación: Elegir equipo, preparar material y calendario. 
2. Visión General: (Opcional) Presentar el proceso y el producto. 
3. Preparación: Análisis individual para encontrar potenciales defectos (crucial). 
4. Reunión de Inspección: Análisis en equipo para recolectar defectos. (Máximo 2 horas). 
5. Corrección: El autor corrige los defectos encontrados. 
6. Seguimiento: El moderador verifica las correcciones y recolecta los datos (métricas).

**Puntos Clave para una Buena Revisión** 
Revisar al producto, no al productor. 
Fijar una agenda y cumplirla. 
Limitar el debate: solo se enuncian los problemas, no se buscan soluciones en la reunión.
Tomar notas escritas. 
Limitar el número de participantes e insistir en la preparación previa.
###### Costo de las fallas
El costo de reparar una falla (defecto) crece exponencialmente a medida que avanza el proyecto. 
Una falla que cuesta '1' en Requerimientos, puede costar '10' en Prueba de Integración y '100' después del Release (lanzamiento). 
El "retrabajo evitable" puede consumir entre el 40-50% del costo total de desarrollo.

