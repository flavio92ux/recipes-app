'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-600">
          🍳 Receitas
        </Link>

        {/* Navegação */}
        <nav className="flex gap-4 text-sm font-medium text-gray-700">
          <Link href="/?category=brasileira" className="hover:text-orange-600">
            Brasileira
          </Link>
          <Link href="/?category=fit" className="hover:text-orange-600">
            Fit
          </Link>
          <Link href="/?category=doce" className="hover:text-orange-600">
            Doces
          </Link>
        </nav>

        {/* Busca */}
        <form
          onSubmit={handleSearch}
          className="flex items-center border rounded overflow-hidden w-full sm:w-auto"
        >
          <input
            type="text"
            placeholder="Buscar receitas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-1 text-sm w-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-3 py-1 hover:bg-orange-600 transition"
          >
            🔍
          </button>
        </form>
      </div>
    </header>
  );
}
