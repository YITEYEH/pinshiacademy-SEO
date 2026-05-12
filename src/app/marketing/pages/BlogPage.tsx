import { Link } from 'react-router';
import { MarketingLayout } from '@/app/marketing/components/MarketingLayout';
import { SeoHead } from '@/app/seo/SeoHead';
import { absoluteUrl } from '@/app/seo/siteConfig';

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tag: string;
};

const posts: BlogPost[] = [
  {
    slug: 'ai-seo-tools-vs-chatgpt',
    title: 'AI SEO 工具 vs ChatGPT：差別不在文筆，而在工作流',
    description:
      '同樣是 AI寫文，為什麼有些內容能被收錄、能帶來轉換？核心在搜尋意圖、SEO 架構與關鍵字布局。',
    tag: 'AI SEO',
  },
  {
    slug: 'seo-article-generator-checklist',
    title: 'SEO文章產生器檢查清單：避免「垃圾文」的 7 個訊號',
    description:
      '用這份清單檢查你的 SEO文章生成結果：從 heading hierarchy、語意密度到可行 CTA。',
    tag: 'SEO文章生成',
  },
  {
    slug: 'meta-description-ctr',
    title: 'Meta Description 怎麼寫才會提高點擊？（範例與公式）',
    description:
      '把 SEO文案的轉換思維放進描述，讓點擊率與後續行動更一致。',
    tag: 'SEO文案',
  },
];

export function BlogPage() {
  return (
    <MarketingLayout>
      <SeoHead
        meta={{
          title: '部落格｜AI SEO、SEO工具與 SEO內容生成策略',
          description:
            '分享 AI SEO 工具、SEO內容生成、SEO寫作工具與 SEO優化方法。讓 SEO文章生成不只排名，也能帶來流量與轉換。',
          canonicalPath: '/blog',
          og: { type: 'website', url: absoluteUrl('/blog') },
          twitter: { card: 'summary' },
        }}
      />

      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">部落格</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          以商業化視角寫 SEO：從 AI SEO 到 SEO工具選型，從 SEO文案到 SEO 內容生成策略。
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm">
              <p className="text-xs font-semibold text-emerald-800">{p.tag}</p>
              <h2 className="mt-3 text-base font-semibold tracking-tight">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{p.description}</p>
              <div className="mt-6">
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-sm font-medium text-zinc-900 hover:text-emerald-800"
                >
                  閱讀文章（預留）
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}

