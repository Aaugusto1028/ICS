## Viernes 14 de Agosto: Introducción a la Ingeniería de Software
**Materia:** Ingeniería y Calidad de Software
**Resumen en una oración:** La clase abarcó la evolución y los problemas históricos del desarrollo de sistemas, las definiciones formales de Ingeniería de Software (SWEBOK y SEBoK), la dicotomía entre la esencia y el accidente del software según Brooks, y contrastó los enfoques de procesos definidos frente a los empíricos en los ciclos de vida de un proyecto.
### Conceptos clave
- **Software:** En general, es un set de programas y la documentación que los acompaña. En una definición más integradora de Pantaleo & Rinaudo (2018), el software es "conocimiento representado en distintos niveles de abstracción".
- **Ingeniería de Software:** Según la definición oficial del IEEE (formalizada en el SWEBOK), es "la aplicación de un enfoque sistemático, disciplinado y cuantificable al desarrollo, operación y mantenimiento del software". Parmas la define como la "construcción multipersona de software multiversión", y Sommerville enfatiza que abarca desde la concepción inicial hasta su operación.
- **Esencia del Software (Modelo Aristotélico de Brooks):** La esencia radica en la construcción de estructuras conceptuales entrelazadas altamente complejas, como algoritmos, flujos de datos y relaciones. Es el verdadero cuello de botella intelectual que queda en la ingeniería de hoy.
- **Accidente del Software:** Las dificultades que acompañan la producción pero que no son inherentes a la misma, como lidiar con sintaxis compleja, limitaciones de memoria o tiempos de compilación. La historia del software ha consistido en resolver casi todos estos problemas "accidentales".
- **Proceso de Software:** Un conjunto estructurado de actividades, métodos, prácticas y transformaciones que la gente usa para desarrollar o mantener un sistema de software y sus productos asociados (según SW-CMM).
- **Proceso Definido:** Un proceso inspirado en las líneas de montaje o producción en masa, que asume que si repetimos los mismos pasos sistemáticamente obtendremos siempre los mismos resultados.
- **Proceso Empírico:** Un modelo ideal para entornos creativos que asume procesos complicados con variables cambiantes. Aquí, repetir pasos no garantiza el mismo resultado, por lo que el control se realiza mediante inspecciones y adaptaciones frecuentes.
- **Ciclo de vida:** Es la serie de pasos o fases a través de los cuales progresa un producto o un proyecto.
### Desarrollo de la clase
**Historia y Evolución Tecnológica** 
La clase comenzó repasando la historia de la ingeniería de software, término acuñado en la conferencia de la OTAN en 1968. Se marcaron hitos fundamentales como la publicación de "The Mythical Man-Month" de Brooks en 1975, los primeros grandes errores de software en los años 80, la creación de modelos de madurez como CMM en 1990 y el Manifiesto Ágil en 2001. Se evidenció el ascenso de las compañías tecnológicas, mostrando cómo marcas como Microsoft, Apple y Google pasaron a dominar el top global de capitalización bursátil, proyectando a NVIDIA como la empresa más valiosa del mundo para 2026 con 4.7 billones de dólares.
**Problemas recurrentes en el Desarrollo y Diferencias con la Manufactura** 
A pesar de los avances, la industria padece problemitas crónicos: productos que no satisfacen al cliente, mala calidad, mala documentación, imposibilidad de extender el software, y excesos en tiempos y presupuestos. Se enfatizó que el software no debe compararse con la manufactura tradicional por 5 razones: es menos predecible, no tiene producción en masa porque cada software es único, no todas las fallas son errores, el software no se gasta o desgasta físicamente, y no está gobernado por las leyes de la física.
**No Silver Bullet: Esencia vs. Accidente y el Rol de la Inteligencia Artificial** 
El docente profundizó en el ensayo fundacional de Brooks, "No Silver Bullet". Históricamente, hitos como los lenguajes de alto nivel o los IDEs mejoraron enormemente la productividad, pero solo resolvieron problemas "accidentales", eliminando barreras artificiales. Hoy la dificultad principal recae en la "Esencia", que tiene 4 propiedades irreducibles: complejidad no lineal al escalar, conformidad a interfaces arbitrarias, mutabilidad por presión del cambio continuo, e invisibilidad al carecer de representación espacial. Incluso con la llegada de la IA moderna, el cuello de botella sigue siendo el "Qué" (la idea del producto). El ancho de banda de ejecución de la IA es infinito, pero el ancho de banda conceptual del humano es el límite físico; la IA no puede deducir la intención si el humano no la especifica correctamente. El "Prompt" se transformó en el nuevo lenguaje de alto nivel. Para atacar esta verdadera esencia, el docente detalló tácticas orgánicas: "Buy vs. Build" (integrar en vez de construir desde cero), Prototipado rápido, "Grow, not build" (desarrollo incremental puro), y cultivar Grandes Diseñadores humanos.
**Factores de Éxito y Fracaso** 
Se analizó estadísticamente por qué los proyectos triunfan o fracasan. Los fracasos suelen darse por requerimientos incompletos (13.1%), falta de involucramiento del usuario (12.4%), falta de recursos o expectativas poco realistas. Por otro lado, cuando los proyectos salen bien, suele ser por el involucramiento del usuario (15.9%), un sólido apoyo de la gerencia (13.0%) y enunciados claros en los requerimientos (9.6%). La conclusión contundente es que saber programar por sí solo no garantiza el éxito del proyecto.
**Cuerpos de Conocimiento (SWEBOK y SEBoK)** 
Para formalizar la disciplina, se presentaron los cuerpos de conocimiento. El SWEBOK (IEEE, V 3.0, 2014) consta de 15 áreas de conocimiento críticas en Ingeniería de Software, divididas en disciplinas técnicas (Requerimientos, Diseño, Construcción, Prueba, Despliegue), disciplinas de gestión (Planificación, Monitoreo y control) y de soporte (Gestión de la Configuración, Aseguramiento de Calidad, Métricas). También se introdujo el SEBoK (Ingeniería de Sistemas, V 1.9.1, 2018), que engloba un panorama más amplio incluyendo hardware, personas y facilidades de negocio.
**Procesos de Desarrollo y Ciclos de Vida** 
El desarrollo de software se apoya en procesos donde ingresan requerimientos, ideas, tiempo, personas y recursos para transformarse a través de "Actividades de Trabajo" en productos y servicios. Estos procesos pueden gestionarse bajo un paradigma Definido (como las líneas de ensamblaje o modelos en cascada) que busca predictibilidad, o un paradigma Empírico (adaptativo y evolutivo), ideal para entornos donde la incertidumbre es alta. El conocimiento empírico sigue un ciclo constante de: Asumir -> Construir -> Retroalimentar -> Revisar -> Adaptar. Finalmente, esto se relaciona con los ciclos de vida del software, diferenciando el ciclo general del producto (que inicia con el plan de negocios, avanza al producto, opera y se retira) frente al ciclo del proyecto en sí. Estos ciclos se clasifican principalmente en Secuenciales, Iterativos/Incrementales y Recursivos.
### Ejemplos y casos mencionados
- **Margaret Hamilton:** Mostrada en una icónica foto posando al lado de la gigantesca torre de manuales impresos con el código fuente del Proyecto Apolo del que fue líder, ilustrando la dimensión del software.
- **Errores informáticos más costosos de la historia:**
    - _Mariner I (1962):_ 18.5 millones USD perdidos porque una fórmula matemática escrita a mano se programó incorrectamente.
    - _Hartford Coliseum (1978):_ Derrumbe del techo por nieve debido a un cálculo incorrecto introducido en el software CAD.
    - _Gusano de Morris (1988):_ Primer ataque a gran escala en Internet.
    - _Procesador Pentium de Intel (1994):_ Fallo en coma flotante que costó 475 millones de dólares en sustituciones.
    - _Cohete Ariane 5 (1996):_ Explotó porque un número de 64 bits en coma flotante se convirtió a un entero de 16 bits.
    - _Mars Climate Orbiter (1999):_ Pérdida de una sonda porque un programa usó unidades imperiales (pies/libras) y otro el sistema métrico.
    - _Frenos de Toyota y retiros de Jeep/Subaru:_ Demuestran cómo errores de software automotriz actuales provocan recalls multimillonarios y problemas mecánicos.
    - _Bug Y2K (2000):_ Mitigación de daños que costó 296,7 billones de dólares.
