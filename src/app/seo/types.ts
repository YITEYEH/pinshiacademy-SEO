export type OpenGraphType = 'website' | 'article';

export type SeoMetaInput = {
  title: string;
  description: string;
  canonicalPath: string;
  noindex?: boolean;
  og?: {
    type?: OpenGraphType;
    title?: string;
    description?: string;
    url?: string;
    image?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    };
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    title?: string;
    description?: string;
    imageUrl?: string;
  };
};

export type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

