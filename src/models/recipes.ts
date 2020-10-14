export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
}

export function defaultRecipe(): Recipe {
  return {
    id: "",
    name: "",
    ingredients: [],
  };
}

export function defaultIngredient(): Ingredient {
  return { name: "" };
}

export function updateRecipe(current: Recipe, updates: Partial<Recipe>) {
  return { ...current, ...updates };
}

export function addIngredient(recipe: Recipe): [Recipe, Ingredient] {
  const { ingredients } = recipe;
  const newIngredient = defaultIngredient();

  return [
    { ...recipe, ingredients: [...ingredients, newIngredient] },
    newIngredient,
  ];
}

export function updateIngredient(
  recipe: Recipe,
  index: number,
  updates: Partial<Ingredient>
): [Recipe, Ingredient] {
  const current = recipe.ingredients[index] ?? defaultIngredient();
  const ingredients = [...recipe.ingredients];

  ingredients[index] = { ...current, ...updates };

  return [{ ...recipe, ingredients }, ingredients[index]];
}