- **Meme Client Brief vs Client Budget:** El docente usó una analogía visual comparando "Las especificaciones" pedidas por el cliente (un tigre enorme de Bengala con el protagonista de Life of Pi) versus "El presupuesto" (un gatito de la calle con un nene).
- **Niveles de abstracción del código:** Analogía para entender el software desde "El hardware físico" (silicio/electricidad), "El idioma del chip" (ceros y unos), "Las herramientas mágicas" (S.O. como Linux), "El código de verdad" (Python/Java), "Los planos del juego", hasta llegar a "La idea genial" pura y abstracta.
- **Universidad de California (Procesos Empíricos):** En lugar de hacer veredas planificadas, la universidad sembró pasto y esperó un año; se fijaron dónde la gente había hecho un "caminito" por pisar reiteradamente, y ahí construyeron las sendas. Se usó como analogía de cómo funcionan los procesos empíricos que se adaptan a la realidad.
### Puntos que el docente remarcó
- Se enfatizó con exclamaciones visuales explícitas: "Saber programar NO es suficiente!!!!".
- El diseño sigue siendo un acto puramente humano; los grandes saltos productivos o grandes desarrollos hoy solo provienen de cultivar a grandes mentes de diseño conceptual, no de automatizar código con IA.
- La IA es una excelente herramienta para lo "accidental", pero falla intentando solucionar la "esencia" sin guía humana.
### Para el trabajo práctico / evaluación
- Se presentó una extensa bibliografía obligatoria/recomendada para la cátedra, destacando: _Ingeniería de Software_ de Sommerville, _The Mythical Man-Month_ de Brooks, _Rapid Development_ de Steve McConnell, y bibliografía sobre desarrollo ágil como _Agile Estimation and Planning_ (Mike Cohn) y el _Manifiesto Ágil_.
- Se indicó revisar los ciclos de vida específicos en el "Capítulo 7 de Desarrollos de proyectos informáticos (Rapid Development) de McConnell" para la trivia final de la clase.
### Dudas y cosas para revisar
- Profundizar en las diferencias puntuales entre las 15 áreas del **SWEBOK** versus el espectro sistémico propuesto por el **SEBoK**.
- Leer los papers sugeridos, en especial "No Silver Bullet" de Brooks y "Software's Ten Essentials" de Steve McConnell, fundamentales para la filosofía de la materia.
- Investigar cómo se mapean los distintos ciclos de vida (Secuencial, Iterativo, Recursivo) con los procesos definidos y empíricos explicados en la clase.
## Viernes 21 de Agosto: Introducción a la Agilidad y Requerimientos Ágiles (User Stories) 
**Resumen en una oración:** La clase abordó la fundamentación conceptual de la filosofía ágil frente a los procesos definidos tradicionales, la estructura de la gestión de proyectos (personas, procesos, producto y proyecto), los tres pilares del empirismo y la técnica de Historias de Usuario (User Stories) para la especificación Just-In-Time de requerimientos.

