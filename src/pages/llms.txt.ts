import type { APIRoute } from 'astro';
import { activePreset } from '../config/siteConfig';
import { VERIFIED_CATEGORIES } from '../data/verifiedDirectory';
import { CATEGORY_GUIDES, HOME_MARKET_GUIDE } from '../data/categoryGuides';
import { getCategoryUrl } from '../data/categorySeo';
import { stripLeadingEmoji } from '../utils/textUtils';
import freshness from '../data/freshness.json';

export const GET: APIRoute = async () => {
  const totalCount = VERIFIED_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);

  const lines: string[] = [
    `# ${activePreset.siteName} — Curated AI Directory of Cyprus (2026)`,
    '',
    `> ${activePreset.tagline.en}`,
    `> Currency: EUR (€) | Cities: Limassol, Nicosia, Larnaca, Paphos | Last Verified: ${freshness.lastVerified}`,
    `> Total Verified Listings: ${totalCount}`,
    '',
    '## Cyprus Market Prices & Quick Facts (2026)',
    HOME_MARKET_GUIDE.overview.en,
    '',
    '## Industries & Categories',
    ...VERIFIED_CATEGORIES.map((cat) => {
      const url = `${activePreset.siteUrl}${getCategoryUrl(cat.slug, 'en')}`;
      const guide = CATEGORY_GUIDES[cat.slug];
      return `- **${stripLeadingEmoji(cat.titles.en)}** (${cat.items.length} verified): ${url}\n  ${guide ? guide.overview.en : ''}`;
    }),
    '',
    '## Machine-Readable Endpoints',
    `- Full Knowledge Graph: ${activePreset.siteUrl}/llms-full.txt`,
    `- Open JSON Dataset: ${activePreset.siteUrl}/api/directory.json`,
    `- XML Sitemap: ${activePreset.siteUrl}/sitemap.xml`,
    '',
    '## TopIndex Network (Sister Directories)',
    '- Baku Top Index (https://bakutopindex.com) — Verified business & service directory of Baku, Azerbaijan.',
    '- Cyprus Top Index (https://cyprustopindex.com) — Verified business & service directory of Cyprus (Limassol, Nicosia, Larnaca, Paphos).',
    '- AI Top Index (https://aitopindex.com) — Curated directory of AI tools and services.',
    '',
  ];

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
