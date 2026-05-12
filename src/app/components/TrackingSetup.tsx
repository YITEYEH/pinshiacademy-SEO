import { useState } from 'react';
import { Code, Copy, CheckCircle, AlertCircle, Link as LinkIcon, Target, Eye } from 'lucide-react';
import { Toast } from './Toast';

export function TrackingSetup(_props?: { onNavigate?: (page: string) => void }) {
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [articleId, setArticleId] = useState('article-123');
  const [ctaUrl, setCtaUrl] = useState('https://example.com/signup');
  const [conversionValue, setConversionValue] = useState('500');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast({ type: 'success', message: '已複製到剪貼簿' });
  };

  // 基礎追蹤代碼
  const basicTrackingCode = `<!-- GA4 追蹤代碼 - 貼在 WordPress 主題的 header.php -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`;

  // 單篇文章追蹤代碼
  const articleTrackingCode = `<!-- 單篇文章追蹤 - 貼在文章內容頁面 -->
<script>
  // 文章資訊
  const articleData = {
    article_id: '${articleId}',
    article_title: '<?php echo get_the_title(); ?>',
    category: '<?php echo get_the_category()[0]->name; ?>',
    author: '<?php echo get_the_author(); ?>',
    publish_date: '<?php echo get_the_date(); ?>'
  };

  // 發送頁面瀏覽事件
  gtag('event', 'page_view', {
    page_title: articleData.article_title,
    page_location: window.location.href,
    article_id: articleData.article_id
  });

  // 追蹤閱讀深度
  let scrollDepth = 0;
  window.addEventListener('scroll', function() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackPoint = (scrollTop + winHeight) / docHeight * 100;

    if (trackPoint > 25 && scrollDepth < 25) {
      scrollDepth = 25;
      gtag('event', 'scroll_depth', {
        article_id: articleData.article_id,
        depth: '25%'
      });
    } else if (trackPoint > 50 && scrollDepth < 50) {
      scrollDepth = 50;
      gtag('event', 'scroll_depth', {
        article_id: articleData.article_id,
        depth: '50%'
      });
    } else if (trackPoint > 75 && scrollDepth < 75) {
      scrollDepth = 75;
      gtag('event', 'scroll_depth', {
        article_id: articleData.article_id,
        depth: '75%'
      });
    } else if (trackPoint > 90 && scrollDepth < 90) {
      scrollDepth = 90;
      gtag('event', 'scroll_depth', {
        article_id: articleData.article_id,
        depth: '90%'
      });
    }
  });

  // 追蹤停留時間
  let startTime = Date.now();
  window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    gtag('event', 'time_on_page', {
      article_id: articleData.article_id,
      seconds: timeSpent
    });
  });
</script>`;

  // CTA 連結追蹤代碼
  const ctaTrackingCode = `<!-- CTA 連結追蹤 - 加在 CTA 連結上 -->
<a href="${ctaUrl}"
   class="cta-button"
   onclick="trackCTAClick(event, this)">
  立即註冊
</a>

<script>
  function trackCTAClick(event, element) {
    const articleId = '${articleId}';
    const ctaText = element.textContent;
    const ctaUrl = element.href;
    const ctaPosition = element.getBoundingClientRect().top + window.pageYOffset;

    // 發送 CTA 點擊事件
    gtag('event', 'cta_click', {
      article_id: articleId,
      cta_text: ctaText,
      cta_url: ctaUrl,
      cta_position: ctaPosition > window.innerHeight ? 'below_fold' : 'above_fold',
      event_category: 'engagement',
      event_label: ctaText,
      value: ${conversionValue} // 估算的轉換價值
    });

    // 如果是外部連結，延遲跳轉以確保事件發送
    if (ctaUrl.indexOf(window.location.hostname) === -1) {
      event.preventDefault();
      setTimeout(function() {
        window.location.href = ctaUrl;
      }, 300);
    }
  }
</script>`;

  // 轉換追蹤代碼
  const conversionTrackingCode = `<!-- 轉換追蹤 - 貼在轉換完成頁面（如註冊成功頁） -->
<script>
  // 從 URL 參數或 Cookie 取得來源文章
  const urlParams = new URLSearchParams(window.location.search);
  const sourceArticle = urlParams.get('ref') || localStorage.getItem('source_article');

  // 發送轉換事件
  gtag('event', 'conversion', {
    send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // 替換為您的轉換 ID
    value: ${conversionValue},
    currency: 'TWD',
    transaction_id: 'TXN-' + Date.now(),
    article_id: sourceArticle,
    event_category: 'conversion',
    event_label: 'signup_completed'
  });

  // 清除來源記錄
  localStorage.removeItem('source_article');
</script>`;

  // WordPress 自動插入代碼
  const wordpressAutoCode = `<?php
/**
 * 自動插入 GA4 追蹤代碼到文章
 * 貼在 WordPress 主題的 functions.php
 */

// 在文章頁面自動插入追蹤代碼
function insert_article_tracking() {
    if (is_single()) {
        $article_id = 'article-' . get_the_ID();
        ?>
        <script>
        // 自動追蹤文章
        const articleData = {
            article_id: '<?php echo $article_id; ?>',
            article_title: '<?php echo get_the_title(); ?>',
            category: '<?php echo get_the_category()[0]->name; ?>',
        };

        gtag('event', 'page_view', {
            page_title: articleData.article_title,
            article_id: articleData.article_id
        });

        // 閱讀深度追蹤
        let scrolled25 = false, scrolled50 = false, scrolled75 = false, scrolled90 = false;
        window.addEventListener('scroll', function() {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop + winHeight) / docHeight * 100;

            if (progress > 25 && !scrolled25) {
                scrolled25 = true;
                gtag('event', 'scroll_depth', { article_id: articleData.article_id, depth: '25%' });
            }
            if (progress > 50 && !scrolled50) {
                scrolled50 = true;
                gtag('event', 'scroll_depth', { article_id: articleData.article_id, depth: '50%' });
            }
            if (progress > 75 && !scrolled75) {
                scrolled75 = true;
                gtag('event', 'scroll_depth', { article_id: articleData.article_id, depth: '75%' });
            }
            if (progress > 90 && !scrolled90) {
                scrolled90 = true;
                gtag('event', 'scroll_depth', { article_id: articleData.article_id, depth: '90%' });
            }
        });
        </script>
        <?php
    }
}
add_action('wp_footer', 'insert_article_tracking');

// 自動在 CTA 連結加上追蹤
function add_tracking_to_cta($content) {
    if (is_single()) {
        $article_id = 'article-' . get_the_ID();

        // 找出所有 CTA 按鈕並加上追蹤
        $content = preg_replace_callback(
            '/<a([^>]*class=["\'][^"\']*cta[^"\']*["\'][^>]*)>(.*?)<\\/a>/i',
            function($matches) use ($article_id) {
                $link_html = $matches[0];
                $onclick = 'onclick="gtag(\'event\', \'cta_click\', {article_id: \'' . $article_id . '\', cta_text: this.textContent});"';
                return str_replace('<a', '<a ' . $onclick, $link_html);
            },
            $content
        );
    }
    return $content;
}
add_filter('the_content', 'add_tracking_to_cta');
?>`;

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">追蹤代碼設定</h1>
          <p className="text-muted-foreground">設定文章流量與轉換追蹤，取得真實數據</p>
        </div>

        {/* 重要提示 */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-orange-900 mb-2">為什麼需要追蹤代碼？</h3>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• <strong>單篇文章流量：</strong>透過文章 ID 區分每篇文章的瀏覽量</li>
                <li>• <strong>閱讀深度：</strong>知道讀者看到文章的哪個部分（25%、50%、75%、90%）</li>
                <li>• <strong>CTA 點擊：</strong>追蹤每個 CTA 連結的點擊次數</li>
                <li>• <strong>轉換歸因：</strong>知道哪篇文章帶來最多轉換</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 參數設定 */}
        <div className="bg-white rounded-2xl p-8 border border-border mb-8">
          <h2 className="mb-6">追蹤參數設定</h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block mb-2">文章 ID</label>
              <input
                type="text"
                value={articleId}
                onChange={(e) => setArticleId(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg"
                placeholder="article-123"
              />
              <p className="text-xs text-muted-foreground mt-1">自動生成，無需手動設定</p>
            </div>
            <div>
              <label className="block mb-2">CTA 連結</label>
              <input
                type="text"
                value={ctaUrl}
                onChange={(e) => setCtaUrl(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block mb-2">轉換價值（元）</label>
              <input
                type="number"
                value={conversionValue}
                onChange={(e) => setConversionValue(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg"
                placeholder="500"
              />
            </div>
          </div>
        </div>

        {/* 代碼區塊 */}
        <div className="space-y-6">
          {/* 1. 基礎追蹤 */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Code className="w-4 h-4 text-brand-link" />
                  </div>
                  <div>
                    <h3>步驟 1：基礎 GA4 追蹤代碼</h3>
                    <p className="text-sm text-muted-foreground">貼在 WordPress header.php 或使用插件</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(basicTrackingCode)}
                  className="px-4 py-2 bg-brand-deep text-white rounded-lg hover:bg-brand-strong transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>複製代碼</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{basicTrackingCode}</code>
              </pre>
            </div>
          </div>

          {/* 2. 單篇文章追蹤 */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <h3>步驟 2：單篇文章追蹤</h3>
                    <p className="text-sm text-muted-foreground">追蹤每篇文章的瀏覽量與閱讀深度</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(articleTrackingCode)}
                  className="px-4 py-2 bg-brand-deep text-white rounded-lg hover:bg-brand-strong transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>複製代碼</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
                <code>{articleTrackingCode}</code>
              </pre>
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="mb-2">📊 追蹤的數據</h4>
                <ul className="text-sm text-slate-800 space-y-1">
                  <li>✓ 文章 ID、標題、分類、作者</li>
                  <li>✓ 閱讀深度（25%、50%、75%、90%）</li>
                  <li>✓ 停留時間</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. CTA 追蹤 */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <LinkIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3>步驟 3：CTA 連結追蹤</h3>
                    <p className="text-sm text-muted-foreground">追蹤 CTA 按鈕的點擊次數</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(ctaTrackingCode)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>複製代碼</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{ctaTrackingCode}</code>
              </pre>
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <h4 className="mb-2">🎯 追蹤的數據</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>✓ CTA 文字、URL、位置（螢幕上方/下方）</li>
                  <li>✓ 來源文章 ID</li>
                  <li>✓ 估算轉換價值</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. 轉換追蹤 */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Target className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3>步驟 4：轉換追蹤</h3>
                    <p className="text-sm text-muted-foreground">追蹤完成轉換（如註冊成功）</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(conversionTrackingCode)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>複製代碼</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{conversionTrackingCode}</code>
              </pre>
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <h4 className="mb-2">💰 轉換歸因</h4>
                <p className="text-sm text-orange-800 mb-2">
                  透過 URL 參數或 localStorage 追蹤哪篇文章帶來轉換
                </p>
                <p className="text-xs text-orange-700 font-mono">
                  範例：https://example.com/signup?ref=article-123
                </p>
              </div>
            </div>
          </div>

          {/* 5. WordPress 自動化 */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-brand-link" />
                  </div>
                  <div>
                    <h3>步驟 5：WordPress 自動插入（推薦）</h3>
                    <p className="text-sm text-muted-foreground">自動在所有文章插入追蹤代碼</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(wordpressAutoCode)}
                  className="px-4 py-2 bg-brand-deep text-white rounded-lg hover:bg-brand-strong transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>複製代碼</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
                <code>{wordpressAutoCode}</code>
              </pre>
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="mb-2">🚀 自動化優勢</h4>
                <ul className="text-sm text-slate-800 space-y-1">
                  <li>✓ 所有文章自動追蹤，無需手動設定</li>
                  <li>✓ 自動生成文章 ID</li>
                  <li>✓ CTA 按鈕自動加上追蹤</li>
                  <li>✓ 一次設定，永久有效</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 數據查看說明 */}
        <div className="mt-8 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
          <h3 className="mb-4">📊 如何查看追蹤數據？</h3>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="mb-2">在 Google Analytics 查看：</h4>
              <ol className="space-y-1 text-green-800 list-decimal list-inside">
                <li>前往 GA4 → 報表 → 事件</li>
                <li>查看自訂事件：scroll_depth、cta_click、conversion</li>
                <li>使用「事件參數」篩選特定 article_id</li>
                <li>建立自訂報表查看轉換路徑</li>
              </ol>
            </div>
            <div>
              <h4 className="mb-2">在 SEO產生器查看：</h4>
              <ol className="space-y-1 text-green-800 list-decimal list-inside">
                <li>設定代碼後等待 24 小時收集數據</li>
                <li>前往「分析報表」查看整體數據</li>
                <li>點擊單篇文章查看詳細流量</li>
                <li>查看 CTA 點擊與轉換報表</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
