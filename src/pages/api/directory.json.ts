import type { APIRoute } from 'astro';
import { activePreset } from '../../config/siteConfig';
import { VERIFIED_CATEGORIES } from '../../data/verifiedDirectory';
import { CATEGORY_GUIDES } from '../../data/categoryGuides';
import { getProfileUrl } from '../../data/categorySeo';

export const GET: APIRoute = async () => {
  const payload = {
    site: activePreset.siteName,
    url: activePreset.siteUrl,
    region: 'Republic of Cyprus',
    cities: activePreset.cities,
    currency: activePreset.currency,
    lastVerified: null,
    marketFacts2026: null,
    categories: VERIFIED_CATEGORIES.map((cat) => ({
      slug: cat.slug,
      titles: cat.titles,
      marketGuide: null,
      guide: CATEGORY_GUIDES[cat.slug] || null,
      items: cat.items.map(({ rating, languages, pinned_rank, verifiedDate, ...item }) => ({
        ...item,
        profiles: Object.fromEntries(activePreset.locales.map((lang) => [
          lang, `${activePreset.siteUrl}${getProfileUrl(cat.slug, item.id, lang)}`,
        ])),
      })),
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
