export type ServiceCapability = {
  icon: string;
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceLandingConfig = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  description: string;
  heroIcon: string;
  accent: string;
  accentRgb: string;
  accentSoft: string;
  accentInk: string;
  heroKeywords: string[];
  heroSignals: Array<{ label: string; value: string }>;
  outcomeTitle: string;
  outcomes: Array<{ value: string; label: string }>;
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilities: ServiceCapability[];
  processEyebrow: string;
  processTitle: string;
  processIntro: string;
  process: ServiceProcessStep[];
  deliverablesEyebrow: string;
  deliverablesTitle: string;
  deliverablesDescription: string;
  deliverables: string[];
  sideCardTitle: string;
  sideCardText: string;
  sideCardItems: string[];
  faqEyebrow: string;
  faqTitle: string;
  faqs: ServiceFaq[];
  contactTitle: string;
  contactText: string;
  metadataTitle: string;
  metadataDescription: string;
};

export const serviceLandings: Record<string, ServiceLandingConfig> = {
  "redes-sociales-tenerife": {
    slug: "redes-sociales-tenerife",
    navLabel: "Redes sociales",
    eyebrow: "Estrategia, contenido y comunidad",
    title: "Redes sociales que convierten cada publicación en",
    highlightedTitle: "una oportunidad de negocio",
    description:
      "Diseñamos una presencia social reconocible, constante y conectada con tus objetivos para que tu marca gane relevancia, conversación y clientes sin publicar por publicar.",
    heroIcon: "MessageSquareMore",
    accent: "#ff4f8b",
    accentRgb: "255, 79, 139",
    accentSoft: "#fff0f5",
    accentInk: "#8f1648",
    heroKeywords: ["Estrategia", "Contenido", "Comunidad", "Campañas"],
    heroSignals: [
      { label: "Contenido", value: "Con intención" },
      { label: "Comunidad", value: "Activa" },
      { label: "Resultados", value: "Medibles" },
    ],
    outcomeTitle:
      "Tu marca no necesita estar en todas partes. Necesita aparecer con sentido donde está tu cliente.",
    outcomes: [
      { value: "1 voz", label: "Una identidad reconocible en cada publicación" },
      { value: "360º", label: "Contenido conectado con campañas y ventas" },
      { value: "Mes a mes", label: "Aprendizaje y optimización continuos" },
    ],
    capabilitiesEyebrow: "Qué activamos",
    capabilitiesTitle: "Un sistema de contenidos que trabaja para tu negocio",
    capabilitiesIntro:
      "Combinamos estrategia, creatividad, producción y análisis para construir una presencia social sostenible y útil para la marca, el equipo comercial y la comunidad.",
    capabilities: [
      {
        icon: "Target",
        title: "Estrategia de contenidos",
        description:
          "Definimos públicos, territorios de comunicación, objetivos y formatos para dejar de improvisar cada semana.",
      },
      {
        icon: "GalleryHorizontalEnd",
        title: "Diseño y producción",
        description:
          "Creamos piezas visuales, carruseles, vídeos cortos y recursos adaptados a la personalidad de tu marca.",
      },
      {
        icon: "MessageSquareMore",
        title: "Gestión de comunidad",
        description:
          "Organizamos publicaciones, conversación y respuesta para mantener una relación cercana y profesional.",
      },
      {
        icon: "Megaphone",
        title: "Campañas en Meta",
        description:
          "Impulsamos contenidos y campañas de captación con segmentación, creatividades y objetivos bien definidos.",
      },
      {
        icon: "Sparkles",
        title: "Guiones y formatos",
        description:
          "Convertimos ideas, servicios y conocimiento del negocio en contenidos fáciles de entender, recordar y compartir.",
      },
      {
        icon: "ChartNoAxesCombined",
        title: "Analítica y mejora",
        description:
          "Revisamos alcance, interacción, tráfico y oportunidades para decidir qué repetir, ajustar o descartar.",
      },
    ],
    processEyebrow: "Cómo trabajamos",
    processTitle: "De publicar por obligación a comunicar con una dirección clara",
    processIntro:
      "Creamos un ritmo de trabajo realista para que estrategia, producción, aprobación y análisis funcionen sin bloquear a tu equipo.",
    process: [
      {
        number: "01",
        title: "Diagnóstico social",
        description:
          "Revisamos perfiles, contenidos, competencia, públicos, recursos internos y relación con el proceso comercial.",
      },
      {
        number: "02",
        title: "Sistema editorial",
        description:
          "Definimos pilares, tono, formatos, frecuencia y criterios visuales para construir una presencia coherente.",
      },
      {
        number: "03",
        title: "Producción y publicación",
        description:
          "Preparamos contenidos por ciclos, coordinamos validaciones y publicamos cada pieza con un objetivo concreto.",
      },
      {
        number: "04",
        title: "Lectura y evolución",
        description:
          "Analizamos señales de audiencia y negocio para mejorar mensajes, formatos, campañas y próximos contenidos.",
      },
    ],
    deliverablesEyebrow: "Qué recibes",
    deliverablesTitle: "Contenido organizado, reconocible y listo para crecer",
    deliverablesDescription:
      "Dejamos una base práctica para mantener la consistencia, agilizar la producción y entender qué papel cumple cada publicación dentro de la estrategia.",
    deliverables: [
      "Estrategia social y pilares de contenido",
      "Calendario editorial por ciclos",
      "Guiones, copys y piezas creativas",
      "Plantillas y criterios visuales",
      "Informe de resultados y próximos experimentos",
    ],
    sideCardTitle: "Una marca que participa, aporta y permanece en la memoria.",
    sideCardText:
      "La constancia funciona cuando cada contenido tiene una idea clara, una identidad reconocible y un siguiente paso para la audiencia.",
    sideCardItems: ["Relevancia", "Comunidad", "Conversión"],
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Antes de empezar a publicar",
    faqs: [
      {
        question: "¿En qué redes debería estar mi negocio?",
        answer:
          "Lo decidimos según tu público, oferta, capacidad de producción y objetivo. Es mejor trabajar bien uno o dos canales que mantener muchos perfiles sin dirección.",
      },
      {
        question: "¿Necesito grabar vídeos constantemente?",
        answer:
          "No necesariamente. Diseñamos una mezcla de formatos viable y podemos organizar sesiones de producción para aprovechar el tiempo y generar material para varias semanas.",
      },
      {
        question: "¿Incluye la gestión de mensajes y comentarios?",
        answer:
          "Puede incluirla. Acordamos qué tipo de respuestas gestiona AIBE, cuáles necesita validar tu equipo y cómo trasladar las oportunidades comerciales.",
      },
      {
        question: "¿Podéis trabajar con nuestro material y equipo interno?",
        answer:
          "Sí. Podemos asumir la producción completa o crear el sistema, los guiones y la dirección creativa para colaborar con las personas que ya generan contenido en tu negocio.",
      },
    ],
    contactTitle: "Hagamos que tus redes tengan una función dentro del negocio",
    contactText:
      "Cuéntanos qué estás publicando, qué te gustaría conseguir y qué recursos tienes. Te propondremos una primera dirección de trabajo sin compromiso.",
    metadataTitle: "Gestión de redes sociales en Tenerife | AIBE Technologies",
    metadataDescription:
      "Estrategia de redes sociales, creación de contenido, community management y campañas en Meta para negocios en Tenerife.",
  },

  "marketing-digital-tenerife": {
    slug: "marketing-digital-tenerife",
    navLabel: "Marketing digital",
    eyebrow: "Estrategia, campañas y medición",
    title: "Marketing digital que convierte atención en",
    highlightedTitle: "oportunidades reales",
    description:
      "Conectamos contenido, publicidad, posicionamiento y analítica en una estrategia única para que tu negocio deje de improvisar y empiece a crecer con criterio.",
    heroIcon: "Megaphone",
    accent: "#2e7bff",
    accentRgb: "46, 123, 255",
    accentSoft: "#edf4ff",
    accentInk: "#0a2e71",
    heroKeywords: ["SEO local", "Google Ads", "Meta Ads", "Contenido"],
    heroSignals: [
      { label: "Canales", value: "Coordinados" },
      { label: "Decisiones", value: "Basadas en datos" },
      { label: "Mejora", value: "Continua" },
    ],
    outcomeTitle: "Una estrategia pensada para avanzar, no para acumular acciones sueltas.",
    outcomes: [
      { value: "01", label: "Una hoja de ruta clara" },
      { value: "360º", label: "Visión completa del recorrido del cliente" },
      { value: "24/7", label: "Medición de campañas y oportunidades" },
    ],
    capabilitiesEyebrow: "Qué podemos activar",
    capabilitiesTitle: "El mix adecuado para cada objetivo",
    capabilitiesIntro:
      "Seleccionamos los canales por su utilidad para tu negocio, no por moda. Cada acción tiene una función, una métrica y una siguiente decisión.",
    capabilities: [
      {
        icon: "Target",
        title: "Estrategia de captación",
        description:
          "Definimos públicos, propuesta de valor, recorrido de conversión y prioridades antes de invertir.",
      },
      {
        icon: "Search",
        title: "SEO y posicionamiento local",
        description:
          "Mejoramos la presencia de tu negocio en búsquedas relevantes, Google Maps y contenidos útiles.",
      },
      {
        icon: "BadgeEuro",
        title: "Publicidad digital",
        description:
          "Creamos y optimizamos campañas en Google y Meta con foco en contactos, reservas o ventas.",
      },
      {
        icon: "PanelsTopLeft",
        title: "Contenido que guía",
        description:
          "Diseñamos piezas y mensajes que atraen, explican el valor de tu oferta y facilitan la decisión.",
      },
      {
        icon: "Mail",
        title: "Email y automatizaciones",
        description:
          "Construimos seguimientos que recuperan oportunidades y mantienen activa la relación con tus clientes.",
      },
      {
        icon: "ChartNoAxesCombined",
        title: "Analítica y mejora",
        description:
          "Unificamos los datos importantes en informes comprensibles y ciclos de optimización continuos.",
      },
    ],
    processEyebrow: "Cómo trabajamos",
    processTitle: "De la intuición a un sistema de crecimiento",
    processIntro:
      "El proyecto avanza por etapas cortas. Cada fase deja decisiones, materiales y aprendizajes que alimentan la siguiente.",
    process: [
      {
        number: "01",
        title: "Diagnóstico",
        description:
          "Revisamos presencia digital, competencia, datos disponibles y puntos de fuga del proceso comercial.",
      },
      {
        number: "02",
        title: "Plan de acción",
        description:
          "Priorizamos canales, mensajes, presupuesto y objetivos para los próximos ciclos de trabajo.",
      },
      {
        number: "03",
        title: "Activación",
        description:
          "Lanzamos campañas, contenidos y automatizaciones con una medición preparada desde el inicio.",
      },
      {
        number: "04",
        title: "Optimización",
        description:
          "Analizamos qué mueve el negocio, descartamos ruido y concentramos recursos en lo que funciona.",
      },
    ],
    deliverablesEyebrow: "Qué recibes",
    deliverablesTitle: "Un sistema que tu equipo puede entender y utilizar",
    deliverablesDescription:
      "No entregamos una colección de acciones aisladas. Dejamos una base organizada para que campañas, contenido y ventas trabajen en la misma dirección.",
    deliverables: [
      "Mapa de oportunidades y prioridades",
      "Plan de canales, mensajes y campañas",
      "Configuración de medición y conversiones",
      "Calendario de contenidos y acciones",
      "Informe de evolución con próximos pasos",
    ],
    sideCardTitle: "Menos ruido. Más decisiones útiles.",
    sideCardText:
      "Centralizamos lo esencial para que sepas qué está ocurriendo, por qué y dónde conviene invertir el siguiente esfuerzo.",
    sideCardItems: ["Visibilidad", "Captación", "Conversión"],
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Antes de empezar",
    faqs: [
      {
        question: "¿Es necesario trabajar todos los canales a la vez?",
        answer:
          "No. Empezamos por los canales con más sentido para tu objetivo, capacidad operativa y presupuesto. El plan puede crecer por fases.",
      },
      {
        question: "¿Podéis trabajar con campañas que ya están activas?",
        answer:
          "Sí. Auditamos la configuración actual, detectamos oportunidades y decidimos qué conservar, corregir o replantear.",
      },
      {
        question: "¿Cómo se mide el trabajo?",
        answer:
          "Definimos indicadores relacionados con negocio: contactos cualificados, reservas, ventas, coste por oportunidad y evolución de la conversión.",
      },
      {
        question: "¿Trabajáis con negocios locales y empresas B2B?",
        answer:
          "Sí. Adaptamos el recorrido, los mensajes y los canales al tipo de cliente y al ciclo de decisión de cada negocio.",
      },
    ],
    contactTitle: "Cuéntanos qué quieres conseguir con tu marketing",
    contactText:
      "Revisaremos tu punto de partida y te propondremos una primera hoja de ruta sin compromiso.",
    metadataTitle: "Marketing digital en Tenerife | AIBE Technologies",
    metadataDescription:
      "Estrategia de marketing digital, SEO local, Google Ads, Meta Ads, contenidos y analítica para negocios en Tenerife.",
  },

  "diseno-web-branding-tenerife": {
    slug: "diseno-web-branding-tenerife",
    navLabel: "Diseño web y branding",
    eyebrow: "Identidad, experiencia y contenido visual",
    title: "Diseño que hace que tu negocio se vea",
    highlightedTitle: "claro, sólido y memorable",
    description:
      "Creamos identidades y experiencias digitales que transmiten confianza, explican mejor tu propuesta y mantienen coherencia en todos tus puntos de contacto.",
    heroIcon: "Palette",
    accent: "#7c4dff",
    accentRgb: "124, 77, 255",
    accentSoft: "#f2efff",
    accentInk: "#30148c",
    heroKeywords: ["Identidad", "UX/UI", "Landings", "Contenido visual"],
    heroSignals: [
      { label: "Marca", value: "Reconocible" },
      { label: "Experiencia", value: "Intuitiva" },
      { label: "Sistema", value: "Coherente" },
    ],
    outcomeTitle: "Una imagen atractiva es el principio. La claridad y la coherencia hacen el resto.",
    outcomes: [
      { value: "1", label: "Lenguaje visual común" },
      { value: "100%", label: "Diseño adaptable a cada formato" },
      { value: "3 capas", label: "Marca, experiencia y conversión" },
    ],
    capabilitiesEyebrow: "Qué diseñamos",
    capabilitiesTitle: "Una identidad que funciona dentro y fuera de la pantalla",
    capabilitiesIntro:
      "Combinamos estrategia visual, diseño de interfaces y sistemas de contenido para que tu marca mantenga el mismo nivel de calidad en cada canal.",
    capabilities: [
      {
        icon: "Fingerprint",
        title: "Identidad de marca",
        description:
          "Definimos concepto visual, logotipo, color, tipografía y reglas para construir reconocimiento.",
      },
      {
        icon: "MonitorSmartphone",
        title: "Diseño web UX/UI",
        description:
          "Creamos interfaces claras y responsive que ayudan al usuario a comprender, navegar y actuar.",
      },
      {
        icon: "PanelsTopLeft",
        title: "Landing pages",
        description:
          "Diseñamos páginas enfocadas en una oferta y una acción concreta, preparadas para campañas.",
      },
      {
        icon: "GalleryHorizontalEnd",
        title: "Sistemas para redes",
        description:
          "Construimos plantillas y criterios visuales para publicar con agilidad sin perder coherencia.",
      },
      {
        icon: "PackageOpen",
        title: "Piezas comerciales",
        description:
          "Presentaciones, dossiers, propuestas y recursos que ayudan a explicar y vender mejor.",
      },
      {
        icon: "Sparkles",
        title: "Motion y recursos digitales",
        description:
          "Añadimos movimiento y microinteracciones cuando mejoran la comprensión o la percepción de valor.",
      },
    ],
    processEyebrow: "Cómo damos forma a la marca",
    processTitle: "Diseñar con intención antes de decorar",
    processIntro:
      "Cada decisión visual parte de una idea de negocio y de una necesidad del usuario. Así evitamos una estética bonita pero desconectada.",
    process: [
      {
        number: "01",
        title: "Contexto",
        description:
          "Conocemos la propuesta, el público, la personalidad de marca y los materiales actuales.",
      },
      {
        number: "02",
        title: "Dirección creativa",
        description:
          "Exploramos territorios visuales y acordamos una dirección antes de desarrollar el sistema completo.",
      },
      {
        number: "03",
        title: "Diseño y prototipo",
        description:
          "Construimos las piezas clave y validamos jerarquía, contenido, interacción y adaptaciones.",
      },
      {
        number: "04",
        title: "Sistema y entrega",
        description:
          "Organizamos archivos, componentes y reglas para que la identidad pueda crecer de forma consistente.",
      },
    ],
    deliverablesEyebrow: "Qué recibes",
    deliverablesTitle: "Diseño preparado para el trabajo diario",
    deliverablesDescription:
      "Los entregables se organizan para que tu equipo, proveedores y canales puedan utilizar la marca sin perder calidad ni tiempo.",
    deliverables: [
      "Dirección visual y criterios de marca",
      "Diseños responsive y prototipos navegables",
      "Biblioteca de componentes y plantillas",
      "Archivos optimizados para cada uso",
      "Guía práctica de aplicación",
    ],
    sideCardTitle: "Una marca que se reconoce sin explicaciones.",
    sideCardText:
      "La consistencia visual reduce dudas, mejora la percepción de calidad y facilita que cada nueva pieza encaje en el conjunto.",
    sideCardItems: ["Claridad", "Coherencia", "Personalidad"],
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Lo importante antes de diseñar",
    faqs: [
      {
        question: "¿Podéis renovar una marca existente sin empezar de cero?",
        answer:
          "Sí. Podemos evolucionar sus elementos reconocibles, corregir inconsistencias y crear un sistema más actual y funcional.",
      },
      {
        question: "¿El diseño web incluye desarrollo?",
        answer:
          "Puede incluirlo. Definimos el alcance según necesites solo diseño y prototipo o una solución completa lista para publicar.",
      },
      {
        question: "¿Entregáis plantillas editables?",
        answer:
          "Sí, cuando el proyecto lo requiere. Preparamos recursos para que el equipo pueda producir nuevas piezas manteniendo la identidad.",
      },
      {
        question: "¿Trabajáis proyectos pequeños?",
        answer:
          "Sí. Podemos empezar por una landing, una presentación o un sistema visual básico y ampliarlo después.",
      },
    ],
    contactTitle: "Hablemos de cómo debería verse y sentirse tu marca",
    contactText:
      "Cuéntanos qué necesitas renovar, lanzar o ordenar. Te propondremos un alcance claro y realista.",
    metadataTitle: "Diseño web y branding en Tenerife | AIBE Technologies",
    metadataDescription:
      "Diseño de identidad, branding, UX/UI, landing pages y sistemas visuales para empresas y negocios en Tenerife.",
  },

  "desarrollo-web-tenerife": {
    slug: "desarrollo-web-tenerife",
    navLabel: "Desarrollo web",
    eyebrow: "Webs, aplicaciones e integraciones",
    title: "Tecnología útil para convertir procesos en",
    highlightedTitle: "experiencias simples",
    description:
      "Diseñamos y desarrollamos soluciones web rápidas, mantenibles y conectadas con las herramientas que tu negocio ya utiliza.",
    heroIcon: "Code2",
    accent: "#00a67d",
    accentRgb: "0, 166, 125",
    accentSoft: "#e9faf5",
    accentInk: "#005f49",
    heroKeywords: ["Web corporativa", "Ecommerce", "SaaS", "Integraciones"],
    heroSignals: [
      { label: "Rendimiento", value: "Optimizado" },
      { label: "Código", value: "Mantenible" },
      { label: "Escalado", value: "Preparado" },
    ],
    outcomeTitle: "La solución correcta no es la más compleja: es la que resuelve mejor y puede evolucionar.",
    outcomes: [
      { value: "Core", label: "Arquitectura centrada en el objetivo" },
      { value: "API", label: "Conexión con tus herramientas" },
      { value: "↑", label: "Base preparada para crecer" },
    ],
    capabilitiesEyebrow: "Qué construimos",
    capabilitiesTitle: "Productos digitales hechos alrededor del negocio",
    capabilitiesIntro:
      "Elegimos tecnología, arquitectura y nivel de personalización después de entender el uso real, el equipo y la evolución prevista.",
    capabilities: [
      {
        icon: "Globe2",
        title: "Webs corporativas",
        description:
          "Sitios rápidos, accesibles y fáciles de gestionar que comunican bien y favorecen el posicionamiento.",
      },
      {
        icon: "ShoppingCart",
        title: "Tiendas online",
        description:
          "Experiencias de compra claras, integradas con pagos, catálogo, logística y analítica.",
      },
      {
        icon: "Blocks",
        title: "Aplicaciones web",
        description:
          "Herramientas internas, portales de cliente y productos SaaS adaptados a procesos concretos.",
      },
      {
        icon: "PlugZap",
        title: "APIs e integraciones",
        description:
          "Conectamos CRM, facturación, formularios, bases de datos y servicios externos para evitar tareas repetidas.",
      },
      {
        icon: "Gauge",
        title: "Rendimiento y SEO técnico",
        description:
          "Mejoramos velocidad, estructura, indexación y experiencia para usuarios y buscadores.",
      },
      {
        icon: "Wrench",
        title: "Mantenimiento evolutivo",
        description:
          "Cuidamos seguridad, actualizaciones y nuevas necesidades después del lanzamiento.",
      },
    ],
    processEyebrow: "Cómo desarrollamos",
    processTitle: "Validar primero. Construir con sentido después.",
    processIntro:
      "Reducimos incertidumbre con definición, prototipos y entregas progresivas. El equipo ve y prueba el producto durante el proceso.",
    process: [
      {
        number: "01",
        title: "Descubrimiento",
        description:
          "Definimos usuarios, recorridos, requisitos, integraciones y criterios de éxito.",
      },
      {
        number: "02",
        title: "Arquitectura y prototipo",
        description:
          "Organizamos contenido, datos y funcionalidades antes de entrar en el desarrollo completo.",
      },
      {
        number: "03",
        title: "Construcción iterativa",
        description:
          "Desarrollamos por bloques funcionales con revisiones y pruebas durante cada ciclo.",
      },
      {
        number: "04",
        title: "Lanzamiento y evolución",
        description:
          "Publicamos, medimos el uso real y priorizamos mejoras sobre una base estable.",
      },
    ],
    deliverablesEyebrow: "Qué recibes",
    deliverablesTitle: "Una solución lista para funcionar y seguir creciendo",
    deliverablesDescription:
      "Documentamos la base técnica y dejamos claras las dependencias, accesos y decisiones para facilitar el mantenimiento futuro.",
    deliverables: [
      "Producto responsive probado en dispositivos",
      "Paneles e integraciones configuradas",
      "Analítica y eventos esenciales",
      "Documentación técnica y de uso",
      "Plan de mantenimiento y evolución",
    ],
    sideCardTitle: "Tecnología que no estorba al usuario.",
    sideCardText:
      "Priorizamos tiempos de carga, jerarquía y recorridos directos para que la solución resulte natural desde el primer uso.",
    sideCardItems: ["Velocidad", "Usabilidad", "Escalabilidad"],
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Antes de construir",
    faqs: [
      {
        question: "¿Trabajáis con gestores de contenido?",
        answer:
          "Sí. Elegimos CMS, desarrollo a medida o una combinación según el nivel de edición, integración y escalabilidad que necesites.",
      },
      {
        question: "¿Podéis conectar una web con nuestro CRM o ERP?",
        answer:
          "Sí, siempre que el sistema disponga de una API o un método seguro de integración. Analizamos la viabilidad antes de cerrar el alcance.",
      },
      {
        question: "¿Incluye alojamiento y mantenimiento?",
        answer:
          "Podemos incluir infraestructura, copias, monitorización, actualizaciones y soporte en un plan posterior al lanzamiento.",
      },
      {
        question: "¿Podéis mejorar una plataforma ya existente?",
        answer:
          "Sí. Revisamos arquitectura, rendimiento, experiencia y deuda técnica para proponer una evolución por prioridades.",
      },
    ],
    contactTitle: "Cuéntanos qué necesitas construir o mejorar",
    contactText:
      "Te ayudaremos a ordenar el alcance, detectar riesgos y elegir una solución proporcionada al proyecto.",
    metadataTitle: "Desarrollo web en Tenerife | AIBE Technologies",
    metadataDescription:
      "Desarrollo de páginas web, ecommerce, aplicaciones, SaaS, APIs e integraciones para empresas en Tenerife.",
  },

  "automatizacion-ia-tenerife": {
    slug: "automatizacion-ia-tenerife",
    navLabel: "Automatización con IA",
    eyebrow: "Procesos, asistentes y datos conectados",
    title: "Automatización con IA para recuperar",
    highlightedTitle: "tiempo y capacidad",
    description:
      "Convertimos tareas repetitivas, búsquedas dispersas y seguimientos manuales en flujos asistidos que ayudan a tu equipo a trabajar con más velocidad y control.",
    heroIcon: "BrainCircuit",
    accent: "#ff6b35",
    accentRgb: "255, 107, 53",
    accentSoft: "#fff1eb",
    accentInk: "#8f2c08",
    heroKeywords: ["Asistentes", "Workflows", "Documentos", "Datos"],
    heroSignals: [
      { label: "Tareas", value: "Orquestadas" },
      { label: "Información", value: "Localizable" },
      { label: "Equipo", value: "Asistido" },
    ],
    outcomeTitle: "La IA aporta valor cuando se integra en un proceso concreto y tiene límites claros.",
    outcomes: [
      { value: "-", label: "Menos trabajo repetitivo" },
      { value: "+", label: "Más contexto disponible" },
      { value: "↻", label: "Procesos más consistentes" },
    ],
    capabilitiesEyebrow: "Dónde aplicamos IA",
    capabilitiesTitle: "Automatizaciones diseñadas alrededor de personas y procesos",
    capabilitiesIntro:
      "Empezamos por el problema operativo. Después elegimos modelos, integraciones y controles para que la solución sea útil, verificable y sostenible.",
    capabilities: [
      {
        icon: "MessageSquareMore",
        title: "Asistentes internos",
        description:
          "Facilitamos consultas sobre procedimientos, servicios, documentación o conocimiento de empresa.",
      },
      {
        icon: "Workflow",
        title: "Flujos automatizados",
        description:
          "Conectamos formularios, correos, CRM y herramientas internas para mover información sin tareas manuales.",
      },
      {
        icon: "FileSearch2",
        title: "Procesamiento documental",
        description:
          "Clasificamos, extraemos y resumimos información de documentos con revisión y trazabilidad.",
      },
      {
        icon: "Headphones",
        title: "Atención asistida",
        description:
          "Preparamos respuestas, categorizamos solicitudes y derivamos casos sin perder el control humano.",
      },
      {
        icon: "DatabaseZap",
        title: "Datos y reporting",
        description:
          "Unificamos fuentes y generamos resúmenes accionables para que la información llegue a tiempo.",
      },
      {
        icon: "ShieldCheck",
        title: "Gobierno y seguridad",
        description:
          "Definimos permisos, fuentes, revisión, registro y límites para un uso responsable dentro de la empresa.",
      },
    ],
    processEyebrow: "Cómo implantamos",
    processTitle: "Empezar pequeño, medir el valor y escalar con control",
    processIntro:
      "Evitamos proyectos de IA abstractos. Seleccionamos un caso concreto, lo probamos con datos reales y decidimos el siguiente paso con evidencia.",
    process: [
      {
        number: "01",
        title: "Mapa de procesos",
        description:
          "Detectamos tareas repetidas, cuellos de botella, fuentes de información y riesgos.",
      },
      {
        number: "02",
        title: "Caso piloto",
        description:
          "Definimos una automatización acotada con criterios claros de utilidad, calidad y supervisión.",
      },
      {
        number: "03",
        title: "Integración",
        description:
          "Conectamos datos y herramientas, diseñamos la experiencia y establecemos controles.",
      },
      {
        number: "04",
        title: "Medición y escalado",
        description:
          "Evaluamos ahorro operativo, calidad y adopción antes de ampliar a nuevos procesos.",
      },
    ],
    deliverablesEyebrow: "Qué recibes",
    deliverablesTitle: "Una automatización entendible, controlada y documentada",
    deliverablesDescription:
      "La solución incluye tanto la parte técnica como las reglas de uso para que el equipo sepa cuándo confiar, cuándo revisar y cómo actuar.",
    deliverables: [
      "Mapa del proceso y puntos de automatización",
      "Piloto funcional con datos representativos",
      "Integraciones y permisos configurados",
      "Controles de calidad y supervisión",
      "Documentación de uso y evolución",
    ],
    sideCardTitle: "La IA dentro del flujo, no al margen.",
    sideCardText:
      "Diseñamos la automatización para que aparezca en el momento adecuado, con el contexto necesario y una salida clara para el equipo.",
    sideCardItems: ["Contexto", "Control", "Trazabilidad"],
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "IA aplicada con criterio",
    faqs: [
      {
        question: "¿Necesitamos muchos datos para empezar?",
        answer:
          "No siempre. Depende del caso. Podemos comenzar con documentación, reglas y ejemplos representativos antes de plantear desarrollos más amplios.",
      },
      {
        question: "¿La automatización sustituye al equipo?",
        answer:
          "El objetivo habitual es reducir tareas repetitivas y facilitar decisiones, manteniendo intervención humana en casos sensibles o ambiguos.",
      },
      {
        question: "¿Podéis utilizar nuestras herramientas actuales?",
        answer:
          "Sí. Priorizamos integraciones con los sistemas existentes para evitar cambios innecesarios y mejorar la adopción.",
      },
      {
        question: "¿Cómo se protege la información?",
        answer:
          "Definimos accesos, minimización de datos, proveedores, registros y políticas según el tipo de información y el nivel de riesgo.",
      },
    ],
    contactTitle: "Identifiquemos un proceso donde la IA pueda aportar valor",
    contactText:
      "Cuéntanos qué tarea consume tiempo o genera fricción. Evaluaremos una primera automatización viable y medible.",
    metadataTitle: "Automatización e inteligencia artificial en Tenerife | AIBE",
    metadataDescription:
      "Automatización de procesos, asistentes internos, IA documental, chatbots e integraciones para empresas en Tenerife.",
  },

  "sistemas-ciberseguridad-tenerife": {
    slug: "sistemas-ciberseguridad-tenerife",
    navLabel: "Sistemas y ciberseguridad",
    eyebrow: "Infraestructura, continuidad y protección",
    title: "Sistemas fiables para que tu negocio pueda",
    highlightedTitle: "trabajar sin interrupciones",
    description:
      "Ordenamos infraestructura, accesos, copias, equipos y soporte para reducir riesgos y convertir la tecnología en una base estable del negocio.",
    heroIcon: "ShieldCheck",
    accent: "#087f8c",
    accentRgb: "8, 127, 140",
    accentSoft: "#eaf8fa",
    accentInk: "#064c54",
    heroKeywords: ["Cloud", "Backups", "Redes", "Soporte"],
    heroSignals: [
      { label: "Accesos", value: "Controlados" },
      { label: "Copias", value: "Verificadas" },
      { label: "Incidencias", value: "Trazables" },
    ],
    outcomeTitle: "La continuidad se construye antes de que aparezca una incidencia.",
    outcomes: [
      { value: "3-2-1", label: "Criterio para copias de seguridad" },
      { value: "MFA", label: "Protección de accesos críticos" },
      { value: "SLA", label: "Prioridades y soporte definidos" },
    ],
    capabilitiesEyebrow: "Qué cubrimos",
    capabilitiesTitle: "Tecnología organizada, protegida y preparada para crecer",
    capabilitiesIntro:
      "Trabajamos desde el inventario y el riesgo real. Así priorizamos medidas que mejoran continuidad, seguridad y capacidad de soporte.",
    capabilities: [
      {
        icon: "ServerCog",
        title: "Servidores y cloud",
        description:
          "Configuramos servicios, almacenamiento y recursos en la nube según disponibilidad y carga previstas.",
      },
      {
        icon: "Network",
        title: "Redes y conectividad",
        description:
          "Diseñamos redes estables, segmentadas y documentadas para oficinas, sedes y trabajo remoto.",
      },
      {
        icon: "HardDriveDownload",
        title: "Copias y recuperación",
        description:
          "Definimos políticas, automatizamos copias y comprobamos que la recuperación sea realmente posible.",
      },
      {
        icon: "ShieldCheck",
        title: "Seguridad de accesos",
        description:
          "Mejoramos permisos, autenticación, protección de dispositivos y gestión de usuarios.",
      },
      {
        icon: "ScanSearch",
        title: "Auditoría técnica",
        description:
          "Revisamos activos, configuraciones, dependencias y puntos críticos para ordenar prioridades.",
      },
      {
        icon: "LifeBuoy",
        title: "Soporte y mantenimiento",
        description:
          "Gestionamos incidencias, actualizaciones y tareas preventivas con seguimiento y documentación.",
      },
    ],
    processEyebrow: "Cómo reducimos el riesgo",
    processTitle: "Visibilidad, prioridades y mejora continua",
    processIntro:
      "La seguridad y el soporte no empiezan comprando herramientas. Empiezan sabiendo qué existe, quién lo usa y qué ocurriría si falla.",
    process: [
      {
        number: "01",
        title: "Inventario",
        description:
          "Identificamos equipos, servicios, usuarios, accesos, proveedores y dependencias críticas.",
      },
      {
        number: "02",
        title: "Evaluación",
        description:
          "Clasificamos riesgos e incidencias por impacto, probabilidad y esfuerzo de corrección.",
      },
      {
        number: "03",
        title: "Protección y orden",
        description:
          "Aplicamos medidas prioritarias, documentamos cambios y configuramos monitorización y copias.",
      },
      {
        number: "04",
        title: "Mantenimiento",
        description:
          "Revisamos alertas, actualizaciones, accesos y capacidad para mantener el sistema saludable.",
      },
    ],
    deliverablesEyebrow: "Qué recibes",
    deliverablesTitle: "Control sobre la infraestructura y un plan para mantenerlo",
    deliverablesDescription:
      "Dejamos documentación y procedimientos prácticos para que la continuidad no dependa de recordar configuraciones o improvisar en una incidencia.",
    deliverables: [
      "Inventario técnico y mapa de dependencias",
      "Informe de riesgos priorizado",
      "Políticas de acceso, copias y actualización",
      "Documentación de red y servicios",
      "Plan de soporte, revisión y recuperación",
    ],
    sideCardTitle: "Prepararse cuesta menos que detenerse.",
    sideCardText:
      "Una infraestructura ordenada reduce tiempos de resolución, evita pérdidas de información y facilita incorporar personas y herramientas.",
    sideCardItems: ["Continuidad", "Seguridad", "Soporte"],
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Antes de intervenir",
    faqs: [
      {
        question: "¿Podéis trabajar con nuestro proveedor actual?",
        answer:
          "Sí. Podemos coordinar mejoras, documentación y responsabilidades con proveedores existentes sin sustituirlos necesariamente.",
      },
      {
        question: "¿Realizáis soporte remoto y presencial?",
        answer:
          "Sí. Organizamos la atención según el tipo de incidencia, ubicación y nivel de servicio acordado.",
      },
      {
        question: "¿Cómo sabremos qué medidas son prioritarias?",
        answer:
          "Entregamos un plan por impacto y urgencia, diferenciando acciones inmediatas, mejoras planificables y recomendaciones futuras.",
      },
      {
        question: "¿Podéis revisar copias de seguridad ya configuradas?",
        answer:
          "Sí. Comprobamos alcance, frecuencia, retención, aislamiento y, especialmente, la capacidad real de restauración.",
      },
    ],
    contactTitle: "Revisemos la base tecnológica de tu negocio",
    contactText:
      "Cuéntanos qué te preocupa o qué necesitas ordenar. Prepararemos una primera evaluación de prioridades.",
    metadataTitle: "Sistemas y ciberseguridad en Tenerife | AIBE Technologies",
    metadataDescription:
      "Soporte IT, redes, cloud, copias de seguridad, auditoría y ciberseguridad para empresas en Tenerife.",
  },
};

export const serviceNavigation = Object.values(serviceLandings).map(
  ({ slug, navLabel }) => ({
    slug,
    label: navLabel,
  })
);
