export const landingFaq = [
  {
    question: 'AI 生成文章會影響 SEO 嗎？',
    answer:
      '重點不是「有沒有 AI」，而是內容是否對準搜尋意圖、結構是否清楚、是否能提供可用答案，以及是否能帶來使用者下一步行動。AI SEO 工具只是加速器，策略與品質才是排名與轉換的根本。',
  },
  {
    question: 'SEO 新手適合嗎？',
    answer:
      '適合。你只要提供主題與目標受眾，系統會協助你從關鍵字到 SEO 架構（H1/H2/H3）、再到 SEO 文案與 Meta Description，讓你更快做出可被 Google 收錄、也更有轉換率的內容。',
  },
  {
    question: '可以直接發布文章嗎？',
    answer:
      '可以把產出當成「高品質初稿」：包含 SEO 標題、SEO 文章生成內容、內部連結建議與 CTA。你仍可依品牌語氣與真實案例微調，發布會更像商業化內容資產。',
  },
  {
    question: '適合哪些產業？',
    answer:
      '適合需要穩定內容與自然流量的多數產業：教育、SaaS、電商、顧問/接案、在地服務、自媒體與品牌經營者。只要你有可被搜尋的問題與解法，就能用 SEO 優化與 AI 寫文把它變成流量入口。',
  },
  {
    question: 'ChatGPT 跟這個有什麼差別？',
    answer:
      'ChatGPT 常停在「生成文字」；這裡把 SEO 工具化成工作流：關鍵字智能布局、搜尋意圖、SEO 架構、SEO 文章產生器、以及高轉換 SEO 文案，讓每一步都可複製、可控、可交付。',
  },
  {
    question: 'SEO 多久會有效果？',
    answer:
      '視競品、權重與內容策略而定。你能掌控的是速度與品質：用 AI SEO 工具把研究與撰寫時間降下來、維持固定上架節奏，通常更容易累積出可預期的自然流量成長。',
  },
] as const;

export const painPoints = [
  '寫了很多文章卻沒有流量',
  '不知道 SEO 怎麼寫、怎麼做 SEO 優化',
  'AI 生成內容很像垃圾文，讀者看了就走',
  '花很多時間研究關鍵字，還是不確定方向',
  '不知道如何提高轉換率，流量變不成客戶',
  'SEO 公司太貴，內容成本撐不住',
] as const;

export const outcomeFeatures = [
  {
    icon: 'layout',
    title: '自動生成 SEO 架構（H1/H2/H3）',
    description:
      '依搜尋意圖建立標題層級與段落主線，減少離題與大幅改稿，並讓後續更新與協作更容易對齊同一套結構。',
  },
  {
    icon: 'sparkles',
    title: '商務導向的 SEO 文章草稿',
    description:
      '在段落設計中納入行動呼籲、信任訊息與閱讀節奏，使初稿更接近可審閱、可上架調校的商務稿件。',
  },
  {
    icon: 'badge',
    title: '多版本 SEO 標題與 Meta Description',
    description:
      '同一主題提供多組標題與描述文案，兼顧搜尋結果呈現與點閱意願，縮短與行銷或客戶來回確認的時間。',
  },
  {
    icon: 'target',
    title: '關鍵字語意布局',
    description:
      '在相關詞彙與同義表述間取得平衡，維持閱讀自然度，並呼應搜尋引擎對主題涵蓋度的期待。',
  },
] as const;

export const workflowSteps = [
  { title: '輸入關鍵字與主題', detail: '選定主題與目標讀者，作為內容規劃與生成的起點。' },
  { title: '分析搜尋意圖', detail: '歸納讀者想解決的問題、比較點與決策資訊。' },
  { title: '產出 SEO 架構', detail: '建立清楚的 H2／H3 與各段重點，作為撰寫與審核依據。' },
  { title: '生成正文與上架文案', detail: '產出段落草稿、Meta、FAQ 與行動提示等素材。' },
  { title: '發布與成效追蹤', detail: '依計畫上架後，以固定節奏檢視流量與轉換並迭代內容。' },
] as const;

/** 首頁 Hero 下方信任列 */
export const landingHeroMicroTrust = ['免綁卡即可試用', '月繳計價透明', '工作流程可複製交付'] as const;

/** Logo 帶上方一句 */
export const landingLogoStripEyebrow = '內容團隊、接案工作室與品牌方最常選用的情境';

