export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://deliciasnacozinha.com/',
    name: 'Delícias na Cozinha',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://deliciasnacozinha.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