---
### Conceptos clave
* **Filosofía Ágil (Agilismo):** Enfoque filosófico y marco mental basado en un conjunto de valores y principios centrados principalmente en las personas y el cambio cultural. No es una metodología ni un proceso de software.
* **Procesos Empíricos:** Procesos basados en la experiencia directa y en el aprendizaje adaptativo dentro del contexto de cada proyecto. Sostienen que la experiencia es única e intransferible (no se puede extrapolar a otros proyectos).
* **Procesos Definidos:** Procesos estructurados (como el PUD o RUP) que buscan la repetibilidad mediante una planificación detallada y la estandarización previa de actividades, asumiendo que la experiencia acumulada se puede extrapolar.
* **Los 3 Pilares del Empirismo:** **Inspección** (puntos de realimentación temprana y frecuente), **Adaptación** (capacidad de modificar producto, proceso o conducta a partir del feedback) y **Transparencia** (visibilidad y honestidad total sobre el estado real del proyecto).
* **Product Backlog:** Lista dinámicamente priorizada de características y necesidades de negocio que representa el contenedor de requerimientos del producto. Es gestionado exclusivamente por el Product Owner.
* **User Story (Historia de Usuario):** Técnica de especificación de requerimientos en ambientes ágiles que describe una necesidad desde la perspectiva del usuario final.
* **Modelo INVEST:** Criterio de calidad para evaluar la redacción de una Historia de Usuario (*Independent, Negotiable, Valuable, Estimatable, Small, Testable*).
* **Spike:** Historia de usuario con un nivel de incertidumbre tan elevado (por falta de definición funcional o técnica) que no permite su estimación ni su implementación directa, requiriendo investigación previa.
---
### Desarrollo de la clase
#### 1. Encuadre de la materia y disciplinas de la Ingeniería de Software
El docente comenzó repasando el mapa general de la asignatura y sus diferentes unidades. Dentro de la Ingeniería de Software conviven tres grandes grupos de disciplinas:
1. **Disciplinas Técnicas:** Incluyen requerimientos, análisis, diseño, pruebas (*testing*) y despliegue. Las dos últimas son el foco técnico de la materia.
2. **Disciplinas de Gestión:** Se concentran en la planificación, seguimiento y control del proyecto (Unidad 2).
3. **Disciplinas de Soporte o Protectoras:** Abarcan la Gestión de Configuración de Software (SCM), prácticas continuas (*Continuous Integration, Delivery, Deployment*), aseguramiento de calidad (SQA) y métricas (Unidades 3 y 4).
#### 2. Las dimensiones del desarrollo: El esquema de las 4 P
Apoyándose en el esquema conceptual del Proceso Unificado (PUD), se explicaron las dimensiones que interactúan en la ingeniería de software:
* **Personas:** El recurso más valioso y determinante. El software es una actividad "humano-intensiva". Sin un equipo capacitado y motivado, los mejores procesos o herramientas fracasan.
* **Proceso:** La definición teórica y estructurada de tareas para construir software.
* **Proyecto:** La unidad de gestión del trabajo con recursos y tiempo acotado. Instancia el proceso para generar el producto.
* **Producto:** El software en sus distintas versiones e ítems de configuración.
Un **Proyecto** posee cuatro características fundamentales:
1. **Resultados únicos:** Genera un producto o versión única.
2. **Duración limitada:** Posee fecha explícita de inicio y de fin.
3. **Elaboración gradual:** Cumplimiento parcializado de objetivos.
4. **Tareas interrelacionadas:** Actividades coordinadas entre sí.
#### 3. Procesos Definidos vs. Procesos Empíricos
Se contrapusieron los dos grandes enfoques para la creación y gestión de software:
* **Procesos Definidos (Tradicionales):** Buscan definir el 100% de los requerimientos y del proceso por adelantado (*upfront decision*). La organización o los ingenieros de proceso establecen actividades estrictas. Asumen que la experiencia es **extrapolable** y buscan la repetibilidad (pretenden que un proyecto rinda igual que otro similar).
* **Procesos Empíricos (Ágiles / Lean):** Asumen que el desarrollo de software involucra alta incertidumbre. Afirman que la experiencia **no es extrapolable**: cada proyecto tiene su propia dinámica y el conocimiento surge de la marcha (camino al andar).
El empirismo requiere **ciclos de vida iterativos e incrementales** y se sostiene sobre tres pilares:
* **Inspección:** Evaluación rápida del trabajo mediante iteraciones cortas para obtener realimentación frecuente del cliente.
* **Adaptación:** Acción directa derivante de la inspección. Permite corregir desvíos en el producto, ajustar actividades del proceso o ajustar conductas del equipo.
* **Transparencia:** Condición ética e informacional donde todo el equipo blanquea riesgos, problemas o demoras de forma honesta. Sin transparencia, la inspección falla y la adaptación es errónea.
#### 4. El Manifiesto Ágil: Valores y Principios
Surgido en 2001, el Manifiesto Ágil es un acuerdo fundacional estructurado en 4 valores y 12 principios.
La lectura correcta de los valores es: *"Valoramos más lo primero (izquierda/arriba) que lo segundo (derecha/abajo), sin anular esto último"*:
1. **Individuos e interacciones** por sobre procesos y herramientas.
2. **Software funcionando** por sobre documentación excesiva y detallada.
3. **Colaboración con el cliente** por sobre negociación contractual.
4. **Respuesta ante el cambio** por sobre seguir un plan.
**Aclaración sobre la documentación:** El agilismo NO prohíbe documentar. Propone posponer la documentación detallada e innecesaria hasta el momento en que aporte verdadero valor y el requerimiento esté consolidado.
Entre los principios remarcados durante la clase destacan:
* **Trabajo conjunto (Principio 4):** Técnicos y responsables de negocio deben trabajar juntos diariamente a lo largo de todo el proyecto. De la figura utópica del cliente *on-site* de XP se evolucionó al rol disponible del *Product Owner*.
* **Comunicación cara a cara:** El desarrollo es un problema socio-comunicacional. Más del 80% de la eficacia comunicativa reside en la gestualidad, el tono y la presencia cara a cara.
* **Requerimientos Emergentes:** Históricamente, el 50% de los requerimientos de un software surgen **después** de iniciado el proyecto. El equipo debe estar preparado para absorber el cambio sin forzar al cliente a congelar ideas.
* **Filosofía Just-In-Time:** Diferir las especificaciones detalladas al momento exacto en que van a ser implementadas para evitar el desperdicio.
#### 5. Requerimientos Ágiles y Product Backlog
En un entorno ágil, el contenedor de requerimientos es el **Product Backlog**:
* Es una lista priorizada de ítems/características del producto.
* El **Product Owner (PO)** es su único dueño y responsable: establece y modifica la prioridad de los ítems.
* No contiene el 100% de los requerimientos desde el día uno y jamás está "completo", ya que los ítems implementados salen del backlog y no vuelven.
#### 6. Técnica de Historias de Usuario (User Stories)
Las Historias de Usuario describen necesidades funcionales al nivel del usuario. Se componen operacionalmente de **3 partes (Las 3 C)**:
1. **Card (Tarjeta):** El soporte físico o digital con la sintaxis principal.
2. **Conversation (Conversación):** La parte más importante. El intercambio cara a cara entre el equipo técnico y el Product Owner para aclarar dudas.
3. **Confirmation (Confirmación):** Los criterios de aceptación y escenarios de prueba especificados al dorso o como parte de la tarjeta.
##### Sintaxis Estándar de la Card:
> **Como** [Rol de usuario]
> **Quiero** [Actividad / Qué debe hacer el software]
> **Para poder** [Valor de negocio / Beneficio obtenido]

