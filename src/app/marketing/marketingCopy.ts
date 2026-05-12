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
      '用搜尋意圖驅動架構，避免想到哪寫到哪。把 SEO 內容生成變成可複製流程，內容更穩、更好維護。',
  },
  {
    icon: 'sparkles',
    title: 'AI 幫你建立「能轉換」的 SEO 文章',
    description:
      '不是只有排名關鍵字，而是把 CTA、信任訊號與段落節奏寫進去，讓 SEO 文章生成更像商業文案。',
  },
  {
    icon: 'badge',
    title: '快速產出 Meta Description 與 SEO 標題',
    description:
      '同一個主題提供多版本標題與描述，兼顧可讀性與點擊率，減少反覆改稿的時間成本。',
  },
  {
    icon: 'target',
    title: '關鍵字智能布局',
    description:
      '在語意相關的詞組與同義表述間取得平衡，讓文章讀起來自然、資訊完整，並符合現今搜尋引擎對主題涵蓋度的期待。',
  },
] as const;

export const workflowSteps = [
  { title: '輸入關鍵字', detail: '選定主題與受眾，建立 SEO 寫作的起點。' },
  { title: 'AI 分析搜尋意圖', detail: '抓出使用者真正要的答案與比較點。' },
  { title: '生成 SEO 架構', detail: '產出清楚的 H2 結構與段落重點。' },
  { title: '自動產出文章', detail: '完成 SEO 文章、SEO 文案與 Meta Description。' },
  { title: '發布並獲得流量', detail: '用一致節奏累積自然流量與轉換。' },
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
      '先搞清楚「使用者到底在找什麼」，再把 SEO寫作工具用在對的地方，避免寫出一篇很長但沒人要的答案。',
    bullets: [
      '把主關鍵字延伸成可被回答的問題集合（FAQ／比較／教學／選購）。',
      '輸出段落任務：每一段要回答什麼、要給哪種證據（數據、流程、案例缺口）。',
      '降低 AI寫文「像在百科堆字」：每段都能對應到搜尋意圖。',
    ],
  },
  {
    title: 'SEO 架構（H1 / H2 / H3）自動生成',
    summary:
      '用清楚的 heading hierarchy 建立資訊架構，讓 SEO內容生成更可讀、也更利於 Google 理解主題群組。',
    bullets: [
      '先產出 H2 段落主線，再拆 H3 細節點，避免內容發散。',
      '每一段都能對應「使用者下一步會問什麼」，形成自然的內容漏斗。',
      '方便後續改版：新增段落時不會整篇結構崩壞。',
    ],
  },
  {
    title: 'SEO 標題與 Meta Description（多版本）',
    summary:
      '同時兼顧 SERP 呈現與點擊率（CTR），並保留品牌語氣空間；適合行銷與 SEO 接案反覆迭代。',
    bullets: [
      '一次輸出多組標題：資訊型、比較型、場景型，方便 A/B 心智選稿。',
      'Meta Description 強調「可得結果」而非堆疊形容詞。',
      '提醒避免過度承諾：降低跳出率、提升停留。',
    ],
  },
  {
    title: 'SEO 文章生成（段落任務導向）',
    summary:
      '把 SEO文章產生器用在「完成段落任務」，而不是生成空洞長文；更像可交付的稿件規格。',
    bullets: [
      '段落級重點提示：案例、步驟、常見錯誤、替代方案（視意圖自動取捨）。',
      '可插入 CTA 位置建議：閱讀節奏到了哪裡該引導下一步。',
      '更像團隊協作稿：方便你補真實資料、照片與品牌語氣。',
    ],
  },
  {
    title: 'FAQ / 延伸問題（覆蓋長尾）',
    summary:
      '用 FAQ 承接長尾搜尋與語音搜尋問句，讓單篇文章覆蓋更多「問法」，而不靠 keyword stuffing。',
    bullets: [
      '自動整理讀者最常問的後續問題，降低客服式反覆回答。',
      '維持問答一致性：避免 FAQ 與本文段落互相打架。',
      '利於結構化資料（FAQ schema）預留：頁面語意更完整。',
    ],
  },
  {
    title: 'SEO 文案與轉換節奏（CTA）',
    summary:
      '流量要能變成詢問／註冊／購買，才算 AI SEO 的商業價值；把 SEO文案寫進段落節奏，而不是文末硬塞一行。',
    bullets: [
      '依漏斗階段配置 CTA：認知 → 比較 → 決策。',
      '加入信任元件提示：保固、流程、風險控管、社會證明占位。',
      '降低「像 AI」的關鍵：具體下一步與可驗證主張，而不是空泛口號。',
    ],
  },
  {
    title: '關鍵字智能布局（語意自然）',
    summary:
      '讓 SEO工具協助你覆蓋語意相關詞與同義改寫，維持閱讀自然度，並符合 SEO優化的現代算法取向。',
    bullets: [
      '避免重複堆砌：以段落任務驅動詞彙出現的合理性。',
      '支援主題群組（topic cluster）思路：核心詞 + 支援詞分工。',
      '更像編輯工作流程：你可以一眼看出哪些段落「語意不足」。',
    ],
  },
  {
    title: '模板化與一致性（多客戶／多網站也能複製）',
    summary:
      '適合 SEO 接案者與內容團隊：把成功結構固化成模板，維持交付品質與節奏。',
    bullets: [
      '同一套流程輸出：研究 → 架構 → 段落 → Meta → FAQ → CTA。',
      '降低新人上手成本：照着任務清單即可完成可用初稿。',
      '更容易估工期：知道每一步會產出什麼。',
    ],
  },
] as const;