/** 與一般對話型 AI 的差異（精簡） */
export const landingDifferentiators = {
  eyebrow: '為何是我們',
  title: '工作流級 AI SEO，不是聊天視窗裡的一段長文',
  subtitle:
    '把研究、架構、段落任務、Meta 與轉換元件串成固定步驟，產出更接近「可以給客戶／讀者看的稿件規格」。',
  bullets: [
    {
      title: 'SEO 架構先決',
      body: 'H1／H2／H3 對齊搜尋意圖，降低寫偏題與大幅返工的機率。',
    },
    {
      title: '轉換寫進流程',
      body: 'CTA、FAQ、信任訊號與段落節奏一併規劃，而不是後補口號。',
    },
    {
      title: '可複製、可協作',
      body: '模板與步驟固定後，團隊或接案交付更容易估工期與控品質。',
    },
  ],
} as const;

/** 首頁價格導流 */
export const landingPricingTeaser = {
  title: '主力方案每月 NT$399，亦可從免費方案開始',
  body: '先用免費額度熟悉流程；產能提升後再升級 Pro，需要多人協作與進階整合時可評估 Team。',
  cta: '查看方案與配額',
} as const;

export const socialProof = {
  metrics: [
    { k: '全流程', v: '一站式', d: '從搜尋意圖、資訊架構到正文與上架文案環環相扣' },
    { k: '節奏', v: '可複製', d: '固定步驟讓團隊對齊產出節奏與交付標準' },
    { k: '策略', v: '重轉換', d: '將行動呼籲與信任元素納入段落設計，而非文末硬塞一句' },
    { k: '平衡', v: '人機協作', d: '由你掌握品牌語氣與事實查核，工具負責加速草稿與結構' },
  ],
  logos: ['Nova Commerce', 'Maple Studio', 'BrightLearn', 'Hanami Health', 'Cedar SaaS', 'TideWorks'],
  testimonials: [
    {
      name: 'Ally · 行銷企劃',
      title: 'B2B SaaS',
      quote:
        '過去寫 SEO 稿常常不知從何收斂；現在同一個主題也能拉出清楚架構與 CTA 節奏，內容更像成熟產品頁，流量曲線也比較穩。',
    },
    {
      name: 'Ken · SEO 接案者',
      title: '獨立接案',
      quote:
        '研究與草稿時間明顯縮短，交付給客戶的規格卻更一致，複購與長約的討論變得順很多。',
    },
    {
      name: 'Mina · 自媒體經營',
      title: '內容創作者',
      quote:
        '最有感的是 SEO 與轉換是同一件事：讀者不只進來閱讀，也更願意訂閱或私訊諮詢。',
    },
  ],
} as const;

/** /demo 產品預覽 */
export const productPreviewHero = {
  eyebrow: '產品預覽',
  title: '三分鐘看懂：一篇 SEO 稿件如何被組裝完成',
  subtitle:
    '以下畫面將研究、架構與上架素材濃縮在同一視窗，方便您與團隊快速對齊做法。若要使用自己的專案資料並儲存結果，請免費註冊並進入工作區。',
} as const;

export const productPreviewTrustBadges = [
  { title: '免登入瀏覽', detail: '無須綁定信用卡，開啟頁面即可瀏覽' },
  { title: '流程完整呈現', detail: '依序展示意圖分析、架構、文案素材與成效指標' },
  { title: '與產品同源設計', detail: '版面邏輯與正式工作區一致（使用範例資料）' },
  { title: '資料存入工作區', detail: '登入後可建立專案、保存草稿並延續編輯' },
] as const;

export const productPreviewTourSteps = [
  {
    n: '01',
    title: '釐清搜尋意圖',
    body: '先分辨讀者是想理解概念、比較方案還是準備行動，避免一開始就寫偏題。',
  },
  {
    n: '02',
    title: '建立清楚架構',
    body: '以標題層級排列資訊順序，每一段都有明確任務，後續改稿不必整篇重做。',
  },
  {
    n: '03',
    title: '備妥上架素材',
    body: '同步整理標題、描述、常見問答與段中行動提示，減少來回補件的時間。',
  },
  {
    n: '04',
    title: '用指標延續優化',
    body: '透過 SEO 評分與流量走勢等參考資訊，與團隊用同一套語言規劃下一輪內容。',
  },
] as const;

