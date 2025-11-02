'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTags } from '@/lib/api';

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
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await getTags();

        if (data && data.items) {
          setTags(data.items.slice(0, 13));
        }
      } catch (error) {
        console.error('Erro ao carregar tags:', error);
        setTags([]);
      }
    };
    
    loadTags();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/search?q=${encodeURIComponent(searchQuery)}`
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
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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
    <header role="banner" className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-600" title="Ir para página inicial">
          🍳 <span className="sr-only">Página inicial - Delícias na Cozinha</span>
          <span aria-hidden="true">Receitas</span>
        </Link>

        {/* Navegação principal */}
        <nav aria-label="Categorias" className="flex gap-4 text-sm font-medium text-gray-700">
          {categories.items.map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="hover:text-orange-600"
              title={`Ver receitas da categoria ${category}`}
            >
              {category}
            </Link>
          ))}
        </nav>

        {/* Busca com acessibilidade */}
        <div ref={searchRef} className="relative w-full sm:w-auto" aria-label="Busca de receitas">
          <form onSubmit={handleSubmit} className="flex items-center border rounded overflow-hidden" role="search">
            <label htmlFor="campo-busca" className="sr-only">Buscar receitas</label>
            <input
              id="campo-busca"
              type="text"
              placeholder="Buscar receitas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 3 && setShowSuggestions(true)}
              className="px-2 py-1 text-sm w-full focus:outline-none"
              aria-describedby="descricao-busca"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-3 py-1 hover:bg-orange-600 transition"
              title="Buscar receitas"
              aria-label="Executar busca"
            >
              🔍
            </button>
          </form>
          <p id="descricao-busca" className="sr-only">
            Digite o nome de uma receita e pressione Enter para buscar.
          </p>

          {/* Dropdown de Sugestões */}
          {showSuggestions && (
            <div
              role="listbox"
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10"
            >
              {isLoading ? (
                <div className="px-3 py-2 text-sm text-gray-500">Carregando...</div>
              ) : suggestions.length > 0 ? (
                <ul className="max-h-64 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} role="option">
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion.path)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 transition"
                        title={`Ver receita: ${suggestion.title}`}
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

      {/* Menu secundário de tags */}
      <aside className="hidden sm:block border-t bg-gray-50" aria-label="Temas de receitas">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <p className="text-sm font-semibold text-gray-600 mb-1">Temas</p>
          <ul className="flex flex-wrap gap-3 text-sm">
            {tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tag/${tag}`}
                  className="text-gray-700 hover:text-orange-600 transition"
                  title={`Ver receitas com a tag ${tag}`}
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
