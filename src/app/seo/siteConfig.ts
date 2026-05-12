export type SiteConfig = {
  brandName: string;
  legalName: string;
  baseUrl: string;
  locale: string;
  twitterHandle?: string;
  emails: {
    support: string;
  };
};

export const siteConfig: SiteConfig = {
  brandName: 'PInshiseo',
  legalName: 'PInshiseo',
  baseUrl: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://example.com',
  locale: 'zh_TW',
  twitterHandle: undefined,
  emails: {
    support: (import.meta.env.VITE_SUPPORT_EMAIL as string | undefined) ?? 'support@example.com',
  },
};

export function absoluteUrl(pathname: string) {
  const base = siteConfig.baseUrl.replace(/\/$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

