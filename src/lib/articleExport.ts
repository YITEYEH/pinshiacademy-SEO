import type { SeoSnapshot } from '@/lib/seoScore';

export type ParagraphBlock = { title: string; content: string };

export function buildMarkdownArticle(input: {
  seoTitle: string;
  metaDescription: string;
  paragraphs: ParagraphBlock[];
}): string {
  const lines: string[] = [];
  lines.push(`# ${input.seoTitle.trim() || '未命名'}`);
  lines.push('');
  lines.push(`> ${input.metaDescription.trim() || ''}`);
  lines.push('');
  for (const p of input.paragraphs) {
    lines.push(`## ${p.title}`);
    lines.push('');
    lines.push(p.content.trim());
    lines.push('');
  }
  return lines.join('\n').trim();
}

export function buildHtmlArticle(input: {
  seoTitle: string;
  metaDescription: string;
  paragraphs: ParagraphBlock[];
}): string {
  const esc = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const parts: string[] = [];
  parts.push('<article>');
  parts.push(`<h1>${esc(input.seoTitle.trim() || '未命名')}</h1>`);
  parts.push(`<p class="meta">${esc(input.metaDescription.trim())}</p>`);
  for (const p of input.paragraphs) {
    parts.push(`<h2>${esc(p.title)}</h2>`);
    for (const line of p.content.trim().split('\n')) {
      parts.push(`<p>${esc(line)}</p>`);
    }
  }
  parts.push('</article>');
  return parts.join('\n');
}

export async function copyTextToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

export function downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  a.click();
  URL.revokeObjectURL(url);
}

export function buildSeoJsonLd(input: { seoTitle: string; metaDescription: string; paragraphs: ParagraphBlock[] }) {
  const articleBody = input.paragraphs.map((p) => `${p.title}\n${p.content}`).join('\n\n');
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: input.seoTitle,
      description: input.metaDescription,
      articleBody,
    },
    null,
    2,
  );
}

export type ArticlePersistPayload = {
  seo_title: string | null;
  meta_description: string | null;
  paragraphs: ParagraphBlock[];
  body: string;
  word_count: number;
  seo_score_snapshot: SeoSnapshot;
};

export function buildPersistPayload(input: {
  seoTitle: string;
  metaDescription: string;
  paragraphs: ParagraphBlock[];
  snapshot: SeoSnapshot;
}): ArticlePersistPayload {
  const body = buildMarkdownArticle(input);
  const wordCount = input.paragraphs.reduce((a, p) => a + p.content.replace(/\s/g, '').length, 0);
  return {
    seo_title: input.seoTitle.trim() || null,
    meta_description: input.metaDescription.trim() || null,
    paragraphs: input.paragraphs,
    body,
    word_count: wordCount,
    seo_score_snapshot: input.snapshot,
  };
}
