### SOFTWARE

No es solo código, es un set de programas y la documentación que lo acompaña, con saber programar no se alcanza para saber hacer software

**Tipos:**

| System software        | Se encarga de controlar y gestionar los recursos del hardware de una computadora                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Utilitarios            | Proporciona utilidades o herramientas para mejorar la funcionalidad del SO y el rendimiento de la pc                     |
| Software de aplicación | Se utiliza para realizar tareas específicas en una computadora, se enfoca en satisfacer las necesidades de los usuarios. |
#### El software es DIFERENTE a la manufactura
No hay manera de comparar software con una línea de producción, ya que:
- El software es menos predecible
- Ningún producto de software es igual a otro, cambian los requerimientos, las necesidades
- El software NO SE GASTA pero si DEBE ADAPTARSE
- El software no esta gobernado por leyes de la física.

Estas razones están ligadas a la intangibilidad del software como producto.

#### Principales problemas al desarrollar software

- MAS TIEMPOS Y COSTOS QUE LOS PRESUPUESTADOS
- QUE LA VERSIÓN FINAL DEL PRODUCTO NO SATISFAGA LAS NECESIDADES DEL CLIENTE
- PROBLEMAS DE ESCALABILIDAD Y ADAPTIBILIDAD DEL SOFTWARE
- ==MALA DOCUMENTACIÓN==
- ==MALA CALIDAD DEL SOFTWARE==

A continuación, las razones por las que el software termina siendo exitoso
![[Pasted image 20260922171811.png]]
![[Pasted image 20260922171912.png]]

Y planteado esto, podríamos decir que el software NO es exitoso o resulta en costos más elevados cuando hacemos lo contrario a lo planteado de las razones de éxito.

### EL PROCESO DE SOFTWARE

![[Pasted image 20260922173140.png]]Un proceso de software se define como un conjunto ESTRUCTURADO de actividades que, a raiz de un conjunto de entradas, producen una salida.
El objetivo de este siempre va a ser obtener un producto o servicio de software a partir de distintos inputs. El principal capital/recurso del proceso de software son las PERSONAS en sí. 
Según **CMM**: Un proceso de software es un conjunto de actividades, metodos, practicas y transformaciones que la gente usa para desarrollar o mantener software y sus productos asociados.
Dentro de esta definición, tenemos mas conceptos para vincular:
1. Procedimientos y métodos: Definición de como vamos a llevar a cabo las actividades de desarrollo
2. Personas: con habilidades, entrenamiento y motivación
3. Herramientas y equipos.
![[Pasted image 20260922174023.png]]
Ahora, desglosando los tipos de procesos, tenemos:
#### PROCESO DEFINIDO
Se basan en una concepción basada en el modelo industrial (líneas de producción), en la cual tengo un conjunto de inputs que van a ser utilizados en un conjunto de actividades, que van a producir el mismo resultado siempre que los inputs sean los mismo.
Esto es difícilmente aplicable al software, ya que no es definible.
No podemos simplificar el software a una entrada de inputs que siendo utilizado para determinadas aplicaciones produce el mismo output, dándole predictibilidad al output

#### PROCESO EMPIRICO
Proviene del empirismo, corriente la cual centramos el foco en la experiencia. No hablamos solo de experiencia del usuario, sino también la experiencia en el negocio, en la experiencia técnica, como manipular herramientas y aprender de errores.
Nos basamos en capitalizar la experiencia de los actores involucrados en la producción para maximizar la calidad de lo que estamos produciendo.
Las variables no pueden ser definidas o controladas en su totalidad, nos situamos en un ambiente complejo con la necesidad de **adaptación**. Se basan en la experiencia y el aprendizaje
Para conocer un proceso empírico, seguimos un patrón:
Empezamos con una **hipótesis** (ASUMIR), empezamos la etapa de construcción (CONSTRUIR), sacamos información y haciendo retrospectiva (RETROALIMENTAR) revisamos (REVISAR) el resultado de la construcción y contrastando la hipótesis inicial, podemos ir adaptando el proceso y seguir construyéndolo (ADAPTAR)
Esto se basa en una concepción que necesita repetición, por eso en los procesos empíricos damos uso a un **ciclo de vida** (iterativo e incremental)

#### CICLOS DE VIDA
El ciclo de vida es una abstracción. Me define cuáles son las etapas y el orden de cada una de ellas.
El ciclo de vida de un proyecto de software es una representación de un proceso, este termina cuando genera un producto, cuyo ciclo de vida no termina, sino que se mantiene mientras el objeto exista. Existen 3 ciclos de vida básicos:
- __SECUENCIAL__: Basada en ejecutar una etapa después de otra sin retorno
- **ITERATIVO/INCREMENTAL** : Los procesos empíricos implementan este tipo de ciclo de vida para poder dar la característica de adaptación, esto permite que en cada una de las iteraciones capitalicemos lo aprendido, mejoremos la experiencia del equipo y realicemos otra iteración para incrementar el producto
- **RECURSIVO**: Se utiliza para casos particulares como proyectos de alto riesgo.

El PROCESO es una implementación del CICLO DE VIDA que tiene como objetivo que lo guía, que es la creación de un PRODUCTO. entonces;
El ciclo de vida es una abstracción sobre etapas y orden de un proyecto, mientras que el proceso es la implementación de ese ciclo de vida con el objetivo de crear un producto.

#### COMPONENTES DE UN PROYECTO DE DESARROLLO DE SOFTWARE

