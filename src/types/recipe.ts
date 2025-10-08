export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface RecipeCardProps {
  recipe: Recipe;
  strategy?: string;
  strategyColor?: string;
}

export interface RecipeDetailProps {
  recipe: Recipe;
  strategy?: string;
  strategyColor?: string;
}

export interface FavoriteButtonProps {
  recipeId: number;
  isFavorited?: boolean;
  onToggle?: (recipeId: number, isFavorited: boolean) => void;
}