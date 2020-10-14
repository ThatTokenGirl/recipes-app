export type UnitGroup = "mass" | "volume";

export interface Unit {
  name: string;
  symbol: string;
  plural?: string;
  group?: UnitGroup;
}

export const units: Unit[] = [
  { name: "Teaspoon", symbol: "tsp", plural: "Teaspoons", group: "volume" },
  {
    name: "Tablespoon",
    symbol: "tbsp",
    plural: "Tablespoons",
    group: "volume",
  },
  {
    name: "Fluid Ounce",
    symbol: "fl oz",
    plural: "Fluid Ounces",
    group: "volume",
  },
  { name: "Cup", symbol: "c", plural: "Cups", group: "volume" },
  { name: "Pint", symbol: "pt", plural: "Pints", group: "volume" },
  { name: "Quart", symbol: "qt", plural: "Quarts", group: "volume" },
  { name: "Gallon", symbol: "gal", plural: "Gallon", group: "volume" },
  { name: "Milliliter", symbol: "ml", plural: "Milliliter", group: "volume" },
  { name: "Liter", symbol: "l", plural: "Liters", group: "volume" },

  { name: "Pound", symbol: "lb", plural: "Pounds", group: "mass" },
  { name: "Ounce", symbol: "oz", plural: "Ounces", group: "mass" },
  { name: "Milligrams", symbol: "mg", plural: "Milligrams", group: "mass" },
  { name: "Grams", symbol: "g", plural: "Grams", group: "mass" },
  { name: "Kilograms", symbol: "kg", plural: "Kilograms", group: "mass" },
];

export function getGroup(group: UnitGroup): Unit[] {
  return units.filter((x) => x.group === group);
}