![[Pasted image 20260923105114.png]]
Se suele decir que el proyecto es una instanciación del proceso definida en un ciclo de vida
Un PROYECTO es llevado a cabo por PERSONAS que implementan HERRAMIENTAS para automatizar los PROCESOS y que obtiene como resultado un PRODUCTO.
El ==proceso== es una plantilla, una definición abstracta que se materializa a través de los proyectos, en donde se adapta a las necesidades concretas del mismo.
Los procesos toman como entrada requerimientos y a través de un conjunto estructurado de actividades obtienen como salida un producto o servicio de software.
El ==proyecto== es la unidad organizativa y necesita de personas, recursos y procesos para poder existir.
Un proyecto de software tiene que cumplir con ciertas características:
1. Duración limitada: son temporales, cuando se alcanza el objetivo, el proyecto termina.
2. Orientado a un objetivo: tengo que poder definir hacia donde voy y poder medir cuanto alcance de ese objetivo, todos los proyectos tienen un objetivo único.
3. Son únicos: por similares que sean, tienen características que los hace únicos
4. Tiene tareas relacionadas entre si basadas en esfuerzo y recursos: Las tareas dependen una de otra, tienen precedencia y a su vez están asociados recursos y esfuerzos

Cuando trabajamos en un proyecto de un proceso definido lo llamamos:
#### GESTIÓN TRADICIONAL DE UN PROYECTO
Se basa en ejecutar las actividades definidas para lograr un objetivo.
La ADMINISTRACIÓN DE PROYECTOS es la aplicación de conocimientos, habilidades, herramientas y técnicas a las actividades del proyecto para satisfacer los requerimientos del proyecto

###### Triple restricción:
![[Pasted image 20260923111902.png]]
ALCANCE: Son los requerimientos que el cliente expresa, el objetivo, lo que quiero alcanzar.
TIEMPO: Tiempo que debería llevar a completar el proyecto
COSTO: En recursos y en dinero

Esta triple restricción es una de las bases de la gestión tradicional de proyectos, vamos a tener una suma de restricción de tiempo, de presupuesto y un alcance, la responsabilidad de balancear estos objetivos será del Project Manager
Estas variables están tan relacionadas entre si que si modifico una, voy a tener que hacer variar alguna de las otras, el balance de las mismas afecta a la calidad del proyecto, y debemos decir que ==la calidad del producto no es negociable==

![[Pasted image 20260923112600.png]]
Estos son los roles dentro de un proyecto en la gestión tradicional.
Hablemos del líder de proyecto: es quien se ocupa de todas las tareas de gestión que hacen que el equipo sea guiado a lograr el objetivo, es el encargado de administrar los recursos y hacer el seguimiento de la planificación verificando que todo vaya segun lo planeado.
En los procesos empíricos, el líder no es necesario ya que los proyectos se autogestionan.

#### PLAN DE PROYECTO
Es como una hoja de ruta, va a esbozar que es lo que va a hacer el proyecto, el alcance, el objetivo, que recursos vamos a tener, el tiempo en el que lo vamos a desarrollar, personas involucradas, etc
A través de este plan documentamos:
QUE ES LO QUE HACEMOS? (Alcance)
CUANDO LO HACEMOS? (Calendarización)
CÓMO LO HACEMOS? (Recursos y decisiones disponibles)
QUIEN LO VA A HACER? (Asignación de tareas)

La idea de este plan es que sea algo VIVO, que se vaya nutriendo a medida que el proyecto se lleva a cabo. Nos va a servir que siempre este en permanente actualización, ya que al desarrollar nos encontraremos con variaciones no estimadas durante el plan
Cuando hablamos de planificar el proyecto de software incluimos:
1. ==Definición del alcance==: 
   Hacemos la diferencia entre el proyecto y el producto
   **Alcance del proyecto:** TODO el trabajo y solo el trabajo que debe hacerse para entregar el producto o servicio con todas las características, el cumplimiento del alcance se mide contra el plan de proyecto.
   **Alcance del producto**: TODAS las características que pueden incluirse en un producto o servicio, se mide contra la especificación de requerimientos
   La relación que existe entre ambos es que para definir el alcance del proyecto debo primero definir el alcance del producto.
   
2. ==Definición de proceso y ciclo de vida==: 
   Cuando inicia el proyecto debo definir qué proceso quiero usar y que ciclo de vida utilizaré, el proceso de desarrollo es el conjunto de actividades, y el ciclo de vida es de que manera ejecuto esas actividades.
   
3. ==Estimación==:
   De qué manera podemos estimar todas las características necesarias para la planificación, lo haremos con un cierto nivel de incertidumbre, pero vamos a definir en orden las siguientes características:
   **TAMAÑO**: Definir el producto a construir
   **ESFUERZO**: Horas persona lineales
   **CALENDARIO**: Determinar qué días y que horas se va trabajar y cuantas personas lo harán.
   **COSTO**: Presupuesto necesario
   **RECURSOS CRÍTICOS**: Tanto humanos como físicos que nos hará falta.
   
   A medida que avanzo en el desarrollo, la incertidumbre se va achicando y voy teniendo mayores certezas.
   
4. ==Gestión de riesgos==
   Algo que podría suceder o no, pero si sucede compromete el éxito del proyecto.
   Debemos primero identificar los riesgos mas probables, ya que es imposible gestionar TODOS los riesgos, una vez identificados lo que hacemos es gestionarlos, generamos acciones para disminuir el impacto. Hay algunos riesgos donde no podemos incidir sobre la probabilidad de ocurrencia o sobre el impacto, debemos encontrar la manera de alivianarlos.
5. ==Asignación de recursos==
6. ==Programación de proyectos==
7. ==Definición de métricas==
   Nos permite darnos cuenta si nuestro proyecto está en línea con lo planificado o se esta desviando. Las métricas pueden clasificarse de acuerdo a su dominio en:
   **Métricas de proceso**: Nos permiten saber independientemente de un proyecto en particular, saber si como organización estamos trabajando bien o mal. Son las mismas métricas del proyecto, pero despersonalizadas de un proyecto particular.
   **Métricas de proyecto**: Me van a permitir saber si un proyecto de software en ejecución se está cumpliendo de acuerdo a lo planificado o no.
   **Métricas de producto**: Características que tienen relación directa con el producto
   
   Métricas básicas: TAMAÑO, ESFUERZO, TIEMPO Y DEFECTOS
