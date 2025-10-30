/**
 * Estrutura resumida de uma receita (usada na listagem)
 */
export type RecipeSummary = {
  id: string;
  slug: string;
  title: string;
  category: string;
  teaser?: string;
  prepTime?: number;
  servings?: number;
  image?: string;
  author?: string;
  publishedAt?: string;
};

/**
 * Estrutura completa de uma receita (usada na página de detalhe)
 */
export type Recipe = RecipeSummary & {
  description?: string;
  ingredients?: string[];
  steps?: string[];
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
  };
};
