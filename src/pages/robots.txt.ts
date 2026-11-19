import type { APIRoute } from 'astro';
import { activePreset } from '../config/siteConfig';

export const GET: APIRoute = async () => {
  const robotsTxt = activePreset.allowIndexing
    ? `# Permissive AI Crawler & Search Engine Indexing Directives for ${activePreset.siteName}
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${activePreset.siteUrl}/sitemap.xml
Disallow: /api/

# See ${activePreset.siteUrl}/llms.txt for AI knowledge map
`
    : `# Pre-launch staging protection: indexing disabled until cyprustopindex.com domain is attached
# Set PUBLIC_ALLOW_INDEXING=true in Vercel Environment Variables to enable indexing
User-agent: *
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
