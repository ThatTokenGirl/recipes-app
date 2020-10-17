import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import RecipesPage from "./recipes/recipes.page";
import GroceriesPage from "./groceries/groceries.page";
import SearchPage from "./search/search.page";

export default function Routes() {
  return (
    <Switch>
      <Route path="/recipes">
        <RecipesPage></RecipesPage>
      </Route>
      <Route path="/groceries">
        <GroceriesPage></GroceriesPage>
      </Route>
      <Route path="/search">
        <SearchPage></SearchPage>
      </Route>
      <Route exact path="/">
        <Redirect to="/recipes"></Redirect>
      </Route>
    </Switch>
  );
}
