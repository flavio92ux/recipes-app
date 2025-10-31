import RecipeCard from './RecipeCard';
import type { RecipeSummary } from '@/types/recipe';

/**
 * Renderiza uma grade de cards de receitas.
 */
export default function RecipeList({ items }: { items: RecipeSummary[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((recipe, index) => (
        <RecipeCard key={recipe.id + '-' + index} r={recipe} />
      ))}
    </div>
  );
}
