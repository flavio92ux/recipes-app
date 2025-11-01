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