export const productPreviewCallouts = [
  {
    title: '主題與流程總覽',
    body: '左側聚焦「這篇文章要替誰解決什麼」，右側列出系統將依序完成的重點步驟。',
    tag: '主控區',
  },
  {
    title: '搜尋結果上的門面',
    body: '標題與描述預覽著重在「讀者點進來會得到什麼」，以具體結果取代空泛形容。',
    tag: '摘要',
  },
  {
    title: '結構與成效並陳',
    body: '中段呈現章節骨架；走勢圖提醒您在上線後依數據調整題材與更新頻率。',
    tag: '洞察',
  },
] as const;

export const productPreviewVsLive = [
  {
    aspect: '內容來源',
    preview: '預先準備的範例與示範數值',
    live: '您的專案、關鍵字設定與實際生成紀錄',
  },
  {
    aspect: '可操作程度',
    preview: '瀏覽與理解為主',
    live: '完整編輯、版本紀錄、方案額度與匯出功能',
  },
  {
    aspect: '最佳用途',
    preview: '建立共識、對外簡報或內部對齊',
    live: '日常撰稿、客戶交付與營運上架',
  },
] as const;

export const productPreviewFaq = [
  {
    question: '可以在這裡直接編輯並儲存內容嗎？',
    answer:
      '本頁為閱讀型預覽，協助您理解操作脈絡。若要編輯與儲存，請完成註冊並進入工作區；免費方案即可先體驗核心流程與額度。',
  },
  {
    question: '畫面會與未來版本完全相同嗎？',
    answer:
      '我們會持續優化介面細節，按鈕位置或文案可能微調；整體流程與能力會維持一致，實際畫面以您登入後所見為準。',
  },
  {
    question: '如何分享給同事或客戶？',
    answer:
      '您可直接分享本頁連結，或由首頁瀏覽相同的預覽區塊，協助對方快速進入狀況。',
  },
  {
    question: '看完預覽後，建議下一步做什麼？',
    answer:
      '若流程符合期待，建議註冊試用並建立第一個專案；若需評估費用或額度，請前往價格頁查看方案說明。',
  },
] as const;

/** /demo 頁區塊標題與說明（元件層引用） */
export const productPreviewSections = {
  mainVisual: {
    label: '工作台預覽',
    sub: '為便於說明，我們將多個步驟整合在同一畫面。登入後，您將於工作區中依序操作，並使用自己的資料。',
  },
  trustExplainer: {
    eyebrow: '閱讀指南',
    title: '註冊前，您可以先掌握這些重點',
  },
  tour: {
    eyebrow: '操作流程',
    title: '四個階段，對應真實工作情境',
    subtitle: '下列階段對應實際產品中的核心路徑。',
  },
  callouts: {
    eyebrow: '畫面說明',
    title: '預覽中的三個重點區域',
    subtitle: '將介面整理成三個好口述的重點，方便對內簡報或對客戶說明。',
  },
  compare: {
    eyebrow: '差異說明',
    title: '公開預覽與正式工作區',
  },
  faq: {
    eyebrow: '常見問題',
    title: '關於預覽與試用',
  },
  cta: {
    eyebrow: '準備開始',
    title: '開始建立您的第一個專案',
    body: '完成註冊後即可使用方案內額度建立工作區。若尚未決定方案，亦可先至價格頁比較配套。',
  },
} as const;

