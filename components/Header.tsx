import Link from 'next/link';

export default function Header({ categories }: { categories: { total: number; items: string[] } }) {
  const tags = [
    'rápido',
    'festa',
    'saudável',
    'conforto',
    'verão',
    'sobremesa',
  ];

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

        {/* Busca */}
        <form
          className="flex items-center border rounded overflow-hidden w-full sm:w-auto"
        >
          <input
            type="text"
            placeholder="Buscar receitas..."
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

      <aside className="hidden sm:block border-t bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Temas</h3>
          <ul className="flex flex-wrap gap-3 text-sm">
            {tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/?q=${tag}`}
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