*Nota:* No debe confundirse la historia de usuario con la **frase verbal** (ej. *"Buscar destino por dirección"*), la cual es únicamente una etiqueta corta para referenciarla informalmente.
##### Estructura completa exigida por la cátedra:
Una Historia de Usuario completa debe contar obligatoriamente con:
* Frase verbal.
* Declaración completa (Sintaxis Como / Quiero / Para poder).
* Criterios de aceptación (reglas de negocio y atributos de calidad/no funcionales específicos).
* Pruebas de usuario (escenarios de prueba que **pasan** y escenarios que **fallan**).
##### Modelo de Calidad INVEST:
Para asegurar que una Historia de Usuario está bien construida debe evaluarse bajo el acrónimo INVEST:
* **I - Independent (Independiente):** Se puede seleccionar e implementar en cualquier orden sin dependencias rígidas.
* **N - Negotiable (Negociable):** El PO define el *qué* y el valor; el equipo técnico negocia el *cómo*.
* **V - Valuable (Valiosa):** Explicita el valor de negocio real para el usuario.
* **E - Estimatable (Estimable):** Existe suficiente claridad para calcular su tamaño/esfuerzo. Si no es estimable, se transforma en un *Spike*.
* **S - Small (Pequeña):** Su tamaño permite que empiece y termine completamente dentro de una sola iteración.
* **T - Testable (Comprobable/Probable):** Cuenta con criterios que permiten verificar objetivamente si fue implementada con éxito.
---
### Ejemplos y casos mencionados
* **Evolución del software Word (Microsoft):** Usado para ilustrar cómo un producto evoluciona a lo largo de 50 años a través de múltiples proyectos y versiones (Word para DOS, versiones para Windows, paquete Office, Office 365 en la nube).
* **Metáfora deportiva (Final Argentina vs. España):** Demostración de que la experiencia previa de un equipo no garantiza resultados idénticos en situaciones futuras; la experiencia no se extrapola directamente.
* **Nomenclaturas informales de versionado:** El hábito del estudiante de nombrar archivos como *"TP_final_ultimo_v2_este_si_es_el_bueno.doc"*, usado como contraejemplo de una disciplina profesional de Gestión de Configuración (SCM).
* **Sintaxis de una User Story real:**
* *Frase verbal:* Buscar destino por dirección.
* *Card:* **Como** conductor, **quiero** buscar un destino a partir de una calle y altura, **para poder** llegar al lugar deseado sin perderme.
* *Criterios de aceptación:* La altura debe ser numérico positivo; la búsqueda no debe demorar más de 30 segundos.
* **AFIP / ARCA:** Ejemplo real de un *Spike funcional*: un ente regulador emite una resolución exigiendo cambios operativos urgentes pero sin dar detalles de implementación, generando máxima incertidumbre que impide estimar plazos o compromisos de forma inmediata.
---
### Puntos que el docente remarcó
* **El agilismo NO es una metodología ni un proceso:** Es una filosofía y un marco de pensamiento enfocado en el cambio cultural de las personas.
* **No se puede mezclar Scrum con Cascada:** Scrum es un proceso empírico iterativo; Cascada es un ciclo secuencial donde el feedback llega al final. Mezlarlos rompe los pilares del empirismo.
* **Cero de avance en el empirismo:** La gestión en agilismo es binaria ($0$ o $1$). Una historia no está "al 80%"; o está 100% terminada (probada y aprobada) o vale 0.
* **El error de omitir el "Para poder":** Eliminar la cláusula de valor de negocio transforma la User Story en un simple requerimiento técnico redactado por un analista tradicional, perdiendo la esencia de la técnica.
* **Frase verbal vs. User Story:** Decir *"Buscar destino"* es solo el nombre corto/frase verbal. La User Story es la estructura completa con el *Como / Quiero / Para poder*.
* **El problema de la comunicación:** El fracaso del 60% de los proyectos de software se debe a deficiencias en el relevamiento y comunicación de requerimientos, no a limitaciones tecnológicas.
---
### Para el trabajo práctico / evaluación
* **Evaluación parcial:** Se solicitará redactar una **User Story completa**.
* **Criterio de corrección explícito:**
	* Debe incluir la **Frase Verbal**.
	* Debe incluir la **Sintaxis completa** (*Como [rol], quiero [actividad], para poder [valor de negocio]*).
	* Debe incluir **Criterios de Aceptación** coherentes.
	* Debe incluir **Pruebas de Usuario / Escenarios de confirmación**, asegurando incluir casos felices (*pasa*) y casos de falla (*falla*).
	* Si una historia presenta 5 criterios de aceptación, no se puede presentar solo 2 pruebas de usuario; todos los criterios deben poder probarse.
