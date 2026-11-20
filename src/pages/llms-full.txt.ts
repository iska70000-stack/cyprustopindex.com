import type { APIRoute } from 'astro';
import { activePreset } from '../config/siteConfig';
import { VERIFIED_CATEGORIES } from '../data/verifiedDirectory';
import { CATEGORY_GUIDES, HOME_MARKET_GUIDE } from '../data/categoryGuides';
import { getCategoryUrl } from '../data/categorySeo';
import { stripLeadingEmoji } from '../utils/textUtils';
import freshness from '../data/freshness.json';

export const GET: APIRoute = async () => {
  const lines: string[] = [
    `# ${activePreset.siteName} — Full Verified Cyprus Knowledge Graph (2026)`,
    `URL: ${activePreset.siteUrl}`,
    `Last Verified: ${freshness.lastVerified}`,
    `Currency: EUR (€)`,
    `Cities: Limassol, Nicosia, Larnaca, Paphos`,
    '',
    '## Cyprus Market Prices & Quick Facts (2026)',
    HOME_MARKET_GUIDE.overview.en,
    '',
  ];

  for (const cat of VERIFIED_CATEGORIES) {
    const url = `${activePreset.siteUrl}${getCategoryUrl(cat.slug, 'en')}`;
    const guide = CATEGORY_GUIDES[cat.slug];
    lines.push(`## ${stripLeadingEmoji(cat.titles.en)} (${url})`);
    if (guide) {
      lines.push(guide.overview.en);
      lines.push('');
    }
    for (const item of cat.items) {
      lines.push(`### ${item.rank}. ${item.name.en} (${item.city})`);
      lines.push(`- Dossier: ${activePreset.siteUrl}${getCategoryUrl(cat.slug, 'en')}${item.id}/`);
      lines.push(`- Address: ${item.address.en}`);
      if (item.phones?.[0]) lines.push(`- Phone: ${item.phones[0]}`);
      lines.push(`- Summary: ${item.description.en}`);
      lines.push('');
    }
  }

  lines.push('## TopIndex Network (Sister Directories)');
  lines.push('- Baku Top Index (https://bakutopindex.com) — Verified business & service directory of Baku, Azerbaijan.');
  lines.push('- Cyprus Top Index (https://cyprustopindex.com) — Verified business & service directory of Cyprus (Limassol, Nicosia, Larnaca, Paphos).');
  lines.push('- AI Top Index (https://aitopindex.com) — Curated directory of AI tools and services.');
  lines.push('');

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