/** /features 頁：深度功能說明（勿硬編在元件內） */
export const featuresPageModules = [
  {
    title: '關鍵字與搜尋意圖對焦',
    summary:
      '在撰寫前先釐清讀者真正想解決的問題，讓後續架構與段落皆對準可查詢、可回答的主題。',
    bullets: [
      '將主關鍵字延伸為可回答的問題類型（例如教學、比較、選購）。',
      '為各段落定義任務：須回答什麼、須提供哪些類型的依據（數據、流程、案例等）。',
      '讓每一段對應明確意圖，提升完讀與資訊完整度。',
    ],
  },
  {
    title: 'SEO 架構（H1 / H2 / H3）',
    summary:
      '建立清楚的標題層級與資訊順序，協助讀者掃讀與搜尋引擎理解主題群組。',
    bullets: [
      '先定 H2 主線，再展開 H3 細節，避免內容發散。',
      '段落順序呼應讀者常見提問順序，形成自然的資訊漏斗。',
      '後續增刪段落時，整體架構仍可維持一致。',
    ],
  },
  {
    title: 'SEO 標題與 Meta Description（多版本）',
    summary:
      '兼顧搜尋結果上的呈現與點閱意願，並保留與品牌語氣調整的空間。',
    bullets: [
      '一次提供多組標題方向（資訊型、比較型、情境型等），便於內部或客戶選稿。',
      'Meta Description 以具體可得的結果為主，減少空泛形容。',
      '避免過度承諾，有助於降低跳出率、延長停留。',
    ],
  },
  {
    title: 'SEO 文章生成（段落任務導向）',
    summary:
      '以段落任務為單位產出內容，初稿即可對齊審閱與補強真實資料的節奏。',
    bullets: [
      '依意圖納入案例、步驟、常見錯誤或替代方案等段落提示。',
      '標示適合置入行動呼籲的位置，配合閱讀節奏。',
      '產出格式便於團隊協作補上數據、圖片與品牌語氣。',
    ],
  },
  {
    title: 'FAQ／延伸問題',
    summary:
      '整理讀者常見後續提問，延伸長尾與問句式查詢的覆蓋，並維持與正文敘述一致。',
    bullets: [
      '彙整高頻後續問題，減少內容與客服重複說明。',
      '問答內容與本文論點對齊，避免互相矛盾。',
      '語意與結構上便於後續套用常見的 FAQ 結構化標記。',
    ],
  },
  {
    title: '轉換節奏與行動提示（CTA）',
    summary:
      '將流量導向可衡量的下一步：將行動提示融入段落設計，而非僅在文末附上一句口號。',
    bullets: [
      '依認知、比較、決策等階段配置適當的 CTA。',
      '納入保固、流程、風險說明、社會證明等信任元素的撰寫提示。',
      '鼓勵具體下一步與可驗證論點，提升說服力與可信度。',
    ],
  },
  {
    title: '關鍵字語意布局',
    summary:
      '在相關詞與同義改寫之間取得平衡，兼顧閱讀自然度與主題涵蓋。',
    bullets: [
      '以段落任務驅動用詞，降低不自然重複。',
      '支援主題群組思路：核心詞與支援詞分工明確。',
      '便於編輯快速檢視哪些段落語意仍可加強。',
    ],
  },
  {
    title: '模板與一致性',
    summary:
      '將驗證過的結構固化為模板，適用於多網站、多客戶或多人協作時維持交付水準。',
    bullets: [
      '固定流程：研究 → 架構 → 段落 → Meta → FAQ → CTA。',
      '新任成員可依任務清單產出可用初稿，縮短上手時間。',
      '各步驟產出明確，便於排程與工時估算。',
    ],
  },
] as const;

export const featuresPageDeliverables = [
  '搜尋意圖摘要（目標讀者與須回答的核心問題）',
  'SEO 架構（H1／H2／H3）與段落任務清單',
  'SEO 標題候選（多版本）',
  'Meta Description 候選（多版本）',
  '正文草稿（依段落任務產出）',
  'FAQ 建議（長尾與延伸問句）',
  '行動呼籲與轉換元件建議（依漏斗階段）',
  '關鍵字語意布局提示',
] as const;

export const featuresPageComparison = [
  {
    aspect: '輸出型態',
    genericAi: '多為單段長文，結構與主題易漂移',
    ours: '以可交付規格為主：架構、段落任務、Meta 與 FAQ 一併產出',
  },
  {
    aspect: 'SEO 可控性',
    genericAi: '常缺少完整標題層級與段落對應關係',
    ours: '由 SEO 架構驅動生成，利於閱讀體驗與主題理解',
  },
  {
    aspect: '轉換設計',
    genericAi: '資訊量大但常缺少明確下一步',
    ours: '將商務文案與 CTA 節奏納入撰寫流程',
  },
  {
    aspect: '關鍵字策略',
    genericAi: '易出現過度重複或主題發散',
    ours: '語意布局與段落任務並行，兼顧涵蓋度與可讀性',
  },
] as const;

export const featuresPageAudiences = [
  {
    role: '行銷／成長團隊',
    detail: '需在短週期內迭代內容、對齊漏斗名單與營收指標，並避免僅追求曝光而忽略轉換。',
  },
  {
    role: 'SEO 顧問／代理商',
    detail: '須將研究、資訊架構與稿件規格一次說清楚，交付物便於客戶內部審核與延續維運。',
  },
  {
    role: '自媒體／內容創作者',
    detail: '將單一主題延伸為可被搜尋的內容資產，並利於規劃系列主題。',
  },
  {
    role: '中小企業／一人公司',
    detail: '在有限人力下維持穩定上架節奏，壓低研究與初稿時間成本。',
  },
  {
    role: '品牌方',
    detail: '在語氣與論述一致的前提下擴充內容產能，模板化流程有助維持品牌底線。',
  },
] as const;

