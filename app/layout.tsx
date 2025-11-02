import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { homeMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { getCategories } from '@/lib/api';

export const metadata: Metadata = homeMetadata;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        {/* Link para pular direto ao conteúdo */}
        <a
          href="#conteudo-principal"
          className="absolute left-0 top-0 m-2 p-2 bg-orange-500 text-white rounded focus:translate-y-0 -translate-y-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
        >
          Pular para o conteúdo principal
        </a>

        {/* Dados estruturados */}
        <StructuredData />

        {/* Cabeçalho principal */}
        <Header categories={categories} />

        {/* Conteúdo principal */}
        <main id="conteudo-principal" role="main" className="flex-grow max-w-5xl mx-auto p-4">
          {children}
        </main>

        {/* Rodapé global */}
        <Footer />
      </body>
    </html>
  );
}
