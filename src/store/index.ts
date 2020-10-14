import { combineReducers, createStore } from "redux";
import { recipesReducer } from "./recipes/recipes.reducer";

export * from './recipes/recipes.actions';

export const rootReducer = combineReducers({
    recipes: recipesReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);