* **Evaluación del modelo INVEST:** Se usará el modelo INVEST para auditar si la historia escrita en el examen está bien construida.
---
### Dudas y cosas para revisar
* **Spikes:** Profundizar la lectura en la presentación (PPT) sobre los tipos de Spikes (técnicos vs. funcionales) y cómo se redactan formalmente en la práctica.
* **Criterio de elección de procesos:** La respuesta a la pregunta *"¿Cuándo conviene usar Scrum/Ágil y cuándo un proceso definido tradicional?"* quedó pendiente para ser desarrollada con mayor profundidad a medida que se avance en la materia.
* **Lectura obligatoria:** Revisar el paper de Fred Brooks (*"No Silver Bullet"*) citado en la PPT 1 y el libro *User Stories Applied* de Mike Cohn (disponible en el aula virtual).
## Viernes 28 de Agosto: Estimaciones Ágiles y Gestión de Productos
**Resumen en una oración:** La clase abordó los fundamentos de las estimaciones en proyectos de software, profundizó en las técnicas ágiles basadas en Story Points y Planning Poker, y explicó la gestión de productos desde la validación rápida mediante el MVP hasta la fidelización con el Producto Mínimo Adorable (MLP).
### Conceptos clave
- **Estimación:** Es la predicción acerca de algo que podría pasar en el futuro. Se caracteriza por el alto nivel de incertidumbre, especialmente al inicio del proyecto. Es la base o entrada para planear y definir compromisos de negocio, pero no es el plan en sí mismo.
- **Story Point:** Es una unidad de medida relativa que sirve para estimar en entornos ágiles. No está basada en el tiempo (como las horas absolutas), sino en el tamaño o peso de la historia de usuario, evaluando la complejidad, el esfuerzo y la incertidumbre. Esta medida solo tiene valor y significado para las personas del equipo que participan en el proyecto.
- **Wideband Delphi:** Es una técnica para estructurar el juicio de expertos mediante estimaciones grupales y por consenso. Se discute grupalmente lo que hay que estimar, cada experto hace su estimación de manera individual, y si no hay convergencia, se debaten las diferencias hasta llegar a un acuerdo iterando varias veces.
- **Poker Estimation (Planning Poker):** Es una variante o mejora del método Wideband Delphi adaptada para entornos ágiles. Los desarrolladores utilizan un mazo de cartas con valores de la serie de Fibonacci para estimar grupalmente por comparación relativa frente a una historia "canónica" o base.
- **MVP (Minimum Viable Product o Mínimo Producto Viable):** Es la porción atómica construida con el menor esfuerzo posible que se utiliza exclusivamente para validar en el mercado la hipótesis de valor de un producto. Debe ser percibido por el usuario final como un producto funcional, aunque internamente no esté completamente desarrollado.
- **Producto Mínimo Comercializable (MMP/PMC):** Evolución natural del MVP una vez que la hipótesis inicial ha sido validada. Se trata del primer release (lanzamiento) pequeño y robusto que aporta valor concreto, se puede comercializar y está destinado generalmente a los usuarios tempranos (early adopters).
- **Características Mínimas Viables (MVF):** Son piezas atómicas de funcionalidades nuevas que se agregan de forma incremental a un producto mínimo comercializable que ya tiene vida y está en mercado. Se usan para probar y validar el interés en esas funciones puntuales.
- **Producto Mínimo Adorable (MLP):** Nivel de evolución de un producto de software que, además de solucionar una necesidad de manera funcional, genera una conexión emocional y lealtad con el usuario temprano, logrando ser elegido frente a múltiples competidores en el mercado.
### Desarrollo de la clase
#### Introducción a las Estimaciones de Software
La clase inició repasando que el pensamiento Agile y el empirismo nacieron para contraponerse a los problemas que presentaba la gestión tradicional regida por procesos definidos. A partir de este contexto, se explicó que la actividad de estimar es, básicamente, hacer predicciones sobre el futuro. La gran dificultad radica en la incertidumbre inicial, la cual decrece progresivamente conforme se ejecuta el proyecto. Debido a esta evolución de la incertidumbre, la actividad de estimar no se hace una única vez, sino a lo largo de toda la vida del proyecto.
El punto conceptual más importante planteado es la distinción entre estimar y planificar. Las estimaciones brindan factibilidad técnica y son insumos para el equipo, pero no constituyen compromisos ni el plan final. El plan es el acuerdo comercial que se toma a partir de esas estimaciones. Un equipo puede reestimar y obtener valores nuevos sin que esto implique necesariamente que el plan a nivel negocio deba alterarse. Los errores en estimación generalmente ocurren por no ajustar con valores reales, usar datos históricos incorrectos, o depender de un único método cuando, dada la incertidumbre, siempre conviene combinar varias técnicas. Para estimar la técnica base inicial es "contar" (por ejemplo: requerimientos, horas u hombres involucrados).
#### Métodos Basados en la Experiencia
Se hizo un repaso general de métodos tradicionales, focalizándose en aquellos basados en la experiencia empírica. El uso de datos históricos fue el primero mencionado, consistiendo en utilizar la información de proyectos previos. Las dificultades radican en que exige que la organización tenga una cultura y un sistema tipificado de almacenamiento para saber encontrar qué datos pasados son comparables y útiles para el proyecto actual.
El segundo enfoque fue el Juicio de Experto, sumamente extendido en la práctica. Depende de la visión de un especialista, lo que puede resultar erróneo por subjetividad, sesgos del experto sobre su propio conocimiento o porque el experto no será quien finalmente realice la tarea. Para reducir la subjetividad, se sugiere estructurar este juicio mediante fórmulas matemáticas (pesos divididos sobre valores optimistas, pesimistas y habituales) o dinámicas de consenso grupal iterativo como el Wideband Delphi. Estas estimaciones tradicionales siempre arrojan unidades de medida absolutas, como horas o días calendario, que tienen un valor universal para cualquiera.
#### Estimaciones Ágiles: Puntos de Historia y Medidas Relativas
Se contrastó el mundo tradicional con los ambientes ágiles, aclarando que medir software en unidades de tiempo absolutas es inestable. Una misma tarea demandará distintos tiempos según las habilidades técnicas, conocimientos del negocio y experiencia de cada desarrollador. Por esta razón, el agilismo utiliza una medida relativa llamada "Story Point" (Punto de Historia). Estas estimaciones se logran mediante comparación, algo que biológica y cognitivamente le resulta mucho más fácil realizar al ser humano.
El Story Point refleja el "peso" o tamaño de la tarea, integrando simultáneamente tres factores: la complejidad, la cantidad de esfuerzo y la incertidumbre o lo que se desconoce de la implementación. Para escalar estos valores se utilizan herramientas numéricas, siendo la más recomendada la Serie de Fibonacci (1, 2, 3, 5, 8...) en lugar de talles de ropa o escalas del 1 al 10. Esto ocurre porque la dificultad de construir software no crece linealmente; el incremento de complejidad es exponencial a medida que aumenta el tamaño del requerimiento.
#### El Método Poker Estimation (Planning Poker)
La estimación ágil implementa el Poker Estimation, que es directamente una mejora empírica de Wideband Delphi. La base inquebrantable de la técnica es que quienes realizan la estimación son pura y exclusivamente las personas que van a desarrollar la tarea, nunca expertos externos. La técnica usa las cartas físicas para fomentar la discusión.
El proceso es metódico: primero, el equipo debe llegar a un acuerdo para identificar una historia de usuario muy sencilla o "canónica" que funcionará como vara de medida inamovible, asignándole normalmente el valor 1 (o 2 en equipos más entrenados). Luego, toman del listado la historia a estimar, el Product Owner despeja dudas técnicas y funcionales, y cada estimador compara mentalmente el peso de esta nueva historia frente a la canónica. Si un desarrollador considera que la nueva tarea pesa el quíntuple que la canónica, seleccionará en secreto la carta con el 5 de Fibonacci. Tras revelar las cartas simultáneamente, se contrastan los casos extremos. Si alguien votó 2 y otro votó 8, deben argumentar qué factores de riesgo (o de simplificación) vieron para votar de esa forma. Luego de debatir, se vuelve a votar, repitiendo el proceso las veces necesarias hasta que las estimaciones individuales convergen en un único valor de grupo de forma consensuada.
#### Gestión de Producto y Lean Startup
La segunda sección abordó la construcción del producto, remarcando que "escribir código" dista mucho de "crear valor". Crear partes del software que los usuarios nunca van a usar es considerado desperdicio económico y pérdida de tiempo. Por ende, es necesario aplicar un diseño centrado no solo en completar tareas funcionales, sino en la experiencia real del usuario en el mercado.
El ciclo de validación sigue las premisas del Lean Startup. Todo comienza por un Mínimo Producto Viable (MVP), diseñado como una tajada rápida elaborada con el mínimo esfuerzo técnico indispensable. Su fin no es ganar dinero inmediato, sino validar de urgencia la hipótesis: ¿hay alguien dispuesto a usar lo que estoy planteando?. Si todo el mundo pide características discordantes, la idea inicial falló, pero como se construyó rápidamente y sin esfuerzo masivo, el impacto negativo es casi cero. Si la validación es positiva, la hipótesis de mercado existe y el equipo puede destinar presupuesto fuerte.
#### Escalando el Producto: MMP, MVF y MLP
Validado el terreno, el desarrollo cambia a un Producto Mínimo Comercializable (MMP o PMC). Ya no es un experimento provisorio, sino el primer lanzamiento formal (release) del producto. Es robusto y se orienta típicamente a cautivar a los "early adopters" aportando valor genuino transaccionable. Con un MMP andando en la calle, el equipo usa las Características Mínimas Viables (MVF) para validar a pequeña escala nuevas ideas o agregados puntuales sobre ese mismo ecosistema, iterando permanentemente.
El pináculo del desarrollo moderno es llegar al Producto Mínimo Adorable (MLP). Ante la abrumadora saturación de mercado, resolver la tarea ya no garantiza el éxito, puesto que la competencia puede ofrecer idéntica solución funcional. El MLP exige diseñar de manera tal que el software produzca un arraigo, un enganche y una conexión emocional sólida con el usuario desde su adopción temprana. Las animaciones, el branding y las respuestas emocionales logran retener a la base y generar fanatismo por la herramienta a lo largo del tiempo.
### Ejemplos y casos mencionados
- **Empire State y otra torre elevada:** La profesora usó esta analogía gráfica para demostrar el fundamento de las medidas relativas. A simple vista, el ser humano no puede adivinar los metros absolutos de una torre, pero al compararla con una que conoce, sabe instantáneamente si es más alta o más baja y en qué proporción.
- **Talles de Remera (S, M, L, XL):** Se citó como ejemplo introductorio de cómo usar una escala comparativa fácil de entender para medir historias antes de aplicar Fibonacci.
- **Dropbox:** Se relató el caso de su creador, quien en lugar de desarrollar la compleja tecnología subyacente para compartir repositorios (que no existía), creó un MVP consistente en un simple video explicativo de tres minutos que parecía funcionar realmente. Al publicarlo, validó el furor del mercado (la hipótesis) antes de escribir código exhaustivo.
- **Reproducir música desde anteojos inteligentes:** Se mencionó hipotéticamente para ilustrar el riesgo de lanzar ideas audaces; si uno creyese tener esta idea revolucionaria, necesitaría un MVP urgente para asegurarse de que el cliente realmente vaya a aceptar la propuesta de valor.
- **WhatsApp:** Expuesto como el ejemplo clásico del MLP. Existen incontables sistemas de mensajería gratuita que hacen lo mismo a nivel tareas, pero el usuario elige de forma masiva a WhatsApp debido a que logró una vinculación que excede lo estrictamente funcional.
- **Spotify vs. YouTube Music:** Se cuestionó por qué un usuario se ancla con una de estas apps cuando ambas brindan el acceso a los mismos repertorios musicales. Se apuntó a que muchas veces esa adopción inicial y gusto repetido es evidencia del concepto de adorabilidad (MLP).
- **Moodle:** Se hizo una breve mención de Moodle como caso sumado recientemente a las clases para ejemplificar aspectos del MVP.
### Puntos que el docente remarcó
- **Estimación no es compromiso:** Repitió exhaustivamente que las estimaciones nunca son compromisos rígidos y nunca equivalen al plan final. Son exclusivamente variables e insumos de protección técnica para que luego negocio redacte el compromiso.
- **Responsabilidad de la tarea en Planning Poker:** Los únicos autorizados a dar su estimación son los desarrolladores (o hacedores) de la tarea. No se admiten estimadores externos ni expertos pasivos.
- **Límite en la escala de Story Points:** Al estimar, las tarjetas verdes o recomendadas son menores a 8. Si una User Story resulta con un 8, 13, 20 o más, esto refleja que el requerimiento se salió de rango o que es inconmensurablemente más grande que la canónica (valor 1). Remarcó tajantemente que en estos casos, la tarea debe desglosarse o dividirse.
- **Alineación con el criterio INVEST:** La profesora subrayó la regla "Small" (las tareas gigantes deben partirse) y la "Estimable" (si tiran un comodín de infinito, un cero o un signo de pregunta, la historia carece de detalles funcionales suficientes para evaluarse y hay que preguntar al Product Owner).
- **La palabra 'Mínimo' no es tamaño físico:** En el MVP, el término mínimo no hace referencia a que el producto resultante sea "chiquito" o limitado a nivel visual. Remarcó que MVP significa esfuerzo atómico; puede ser un sistema enorme y muy complejo si esa complejidad era "lo estrictamente indispensable" para validar el valor.
### Para el trabajo práctico / evaluación
- **Poker Planning en la Práctica:** En la próxima clase práctica, los docentes llevarán adelante un laboratorio de Poker Estimation y MVP. Se instruyó a los alumnos a descargar o imprimir obligatoriamente un mazo físico de cartas para Planning Poker desde un enlace proporcionado en las diapositivas.
- **Evaluación General:** Todos los temas vistos en esta clase (tanto estimaciones ágiles como validación/MVP) entran en los temarios para rendir el examen parcial teórico y los trabajos prácticos.
- **Próxima Clase Teórica:** Salvo que surjan medidas de fuerza como el paro del día, la próxima clase será presencial. El tema principal será la gestión tradicional de proyectos, las estimaciones tradicionales (horas, costos, recursos) y los componentes de un proyecto de software.
### Dudas y cosas para revisar
- **Estimaciones Tradicionales:** El tema quedó sumamente acotado en la clase ya que la profesora lo usó sólo como contexto previo a la estimación ágil. Se indicó que el conocimiento en profundidad de estimaciones tradicionales, horas lineales y calendarios quedará como pilar para la clase siguiente.
- **Scrum, roles y pautas del Agilismo (Spike/Developers):** Durante la técnica de cartas, los estudiantes consultaron por divisiones de tareas, Scrum Masters, roles de quienes estiman y conceptos híbridos como "Spike". La docente frenó momentáneamente estas dudas marcando que el rompecabezas terminará de encajar orgánicamente cuando vean en detenimiento el framework Scrum propiamente dicho más adelante.
- **División de User Stories mayores a 8:** Hubo un pequeño momento de confusión sobre si desglosar una historia inmensa implicaba crear subtareas técnicas (tasks) o nuevas entidades de negocio completas. Se determinó que se debe enunciar de forma distinta la necesidad para dar origen a dos (o más) User Stories independientes, pero este proceso analítico en la práctica podría requerir mayor profundización por parte de los alumnos.
## Viernes 4 de Septiembre: Componentes de un Proyecto de Desarrollo de Software y Gestión
**Resumen en una oración:** La clase abordó la conceptualización de los procesos de desarrollo (definidos y empíricos), los ciclos de vida del producto y proyecto, la complejidad intrínseca del software basándose en Fred Brooks, y los pilares de la gestión de proyectos, incluyendo la planificación, el alcance, los riesgos y el uso adecuado de métricas.
### Conceptos clave
- **Proceso de Software:** Secuencia de pasos, actividades y metodologías utilizadas para crear software, donde es fundamental la participación humana al ser una actividad "humano intensiva". Puede ser automatizado mediante herramientas.
- **Proyecto:** Es la instanciación de un proceso, caracterizado por ser único, tener una duración limitada (inicio y fin claramente definidos) y estar orientado a un objetivo cuantificable y medible mediante tareas interrelacionadas.
- **Proceso Definido:** Inspirado en las líneas de producción tradicionales, asume que si se repiten las actividades de la misma manera, los resultados serán predecibles y similares.
- **Proceso Empírico:** Basado en la inspección y la adaptación (aprender de la experiencia), asume variables cambiantes y es ideal para la creación de sistemas complejos donde no se puede predecir todo por adelantado.
- **Ciclo de Vida del Producto:** Inicia con una necesidad o idea (o un MVP) y se extiende durante toda la vida útil del software en el mercado (operación y mantenimiento) hasta que queda obsoleto y se retira.
- **Ciclo de Vida del Proyecto:** Es la representación de cómo se ejecutará el proceso (cómo se ordenan las fases y actividades) en un tiempo delimitado.
- **Alcance de Producto (Product Scope):** La lista de requerimientos funcionales o características que el software debe tener (qué se va a construir).
- **Alcance de Proyecto (Project Scope):** Todo el trabajo concreto (programar, diseñar, probar, gestionar la configuración) que el equipo debe realizar para poder entregar el alcance del producto.
- **Triple Restricción:** Modelo de gestión donde todo proyecto está limitado por tres factores interdependientes: Alcance, Tiempo y Costo (presupuesto). Cualquier cambio en uno afecta a los demás y, en consecuencia, a la calidad.
- **Exposición al Riesgo:** Es el resultado del producto entre la probabilidad de ocurrencia de un riesgo y su impacto.
### Desarrollo de la clase
#### Procesos de Desarrollo y Automatización
La clase comenzó definiendo que un producto de software se crea a través de un proceso, el cual se instancia en un proyecto. Dado que el desarrollo es una actividad que depende fuertemente de las personas, el proceso busca estructurar este esfuerzo. Este proceso se puede automatizar usando diversas herramientas (por ejemplo, GitHub para control de versiones o herramientas para despliegues y pruebas automatizadas) para hacer la ejecución más sencilla y efectiva, evitando preocuparse por "accidentes" o detalles menores.
#### Procesos Definidos vs. Empíricos
El docente explicó que existen dos paradigmas principales. Los **procesos definidos** provienen de la gestión tradicional y disciplinas de ingeniería clásicas. Su premisa es la repetitividad: juntando los mismos elementos de la misma forma, se puede predecir el resultado. Sin embargo, en el software intervienen múltiples variables que dificultan esta predictibilidad. Por otro lado, los **procesos empíricos** surgen para lidiar con esta complejidad a través de la inspección y adaptación constante. Frameworks como Scrum marcan reglas (eventos, métricas, roles) para este aprendizaje continuo sin caer en la anarquía. Todo proceso empírico sigue el patrón de: asumir una hipótesis, ejecutar, medir, revisar y adaptar para mejorar.
#### Ciclos de Vida
Se hizo una fuerte distinción entre el producto y el proyecto. Un producto tiene una vida larga, comenzando desde la idea inicial y continuando por años de operación. Un proyecto, en cambio, es temporal. Un mismo producto de software puede requerir múltiples proyectos a lo largo de su vida (uno para crearlo, otros para agregarle funcionalidades). Existen ciclos de vida secuenciales, iterativos y recursivos. Un punto crucial que el docente desmitificó es que el ciclo iterativo e incremental no es exclusivo de los métodos ágiles/empíricos; los procesos definidos (como RUP) también los utilizan para mitigar riesgos tempranos.
#### La Complejidad del Software (Fred Brooks)
Apoyándose en los textos de Fred Brooks ("No Silver Bullet" y "The Mythical Man-Month"), se discutió por qué desarrollar software es difícil. Existen dos tipos de complejidades:
- **Accidental:** Dificultades tecnológicas (hardware limitado, lenguajes engorrosos) que las herramientas modernas sí han ido resolviendo.
- **Esencial:** La dificultad inherente de entender lo que el usuario realmente quiere, la invisibilidad del software y los requisitos constantemente cambiantes. Brooks señala que "no hay bala de plata" tecnológica que resuelva la complejidad esencial, ya que el mayor desafío es la especificación y el diseño, no escribir código. Además, estableció la "Ley de Brooks", que dicta que agregar personal a un proyecto de software retrasado lo atrasará aún más, debido al esfuerzo de comunicación (que crece exponencialmente con más personas) y al tiempo de capacitación necesario que inevitablemente recae sobre el equipo original. También se alertó sobre el riesgo de agregar funcionalidades innecesarias ("featuritis"), lo cual distorsiona el objetivo y la integridad conceptual del diseño.
#### Planificación y Gestión de Proyectos
El Líder de Proyecto es el responsable de asegurar que el trabajo se haga en tiempo, dentro del presupuesto y cumpliendo el alcance, manejando la "Triple Restricción" y negociando constantemente con el cliente ante los cambios. El **Plan de Proyecto** es un documento "vivo" (no se escribe en piedra al principio) que detalla el alcance, los costos, el proceso y ciclo de vida, los recursos, los cronogramas y los planes subsidiarios como la gestión de configuración (roles, ramas, nombres) y la gestión de riesgos.
#### Riesgos, Métricas y Control
Los riesgos son problemas potenciales que se evalúan calculando su exposición (Probabilidad x Impacto) para intentar mitigarlos mediante prevención o planes de contingencia. En cuanto al monitoreo, se utilizan métricas divididas en tres dominios:
- **Producto:** Tamaño, cantidad de defectos.
- **Proyecto:** Esfuerzo gastado vs. planificado, tiempo de calendario.
- **Proceso:** Rendimiento a lo largo de varios proyectos para evaluar a la organización en el tiempo. El monitoreo busca comparar lo planificado contra lo real. Desviarse demasiado hacia arriba o hacia abajo es un indicador de problemas de estimación o de que el equipo está "trabajando para la métrica" en lugar de para el producto.
### Ejemplos y casos mencionados
- **Herramientas de automatización:** Se mencionó a GitHub y herramientas de _deploy_ automatizado como ejemplos de apoyo al proceso.
- **Universidad de California (Empirismo):** En lugar de predefinir los caminos del campus, dejaron que los estudiantes caminaran sobre el pasto un año y luego construyeron las sendas sobre las huellas reales (inspección y adaptación).
- **Construcción de una casa:** Analogía para explicar lo difícil que es para un usuario saber qué quiere hasta que no lo ve construido o diseñado.
- **El embarazo (Fred Brooks):** Para ilustrar que "meses y hombres no son intercambiables", un embarazo lleva 9 meses; poner a 9 mujeres no reduce el tiempo a 1 mes, ya que hay tareas estrictamente secuenciales.
- **Viaje a la Patagonia:** Analogía principal de la planificación. El Plan de Proyecto es como la hoja de ruta del viaje (paradas, costos, tiempos). Si el auto se rompe el segundo día, el plan debe ser modificado y adaptado; es un ente vivo. Las métricas de proyecto serían preguntar "cómo vamos con la nafta hoy", y las de proceso serían analizar "cómo nos fue presupuestariamente en todos los viajes de los últimos 5 años".
### Puntos que el docente remarcó
- **¡Muy importante!** Utilizar un ciclo de vida "iterativo e incremental" NO es propiedad exclusiva de los procesos empíricos/ágiles. Los procesos tradicionales definidos también pueden usarlo para no depender del ciclo en cascada.
- **El mito de las horas-hombre:** Es imposible acortar tiempos agregando recursos de forma matemática porque las tareas de software tienen dependencias secuenciales fuertes.
- **El uso de las métricas:** Las métricas **NUNCA** deben usarse para medir el desempeño individual de las personas. Hacerlo provoca que el equipo distorsione su esfuerzo "trabajando para la métrica" en lugar de construir un buen software. El desempeño personal debe medirse con otras herramientas cualitativas u objetivos específicos.
- **Planificación realista:** Desconfiar si los resultados reales coinciden exactamente a la perfección con lo planificado (es muy sospechoso y sugiere manipulación de datos), o si sobran demasiados recursos (indica que se planificó con excesivo margen o "colchón").
- Las causas principales del fracaso de un proyecto no suelen ser tecnológicas, sino fallas en el proceso de comunicación, en la planificación temprana y la falta de seguimiento.
### Para el trabajo práctico / evaluación
- La materia es semestral y conlleva una carga horaria exigente; se requiere asistir al 80% de las clases prácticas porque se evalúan ejercicios directos para el parcial.
- **Tarea para la próxima clase:** Leer obligatoriamente la Guía de Scrum 2026, ya que será la base de los siguientes temas.
- El Trabajo Práctico requiere una fuerte gestión de la configuración (ramas, dispositivos, nomenclaturas) que es un plan anexo al de Gestión de Proyecto.
- Adicionalmente, el TP incluirá la creación de una gran cantidad de _User Stories_ y, llamativamente, la confección de un "zoológico de plastilina".
### Dudas y cosas para revisar
- Quedó algo confusa la explicación exacta de cómo cuantificar la disponibilidad del personal en relación a las horas/esfuerzo de las estimaciones en metodologías tradicionales (una consulta de un alumno no se resolvió con total claridad en el audio).
- Convendría investigar más a fondo cómo evaluar correctamente el desempeño de un desarrollador (métodos cualitativos) sin contaminar las métricas del proyecto, ya que el docente recomendó separarlo completamente.
- La relación específica de cómo los "riesgos" impactan directamente el plan de configuración (surgió una pregunta pero fue interrumpida por el debate de exposición vs probabilidad).