import type { APIRoute } from 'astro';
import { activePreset } from '../config/siteConfig';
import { VERIFIED_CATEGORIES } from '../data/verifiedDirectory';
import { getCategoryUrl, getProfileUrl } from '../data/categorySeo';
import { SELECTIONS, getSelectionUrl } from '../data/directorySelections';

export const GET: APIRoute = async () => {
  const paths = activePreset.locales.flatMap((lang) => [
    `/${lang}/`,
    ...SELECTIONS.map((entry) => getSelectionUrl(lang, entry.slug)),
    ...VERIFIED_CATEGORIES.flatMap((cat) => [
      getCategoryUrl(cat.slug, lang),
      ...cat.items.map((item) => getProfileUrl(cat.slug, item.id, lang)),
    ]),
  ]);
  const entries = paths.map((path) => `  <url><loc>${activePreset.siteUrl}${path}</loc></url>`);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
};
