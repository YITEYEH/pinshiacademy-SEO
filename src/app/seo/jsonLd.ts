import type { JsonLd } from '@/app/seo/types';

export function toJsonLdScript(jsonLd: JsonLd) {
  return JSON.stringify(jsonLd, null, 0);
}

export function organizationJsonLd(input: {
  name: string;
  url: string;
  logoUrl?: string;
  sameAs?: string[];
  email?: string;
}) {
  const { name, url, logoUrl, sameAs, email } = input;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
  };
  if (logoUrl) data.logo = logoUrl;
  if (sameAs?.length) data.sameAs = sameAs;
  if (email) data.email = email;
  return data;
}

export function softwareApplicationJsonLd(input: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  brand?: string;
}) {
  const {
    name,
    description,
    url,
    applicationCategory = 'BusinessApplication',
    operatingSystem = 'Web',
    offers,
    brand,
  } = input;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
  };
  if (brand) data.brand = { '@type': 'Brand', name: brand };
  if (offers) {
    data.offers = {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
    };
  }
  return data;
}

export function faqJsonLd(
  items: Array<{
    question: string;
    answer: string;
  }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((x) => ({
      '@type': 'Question',
      name: x.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: x.answer,
      },
    })),
  };
}

