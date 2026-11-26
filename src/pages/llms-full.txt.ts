import type { APIRoute } from 'astro';
import { activePreset } from '../config/siteConfig';
import { VERIFIED_CATEGORIES } from '../data/verifiedDirectory';
import { CATEGORY_GUIDES } from '../data/categoryGuides';
import { getCategoryUrl } from '../data/categorySeo';
import { stripLeadingEmoji } from '../utils/textUtils';

export const GET: APIRoute = async () => {
  const lines: string[] = [
    `# ${activePreset.siteName} business profiles`,
    `Directory: ${activePreset.siteUrl}/en/`,
    '',
  ];

  for (const cat of VERIFIED_CATEGORIES) {
    const url = `${activePreset.siteUrl}${getCategoryUrl(cat.slug, 'en')}`;
    const guide = CATEGORY_GUIDES[cat.slug];
    lines.push(`## ${stripLeadingEmoji(cat.titles.en)} (${url})`);
    if (guide) {
      lines.push(guide.question.en, guide.answer.en, `- Source: ${guide.source}`);
      lines.push('');
    }
    for (const item of cat.items) {
      lines.push(`### ${item.name.en} (${item.city})`);
      lines.push(`- Profile: ${activePreset.siteUrl}${getCategoryUrl(cat.slug, 'en')}${item.id}/`);
      lines.push(`- Address: ${item.address.en}`);
      if (item.phones?.[0]) lines.push(`- Phone: ${item.phones[0]}`);
      lines.push(`- Summary: ${item.description.en}`);
      if (item.website) lines.push(`- Official website: ${item.website}`);
      if (item.contactCheckedOn) lines.push(`- Contact details checked: ${item.contactCheckedOn}`);
      lines.push('');
    }
  }

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