/** /features 頁：區塊錨點（常見 SaaS 產品頁導覽） */
export const featuresPageSectionNav = [
  { href: '#capabilities', label: '重點能力' },
  { href: '#spotlight', label: '主打亮點' },
  { href: '#modules', label: '完整模組' },
  { href: '#deliverables', label: '交付項目' },
  { href: '#workflow', label: '工作流程' },
  { href: '#compare', label: '差異對照' },
  { href: '#audiences', label: '適用對象' },
  { href: '#faq', label: '問答' },
] as const;

export const featuresPageHeroTrust = ['結構化交付', '語意與長尾覆蓋', '免費試用後再升級'] as const;

export const featuresPageCapabilityIntro = {
  eyebrow: '重點能力',
  title: '將 SEO 內容整理為可執行的規格',
  subtitle:
    '從搜尋意圖、資訊架構到正文與上架文案，四大面向支撐穩定產出與跨部門協作。',
} as const;

export const featuresPageSpotlightIntro = {
  eyebrow: '主打亮點',
  title: '研究、架構與上架素材',
  subtitle:
    '先對準讀者需求、建立清楚章節骨架，並備齊標題與描述等素材，後續撰寫與優化才能事半功倍。',
} as const;

export const featuresPageModulesIntro = {
  eyebrow: '完整模組',
  title: '正文、FAQ、轉換與模板化',
  subtitle: '與上述亮點銜接，涵蓋從草稿到交付的完整流程，支援多人與多專案並行。',
} as const;

export const featuresPageWorkflowIntro = {
  eyebrow: '工作流程',
  title: '五步驟達到可上架調校的初稿狀態',
  subtitle: '各步驟皆有明確產出，便於對內排程或對外說明交付範圍。',
} as const;

/** /pricing 頁：方案與配額文案 */
export const pricingPageIntro = {
  title: '簡單透明的方案',
  subtitle:
    '建議先以免費方案熟悉流程，需求量提升後再升級 Pro；若需要多人協作與進階整合，可評估 Team。以下為月繳參考價格，實際金額與條件以結帳頁面為準。',
} as const;

/** 方案卡頂部精簡亮點（完整清單見下方比較表） */
export const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    tagline: '入門體驗',
    priceDisplay: 'NT$0',
    period: '/ 月',
    cardDescription: '熟悉 SEO 生成流程：標題、Meta、架構與短文草稿。',
    quotaTeaser: '每月 5 篇完整文章 · 標題／Meta 各 20 次 · 3 個專案',
    cardBullets: [
      'SEO 標題與 Meta Description',
      'H1/H2 架構與 FAQ',
      'AI SEO Outline',
      '基礎 SEO 分析',
      '基礎文章生成',
    ],
    monthlyHeading: '每月配額',
    monthlyLines: [
      '5 次完整文章生成',
      '20 次 SEO 標題生成',
      '20 次 Meta Description',
      '3 個專案',
    ],
    includedHeading: '功能',
    included: [
      'SEO 標題生成',
      'Meta Description',
      'H1/H2 架構生成',
      'FAQ 生成',
      '基礎 SEO 分析',
      'AI SEO Outline',
      '基礎文章生成',
    ],
    excludedHeading: '付費方案才有的功能',
    excluded: [
      '無法使用高轉換模式',
      '無法使用品牌語氣',
      '無法匯出 Markdown',
      '無法 AI 改寫',
      '無法批量生成',
      '無法儲存歷史版本',
    ],
    ctaLabel: '免費開始',
    ctaTo: '/register',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: '最受歡迎',
    priceDisplay: 'NT$399',
    period: '/ 月',
    cardDescription: '獨力創作者、接案與小品牌的日常撰稿方案：高品質全文與完整 SEO 工作流。',
    quotaTeaser: '每月 100 篇完整文章 · 標題／Meta／Outline 無上限 · 50 個專案',
    cardBullets: [
      'AI SEO 全文生成',
      '高轉換模式與品牌語氣',
      'Markdown／HTML 匯出',
      'AI 改寫與 SEO Score',
      '自動內鏈與 FAQ Schema',
    ],
    monthlyHeading: '每月配額',
    monthlyLines: [
      '100 篇完整文章生成',
      '無限制 SEO 標題',
      '無限制 Meta Description',
      '無限制 SEO Outline',
      '50 個專案',
    ],
    includedHeading: '包含',
    included: [
      'AI SEO 全文生成',
      '高轉換模式',
      'SEO 結構優化',
      '關鍵字布局',
      'CTA 自動生成',
      'FAQ Schema',
      'AI 改寫',
      '品牌語氣設定',
      'Markdown 匯出',
      'HTML 匯出',
      '自動內鏈建議',
      'SEO Score',
      'AI 摘要生成',
    ],
    ctaLabel: '升級 Pro',
    ctaTo: '/register',
    featured: true,
  },
  {
    id: 'team',
    name: 'Team',
    tagline: '協作與整合',
    priceDisplay: 'NT$1,990',
    period: '/ 月',
    cardDescription: '多人共用品牌設定與專案權限，並銜接 WordPress、Notion 等工具鏈。',
    quotaTeaser: '最多 5 位成員 · 每月 500 篇完整文章 · 生成無上限',
    cardBullets: [
      '包含 Pro 全部功能',
      '團隊協作與專案權限',
      '共用品牌語氣',
      'WordPress 發布 · Notion 匯出',
      '多品牌管理與團隊紀錄',
    ],
    seatNote: '5 位成員',
    monthlyHeading: '每月配額',
    monthlyLines: ['500 篇完整文章生成', '無限制生成（標題／Meta／Outline 等）'],
    includedHeading: 'Team 加值',
    includedSubtitle: '在 Pro 之上另含：',
    included: [
      '團隊協作',
      '共用品牌語氣',
      'AI Content Workflow',
      '專案權限',
      'WordPress 發布',
      'Notion 匯出',
      '多品牌管理',
      '團隊歷史紀錄',
      'API Access（未來）',
    ],
    ctaLabel: '開始使用 Team',
    ctaTo: '/login',
    featured: false,
  },
] as const;

