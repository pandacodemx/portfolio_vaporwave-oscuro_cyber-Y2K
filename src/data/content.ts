/**
 * TODO: TODO EL CONTENIDO DEL PORTFOLIO VIVE AQUÍ.
 * Los textos actuales son de ejemplo: cámbialos por los tuyos.
 * No necesitas tocar ningún componente para editar contenido.
 */
import type { Lang } from "../i18n/ui";

/** Un texto en cada idioma. TypeScript te avisa si falta alguno. */
export type L<T = string> = Record<Lang, T>;

/* ------------------------------------------------------------------ */
/*  SOBRE MÍ                                                           */
/* ------------------------------------------------------------------ */
export const about = {
  /** Nombre "de archivo" que aparece en la barra de título */

  title: {
    es: "sobre_mi.exe",
    en: "about_me.exe",
  } satisfies L,

  heading: {
    es: "Hola, soy PandaCode.",
    en: "Hello, I'm PandaCode.",
  } satisfies L,

  paragraphs: {
    es: [
      "Soy desarrollador fullstack: construyo interfaces cuidando cada detalle y desarrollo los servicios que las hacen funcionar.",
      "Soy mexicano, tengo 31 años y soy originario de Morelia, Michoacán.",
      "Además de programar, disfruto diseñar e ilustrar con tableta digital. Soy amante de los gatos y me apasionan las culturas coreana y japonesa. Busco que cada proyecto en el que trabajo tenga una personalidad propia.",
    ],
    en: [
      "I am a full-stack developer: I build interfaces with attention to every detail and develop the services that power them.",
      "I am Mexican, 31 years old, and originally from Morelia, Michoacán.",
      "Beyond coding, I enjoy designing and creating digital illustrations with a drawing tablet. I am a cat lover and passionate about Korean and Japanese cultures. I strive to give every project I work on a unique personality.",
    ],
  } satisfies L<string[]>,

  facts: {
    es: [
      { label: "Rol", value: "Desarrollador Fullstack" },
      { label: "Enfoque", value: "Frontend, backend y arquitectura" },
      { label: "Con IA", value: "Yo decido, reviso y entrego" },
      { label: "Estado", value: "Abierto a proyectos" },
    ],
    en: [
      { label: "Role", value: "Fullstack Developer" },
      { label: "Focus", value: "Frontend, backend and architecture" },
      { label: "With AI", value: "I decide, review and ship" },
      { label: "Status", value: "Open to projects" },
    ],
  } satisfies L<{ label: string; value: string }[]>,
};

/* ------------------------------------------------------------------ */
/*  PROYECTOS                                                          */
/*  Agrega o quita objetos de la lista. `demo`, `repo` e `image` son    */
/*  opcionales: si los quitas, el botón o la imagen no se muestran.     */
/*  `image`: ruta dentro de /public, por ejemplo '/projects/tienda.png' */
/* ------------------------------------------------------------------ */
export interface Project {
  /** Identificador sin espacios; también es el nombre de la ventana */
  id: string;
  name: L;
  description: L;
  tags: string[];
  demo?: string;
  url?: string;
  private?: boolean;
  repo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "tienda_gcpgarcia",
    name: {
      es: "Tienda GCPGarcia",
      en: "GCPGarcia Online Store",
    },
    image: "/projects/gcpg.webp",
    description: {
      es: "Plataforma de comercio electrónico con catálogo de productos, carrito de compras, pagos y panel de administración. Integra un chatbot con IA mediante la API de Claude, conectado al backend para consultar información real de productos, ventas y del negocio.",
      en: "E-commerce platform featuring a product catalog, shopping cart, payments, and an admin dashboard. Includes an AI-powered chatbot using the Claude API, integrated with the backend to retrieve real-time business, product, and sales information.",
    },
    tags: ["Nuxt", "PHP", "MySQL", "Tailwind CSS", "Claude API"],
    demo: "https://gcpgarcia.com/",
  },

  {
    id: "erp_gcpgarcia",
    name: {
      es: "ERP PGarcia Connect",
      en: "PGarcia Connect ERP",
    },
    image: "/projects/pos_gcpgarcia.webp",
    description: {
      es: "Sistema ERP privado que centraliza la gestión de ventas, cotizaciones, inventarios, almacenes, compras, cobranza, clientes y empleados. Incluye control de acceso por roles, reportes, estadísticas y generación de documentos PDF, integrando los procesos operativos y administrativos del negocio.",
      en: "Private ERP system that centralizes sales, quotations, inventory, warehouse operations, purchasing, collections, customer and employee management. Features role-based access control, reporting, analytics, and PDF generation, integrating the company's operational and administrative workflows.",
    },
    tags: ["Vue.js", "Tailwind CSS", "PHP", "MySQL", "REST API"],
    url: "https://pos.gcpgarcia.com/",
    private: true,
  },

  {
    id: "bamboo_management_suite",
    name: { es: "Sistema de Gestion Gimnasios", en: "Gym Management System" },
    image: "/projects/bamboo_management.webp",
    description: {
      es: "Sistema para gimnasios, centraliza ventas, inventarios, miembros, membresias. Acceso por roles , integra procesos operativos y administrativos",
      en: "Gym management system that brings together sales, inventory, members and memberships. Includes role-based access and integrates operational and administrative processes.",
    },
    tags: ["Vue.js", "Tailwind CSS", "PHP", "MySQL"],
    url: "https://sport-fortius.bamboohub.app",
    private: true,
  },
];

/* ------------------------------------------------------------------ */
/*  STACK                                                              */
/* ------------------------------------------------------------------ */
export const stack = {
  title: { es: "stack.sys", en: "stack.sys" } satisfies L,
  groups: [
    {
      name: { es: "Frontend", en: "Frontend" },
      items: ["Vue.js", "Nuxt", "Astro", "TypeScript", "Tailwind CSS", "GSAP"],
    },
    {
      name: { es: "Backend", en: "Backend" },
      items: ["PHP", "Node.js", "MySQL", "REST APIs"],
    },
    {
      name: { es: "IA y herramientas", en: "AI + tools" },
      items: ["Git", "Docker", "VS Code", "Claude", "Codex"],
    },
  ] satisfies { name: L; items: string[] }[],
};

/* ------------------------------------------------------------------ */
/*  CONTACTO                                                           */
/* ------------------------------------------------------------------ */
export const contact = {
  title: { es: "contacto.exe", en: "contact.exe" } satisfies L,
  heading: { es: "¿Hablamos?", en: "Let's talk?" } satisfies L,
  message: {
    es: "Si tienes un proyecto en mente o quieres colaborar, escríbeme y lo platicamos.",
    en: "If you have a project in mind or want to collaborate, write to me and we will talk.",
  } satisfies L,
  email: "nava.saidalfredo@gmail.com",
  links: [
    { label: "Email", href: "mailto:nava.saidalfredo@gmail.com" },
    { label: "GitHub", href: "https://github.com/pandacodemx" },
  ],
};