8. ==Monitoreo y control==
   "Un proyecto se atrasa de a un día a la vez"
   Esto dice que, si puedo corregir los desvíos de mi proyecto en el momento adecuado, estoy a tiempo de poder cumplir mi objetivo
   
   FACTORES PARA EL ÉXITO: 
   - Monitoreo y feedback
   - Misión/Objetivo claro
   - Comunicación
	CAUSAS DE FRACASOS
	- Fallar al definir el problema
	- Planificar basado en datos insuficientes
	- No hay seguimiento del plan del proyecto
	- Plan de proyecto pobre en detalles
	- Estimaciones basadas en "supuestos"
	- Mala comunicación


### FILOSOFÍA ÁGIL

El objetivo del movimiento ágil era lograr un equilibrio entre seguir procesos rigurosos y formales en el desarrollo de software y trabajar de manera eficiente y efectiva para entregar un producto de calidad y satisfacer las necesidades del cliente.
Es un compromiso útil/ un punto medio entre nada de proceso y demasiado proceso
Se suele llamar AGILE, es una ideología y cuenta con un conjunto definido de principios que guían el desarrollo del producto, busca encontrar un equilibrio entre procesos definidos y nada de procesos.
El manifiesto ágil se sustenta en los procesos empíricos que tienen como base la experiencia, este enfoque es compatible con ciclos de vida iterativos y se basa en la idea de que la incertidumbre y los cambios son inevitables en el desarrollo.
Los procesos empíricos centran sus bases en el empirismo, este tiene 3 pilares:

1. TRANSPARENCIA: Comunicación abierta y honesta de todas las partes interesadas
2. ADAPTACIÓN: Capacidad de adaptarse y ajustar el trabajo y el proceso para hacer frente a las desviaciones y problemas.
3. INSPECCIÓN: Se refiere a la revisión regular y sistemática del progreso del trabajo y los productos resultantes para detectar problemas y desviaciones.

#### MANIFIESTO ÁGIL
4 Valores principales:
![[Pasted image 20260924113601.png]]

Y luego de los valores, también tenemos los 12 principios del manifiesto ágil

![[Pasted image 20260924113932.png]]

#### TRIÁNGULO DE HIERRO VS TRIÁNGULO ÁGIL

El TdH es un modelo utilizado en la gestión tradicional de proyectos, establece que los 3 elementos fundamentales en cualquier proyecto son el alcance, el tiempo y el costo (lo que ya vimos)
Y por otro lado, en las metodologías ágiles se considera que el alcance, el tiempo y el costo son variables flexibles que pueden adaptarse y cambiarse a lo largo del proyecto.
La gestión ágil establece que los tres elementos fundamentales son el valor, la calidad y la restricción del tiempo. En este modelo se busca maximizar el valor que se le entrega al cliente, asegurar la calidad del producto y cumplir con los plazos establecidos, creando así el triángulo ágil
En gestión ágil, considerando las variables, primero me guiaré por el valor que le aportan las funcionalidades al desarrollo del producto. "==Tengo estos recursos y este tiempo, con eso, ¿Qué le puedo entregar al cliente?=="
![[Pasted image 20260924170726.png]]

#### REQUERIMIENTOS ÁGILES

En la gestión ágil, el valor de negocio y la construcción del producto correcto son fundamentales, se plantea que los requerimientos se irán descubriendo a medida que avanza el proyecto, se busca definir "solo lo suficiente" para comenzar a trabajar con lo mínimo y necesario, y así obtener retroalimentación para mejorar continuamente
![[Pasted image 20260924171514.png]]Los requerimientos se expresan en forma de historias de usuario, que son breves descripciones de los requisitos del cliente que se escriben en lenguaje natural y se enfocan en las necesidades del usuario, estas historias se utilizan para definir el alcance de cada iteración y se priorizan en función del valor que aportan al producto
Una de las principales razones para determinar solo lo suficiente, es por que todos los productos de software tienen un desperdicio significativo, de todas las funcionalidades desarrolladas, muy pocas el cliente usará.
![[Pasted image 20260924172830.png]]
La gestión ágil de requerimientos intenta contrarrestar esta situación  priorizando solo aquellas funcionalidades que aportan valor al cliente, estos requerimientos se organizan en una lista priorizada y ordenada, llamada product backlog. Los requerimientos mas importantes se encuentran en la parte superior de la lista
![[Pasted image 20260924173233.png]]
La gestión ágil de los requerimientos apunta a trabajar y a poner el esfuerzo en lo que nos da valor!!

![[Pasted image 20260924174640.png]]

#### TIPOS DE REQUERIMIENTOS

De negocio: son los de mas alto nivel, nos referimos a cuales son los requerimientos en términos de la visión del negocio
De usuario: Tienen que ver con los requerimientos de usuario final
No funcionales: Los mas ocultos, el cliente no los tiene en claro, un requerimiento de estos puede hacer que el software que desarrollo no sirva
De implementación: Tienen que ver con cuestiones de restricción o implementación específicos.

En resumen, en los requerimientos ágiles se busca entender qué le da valor al negocio, cuales son los requerimientos de negocio y a raíz de estos construir una solución que pueda entregarse al cliente, priorizando lo que le da valor al mismo y a partir de entregas continuas.
En la gestión ágil de requerimientos implica trabajar junto a técnicos y no técnicos entendiendo las necesidades y el negocio para entregar un producto que brinde valor, y luego junto a los usuarios descubrir cuál es la mejor forma de satisfacer esas necesidades.
Conceptos relacionados con los principios agiles que aplicamos son:
1. Los cambios van a existir todo el tiempo de forma constante
2. Debemos tener una mirada de todos los que están involucrados
3. El usuario dice lo que quiere cuando recibe lo que pidió.
4. No hay técnicas ni herramientas que sirvan para todos los casos.
5. Lo importante no es entregar una salida, sino entregar una solución de valor.

Y también podemos mencionar los principios ágiles relacionados a los req. ágiles
1. La prioridad es satisfacer al cliente a través de releases tempranos y frecuentes
2. Recibir cambios de requerimientos
3. Técnicos y no técnicos trabajando juntos todo el proyecto
4. Medio de comunicación por excelencia es cara a cara
5. Las mejores arquitecturas, diseños y requerimientos emergen de equipos auto organizados


