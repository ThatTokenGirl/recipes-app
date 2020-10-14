import { Recipe } from "../../models";
import { createAction, props } from "../helpers";

export const loadRecipes = createAction("LOAD RECIPES", props<{ recipes: Recipe[] }>());