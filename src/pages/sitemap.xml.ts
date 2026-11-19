import type { APIRoute } from 'astro';
import { activePreset } from '../config/siteConfig';
import { VERIFIED_CATEGORIES } from '../data/verifiedDirectory';
import { getCategoryUrl } from '../data/categorySeo';
import freshness from '../data/freshness.json';

export const GET: APIRoute = async () => {
  const urls: Array<{ loc: string; priority: string; changefreq: string }> = [
    { loc: `${activePreset.siteUrl}/`, priority: '1.0', changefreq: 'weekly' },
  ];

  for (const lang of activePreset.locales) {
    urls.push({
      loc: `${activePreset.siteUrl}/${lang}/`,
      priority: '0.9',
      changefreq: 'weekly',
    });
    urls.push({
      loc: `${activePreset.siteUrl}/${lang}/submit/`,
      priority: '0.5',
      changefreq: 'monthly',
    });

    for (const cat of VERIFIED_CATEGORIES) {
      const catPath = getCategoryUrl(cat.slug, lang);
      urls.push({
        loc: `${activePreset.siteUrl}${catPath}`,
        priority: '0.8',
        changefreq: 'weekly',
      });

      for (const item of cat.items) {
        urls.push({
          loc: `${activePreset.siteUrl}${catPath}${item.id}/`,
          priority: '0.7',
          changefreq: 'monthly',
        });
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${freshness.lastVerified}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
