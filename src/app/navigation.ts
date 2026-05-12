/** 已實作之核心功能路徑 */
const CORE_PATHS: Record<string, string> = {
  dashboard: '/dashboard',
  'new-article': '/new-article',
  articles: '/articles',
  templates: '/templates',
  keywords: '/keywords',
  account: '/account',
  settings: '/settings',
};

/** 尚未串接第三方／進階功能：統一走占位頁（之後一次串接時替換為真路由即可） */
export const COMING_SOON_FEATURES = ['calendar', 'analytics', 'data-sources', 'tracking', 'wordpress'] as const;

export type ComingSoonFeatureId = (typeof COMING_SOON_FEATURES)[number];

export function isComingSoonFeature(id: string): id is ComingSoonFeatureId {
  return (COMING_SOON_FEATURES as readonly string[]).includes(id);
}

export function pageIdToPath(pageId: string): string {
  if (isComingSoonFeature(pageId)) {
    return `/coming-soon/${pageId}`;
  }
  return CORE_PATHS[pageId] ?? '/dashboard';
}

const CORE_PATH_TO_PAGE: Record<string, string> = Object.fromEntries(
  Object.entries(CORE_PATHS).map(([k, v]) => [v, k]),
);

export function pathToPageId(pathname: string): string {
  if (pathname.startsWith('/coming-soon/')) {
    const rest = pathname.slice('/coming-soon/'.length).split('/')[0];
    if (rest && isComingSoonFeature(rest)) return rest;
    return 'dashboard';
  }
  return CORE_PATH_TO_PAGE[pathname] ?? 'dashboard';
}

export const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  'new-article': '新增文章',
  articles: '文章管理',
  calendar: '內容日曆',
  analytics: '分析報表',
  keywords: '關鍵字研究',
  templates: '模板管理',
  'data-sources': '數據源設定',
  tracking: '追蹤代碼設定',
  wordpress: 'WordPress 串接',
  account: '帳號與整合',
  settings: '設定',
};
