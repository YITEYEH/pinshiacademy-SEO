import { absoluteUrl } from '@/app/seo/siteConfig';

type SitemapUrl = {
  loc: string;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
};

function xmlEscape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function buildSitemapXml(urls: SitemapUrl[]) {
  const items = urls
    .map((u) => {
      const parts = [
        `<loc>${xmlEscape(u.loc)}</loc>`,
        u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : null,
        typeof u.priority === 'number' ? `<priority>${u.priority.toFixed(1)}</priority>` : null,
      ].filter(Boolean);
      return `<url>${parts.join('')}</url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    items +
    `</urlset>`;
}

export function defaultSitemapXml() {
  return buildSitemapXml([
    { loc: absoluteUrl('/'), changefreq: 'weekly', priority: 1.0 },
    { loc: absoluteUrl('/features'), changefreq: 'monthly', priority: 0.8 },
    { loc: absoluteUrl('/demo'), changefreq: 'monthly', priority: 0.65 },
    { loc: absoluteUrl('/pricing'), changefreq: 'monthly', priority: 0.8 },
    { loc: absoluteUrl('/blog'), changefreq: 'weekly', priority: 0.7 },
  ]);
}

