import type { PresenceData, PresencePlatform } from './types';

const platformCatalogBase: Omit<PresencePlatform, 'status' | 'customUrl'>[] = [
  {
    id: 'google-business-profile',
    name: 'Google Business Profile',
    logoText: 'G',
    defaultUrl: 'https://www.google.com/business/',
  },
  {
    id: 'doctoralia',
    name: 'Doctoralia',
    logoText: 'D',
    defaultUrl: 'https://www.doctoralia.es/',
  },
  {
    id: 'top-doctors',
    name: 'Top Doctors',
    logoText: 'T',
    defaultUrl: 'https://www.topdoctors.es/',
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    logoText: 'GM',
    defaultUrl: 'https://maps.google.com/',
  },
  {
    id: 'apple-maps',
    name: 'Apple Maps',
    logoText: 'A',
    defaultUrl: 'https://maps.apple.com/',
  },
  {
    id: 'bing-places',
    name: 'Bing Places',
    logoText: 'B',
    defaultUrl: 'https://www.bingplaces.com/',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    logoText: 'F',
    defaultUrl: 'https://www.facebook.com/',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    logoText: 'I',
    defaultUrl: 'https://www.instagram.com/',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    logoText: 'L',
    defaultUrl: 'https://www.linkedin.com/',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    logoText: 'Y',
    defaultUrl: 'https://www.youtube.com/',
  },
  {
    id: 'waze',
    name: 'Waze',
    logoText: 'W',
    defaultUrl: 'https://www.waze.com/',
  },
  {
    id: 'foursquare',
    name: 'Foursquare',
    logoText: 'FS',
    defaultUrl: 'https://foursquare.com/',
  },
  {
    id: 'yelp',
    name: 'Yelp',
    logoText: 'YE',
    defaultUrl: 'https://www.yelp.com/',
  },
  {
    id: 'paginas-amarillas',
    name: 'Páginas Amarillas',
    logoText: 'PA',
    defaultUrl: 'https://www.paginasamarillas.es/',
  },
  {
    id: 'cylex',
    name: 'Cylex',
    logoText: 'C',
    defaultUrl: 'https://www.cylex.es/',
  },
  {
    id: 'hotfrog',
    name: 'Hotfrog',
    logoText: 'H',
    defaultUrl: 'https://www.hotfrog.es/',
  },
  {
    id: 'tuugo',
    name: 'Tuugo',
    logoText: 'TU',
    defaultUrl: 'https://www.tuugo.es/',
  },
  {
    id: 'mister-what',
    name: 'MisterWhat',
    logoText: 'MW',
    defaultUrl: 'https://www.misterwhat.es/',
  },
  {
    id: '11870',
    name: '11870',
    logoText: '11',
    defaultUrl: 'https://11870.com/',
  },
  {
    id: 'yalwa',
    name: 'Yalwa',
    logoText: 'YA',
    defaultUrl: 'https://www.yalwa.es/',
  },
  {
    id: 'kompass',
    name: 'Kompass',
    logoText: 'K',
    defaultUrl: 'https://es.kompass.com/',
  },
  {
    id: 'axesor',
    name: 'Axesor',
    logoText: 'AX',
    defaultUrl: 'https://www.axesor.es/',
  },
  {
    id: 'infobel',
    name: 'Infobel',
    logoText: 'IN',
    defaultUrl: 'https://www.infobel.com/',
  },
  {
    id: 'brownbook',
    name: 'Brownbook',
    logoText: 'BR',
    defaultUrl: 'https://www.brownbook.net/',
  },
  {
    id: 'clinic-cloud',
    name: 'Clinic Cloud',
    logoText: 'CC',
    defaultUrl: 'https://clinic-cloud.com/',
  },
];

function buildDemoPlatforms(): PresencePlatform[] {
  return platformCatalogBase.map((platform) => ({
    ...platform,
    customUrl: platform.defaultUrl,
    status: "active",
  }));
}

function buildSubscribedPlatforms(): PresencePlatform[] {
  return platformCatalogBase.map((platform) => ({
    ...platform,
    customUrl: "",
    status: "pending",
  }));
}

