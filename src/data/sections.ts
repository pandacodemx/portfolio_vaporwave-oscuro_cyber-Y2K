import type { UIKey } from '../i18n/ui';

/** Secciones de la página: id del ancla + clave de texto del menú. */
export const sections = [
  { id: 'about', label: 'nav.about' },
  { id: 'projects', label: 'nav.projects' },
  { id: 'stack', label: 'nav.stack' },
  { id: 'contact', label: 'nav.contact' },
] as const satisfies readonly { id: string; label: UIKey }[];