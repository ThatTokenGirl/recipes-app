import { Recipe } from "../../models";
import { ActionType, createReducer } from "../helpers";
import { loadRecipes } from "./recipes.actions";

export const recipesReducer = createReducer<Recipe[]>( 
    [], {
        [loadRecipes.type]({ recipes }: ActionType<typeof loadRecipes>) {
            return [...recipes];
    }
})