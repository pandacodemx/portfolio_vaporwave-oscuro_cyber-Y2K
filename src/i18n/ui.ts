export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

/**
 * Diccionario de textos de la interfaz.
 * Cada clave debe existir en ambos idiomas (TypeScript te avisa si falta una).
 */
export const ui = {
  es: {
    "meta.title": "Portfolio.exe",
    "meta.description":
      "Portfolio de desarrollador fullstack: frontend, backend y desarrollo asistido por IA.",
    "hero.greeting": "Hola, soy Said",
    "hero.name": "PANDACODE",
    "hero.role": "Desarrollador Fullstack",
    "hero.tagline": "Frontend, backend e IA como herramienta de trabajo.",
    "hero.characterAlt": "Ilustración de mi personaje",
    "hero.characterPlaceholder": "Tu personaje aquí",
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.stack": "Stack",
    "nav.contact": "Contacto",
    "lang.switch": "Cambiar idioma",
    "theme.toLight": "Cambiar a modo claro",
    "theme.toDark": "Cambiar a modo oscuro",
    "taskbar.start": "Inicio",
    "taskbar.windows": "Ventanas abiertas",
    "window.minimize": "Minimizar",
    "window.maximize": "Maximizar",
    "window.close": "Cerrar",
    "window.restore": "Restaurar",
    "start.restoreAll": "Restaurar ventanas",
    "boot.l1": "Comprobando memoria... OK",
    "boot.l2": "Cargando estilos Y2K... OK",
    "boot.l3": "Montando escritorio... OK",
    "boot.l4": "Listo.",
    "boot.skip": "Pulsa cualquier tecla para saltar",
    "nav.label": "Secciones",
    "projects.demo": "Ver demo",
    "projects.code": "Código",
    "projects.noPreview": "Sin vista previa",
    "projects.previewAlt": "Vista previa de",
  },
  en: {
    "meta.title": "Portfolio.exe",
    "meta.description":
      "Fullstack developer portfolio: frontend, backend and AI-assisted development.",
    "hero.greeting": "Hi, I'm Said",
    "hero.name": "PANDACODE",
    "hero.role": "Fullstack Developer",
    "hero.tagline": "Frontend, backend and AI as a working tool.",
    "hero.characterAlt": "Illustration of my character",
    "hero.characterPlaceholder": "Your character here",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.stack": "Stack",
    "nav.contact": "Contact",
    "lang.switch": "Switch language",
    "theme.toLight": "Switch to light mode",
    "theme.toDark": "Switch to dark mode",
    "taskbar.start": "Start",
    "taskbar.windows": "Open windows",
    "window.minimize": "Minimize",
    "window.maximize": "Maximize",
    "window.close": "Close",
    "window.restore": "Restore",
    "start.restoreAll": "Restore windows",
    "boot.l1": "Checking memory... OK",
    "boot.l2": "Loading Y2K styles... OK",
    "boot.l3": "Mounting desktop... OK",
    "boot.l4": "Ready.",
    "boot.skip": "Press any key to skip",
    "nav.label": "Sections",
    "projects.demo": "Live demo",
    "projects.code": "Code",
    "projects.noPreview": "No preview",
    "projects.previewAlt": "Preview of",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
