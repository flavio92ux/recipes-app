'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  path: string;
}

export default function Header({ categories }: { categories: { total: number; items: string[] } }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const tags = [
    'rápido',
    'festa',
    'saudável',
    'conforto',
    'verão',
    'sobremesa',
  ];

  // Busca receitas quando o usuário digita 3+ letras
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3001/api/search?q=${encodeURIComponent(searchQuery)}`
          );
          const data = await response.json();
          setSuggestions(data.items || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Erro ao buscar receitas:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fecha sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (path: string) => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    router.push(path);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 3 && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0].path);
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-600">
          🍳 Receitas
        </Link>

        {/* Navegação */}
        <nav className="flex gap-4 text-sm font-medium text-gray-700">
          {categories.items.map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="hover:text-orange-600"
            >
              {category}
            </Link>
          ))}
        </nav>

        {/* Busca com Autocomplete */}
        <div ref={searchRef} className="relative w-full sm:w-auto">
          <form
            onSubmit={handleSubmit}
            className="flex items-center border rounded overflow-hidden"
          >
            <input
              type="text"
              placeholder="Buscar receitas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 3 && setShowSuggestions(true)}
              className="px-2 py-1 text-sm w-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-3 py-1 hover:bg-orange-600 transition"
            >
              🔍
            </button>
          </form>

          {/* Dropdown de Sugestões */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
              {isLoading ? (
                <div className="px-3 py-2 text-sm text-gray-500">Carregando...</div>
              ) : suggestions.length > 0 ? (
                <ul className="max-h-64 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion.path)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 transition"
                      >
                        {suggestion.title}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  Nenhuma receita encontrada
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <aside className="hidden sm:block border-t bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Temas</h3>
          <ul className="flex flex-wrap gap-3 text-sm">
            {tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tag/${tag}`}
                  className="text-gray-700 hover:text-orange-600 transition"
                >
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </header>
  );
}
