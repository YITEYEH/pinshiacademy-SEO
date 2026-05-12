import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useBlocker, useNavigate, useSearchParams } from 'react-router';
import { ChevronRight, Loader2, Check, Copy, Download, Upload, TrendingUp, Target, MessageSquare, Clock } from 'lucide-react';
import { createArticle, getArticle, updateArticle } from '@/lib/articlesRepo';
import { getSupabase } from '@/lib/supabase';
import { invokeGenerateDraft, type EdgeGenerateDraftResponse } from '@/lib/edgeLlm';
import { buildHtmlArticle, buildMarkdownArticle, buildPersistPayload, copyTextToClipboard, downloadTextFile } from '@/lib/articleExport';
import { computeSeoSnapshot } from '@/lib/seoScore';
import { DEFAULT_TEMPLATE_PICK, TemplateSelector, type TemplateSelection } from './TemplateSelector';
import { CompetitorAnalysis } from './CompetitorAnalysis';
import { EditableParagraph } from './EditableParagraph';
import { SEOScoreCard } from './SEOScoreCard';
import { Toast } from './Toast';
import { SchedulePublish } from './SchedulePublish';

type ParagraphBlock = { title: string; content: string };

function stripJsonFence(raw: string) {
  let t = raw.trim();
  if (t.startsWith('```')) {
    t = t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  }
  return t.trim();
}

function parseParagraphsJson(text: string): ParagraphBlock[] | null {
  const cleaned = stripJsonFence(text);
  try {
    const parsed = JSON.parse(cleaned) as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    const out: ParagraphBlock[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== 'object') return null;
      const rec = item as Record<string, unknown>;
      if (typeof rec.title !== 'string' || typeof rec.content !== 'string') return null;
      out.push({ title: rec.title.trim(), content: rec.content.trim() });
    }
    return out.length ? out : null;
  } catch {
    return null;
  }
}

function isCompleteOk(d: EdgeGenerateDraftResponse | null): d is { ok: true; text: string; model?: string } {
  return Boolean(d && typeof d === 'object' && 'ok' in d && d.ok === true && 'text' in d && typeof (d as { text?: string }).text === 'string');
}

function parseSingleSectionJson(text: string, expectedTitle: string): ParagraphBlock | null {
  const parsed = parseParagraphsJson(text);
  if (!parsed || parsed.length !== 1) return null;
  const p = parsed[0]!;
  const want = expectedTitle.trim();
  const got = p.title.trim();
  if (got === want || got.replace(/\s/g, '') === want.replace(/\s/g, '')) {
    return { title: want, content: p.content.trim() };
  }
  if (got.includes(want) || want.includes(got)) {
    return { title: want, content: p.content.trim() };
  }
  return null;
}

function buildOneSectionPrompt(input: {
  sectionTitle: string;
  sectionIndex: number;
  total: number;
  mainKeyword: string;
  secondaryKw: string;
  templateBlock: string;
  writerBrief?: string;
  fullOutlineTitles: string[];
}): string {
  const prevDone = input.fullOutlineTitles.slice(0, input.sectionIndex).join('、') || '（尚無）';
  const tb = input.templateBlock.trim();
  const templatePrefix = tb ? `${tb}\n\n` : '';
  const wb = input.writerBrief?.trim();
  const writerPrefix = wb ? `${wb}\n\n` : '';
  return `請以繁體中文撰寫 SEO 文章中的「單一節」。
主關鍵字：${input.mainKeyword.trim() || '（未指定）'}
相關關鍵字（請自然穿插）：${input.secondaryKw || '（無）'}

${templatePrefix}${writerPrefix}完整大綱順序：${input.fullOutlineTitles.join('、')}
已完成的前置標題：${prevDone}
你負責第 ${input.sectionIndex + 1}/${input.total} 節；該節標題必須與下列字串完全一致：「${input.sectionTitle}」

請只輸出一個 JSON 陣列（不要 markdown），且僅含一個元素：
[{"title":"${input.sectionTitle}","content":"..."}]
content 約 280–420 字，分段可用 \\n。`;
}

