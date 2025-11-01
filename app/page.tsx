import { getRecipes } from '@/lib/api';
import RecipeList from '@/components/RecipeList';
import { RecipeSummary } from '@/types/recipe';

// Força Next.js a tratar essa rota como estática
export const dynamic = 'force-static';
// Revalidação a cada 60s
// export const revalidate = 60;

export default async function HomePage() {
  const data = await getRecipes();
  
  const items: RecipeSummary[] = data.items;

  return (
    <section>
      <h1 className="text-4xl font-bold mb-2">Delícias na Cozinha</h1>
      <h2 className="text-xl text-gray-600 mb-6">Receitas Fáceis e Rápidas para o Dia a Dia</h2>
      
      {items.length === 0 ? (
        <p>Nenhuma receita encontrada.</p>
      ) : (
        <RecipeList items={items} />
      )}
    </section>
  );
}
