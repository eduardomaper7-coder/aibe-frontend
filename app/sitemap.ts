import {locales} from '@/i18n/config';

export default function sitemap() {
  const baseUrl = 'https://tudominio.com';

  // Lista tus rutas importantes aquí
  const routes = ['/', '/login', '/precios', '/contact'];

  const items = locales.flatMap((locale) =>
    routes.map((r) => ({
      url: `${baseUrl}/${locale}${r === '/' ? '' : r}`,
      lastModified: new Date()
    }))
  );

  return items;
}