### USER STORIES

Técnica para capturar requerimientos.
Los errores cometidos en la etapa de definición de requerimientos son más difíciles de corregir ya que solo se identifican cuando el usuario tiene el sistema en frente y por ende el problema se arrastra a lo largo de la vida del proceso.
Las US no son especificaciones detalladas de requerimientos, sino que expresan la intención de hacer algo
==Las 3 "C" de una US==:
**CONVERSATION**
La parte mas importante que no queda escrita, es la parte no visible.
En esta conversación, es donde se obtienen todos los detalles para que el equipo pueda trabajar esa historia
**CONFIRMATION**
Condiciones que se tienen que dar para dar por satisfecha la US.
**CARD**
Parte visible de la US, es donde escribimos algo que nos indique cual es la historia de usuario, de que se trata y su valor de negocio.

Las US son multipropósito por que moldean o representan distintas cosas
- Una necesidad del usuario
- Una descripción del producto
- Un ítem de planificación
- Token para una conversación
- Mecanismo para diferir una conversación
  
La user story está planteada como una implementación en porciones verticales.
No se trata de solo escribir o detallar la funcionalidad que necesita el usuario, esa es la primera parte, también debemos implementarla desde la lógica de interfaz de usuario hasta como resuelvo la lógica en la BD

###### Criterios de aceptación

Son aquellas cuestiones que le definen límites a la US, ayudan a que el PO responda los criterios que necesita para que la US provea valor al negocio
Estos criterios tienen que ver con la perspectiva del usuario; siempre definen una intención, no pensamos en la solución, sino en lo que de alguna manera el PO nos manifiesta en su intención
Estos criterios ayudan a los desarrolladores a saber cuándo parar de agregar funcionalidad y a los testers derivar pruebas pertinentes
Los criterios de aceptación buenos son aquellos que definen una intención y no una solución. La redacción debe ser clara, tienen que haber validaciones concretas, usamos palabras como:
PUEDE (Opcional)
DEBE (Obligatorio)


#### DEFINICIÓN DE LISTO

Nos permite definir qué tiene que cumplir la US para asegurarnos que este lista para ser implementada.
Es una definición que acuerda el equipo, si cumple con todo, puede ser incluida en un sprint, pero si no cumple con alguno de los criterios, tengo que trabajar más en esa user para poder incluirla en un sprint

Si una US cumple con el Modelo ==INVEST== se considera lista:

I: Independiente : No dependa de otra US
N: Negociable: Se negocia el QUÉ, no el CÓMO
V: Valuable : Valor concreto para el cliente
E: Estimable: Tengo que poder definir cuánto esfuerzo me va a hacer llevar la US
S: Small: Tiene que entrar en una sprint, para saber si es small, tengo que poder estimarla
T: Testeable: Poder demostrar que fueron implementadas.

#### DEFINICIÓN DE HECHO

Propia del equipo, se valida con un checklist e indica si la historia está decentemente terminada para presentársela al PO/Cliente. Debe tener las pruebas unitarias y de aceptación en verde, tiene que haber pasado el ambiente de prueba, etc.

#### NIVELES DE ABSTRACCIÓN

Al hablar de requerimientos ágiles y US, hablamos de evolución en el tiempo, puede suceder que en diferentes momentos, los requerimientos tengan diferentes niveles de abstracción, pero también podemos tener otros tipos de US, como las Épicas y los Temas, que todavía no pueden ser incluidas en el Product Backlog, pero que podrían hacerlo en el futuro.

Las ÉPICAS son historias de usuario muy grandes, que en principio son así de grandes porque están en un lugar de la pila en donde todavía no fueron detalladas. Como todavía no debo implementarlas las dejo plasmadas como una gran US sabiendo que en algún momento voy a tener que llegar a disolverla, detallarla y hacerla más pequeña

Y después lo que se conocen como TEMAS, que incluso podrían ser hasta más grandes que una épica. Es un conjunto de US relacionadas que defino en función de un título para recordarme que todo lo que está incluido en ese tema lo voy a tener que tratar en algún momento.

#### SPIKES

Son un tipo especial de US, sirven para quitar riesgo o incertidumbre de otro requerimiento, de otra US o de alguna faceta del proyecto que nosotros queremos investigar. Pueden ser técnicas o funcionales

SPIKES TÉCNICAS: Utilizadas para investigar enfoques técnicos en el dominio de la solución.

SPIKES FUNCIONALES: Utilizadas cuando hay cierta incertidumbre respecto de cómo el usuario interactuará con el sistema

Generalmente se trabajan siempre en un sprint anterior a la cual decido que voy a implementar la US que tengo incertidumbre
Pueden utilizarse para:
- Familiarizar al equipo con una nueva tecnología
- Analizar un comportamiento de una historia compleja y dividirlas en partes manejables
- Ganar confianza frente a riesgos tecnológicos para disminuir la incertidumbre
- Enfrentar riesgos funcionales

Los spikes deben ser estimables, demostrables y aceptables, cumpliendo la DoR

Las US no son requerimientos de software, no necesitan descripciones exhaustivas de la funcionalidad del sistema. Tener en cuenta que en la US se hace un paso a la vez, evitar usar la palabra ”y”, usar palabras claras en los criterios de aceptación y sobre todo y más importante, escribir la user story desde la perspectiva del usuario.

#### ESTIMACIONES DE SOFTWARE

Estimamos sobre el uso de recursos, costos y demás características a usar durante el proceso de desarrollo
Estimas es predecir en un momento donde no tenemos gran conocimiento, donde hay incertidumbre. Por definición una estimación no es precisa, cuanto mas al inicio estamos, mayor es la incertidumbre, y mientras vamos avanzando la incertidumbre va disminuyendo
Las estimaciones deben ir ajustándose a medida que avanzamos en el desarrollo
Estimar NO ES PLANEAR. Si bien sirve la estimación como base para planificar, los planes no tienen que seguirla, mientras mayor diferencia haya entre lo estimado y lo planeado, mayor riesgo va a haber

