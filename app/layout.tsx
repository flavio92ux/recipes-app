import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Receitas',
  description: 'Mini portal de receitas - desafio técnico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        {/* Cabeçalho fixo e global */}
        <Header />

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