export const featuresPageDeliverables = [
  '搜尋意圖摘要（這篇文章要回答誰、回答什麼）',
  'SEO 架構（H1/H2/H3）與段落任務清單',
  'SEO 標題候選（多版本）',
  'Meta Description 候選（多版本）',
  '正文草稿（段落任務導向）',
  'FAQ 建議（長尾問句）',
  'CTA 與轉換元件建議（漏斗分段）',
  '關鍵字語意提示（避免堆砌）',
] as const;

export const featuresPageComparison = [
  {
    aspect: '輸出型態',
    genericAi: '偏「一段長文」，結構與意圖容易漂移',
    ours: '偏「可交付稿件規格」：架構 + 段落任務 + Meta + FAQ',
  },
  {
    aspect: 'SEO 可控性',
    genericAi: '常缺少 heading hierarchy 與段落對應',
    ours: '以 SEO 架構驅動生成，利於閱讀與收錄理解',
  },
  {
    aspect: '轉換率',
    genericAi: '容易資訊量大但缺少下一步',
    ours: '把 SEO文案與 CTA 節奏設計進流程',
  },
  {
    aspect: '關鍵字策略',
    genericAi: '容易過度重複或過度發散',
    ours: '語意布局與段落任務並行，降低堆砌感',
  },
] as const;

export const featuresPageAudiences = [
  {
    role: '行銷人 / Growth',
    detail: '要快、要能迭代、要能對齊漏斗 KPI；需要 SEO文章生成但不想要垃圾流量。',
  },
  {
    role: 'SEO 接案者',
    detail: '要把研究、架構、稿件規格一次講清楚；交付給客戶時更像「方法論」而不是「一次性 AI寫文」。',
  },
  {
    role: '自媒體 / 創作者',
    detail: '要把主題做成可被搜尋的資產：同一題做成系列也更容易延伸。',
  },
  {
    role: '中小企業 / 一人公司',
    detail: '時間有限但要穩定上架；用 AI SEO 工具把研究與草稿成本壓下來。',
  },
  {
    role: '品牌經營者',
    detail: '要在語氣一致前提下規模化內容；模板化流程更能守住品牌底線。',
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

export const featuresPageHeroTrust = ['可複製交付節奏', '長尾與在地語意', 'Free 先試再升級'] as const;

export const featuresPageCapabilityIntro = {
  eyebrow: '重點能力',
  title: '先把 SEO 內容變成「可執行規格」',
  subtitle:
    '多數團隊最常走這四條路徑完成可被搜尋、也可轉換的稿件；往下另有主打亮點、八大模組與交付清單。',
} as const;

export const featuresPageSpotlightIntro = {
  eyebrow: '主打亮點',
  title: '研究、架構與素材：先把前三棒跑順',
  subtitle:
    '多數產品頁會先講「最核心的三件事」。對 SEO 內容而言：意圖對焦、架構清楚、素材齊全，後面的篇幅才不會白寫。',
} as const;

export const featuresPageModulesIntro = {
  eyebrow: '完整模組',
  title: '其餘五大模組：文章、FAQ、轉換與规模化',
  subtitle: '與上方亮點串在一起，形成從草稿到交付的一條龍流程。',
} as const;

export const featuresPageWorkflowIntro = {
  eyebrow: '工作流程',
  title: '五步走到「可以拿去上架調校」的狀態',
  subtitle: '每一步對應明確產出；也方便你跟主管或客戶對齊交付範圍。',
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

