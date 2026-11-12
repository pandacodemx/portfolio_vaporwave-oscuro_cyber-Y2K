import { ui, defaultLang, languages, type Lang, type UIKey } from './ui';

/** Obtiene el idioma actual a partir de la URL (/es/..., /en/...). */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return segment in languages ? (segment as Lang) : defaultLang;
}

/** Devuelve una función t('clave') para el idioma dado. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Misma ruta pero en otro idioma: /es/proyectos -> /en/proyectos */
export function switchLangPath(url: URL, target: Lang): string {
  const [, , ...rest] = url.pathname.split('/');
  return `/${target}/${rest.join('/')}`;
}