Generalmente al momento que estimamos tenemos menos información de la requerida, y a medida que avanzamos vamos a tener más información que va a avalar o negar la estimación realizada, pero aún así, ante el riesgo del desarrollo del producto, necesitamos estimar
No podemos tener mucha precisión para hacer estimaciones, sino que tenemos que empezar a trabajar en esas estimaciones desde un principio, tenemos distintas técnicas de estimación que nos ayudan a disminuir esa incertidumbre, cada técnica tiene sus propias ventajas y desventajas
Razones por las que nos equivocamos al estimar:
- Si el proyecto no está organizado, el nivel de conocimiento sobre el producto es menor
- Si no tenemos en claro cuáles son los recursos con los que la empresa cuenta para desarrollar el producto
- Las técnicas para hacer estimaciones también pueden ser fuente de error, por lo que se recomienda utilizar más de una técnica y comparar sus resultados.

1era estimación: ==TAMAÑO DEL SOFTWARE==
Que tan grande va a ser el trabajo que vamos a hacer. Para esto utilizamos la técnica de CONTAR
- Contar funcionalidades
- Contar requerimientos
- Contar cantidad de US
- Contar la cantidad de CU

2da estimación: ==ESFUERZO==
Con esfuerzo nos referimos a la cantidad de horas lineales que voy a necesitar para construir el software, no incluyo qué personas lo hacen, ni calendario ni tampoco me paro a especificar si las actividades son paralelas o secuenciales, solo CUENTO, en estimación, cuantas horas lineales de desarrollo voy a necesitar.

3era estimación: ==CALENDARIO==
Calendarizar el esfuerzo y proponer una fecha de entrega

Una vez que logramos estimar tamaño, esfuerzo y tiempo calendario, vamos a empezar a trabajar con COSTOS y PRESUPUESTOS.


#### Técnicas de estimación

1. Métodos basados en la experiencia: Basado en la experiencia pasada en proyectos similares para determinar la estimación de esfuerzo y tiempo
2. Métodos basados exclusivamente en recursos: Basado en la cantidad y el tipo de recursos necesarios para llevar a cabo un proyecto
3. Métodos basados exclusivamente en el mercado: Basado en el costo de proyectos similares en el mercado
4. Métodos basados en los componentes del producto: Esta técnica se basa en la identificación y descomposición de los componentes del software y del proceso de desarrollo para estimar el esfuerzo y tiempo requerido
5. Métodos algorítmicos: Basado en modelos matemáticos y estadísticos
   
Dentro de los métodos basados en la experiencia tenemos las técnicas de estimación de:

