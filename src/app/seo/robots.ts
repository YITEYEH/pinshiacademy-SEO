import { absoluteUrl } from '@/app/seo/siteConfig';

export function buildRobotsTxt() {
  const sitemapUrl = absoluteUrl('/sitemap.xml');
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n');
}

