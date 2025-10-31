import RecipeList from '@/components/RecipeList';
import { RecipeSummary } from '@/types/recipe';

export default async function HomePage() {
  const data = await fetch('http://localhost:3000/api/receitas');

  const json = await data.json();

  const items: RecipeSummary[] = json.items;

  return (
    <section>
      {items.length === 0 ? (
        <p>Nenhuma receita encontrada.</p>
      ) : (
        <RecipeList items={items} />
      )}
    </section>
  );
}