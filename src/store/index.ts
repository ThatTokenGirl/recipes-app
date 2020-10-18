import { combineReducers, createStore } from "redux";
import { navReducer } from "./nav/nav.reducer";
import { recipesReducer } from "./recipes/recipes.reducer";

export * from "./recipes/recipes.actions";
export * from "./nav/nav.hook";

export const rootReducer = combineReducers({
  recipes: recipesReducer,
  nav: navReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