==JUICIO EXPERTO==
Se basa en la experiencia, una vez identificado los expertos, se les presenta la descripción detallada del proyecto y se les solicita que proporcionen estimaciones basadas en su experiencia y conocimiento, se basa en la subjetividad del mismo
Criterios que pueden seguir los expertos:
- Estimar solo tareas con granularidad aceptable
- Usar el método Optimista, Pesimista y Habitual que tiene que ver con estimar según 3 características y luego aplicar esto a una formula. (O+4H+P)/6 (4 veces el tiempo habitual + el tiempo optimista + el pesimista y todo dividido 6-9
- Usar un checklist y un criterio definido para asegurar cobertura.

==PURO==
Un experto estudia las especificaciones y hace su estimación. Se basa fundamentalmente en los conocimientos del experto. Desventaja = Si desaparece el experto, la empresa deja de estimar

==WIDEBAND DELPHI==
Un grupo de personas son informadas y tratan de adivinar lo que costara el desarrollo tanto en esfuerzo como en duración. Las estimaciones individuales se recopilan de forma anónima y se envían a los expertos para que puedan revisarlas y ajustarlas en rondas sucesivas 
Desventaja = requiere más tiempo y recursos que el juicio de experto puro, ya que implica múltiples rondas de estimaciones y análisis de datos hasta que la estimación converja de forma razonable.

==ANALOGÍA==
También se basa en datos históricos pero se seleccionan específicamente aquellos proyectos que son similares al proyecto actual para realizar la comparación y estimación.


No debemos olvidar que la estimación se va refinando a medida que el proyecto se va desarrollando.

#### ESTIMACIÓN EN AMBIENTES AGILES

Seguimos con los mismo conceptos anteriores, debemos recordar a su vez que no debemos ser dogmáticos sobre nada y que la clave del éxitio es ser pragmáticos.
La estimación no es un plan, y si la estimación implicar un compromiso va a resultar perjudicial para cualquier organización.
Acá se trabaja con features o stories, estipuladas como STORY POINTS, son una ponderación que se le da a la HU cuyo peso es la combinación de su incertidumbre, esfuerzo y complejidad
Se trata de medidas o estimaciones relativas, al ser específicas no son absolutas, una de las premisas de la estimación relativa es la realización de la misma a partir de la comparación. Esto lo hacemos a través de la definición de una US canónica, una que defina en base a que vamos a definir los SP

Para poder estimar una US debo estimar el tamaño, el tiempo y el esfuerzo necesario de la misma. El tamaño es una medida de la cantidad de trabajo necesario para producirla o completarla, y a su vez indica cuan compleja y cuán grande es.
Las estimaciones basadas en base al tiempo son más propensas a errores debido a factores externos como las habilidades de las personas, el conocimiento del dominio, la experiencia, etc.
Tamaño NO ES ESFUERZO, ya que esfuerzo tiene que ver con horas lineales
Para medir el progreso de un equipo durante el desarrollo de un proyecto y específicamente en una iteración, tenemos la llamada:
==VELOCITY==: Medida del progreso de un equipo, se calcula a partir de la suma de los SP asignados a cada US que el equipo completo al 100%, a partir de esta métrica podemos derivar la duración de un proyecto
Un posible método de estimación es la poker estimation:
Combina el juicio de experto con analogía y utiliza algo de Wideband Delphi. Se basa en la Serie de Fibonacci.
Generalmente si tenemos un SP muy grande, es probable que la US no se pueda ejecutar en un solo sprint y por ende no se cumplirá con el criterio de Ready. La canónica o base, debe tener complejidad 1 y si se puntúa una con 0 quiere decir que hay desconocimiento sobre la misma y es necesario detallarla. Si el SP es 100, evidentemente algo está muy mal. El límite de SP es 8.
Cuando hablamos de Agile hablamos de empirismo, por lo tanto, en las estimaciones también tenemos que cumplir con las características y pilares del empirismo, que son ejecutar, inspeccionar y adaptar, retroalimentación.


### GESTIÓN DE PRODUCTOS

Muchas veces se invierte mucho tiempo en construir características del software que no se usan generalmente. Esto implica un esfuerzo adicional en algo que no se va a utilizar o vender
![[Pasted image 20260928172001.png]]
En la base pensamos en aquellas que si o si tienen que existir para que el software funcione para el propósito esperado
En el tope aparecen otros aspectos relacionados con cuestiones de visión del producto que son difíciles de alcanzas
Por lo general los productos se construyen y se quedan en la base
El desafío tiene que ver con cómo hacemos para construir un producto de software donde desechamos el desperdicio y logramos abarcar los aspectos que estamos persiguiendo cuando creamos el producto de software.
La idea es plantear una hipótesis y con un mínimo desarrollo, un mínimo esfuerzo, y validarla para hacer justamente que el desperdicio tienda a 0.
Para esto, podemos utilizar la técnica UVP (User Value Proposition) es una técnica de desarrollo de productos que se centra en comprender las necesidades, deseos y problemas de los usuarios y en crear soluciones que satisfagan esas necesidades de manera efectiva
En principio nos vamos a imaginar una hipótesis o un valor que tiene el producto o servicio que queremos desarrollar.
Si nosotros a raíz de esta hipótesis desarrollamos un producto completo con muchas funcionalidades y recursos utilizados y de ahí lo comercializamos, corremos el riesgo de que el producto no sea algo que el mercado o los usuarios estén demandando o que no cubra las expectativas del usuario exigente.

### MVP (Mínimum Viable Product)

La idea del MVP es trabajar con lo mínimo del producto que necesito obtener. Lo mínimo que tendría que tener el producto para que los usuarios del mismo lo puedan evaluar y me puedan decir si el producto les atrae o no.
![[Pasted image 20260928173217.png]]
El objetivo del MVP es comprobar que la hipótesis del producto a construir funciona o si tengo que hacer cambios. Esto no se trata de vender el MVP si no de validar la hipótesis
Puede suceder que así como está definida la hipótesis sirva o puede ocurrir que cada usuario de ese MVP cuando lo vea pida funcionalidades diferentes
![[Pasted image 20260928173230.png]]
Mi MVP se va moviendo hacia el foco en el cual los clientes se van a interesar. Si bien el foco elegido en la hipótesis no es erróneo, algunas características del mismo no están tan bien, por lo tanto, las desviamos.
![[Pasted image 20260928173239.png]]
Una vez que encontramos el MVP exitoso, es decir que el feedback y la investigación son exitosas, surge el concepto de:

#### MMF (Minimum Marketable Feature)

Se enfoca en definir los elementos mínimos que deben estar presentes en un producto o servicio para que sea comercializable. Es la validación del producto en términos de la comercialización. Ya no estoy parado en una hipótesis para validar si el producto tiene mercado o no, sino que estoy definiendo cual es la pieza mínima que voy a tener que construir y comercializar para que el producto sea rentable
También es importante construirlo en cuestiones mínimas para sacarlo rápidamente a la venta cuando el producto es atractivo y no está en el mercado, ya que cuanto más tiempo pase más riesgo corro de que mi idea sea implementada antes.
El objetivo es asegurarnos de que este primer MMF sirve o no. Con la diferencia de que ahora hablamos de una Feature, algo mucho más chiquito que el MVP. Es lo mínimo que puedo sacar a la venta.
Para combinar el MVP con la MMF, está:

#### MVF (Minimum Viable Feature)

Se trata de la característica mínima que se puede construir e implementar rápidamente, utilizando recursos mínimos, para probar la utilidad de la misma.
Si la MVF resulta exitosa, se pueden desarrollar más MMF en esta área para tomar ventaja
cuando se logra ajustar el producto en el mercado, se combinan MMF y MVP, formando un dinosaurio :P
![[Pasted image 20260928173622.png]]

También tenemos la MRF (Minimum Release Feature) que se trata del release del producto que tiene el conjunto de características más pequeño posible. El incremento más pequeño que ofrece un valor nuevo a los usuarios y satisface sus necesidades actuales.

![[Pasted image 20260928173832.png]]

Uno de los aspectos importantes de esta metodología es el ciclo de feedback
![[Pasted image 20260929171838.png]]
El éxito no es entregar un producto, si no de entregar un producto QUE el cliente utilizara
La forma de hacer esto es alinear los esfuerzos continuamente hacia las necesidades reales

La idea con la fase de construir el MVP es tener rápidamente y con el menor esfuerzo el MVP para poder validarlo y retroalimentar la hipótesis para entrar en el ciclo de aprendizaje

LA FASE EXPERIMENTAR pasa a ser clave al trabajar en la construcción del MVP.
A medida que se pospone la experimentación con el MVP, surge gran cantidad de trabajo desperdiciado, por esto debemos utilizar el MVP para experimentar con los primeros usuarios en el mercado verificando mi hipótesis probando todos los elementos disponibles comenzando por los más riesgosos

Los elementos más riesgosos del plan se denominan supuestos de salto de fe. La mayoría de las personas no conocen una determinada solución (o incluso un problema); pero una vez que experimentan la solución, ¡no pueden imaginar cómo vivirían sin ella!
![[Pasted image 20260929172353.png]]

### SOFTWARE CONFIGURATION MANAGEMENT (SCM)

Los sistemas de software siempre cambian durante su desarrollo y uso. Conforme se hacen cambios al software, se crean nuevas versiones del sistema. Los sistemas pueden considerarse como un conjunto de versiones donde cada una de ellas debe mantenerse y gestionarse. Esto es necesario para no perder la trazabilidad de los cambios que se incorporan a cada versión.
Estos cambios en el software tienen su origen en cambios del negocio y nuevos requerimientos, en este contexto, el software evoluciona y esta evolución puede verse en muchos aspectos del producto
Ante estos cambios, es fundamental que haya integridad en el producto y SCM logra eso.

SCM es una actividad de soporte transversal a todo el proyecto que aplica dirección y monitoreo administrativo y técnico, y cuyo propósito es mantener la integridad del producto a lo largo de todo el ciclo de vida. Sirve de contención para poder construir un producto íntegro y de calidad.
El propósito de la SCM es también establecer la integridad de los productos y esto involucra: 
1. Identificar características técnicas y funcionales de ítems de configuración 
2. Documentar características técnicas y funcionales de ítems de configuración 
3. Controlar los cambios de esas características identificadas y documentadas 
4. Registrar y reportar estos cambios 
5. Verificar correspondencia con los requerimientos (trazabilidad).

Decimos que se mantiene la integridad de un producto de software cuando:

1. SATISFACE LAS NECESIDADES DE USUARIO: hace lo que el usuario espera que haga 
2. PERMITE LA RASTREABILIDAD DURANTE TODO SU CICLO DE VIDA: existen vínculos o conexiones entre los ítems de configuración que permiten analizar en donde impactará un cambio en un ítem de configuración. De esta forma, se puede determinar cómo impactará cada cambio de requerimientos a través de la trazabilidad. 
3. SATISFACE CRITERIOS DE PERFORMANCE Y RNF 
4. CUMPLE CON EXPECTATIVAS DE COSTO: este apartado incluye la satisfacción del equipo de proyecto. No solo el cliente debe estar satisfecho, sino también el desarrollo del producto debe ser redituable.


#### CONCEPTOS GENERALES

==ÍTEM DE CONFIGURACIÓN==: Son aquellos artefactos que forman parte del producto o proyecto, y pueden ser almacenados en un repositorio, sin importar su extensión/tipo. Pueden sufrir cambios, y se desea conocer su estado y evolución a lo largo del ciclo de vida
Son todos aquellos elementos que componen toda la información producida como parte del proceso de ingeniería de software, como ser programas, documentos que describen programas, datos, etc

==REPOSITORIO==: Es un contenedor de ítems de configuración, se encarga de mantener la historia de cada ítem con sus atributos y relaciones, además es usado para hacer evaluaciones de impacto de los cambios propuestos.
Tenemos 2 tipos de repos:
- CENTRALIZADO: Caracterizado porque un servidor contiene todos los archivos con sus versiones, si falla el servidor, todo lo positivo se cae.
- DESCENTRALIZADO: Caracterizado porque cada cliente tiene una copia exactamente igual del repo completo, si el servidor falla sólo es cuestión de “copiar y pegar”.
  Posibilita otros workflows no disponibles en el modelo centralizado. La desventaja que podemos mencionar es que es más complicado llevar un control sobre el mismo

==VERSIÓN==: Instancia de un ítem de configuración que difiere de otras instancias de este ítem. Las versiones se identifican unívocamente. Controlar una versión refiere a la evolución de un único ítem de configuración.
Cada versión de software es una colección de elementos de configuración (ECS). La versión es un punto particular en el tiempo de ese ítem de configuración (es un estado). Una versión se define, desde el punto de vista de la evolución, como la forma particular de un artefacto en un instante o contexto dado.
El control de versiones se refiere a la evolución de un único ítem de configuración (IC), o de cada IC por separado. La evolución puede representarse gráficamente en forma de grafo

==VARIANTE==: Una versión de un ítem de configuración (o de la configuración) que evoluciona por separado. Las variantes representan configuraciones alternativas

==CONFIGURACIÓN DE SOFTWARE==: Conjunto de todos los ítems de configuración con su versión específica. Define una foto de los ítems de configuración en un momento de tiempo determinado.
La configuración de un software es la sumatoria de todos los ítems de configuración que tiene en un momento determinado, equivale a una instantánea o una foto de todos los ítems de configuración con su versión en un momento del tiempo.

==LINEA BASE==: Conjunto de ítems de configuración que han sido construidos y revisados formalmente, pueden ser tomados como referencia para demostrar que se ha alcanzado cierto nivel de madurez en ellos, sirve como base para desarrollos posteriores
Este conjunto de ítems debe tener una referencia única y se hace a través de "tags"
Se acuerdan parámetros para determinar qué se considera o qué debe cumplir los ítems de configuración para considerarse como línea base.

Si se desea cambiar una línea base, existe un protocolo formal de control de cambios, que permite definir el procedimiento a seguir para manejar peticiones de cambios, y en caso de aceptarse, acordar nuevamente los parámetros y comunicar los cambios a todo el equipo, para que tomen la nueva línea base como modelo a seguir

##### Para que sirve?
Fundamentalmente es para tener un punto de referencia, pero también sirve para hacer Rollback o saber qué se pone en producción. Nos permite saber cuál era la última situación estable. Existen 2 tipos:
1. De especificación: Primeras línea base, dado que no cuentan con código, podría contener el documento de especificación de requerimiento
2. Operacionales: contiene una versión de producto cuyo código es ejecutable, han pasado por un control de calidad definido previamente. La primera línea base operacional corresponde con la primera Release.

##### Rama (Branch)
Es un conjunto de ítems de configuración con sus correspondientes versiones, que permiten bifurcar el desarrollo de un software, por varios motivos, ya sea experimentación, resolución de errores en el desarrollo o para desarrollar un mismo software para distintas plataformas

Merge: Se da cuando se integran dos ramas, para fusionar la configuración de los ítems que la conforman con sus correspondientes versiones en cada una de ellas.
Una buena práctica es mantener la rama principal como la versión estable, y fusionar los cambios hacia ella. En caso de no integrarse a la Main, las ramas deberían descartarse.

##### Actividades relacionadas a la gestión de configuración
![[Pasted image 20260930102754.png]]
==Identificación de ítems de configuración==: implica una identificación unívoca para cada ítem, donde en el equipo se definirán políticas y reglas de nombrado y versionado
Se debe definir la estructura del repositorio, y la ubicación de los ítems de configuración dentro de esa estructura
permite a los desarrolladores controlar y velar por la integridad del producto, como así también a los clientes evaluar esa integridad.
Se clasifican en:
- Ítems de producto: tienen el ciclo de vida más largo, y se mantienen mientras el producto exista.
- Ítems de proyecto: el plan de proyecto, listado de defectos encontrados, tienen un ciclo de vida de proyecto, un plan de iteración, se mantiene durante una iteración

==Control de cambios==: Tiene su origen en un requerimiento de cambio a uno o varios ítems de configuración que se encuentran en una línea base.
Es un procedimiento formal que involucra diferentes actores y una evaluación del impacto del cambio. Una vez definida la línea base, no es posible cambiarla sin antes pasar por un proceso formal de control de cambios.
Etapas:
1. Se recibe una propuesta de cambio sobre una línea base determinada
2. El comité realiza un análisis de impacto del cambio para evaluar el esfuerzo, el impacto en la gestión de recursos, los efectos secundarios y el impacto global sobre la funcionalidad y la arquitectura del producto
3. En caso de que se autorice la propuesta, se genera una orden de cambio que define lo que se va a realizar, las restricciones y los criterios para revisar y auditar.
4. Luego de realizado el cambio, el comité vuelve a intervenir para aprobar la modificación de la línea base y marcarla como línea base nuevamente
5. Se notifica a los interesados los cambios realizados sobre la línea base.

El control de cambios permite tener una trazabilidad entre los ítems de configuración, y ante un cambio saber cuáles ítems están afectados por este.

==Auditorías de configuración== (ESTO NO SE HACE EN AGILE): Controles autorizados a realizar por el equipo de desarrollo en un momento determinado, donde un auditor externo al equipo analiza las líneas base, las cuales permiten “congelar” y analizar en un momento determinado cuál es el estado del software, y si se están cumpliendo todas las pautas que plantea esta disciplina de SCM.
Es objetiva cuando hay independencia de criterio, es independiente cuando no depende jerárquica, funcional ni salarialmente del equipo o elemento a auditar.
La auditoría de configuración se hace mientras el producto se está construyendo y su objetivo es que el producto tenga calidad e integridad. Se entiende que lo más barato es prevenir.

- Auditoría física de configuración (PCA): Asegura que lo que está indicado para cada ICS en la línea base o en la actualización se ha alcanzado realmente.
- Auditoría funcional de configuración (FCA) Evaluación independiente de los productos de software, controlando que la funcionalidad y performance reales de cada ítem de configuración sean consistentes con la especificación de requerimientos

La auditoria de configuración sirve a dos procesos básicos:

**VALIDACIÓN**: Se encarga de asegurar que cada ítem de configuración resuelva el problema apropiado

**VERIFICACIÓN**: Implica asegurar que un producto cumple con los objetivos definidos en la documentación de líneas base.

Las auditorías permiten visualizar si se están satisfaciendo los requerimientos y si se ha cumplido la intención de la línea base anterior. Ante un análisis, el auditor puede detectar defectos y ajustar correcciones

==REPORTES E INFORMES DE ESTADO==: Provee un mecanismo para mantener un registro de cómo evoluciona el sistema. Esto permite mantener a todo el equipo informado sobre la última línea base, y que se trabaje a su última versión.
Estos reportes incluyen todos los cambios que han sido realizados a las líneas base durante el ciclo de vida del software.

#### Planificación de la gestión de configuración de software
Se debe confeccionar al inicio de un proyecto
- Reglas de nombrado de los ítems de configuración 
- Herramientas para utilizar en SCM 
- Roles e integrantes del Comité de Control de Cambios 
- Procedimientos formales de cambios 
- Procesos de auditoría 
- Estructura del repositorio 
- Cómo se hará el control de cambios 
- Registros que deben mantenerse 
- Tipos de documentos.

#### Evolución de la SCM

![[Pasted image 20260930105706.png]]

==Integración continua==: práctica de desarrollo que promueve que los desarrolladores adopten la costumbre de integrar su código a un repositorio compartido varias veces al día. Cada integración de código es luego verificada por una serie de pruebas automatizadas, permitiéndole al equipo detectar problemas de manera temprana.
Aseguramos que el software pueda ser desplegado en cualquier momento, es decir, que el código compile y que sea de calidad desarrollando con algo que se llama TDD (desarrollo conducido por pruebas) y cuando terminó ese componente de código y lo probó y sabe que funciona, lo sube a un repositorio de integración

==Entrega continua==: Es una disciplina de desarrollo de software en la que el software se construye de tal manera que puede ser liberado en producción en cualquier momento. Suma la automatización de las pruebas de aceptación y entonces el producto ya está listo para desplegarlo a producción.
No implica necesariamente que se libere cada vez que hay un cambio, sólo ocurre si el responsable de negocio decide pasar a producción. Se prioriza que la versión esté en un estado en el que pueda ser puesta en producción.
La integración continua es prerrequisito de la entrega continua. Con esto se refiere a que los artefactos producidos en el servidor de integración continua son puestos en producción con solo un click.

==Despliegue continuo==: Consiste en poner en el ambiente de producción del usuario final el producto. A diferencia de la entrega continua, en el despliegue continuo no existe la intervención humana para desplegar el producto en producción. Para esto, se utilizan pipelines que contienen una serie de pasos que deben ejecutarse en un orden determinado para que la instalación sea satisfactoria.
Un error en producción un día después de haberlo hecho significa que todavía nos acordamos de lo que hicimos y será más fácil de resolver.
Esto permite que los cambios de código sean entregados a los usuarios finales con mayor rapidez y frecuencia


