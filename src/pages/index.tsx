import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import RecipesPage from "./recipes/recipes.page";

export default function Routes() {
  return (
    <Switch>
      <Route path="/recipes">
        <RecipesPage></RecipesPage>
      </Route>
      <Route exact path="/">
        <Redirect to="/recipes"></Redirect>
      </Route>
    </Switch>
  );
}
