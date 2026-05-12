export type SeoMetric = {
  label: string;
  score: number;
  status: 'good' | 'warning';
  value: string;
};

export type SeoSuggestion = { type: 'success' | 'warning' | 'info'; text: string };

export type SeoSnapshot = {
  score: number;
  ratingLabel: string;
  metrics: SeoMetric[];
  suggestions: SeoSuggestion[];
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 不依賴 LLM 的規則式 SEO 評分（即時、零成本） */
export function computeSeoSnapshot(input: {
  primaryKeyword: string;
  seoTitle: string;
  metaDescription: string;
  paragraphs: { title: string; content: string }[];
}): SeoSnapshot {
  const kw = input.primaryKeyword.trim();
  const title = input.seoTitle.trim();
  const meta = input.metaDescription.trim();
  const body = input.paragraphs.map((p) => p.content).join('\n');
  const full = `${title}\n${meta}\n${body}`;

  const kwLower = kw.toLowerCase();
  const titleHasKw = kw ? title.toLowerCase().includes(kwLower) : false;
  const metaHasKw = kw ? meta.toLowerCase().includes(kwLower) : false;
  const occ = kw ? (body.match(new RegExp(escapeRegExp(kw), 'gi')) || []).length : 0;
  const densityPer1k = body.length > 0 ? (occ / body.length) * 1000 : 0;

  let kwScore = 45;
  if (kw) {
    kwScore = 20;
    if (titleHasKw) kwScore += 28;
    if (metaHasKw) kwScore += 18;
    kwScore += Math.min(40, occ * 10);
    if (densityPer1k > 25) kwScore -= 18;
    if (densityPer1k < 1 && body.length > 400) kwScore -= 12;
  }
  kwScore = Math.max(0, Math.min(100, Math.round(kwScore)));

  const h2Blocks = input.paragraphs.filter((p) => p.title && p.title !== '前言');
  const h2Count = h2Blocks.length;
  let h2Score = Math.min(100, h2Count === 0 ? 25 : 35 + h2Count * 12);
  h2Score = Math.max(0, Math.min(100, Math.round(h2Score)));

  const wordCount = body.replace(/\s/g, '').length;
  let lenScore = 30;
  if (wordCount >= 1500) lenScore = 75;
  if (wordCount >= 2500) lenScore = 90;
  if (wordCount >= 4000) lenScore = 100;
  if (wordCount < 400) lenScore = 35;
  lenScore = Math.max(0, Math.min(100, Math.round(lenScore)));

  const titleLen = title.length;
  let titleScore = 50;
  if (titleLen >= 25 && titleLen <= 60) titleScore = 90;
  else if (titleLen > 60) titleScore = 65;
  else if (titleLen > 0) titleScore = 55;
  titleScore = Math.max(0, Math.min(100, titleScore));

  const metaLen = meta.length;
  let metaScore = 45;
  if (metaLen >= 120 && metaLen <= 160) metaScore = 95;
  else if (metaLen > 160) metaScore = 70;
  else if (metaLen > 60) metaScore = 60;
  metaScore = Math.max(0, Math.min(100, metaScore));

  const ctaHits = (full.match(/立即|免費|註冊|諮詢|購買|下載|聯絡/gi) || []).length;
  let ctaScore = Math.min(100, 35 + ctaHits * 18);

  const total = Math.round((kwScore + h2Score + lenScore + titleScore + metaScore + ctaScore) / 6);

  const metrics: SeoMetric[] = [
    {
      label: '關鍵字覆蓋',
      score: kwScore,
      status: kwScore >= 65 ? 'good' : 'warning',
      value: kw ? `${occ} 次／約 ${densityPer1k.toFixed(1)} 次／千字` : '未設定主關鍵字',
    },
    {
      label: 'H2 結構',
      score: h2Score,
      status: h2Score >= 60 ? 'good' : 'warning',
      value: `${h2Count} 個主段落`,
    },
    {
      label: '內容長度',
      score: lenScore,
      status: lenScore >= 65 ? 'good' : 'warning',
      value: `約 ${wordCount} 字元（去空白）`,
    },
    {
      label: '標題長度',
      score: titleScore,
      status: titleScore >= 70 ? 'good' : 'warning',
      value: `${titleLen} 字元`,
    },
    {
      label: 'Meta 長度',
      score: metaScore,
      status: metaScore >= 70 ? 'good' : 'warning',
      value: `${metaLen} 字元`,
    },
    {
      label: 'CTA 提示',
      score: ctaScore,
      status: ctaScore >= 55 ? 'good' : 'warning',
      value: `約 ${ctaHits} 個行銷用語`,
    },
  ];

  const suggestions: SeoSuggestion[] = [];
  if (!titleHasKw && kw) suggestions.push({ type: 'warning', text: '建議在 SEO 標題中加入主關鍵字。' });
  if (!metaHasKw && kw) suggestions.push({ type: 'info', text: '建議在 Meta Description 中自然帶入主關鍵字。' });
  if (h2Count < 2) suggestions.push({ type: 'warning', text: '建議至少 2–3 個 H2 主段落以強化結構。' });
  if (wordCount < 800) suggestions.push({ type: 'warning', text: '內容偏短，可補充案例、步驟或 FAQ。' });
  if (metaLen > 0 && (metaLen < 80 || metaLen > 180)) suggestions.push({ type: 'info', text: 'Meta Description 以約 120–160 字為佳（搜尋摘要顯示）。' });
  if (densityPer1k > 25) suggestions.push({ type: 'warning', text: '關鍵字密度偏高，請避免堆砌。' });
  if (ctaHits < 1) suggestions.push({ type: 'info', text: '可於結尾加入明確 CTA（諮詢、試用、下載等）。' });
  if (suggestions.length === 0) suggestions.push({ type: 'success', text: '整體結構良好，可依實際 SERP 再微調標題與描述。' });

  let ratingLabel = '尚可';
  if (total >= 85) ratingLabel = '優秀';
  else if (total >= 72) ratingLabel = '良好';
  else if (total >= 55) ratingLabel = '接近良好';

  return { score: total, ratingLabel, metrics, suggestions };
}
