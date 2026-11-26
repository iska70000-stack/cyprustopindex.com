import type { APIRoute } from 'astro';
import { activePreset } from '../config/siteConfig';
import { VERIFIED_CATEGORIES } from '../data/verifiedDirectory';
import { getCategorySeoMeta, getCategoryUrl } from '../data/categorySeo';
import { SELECTIONS, getSelectionUrl } from '../data/directorySelections';

export const GET: APIRoute = () => {
  const base = activePreset.siteUrl;
  const lines = [
    `# ${activePreset.siteName}`,
    '',
    '> Directory of local services in the Republic of Cyprus. Profiles list services, locations and contact details. Where checked against an official contact page, the profile shows the date.',
    '',
    '## Categories',
    '',
    ...VERIFIED_CATEGORIES.map((cat) => `- [${getCategorySeoMeta(cat, 'en').h1}](${base}${getCategoryUrl(cat.slug, 'en')}): ${getCategorySeoMeta(cat, 'en').description}`),
    '',
    '## Local selections',
    '',
    ...SELECTIONS.map((entry) => `- [${entry.name.en}](${base}${getSelectionUrl('en', entry.slug)})`),
    '',
    '## Optional',
    '',
    `- [Business profiles in plain text](${base}/llms-full.txt)`,
    `- [Directory JSON](${base}/api/directory.json)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
};