export const demoPresenceData: PresenceData = {
  hasSubscription: false,
  mediaArticles: [
    {
      id: 'media-1',
      title: 'La clínica destaca por su atención al paciente',
      publishedAt: '2024-10-18',
      url: 'https://elpais.com/',
      previewTitle: 'Entrevista a una clínica referente en atención sanitaria',
      previewSource: 'Medio Salud',
      previewExcerpt:
        'La digitalización, la cercanía con el paciente y la gestión de la reputación online se consolidan como pilares clave para el crecimiento de las clínicas modernas...',
      category: 'media',
    },
    {
      id: 'media-2',
      title: 'Nuevas tendencias en experiencia del paciente',
      publishedAt: '2024-11-02',
      url: 'https://www.abc.es/',
      previewTitle: 'Cómo mejorar la presencia digital de una clínica',
      previewSource: 'Revista Bienestar',
      previewExcerpt:
        'Cada vez más centros médicos apuestan por reforzar su presencia en medios, plataformas especializadas y publicaciones propias para generar confianza...',
      category: 'media',
    },
    {
      id: 'media-3',
      title: 'Clínicas y reputación digital en 2025',
      publishedAt: '2025-01-15',
      url: 'https://www.lavanguardia.com/',
      previewTitle: 'Presencia online y visibilidad local',
      previewSource: 'Salud Hoy',
      previewExcerpt:
        'Google Business Profile, directorios sanitarios y contenidos propios son elementos fundamentales para ganar visibilidad y atraer nuevos pacientes...',
      category: 'media',
    },
    {
      id: 'media-4',
      title: 'Cómo influye la visibilidad digital en la elección de clínica',
      publishedAt: '2025-02-02',
      url: 'https://www.elmundo.es/',
      previewTitle: 'La confianza también se construye online',
      previewSource: 'Actualidad Médica',
      previewExcerpt:
        'La ficha local, las opiniones, la presencia en medios y la coherencia entre plataformas ayudan a reforzar la credibilidad de una clínica...',
      category: 'media',
    },
  ],
  clinicArticles: [
    {
      id: 'clinic-1',
      title: 'Cómo prepararse para una primera consulta',
      publishedAt: '2024-09-10',
      url: 'https://example.com/blog/primera-consulta',
      previewTitle: 'Consejos antes de tu primera consulta',
      previewSource: 'Blog de la clínica',
      previewExcerpt:
        'Te explicamos qué documentación llevar, cómo prepararte y qué esperar durante tu primera visita para que la experiencia sea más cómoda...',
      category: 'clinic',
    },
    {
      id: 'clinic-2',
      title: 'Preguntas frecuentes sobre tratamientos',
      publishedAt: '2024-12-04',
      url: 'https://example.com/blog/tratamientos',
      previewTitle: 'Dudas habituales sobre tratamientos',
      previewSource: 'Blog de la clínica',
      previewExcerpt:
        'Respondemos a las preguntas más comunes de nuestros pacientes sobre tiempos de recuperación, revisiones y seguimiento...',
      category: 'clinic',
    },
    {
      id: 'clinic-3',
      title: 'La importancia de las revisiones periódicas',
      publishedAt: '2025-01-08',
      url: 'https://example.com/blog/revisiones',
      previewTitle: 'Por qué no debes saltarte tus revisiones',
      previewSource: 'Blog de la clínica',
      previewExcerpt:
        'Las revisiones periódicas ayudan a detectar cambios a tiempo y mejoran el seguimiento clínico de cada paciente...',
      category: 'clinic',
    },
    {
      id: 'clinic-4',
      title: 'Hábitos saludables para cuidar tu bienestar cada día',
      publishedAt: '2025-02-10',
      url: 'https://example.com/blog/habitos-saludables',
      previewTitle: 'Recomendaciones prácticas para pacientes',
      previewSource: 'Blog de la clínica',
      previewExcerpt:
        'Pequeños cambios en descanso, hidratación y seguimiento profesional pueden ayudarte a mantener mejores rutinas de salud...',
      category: 'clinic',
    },
  ],
  platforms: buildDemoPlatforms(),
};

export const subscribedPresenceData: PresenceData = {
  hasSubscription: true,
  mediaArticles: [],
  clinicArticles: [],
  platforms: buildSubscribedPlatforms(),
};