import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-10">
      <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Links institucionais */}
        <div className="flex gap-4">
          <Link href="/sobre" className="hover:text-orange-600">
            Sobre
          </Link>
          <Link href="/contato" className="hover:text-orange-600">
            Contato
          </Link>
          <Link href="/politica-de-privacidade" className="hover:text-orange-600">
            Privacidade
          </Link>
        </div>

        {/* Direitos autorais */}
        <p className="text-center sm:text-right">
          © {new Date().getFullYear()} <strong>Receitas</strong>. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