export function NewArticle(_props?: { onNavigate?: (page: string) => void }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [articleId, setArticleId] = useState<string | null>(null);
  const [mainKeyword, setMainKeyword] = useState('AI 行銷工具');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);
  const [selectedH2s, setSelectedH2s] = useState<number[]>([]);
  const [templatePick, setTemplatePick] = useState<TemplateSelection>(DEFAULT_TEMPLATE_PICK);
  const [audienceTarget, setAudienceTarget] = useState('');
  const [toneStyle, setToneStyle] = useState('');
  const [ctaGoal, setCtaGoal] = useState('');
  const [brandName, setBrandName] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [genProgress, setGenProgress] = useState<string | null>(null);
  const generationCancelledRef = useRef(false);
  const resumeGenerationRef = useRef<{ base: ParagraphBlock[]; fromIndex: number } | null>(null);
  const lastPartialParagraphsRef = useRef<ParagraphBlock[]>([]);
  const [genFailure, setGenFailure] = useState<{ index: number; title: string } | null>(null);
  const [paragraphs, setParagraphs] = useState<ParagraphBlock[]>([
    {
      title: '前言',
      content: '在數位行銷的時代，AI 行銷工具已成為企業提升競爭力的關鍵。本文將深入探討 AI 如何革新行銷流程，以及如何選擇最適合您的工具。',
    },
    {
      title: 'AI 行銷工具的主要優勢',
      content: 'AI 行銷工具能夠自動化繁瑣的任務，分析大量數據，並提供精準的受眾洞察。透過機器學習，這些工具能夠持續優化行銷策略，提升 ROI。',
    },
    {
      title: '如何選擇適合的 AI 工具',
      content: '選擇 AI 工具時，需考慮企業規模、預算、技術能力等因素。建議從小規模試用開始，逐步擴展至完整的 AI 行銷生態系統。',
    },
  ]);

  const steps = [
    { number: 1, label: '輸入主題' },
    { number: 2, label: '關鍵字分析' },
    { number: 3, label: 'H2 選擇' },
    { number: 4, label: '文章設定' },
    { number: 5, label: '文章結果' },
  ];

  const mockKeywords = [
    { keyword: 'AI 行銷工具', volume: 12000, kd: 45, cpc: 2.5, intent: '資訊型', score: 92 },
    { keyword: 'AI 內容生成', volume: 8500, kd: 38, cpc: 1.8, intent: '資訊型', score: 88 },
    { keyword: 'SEO 自動化', volume: 6200, kd: 52, cpc: 3.2, intent: '商業型', score: 85 },
    { keyword: '內容行銷 AI', volume: 4800, kd: 41, cpc: 2.1, intent: '資訊型', score: 82 },
    { keyword: 'AI 寫作助手', volume: 9800, kd: 48, cpc: 2.7, intent: '導航型', score: 90 },
  ];

  const mockH2s = [
    { title: 'AI 行銷工具的主要優勢', volume: 3200, keywords: ['AI', '行銷', '優勢'], suggested: true },
    { title: '如何選擇適合的 AI 工具', volume: 2800, keywords: ['選擇', 'AI工具'], suggested: true },
    { title: 'AI 與傳統行銷的差異', volume: 2100, keywords: ['差異', '傳統行銷'], suggested: false },
    { title: '實際案例分析', volume: 1800, keywords: ['案例', '分析'], suggested: true },
    { title: '未來發展趨勢', volume: 2400, keywords: ['趨勢', '未來'], suggested: false },
  ];

  const loadDraft = useCallback(async (id: string) => {
    const row = await getArticle(id);
    if (!row) {
      setToast({ type: 'error', message: '找不到草稿或無權限' });
      navigate('/new-article', { replace: true });
      return;
    }
    setArticleId(row.id);
    setMainKeyword(row.primary_keyword?.trim() || row.title || '');
    setSeoTitle(row.seo_title?.trim() ?? '');
    setMetaDescription(row.meta_description?.trim() ?? '');
    if (Array.isArray(row.paragraphs) && row.paragraphs.length > 0) {
      const parsed = row.paragraphs as ParagraphBlock[];
      if (parsed.every((p) => typeof p.title === 'string' && typeof p.content === 'string')) {
        setParagraphs(parsed);
      }
    }
    if (row.generation_settings && typeof row.generation_settings === 'object') {
      const g = row.generation_settings as Record<string, unknown>;
      const tid = g.template_id;
      const tname = g.template_name;
      const tex = g.template_prompt_excerpt;
      if (typeof tid === 'string' && typeof tname === 'string') {
        setTemplatePick({
          id: tid,
          name: tname,
          promptBodyExcerpt: typeof tex === 'string' ? tex : undefined,
        });
      }
      const ws = g.wizard_step;
      if (typeof ws === 'number' && ws >= 1 && ws <= 5) setStep(ws);
      if (Array.isArray(g.keyword_indices)) {
        const arr = g.keyword_indices.filter((x): x is number => typeof x === 'number' && Number.isInteger(x));
        if (arr.length) setSelectedKeywords(arr);
      }
      if (Array.isArray(g.h2_indices)) {
        const arr = g.h2_indices.filter((x): x is number => typeof x === 'number' && Number.isInteger(x));
        if (arr.length) setSelectedH2s(arr);
      }
      if (typeof g.audience_target === 'string') setAudienceTarget(g.audience_target);
      if (typeof g.tone_style === 'string') setToneStyle(g.tone_style);
      if (typeof g.cta_goal === 'string') setCtaGoal(g.cta_goal);
      if (typeof g.brand_name === 'string') setBrandName(g.brand_name);
    }
  }, [navigate]);

  useEffect(() => {
    const draft = searchParams.get('draft');
    if (!draft || !getSupabase()) return;
    let cancelled = false;
    void (async () => {
      try {
        await loadDraft(draft);
      } catch (e) {
        if (!cancelled) {
          setToast({ type: 'error', message: e instanceof Error ? e.message : '載入草稿失敗' });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [searchParams, loadDraft]);

  const handleAnalyze = () => {
    setLoading(true);
    void (async () => {
      try {
        if (!getSupabase()) {
          setToast({ type: 'error', message: '請先設定 Supabase 並登入' });
          setLoading(false);
          return;
        }
        if (!articleId) {
          const row = await createArticle({
            title: mainKeyword.trim() || '未命名草稿',
            primary_keyword: mainKeyword.trim() || null,
          });
          setArticleId(row.id);
          setSearchParams({ draft: row.id }, { replace: true });
        }
      } catch (e) {
        setToast({ type: 'error', message: e instanceof Error ? e.message : '建立草稿失敗' });
        setLoading(false);
        return;
      }
      window.setTimeout(() => {
        setLoading(false);
        setStep(2);
      }, 1200);
    })();
  };

  const handleCancelGenerate = () => {
    generationCancelledRef.current = true;
  };

  const handleGenerate = () => {
    void (async () => {
      setGenFailure(null);
      generationCancelledRef.current = false;
      setLoading(true);
      setGenProgress('準備草稿與大綱…');
      try {
        if (!getSupabase()) {
          setToast({ type: 'error', message: '請先設定 Supabase 並登入' });
          return;
        }
        let id = articleId;
        if (!id) {
          const row = await createArticle({
            title: mainKeyword.trim() || '未命名草稿',
            primary_keyword: mainKeyword.trim() || null,
          });
          id = row.id;
          setArticleId(id);
          setSearchParams({ draft: id }, { replace: true });
        }

        const outlineTitles =
          selectedH2s.length > 0
            ? [...selectedH2s].sort((a, b) => a - b).map((i) => mockH2s[i]?.title).filter(Boolean)
            : mockH2s.filter((h) => h.suggested).map((h) => h.title);
        const secondaryKw = selectedKeywords.map((i) => mockKeywords[i]?.keyword).filter(Boolean).join('、');

        const templateBlock = [
          `選定版型：${templatePick.name}（id: ${templatePick.id}）`,
          templatePick.promptBodyExcerpt
            ? `寫作模板提示摘要（請在語氣與結構上對齊，勿逐字照抄）：\n${templatePick.promptBodyExcerpt}`
            : '',
        ]
          .filter((s) => s.trim().length > 0)
          .join('\n\n');

        const writerBrief = [
          audienceTarget.trim() && `目標讀者：${audienceTarget.trim()}`,
          toneStyle.trim() && `語氣風格：${toneStyle.trim()}`,
          ctaGoal.trim() && `CTA 目標：${ctaGoal.trim()}`,
          brandName.trim() && `品牌名稱：${brandName.trim()}`,
        ]
          .filter(Boolean)
          .join('\n');

        const fullOutlineTitles = ['前言', ...(outlineTitles.length ? outlineTitles : mockH2s.map((h) => h.title))];
        const resume = resumeGenerationRef.current;
        resumeGenerationRef.current = null;
        let acc: ParagraphBlock[] = resume ? [...resume.base] : [];
        const startIdx = resume ? resume.fromIndex : 0;

        for (let i = startIdx; i < fullOutlineTitles.length; i++) {
          if (generationCancelledRef.current) {
            if (acc.length) setParagraphs(acc);
            setToast({ type: 'info', message: '已取消生成' });
            return;
          }
          const sectionTitle = fullOutlineTitles[i]!;
          let piece: ParagraphBlock | null = null;
          for (let attempt = 0; attempt < 2; attempt++) {
            const prompt = buildOneSectionPrompt({
              sectionTitle,
              sectionIndex: i,
              total: fullOutlineTitles.length,
              mainKeyword: mainKeyword.trim() || '（未指定）',
              secondaryKw,
              templateBlock,
              writerBrief,
              fullOutlineTitles,
            });
            setGenProgress(
              `生成第 ${i + 1}/${fullOutlineTitles.length} 節「${sectionTitle}」${attempt > 0 ? '（重試）' : ''}…`,
            );
            const { data, error } = await invokeGenerateDraft({ action: 'complete', prompt, maxTokens: 480 });
            if (error) {
              setToast({ type: 'error', message: error });
              return;
            }
            if (!isCompleteOk(data)) {
              const err =
                data && typeof data === 'object' && 'error' in data ? String((data as { error?: string }).error) : '生成失敗';
              setToast({ type: 'error', message: err });
              return;
            }
            piece = parseSingleSectionJson(data.text, sectionTitle);
            if (piece) break;
          }
          if (!piece) {
            lastPartialParagraphsRef.current = [...acc];
            setGenFailure({ index: i, title: sectionTitle });
            if (acc.length) setParagraphs(acc);
            setToast({ type: 'error', message: `第 ${i + 1} 節生成失敗，可自該節重試` });
            return;
          }
          acc.push(piece);
        }

        setParagraphs(acc);
        const defaultTitle = `${mainKeyword.trim() || '主題'}完整指南｜實用解析與建議`;
        setSeoTitle((prev) => (prev.trim() ? prev : defaultTitle));
        const intro = acc[0]?.content ?? '';
        setMetaDescription((prev) => {
          if (prev.trim()) return prev;
          const s = intro.replace(/\s+/g, ' ').trim();
          return s.length > 155 ? `${s.slice(0, 152)}…` : s;
        });
        setStep(5);
        setGenFailure(null);
        setToast({ type: 'success', message: '文章已分段生成完成，可於右側檢視 SEO 評分並繼續編修' });
      } catch (e) {
        setToast({ type: 'error', message: e instanceof Error ? e.message : '生成失敗' });
      } finally {
        setLoading(false);
        setGenProgress(null);
      }
    })();
  };

  const seoSnapshot = useMemo(
    () =>
      computeSeoSnapshot({
        primaryKeyword: mainKeyword,
        seoTitle,
        metaDescription,
        paragraphs,
      }),
    [mainKeyword, seoTitle, metaDescription, paragraphs],
  );

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      Boolean(
        articleId &&
          step >= 2 &&
          step < 5 &&
          `${currentLocation.pathname}${currentLocation.search}` !== `${nextLocation.pathname}${nextLocation.search}`,
      ),
  );

  useEffect(() => {
    if (!(articleId && step >= 2 && step < 5)) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [articleId, step]);

  useEffect(() => {
    if (!articleId || !getSupabase()) return;
    if (step < 2 || step > 4) return;
    const t = window.setTimeout(() => {
      void updateArticle(articleId, {
        title: mainKeyword.trim() || '未命名草稿',
        primary_keyword: mainKeyword.trim() || null,
        generation_settings: {
          wizard_step: step,
          keyword_indices: selectedKeywords,
          h2_indices: selectedH2s,
          template_id: templatePick.id,
          template_name: templatePick.name,
          template_prompt_excerpt: templatePick.promptBodyExcerpt ?? null,
          audience_target: audienceTarget.trim() || null,
          tone_style: toneStyle.trim() || null,
          cta_goal: ctaGoal.trim() || null,
          brand_name: brandName.trim() || null,
        },
      }).catch((e) => setToast({ type: 'error', message: e instanceof Error ? e.message : '同步失敗' }));
    }, 900);
    return () => window.clearTimeout(t);
  }, [articleId, step, selectedKeywords, selectedH2s, templatePick, mainKeyword, audienceTarget, toneStyle, ctaGoal, brandName]);

  const requestParagraphAi = useCallback(async (instruction: string, currentContent: string) => {
    const prompt = `${instruction}\n${currentContent}`;
    const { data, error } = await invokeGenerateDraft({ action: 'complete', prompt, maxTokens: 500 });
    if (error) {
      setToast({ type: 'error', message: error });
      return null;
    }
    if (!isCompleteOk(data)) {
      const err = data && typeof data === 'object' && 'error' in data ? String((data as { error?: string }).error) : '改寫失敗';
      setToast({ type: 'error', message: err });
      return null;
    }
    return data.text.trim() || null;
  }, []);

  useEffect(() => {
    if (step !== 5 || !articleId || !getSupabase()) return;
    const t = window.setTimeout(() => {
      const payload = buildPersistPayload({
        seoTitle,
        metaDescription,
        paragraphs,
        snapshot: seoSnapshot,
      });
      void updateArticle(articleId, {
        title: mainKeyword.trim() || '未命名草稿',
        primary_keyword: mainKeyword.trim() || null,
        ...payload,
        paragraphs: payload.paragraphs as unknown[],
        generation_settings: {
          wizard_step: 5,
          keyword_indices: selectedKeywords,
          h2_indices: selectedH2s,
          template_id: templatePick.id,
          template_name: templatePick.name,
          template_prompt_excerpt: templatePick.promptBodyExcerpt ?? null,
          audience_target: audienceTarget.trim() || null,
          tone_style: toneStyle.trim() || null,
          cta_goal: ctaGoal.trim() || null,
          brand_name: brandName.trim() || null,
        },
      }).catch((e) => setToast({ type: 'error', message: e instanceof Error ? e.message : '同步失敗' }));
    }, 1000);
    return () => window.clearTimeout(t);
  }, [
    paragraphs,
    step,
    articleId,
    mainKeyword,
    seoTitle,
    metaDescription,
    seoSnapshot,
    templatePick,
    selectedKeywords,
    selectedH2s,
    audienceTarget,
    toneStyle,
    ctaGoal,
    brandName,
  ]);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">新增 SEO 文章</h1>
          <p className="text-muted-foreground">透過 AI 分析關鍵字並生成高品質內容</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                      step > s.number
                        ? 'bg-green-500 text-white'
                        : step === s.number
                        ? 'bg-gradient-to-br from-brand to-brand-deep text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                  </div>
                  <span className={`text-sm font-medium ${step >= s.number ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full ${step > s.number ? 'bg-green-500' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-border">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2">主關鍵字</label>
                <input
                  type="text"
                  placeholder="例如：AI 行銷工具"
                  className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
                  value={mainKeyword}
                  onChange={(e) => setMainKeyword(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">目標讀者</label>
                  <input
                    type="text"
                    placeholder="行銷人員、SEO 專家、中小企業主"
                    className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
                    value={audienceTarget}
                    onChange={(e) => setAudienceTarget(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-2">品牌名稱（選填）</label>
                  <input
                    type="text"
                    placeholder="您的品牌名稱"
                    className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">語氣風格</label>
                  <input
                    type="text"
                    placeholder="專業正式、輕鬆友善、技術詳細"
                    className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
                    value={toneStyle}
                    onChange={(e) => setToneStyle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-2">CTA 目標</label>
                  <input
                    type="text"
                    placeholder="註冊免費試用、聯絡諮詢、下載白皮書"
                    className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
                    value={ctaGoal}
                    onChange={(e) => setCtaGoal(e.target.value)}
                  />
                </div>
              </div>

              <TemplateSelector value={templatePick} onChange={setTemplatePick} />

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 hover:from-brand-deep hover:to-brand-strong transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>分析中...</span>
                  </>
                ) : (
                  <>
                    <span>開始分析關鍵字</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1">關鍵字分析結果</h3>
                  <p className="text-sm text-muted-foreground">已選擇 {selectedKeywords.length} 個關鍵字</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-accent rounded-lg text-sm hover:bg-accent/80">
                    僅顯示高搜尋量
                  </button>
                  <button className="px-4 py-2 bg-accent rounded-lg text-sm hover:bg-accent/80">
                    僅顯示低競爭
                  </button>
                </div>
              </div>

              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="text-left p-4 text-sm font-medium">關鍵字</th>
                      <th className="text-left p-4 text-sm font-medium">搜尋量</th>
                      <th className="text-left p-4 text-sm font-medium">KD</th>
                      <th className="text-left p-4 text-sm font-medium">CPC</th>
                      <th className="text-left p-4 text-sm font-medium">搜尋意圖</th>
                      <th className="text-left p-4 text-sm font-medium">建議程度</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockKeywords.map((kw, index) => (
                      <tr key={index} className="border-t border-border hover:bg-accent/50">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            className="rounded"
                            checked={selectedKeywords.includes(index)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedKeywords([...selectedKeywords, index]);
                              } else {
                                setSelectedKeywords(selectedKeywords.filter((i) => i !== index));
                              }
                            }}
                          />
                        </td>
                        <td className="p-4 font-medium">{kw.keyword}</td>
                        <td className="p-4">
                          <span className="text-brand-link font-medium">{kw.volume.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-sm ${kw.kd < 40 ? 'bg-green-100 text-green-700' : kw.kd < 50 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {kw.kd}
                          </span>
                        </td>
                        <td className="p-4">${kw.cpc}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-slate-100 text-brand-deep rounded text-sm">{kw.intent}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-brand to-brand-deep"
                                style={{ width: `${kw.score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{kw.score}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <CompetitorAnalysis />

              <button
                onClick={() => setStep(3)}
                className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 hover:from-brand-deep hover:to-brand-strong transition-all"
              >
                <span>繼續選擇 H2 大綱</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1">選擇文章 H2 大綱</h3>
                  <p className="text-sm text-muted-foreground">已選擇 {selectedH2s.length} 個標題</p>
                </div>
                <button
                  onClick={() => setSelectedH2s(mockH2s.filter((h, i) => h.suggested).map((_, i) => i))}
                  className="px-4 py-2 bg-gradient-to-r from-brand-soft-from to-brand-soft-to text-brand-deep rounded-lg text-sm hover:from-slate-100 hover:to-slate-200"
                >
                  全選高流量標題
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {mockH2s.map((h2, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      selectedH2s.includes(index)
                        ? 'border-brand-deep bg-slate-50/50'
                        : 'border-border hover:border-slate-300 bg-white'
                    }`}
                    onClick={() => {
                      if (selectedH2s.includes(index)) {
                        setSelectedH2s(selectedH2s.filter((i) => i !== index));
                      } else {
                        setSelectedH2s([...selectedH2s, index]);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedH2s.includes(index)}
                          onChange={() => {}}
                          className="mt-1 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4>{h2.title}</h4>
                            {h2.suggested && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                                建議
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              搜尋量 {h2.volume.toLocaleString()}
                            </span>
                            <span>關鍵字：{h2.keywords.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 hover:from-brand-deep hover:to-brand-strong transition-all"
              >
                <span>設定文章參數</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="mb-4">文章設定</h3>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">總字數</label>
                  <select className="w-full px-4 py-3 bg-input-background rounded-lg">
                    <option>2000-2500 字</option>
                    <option>2500-3000 字</option>
                    <option>3000-3500 字</option>
                    <option>3500-4000 字</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">每段字數</label>
                  <select className="w-full px-4 py-3 bg-input-background rounded-lg">
                    <option>150-200 字</option>
                    <option>200-250 字</option>
                    <option>250-300 字</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">語氣</label>
                  <input
                    type="text"
                    placeholder="專業正式、輕鬆友善、技術詳細"
                    className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
                    value={toneStyle}
                    onChange={(e) => setToneStyle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-2">CTA 類型</label>
                  <input
                    type="text"
                    placeholder="註冊免費試用、聯絡諮詢、下載白皮書"
                    className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
                    value={ctaGoal}
                    onChange={(e) => setCtaGoal(e.target.value)}
                  />
                </div>
              </div>

              <div className="border border-border rounded-xl p-6">
                <h4 className="mb-4">額外選項</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: '包含前言', icon: MessageSquare },
                    { label: '包含 FAQ', icon: MessageSquare },
                    { label: '包含比較表格', icon: Target },
                    { label: '生成 Meta Description', icon: Target },
                    { label: '包含結論', icon: MessageSquare },
                    { label: '包含相關資源', icon: Target },
                  ].map((option, index) => (
                    <label key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <option.icon className="w-4 h-4 text-muted-foreground" />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {genFailure ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <p className="mb-3">
                    第 {genFailure.index + 1} 節「{genFailure.title}」生成失敗；已完成前段可保留在左側預覽（若已寫入）。
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      resumeGenerationRef.current = {
                        base: [...lastPartialParagraphsRef.current],
                        fromIndex: genFailure.index,
                      };
                      setGenFailure(null);
                      handleGenerate();
                    }}
                    className="rounded-lg bg-amber-600 px-4 py-2 text-white text-sm font-medium hover:bg-amber-700"
                  >
                    從此節重試
                  </button>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                {loading ? (
                  <button
                    type="button"
                    onClick={handleCancelGenerate}
                    className="sm:w-40 rounded-xl border-2 border-border bg-white py-4 text-sm font-medium hover:bg-accent"
                  >
                    取消生成
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-4 px-6 flex flex-col items-center justify-center gap-1 hover:from-brand-deep hover:to-brand-strong transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>AI 生成中…</span>
                      </span>
                      {genProgress ? <span className="text-sm text-white/90 font-normal">{genProgress}</span> : null}
                    </>
                  ) : (
                    <span className="flex items-center gap-3">
                      <span>開始生成文章</span>
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <div>
                  <label className="block mb-2">SEO 標題</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="含主關鍵字、25–60 字為佳"
                    className="w-full px-4 py-3 bg-input-background rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-2">Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="120–160 字，含主關鍵字與價值主張"
                    className="w-full px-4 py-3 bg-input-background rounded-lg h-20 resize-none"
                  />
                </div>

                <div className="border border-border rounded-xl p-6 bg-white">
                  <h2 className="mb-6">{seoTitle.trim() || mainKeyword || '文章預覽'}</h2>
                  {paragraphs.map((para, index) => (
                    <EditableParagraph
                      key={index}
                      title={para.title}
                      content={para.content}
                      onRequestAi={requestParagraphAi}
                      onUpdate={(newContent) => {
                        const newParagraphs = [...paragraphs];
                        newParagraphs[index].content = newContent;
                        setParagraphs(newParagraphs);
                        setToast({ type: 'success', message: '段落已更新' });
                      }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      void (async () => {
                        try {
                          const md = buildMarkdownArticle({ seoTitle, metaDescription, paragraphs });
                          await copyTextToClipboard(md);
                          setToast({ type: 'success', message: 'Markdown 已複製到剪貼簿' });
                        } catch (e) {
                          setToast({ type: 'error', message: e instanceof Error ? e.message : '複製失敗' });
                        }
                      })();
                    }}
                    className="bg-white border-2 border-border rounded-xl py-3 px-6 flex items-center justify-center gap-2 hover:border-brand-deep transition-all"
                  >
                    <Copy className="w-5 h-5" />
                    <span>複製 Markdown</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        const html = buildHtmlArticle({ seoTitle, metaDescription, paragraphs });
                        downloadTextFile(`${(seoTitle || mainKeyword || 'article').slice(0, 40).replace(/[/\\?%*:|"<>]/g, '-')}.html`, html, 'text/html;charset=utf-8');
                        setToast({ type: 'success', message: '已下載 HTML 檔' });
                      } catch (e) {
                        setToast({ type: 'error', message: e instanceof Error ? e.message : '匯出失敗' });
                      }
                    }}
                    className="bg-white border-2 border-border rounded-xl py-3 px-6 flex items-center justify-center gap-2 hover:border-brand-deep transition-all"
                  >
                    <Download className="w-5 h-5" />
                    <span>匯出 HTML</span>
                  </button>
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="bg-white border-2 border-brand-deep text-brand-link rounded-xl py-3 px-6 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                  >
                    <Clock className="w-5 h-5" />
                    <span>排程發布</span>
                  </button>
                </div>
                <button
                  onClick={() => {
                    setToast({ type: 'success', message: '文章已發布到 WordPress' });
                  }}
                  className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-4 px-6 flex items-center justify-center gap-2 hover:from-brand-deep hover:to-brand-strong transition-all"
                >
                  <Upload className="w-5 h-5" />
                  <span>立即發布</span>
                </button>
              </div>

              <div>
                <SEOScoreCard
                  primaryKeyword={mainKeyword}
                  seoTitle={seoTitle}
                  metaDescription={metaDescription}
                  paragraphs={paragraphs}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {blocker.state === 'blocked' ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-w-md rounded-2xl bg-white p-6 shadow-xl border border-border">
            <h3 className="mb-2">確定要離開？</h3>
            <p className="text-sm text-muted-foreground mb-6">精靈尚未完成，離開後可稍後從草稿列表或網址列的 draft 參數繼續編輯。</p>
            <div className="flex justify-end gap-3">
              <button type="button" className="px-4 py-2 rounded-lg border border-border hover:bg-accent" onClick={() => blocker.reset?.()}>
                留下來
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                onClick={() => blocker.proceed?.()}
              >
                仍要離開
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      {showScheduleModal && (
        <SchedulePublish
          onSchedule={(settings) => {
            setShowScheduleModal(false);
            setToast({
              type: 'success',
              message: `文章已排程於 ${settings.date} ${settings.time} 發布`,
            });
          }}
          onClose={() => setShowScheduleModal(false)}
        />
      )}
    </div>
  );
}
