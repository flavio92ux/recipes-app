import { homeJsonLd } from '@/lib/seo';

export default function StructuredData() {
  const jsonLd = homeJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
