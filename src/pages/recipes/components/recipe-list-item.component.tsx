import React from "react";
import { ListItem } from "@material-ui/core";
import { Recipe } from "../../../models";

export type RecipeListItemProps = {
  recipe: Recipe;
};

export default function RecipeListItem({ recipe }: RecipeListItemProps) {
  return <ListItem></ListItem>;
}
