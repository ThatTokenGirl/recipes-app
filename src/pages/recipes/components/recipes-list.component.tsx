import { Divider, List } from "@material-ui/core";
import React, { PropsWithChildren } from "react";
import { Recipe } from "../../../models";
import RecipeListItem from "./recipe-list-item.component";

type RecipesListProps = {
  recipes: Recipe[];
};

export default function RecipesList({
  recipes,
  children,
}: PropsWithChildren<RecipesListProps>) {
  return (
    <List>
      {recipes.map((recipe) => {
        return (
          <>
            <RecipeListItem key={recipe.id} recipe={recipe}></RecipeListItem>
            <Divider></Divider>
          </>
        );
      })}
      {children}
    </List>
  );
}
