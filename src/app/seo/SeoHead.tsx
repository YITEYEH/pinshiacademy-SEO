import { Helmet } from 'react-helmet-async';
import { absoluteUrl, siteConfig } from '@/app/seo/siteConfig';
import type { JsonLd, SeoMetaInput } from '@/app/seo/types';
import { toJsonLdScript } from '@/app/seo/jsonLd';

export function SeoHead(props: { meta: SeoMetaInput; jsonLd?: JsonLd }) {
  const { meta, jsonLd } = props;
  const canonicalUrl = absoluteUrl(meta.canonicalPath);
  const ogUrl = meta.og?.url ?? canonicalUrl;

  const title = meta.title;
  const description = meta.description;
  const ogTitle = meta.og?.title ?? title;
  const ogDescription = meta.og?.description ?? description;
  const twitterTitle = meta.twitter?.title ?? title;
  const twitterDescription = meta.twitter?.description ?? description;

  const robotsContent = meta.noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />

      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:type" content={meta.og?.type ?? 'website'} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content={siteConfig.brandName} />
      {meta.og?.image?.url ? <meta property="og:image" content={meta.og.image.url} /> : null}
      {meta.og?.image?.width ? <meta property="og:image:width" content={String(meta.og.image.width)} /> : null}
      {meta.og?.image?.height ? <meta property="og:image:height" content={String(meta.og.image.height)} /> : null}
      {meta.og?.image?.alt ? <meta property="og:image:alt" content={meta.og.image.alt} /> : null}

      <meta name="twitter:card" content={meta.twitter?.card ?? 'summary'} />
      {siteConfig.twitterHandle ? <meta name="twitter:site" content={siteConfig.twitterHandle} /> : null}
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {meta.twitter?.imageUrl ? <meta name="twitter:image" content={meta.twitter.imageUrl} /> : null}

      {jsonLd ? <script type="application/ld+json">{toJsonLdScript(jsonLd)}</script> : null}
    </Helmet>
  );
}

