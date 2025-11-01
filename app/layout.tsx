import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { Metadata } from 'next';
import { getCategories } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Delícias na Cozinha | Receitas Fáceis e Rápidas',
  description:
    'Descubra receitas deliciosas e práticas para o dia a dia. Encontre opções doces, salgadas e muito mais para todas as ocasiões.',
  keywords: [
    'receitas',
    'cozinha',
    'doces',
    'salgados',
    'fáceis',
    'rápidas',
    'culinária',
    'práticas',
    'gastronomia',
  ],
  authors: [{ name: 'Delícias na Cozinha' }],
  openGraph: {
    title: 'Delícias na Cozinha | Receitas Fáceis e Rápidas',
    description:
      'Descubra receitas deliciosas e práticas para o dia a dia. Encontre opções doces, salgadas e muito mais para todas as ocasiões.',
    url: 'https://deliciasnacozinha.com',
    siteName: 'Delícias na Cozinha',
    images: [
      {
        url: 'http://localhost:3000/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Delícias na Cozinha - Receitas Fáceis e Rápidas',
      },
    ],
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'http://localhost:3000/',
  },
  metadataBase: new URL('https://deliciasnacozinha.com'),
  publisher: 'Delícias na Cozinha',
    robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        {/* Dados estruturados */}
        <StructuredData />

        {/* Cabeçalho fixo e global com categorias */}
        <Header categories={categories} />

        {/* Conteúdo das páginas (Home, Detalhe, etc.) */}
        <main className="flex-grow max-w-5xl mx-auto p-4">
          {children}
        </main>

        {/* Rodapé global */}
        <Footer />
      </body>
    </html>
  );
}
