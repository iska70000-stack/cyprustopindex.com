import type { APIRoute } from 'astro';
import { activePreset } from '../config/siteConfig';

export const GET: APIRoute = async () => {
  const robotsTxt = activePreset.allowIndexing
    ? `User-agent: *
Allow: /
Disallow: /api/submissions

Sitemap: ${activePreset.siteUrl}/sitemap.xml
`
    : `User-agent: *
Disallow: /
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