/** 下方「方案比較」表：cell 為文字，或 true／false 顯示圖示 */
export const pricingComparisonSections = [
  {
    title: '用量',
    rows: [
      { label: '完整文章生成（每月）', free: '5 篇', pro: '100 篇', team: '500 篇' },
      { label: 'SEO 標題生成', free: '20 次', pro: '無限制', team: '無限制' },
      { label: 'Meta Description', free: '20 次', pro: '無限制', team: '無限制' },
      { label: 'SEO Outline', free: '含於方案', pro: '無限制', team: '無限制' },
      { label: '專案數', free: '3', pro: '50', team: '進階上限（詳見方案）' },
      { label: '席位／成員', free: '1', pro: '1', team: '最多 5' },
    ],
  },
  {
    title: '產出與編輯',
    rows: [
      { label: '高轉換模式', free: false, pro: true, team: true },
      { label: '品牌語氣', free: false, pro: true, team: true },
      { label: 'AI 改寫', free: false, pro: true, team: true },
      { label: '批量生成', free: false, pro: true, team: true },
      { label: 'Markdown 匯出', free: false, pro: true, team: true },
      { label: 'HTML 匯出', free: false, pro: true, team: true },
      { label: '歷史版本', free: false, pro: true, team: true },
      { label: 'SEO Score', free: false, pro: true, team: true },
    ],
  },
  {
    title: '團隊與整合',
    rows: [
      { label: '團隊協作空間', free: false, pro: false, team: true },
      { label: '共用品牌語氣', free: false, pro: false, team: true },
      { label: '專案權限', free: false, pro: false, team: true },
      { label: 'WordPress 發布', free: false, pro: false, team: true },
      { label: 'Notion 匯出', free: false, pro: false, team: true },
      { label: '多品牌管理', free: false, pro: false, team: true },
      { label: 'API Access', free: false, pro: false, team: '規劃中' },
    ],
  },
] as const;

export const pricingPageFaq = [
  {
    q: '可以中途升級或降級嗎？',
    a: '可以依方案周期調整；剩餘配額與計費規則以訂閱／帳務頁公告為準。',
  },
  {
    q: 'Free 方案會需要信用卡嗎？',
    a: 'Free 以體驗為主，無須綁卡即可開始；升級付費時再走結帳流程。',
  },
  {
    q: 'Team 的整合功能何時開放？',
    a: 'WordPress、Notion、API 等將分批上線；上線後同一 Team 訂閱即可逐步啟用。',
  },
] as const;

export const pricingPageFootnote =
  '所列價格為新台幣、月繳參考；實際扣款、稅金、試用條件與配額以結帳頁與帳戶內方案為準。';

