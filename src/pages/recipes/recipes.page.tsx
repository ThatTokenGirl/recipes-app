import React from "react";
import { connect } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Recipe } from "../../models";
import { RootState } from "../../store";
import RecipeDetailsPage from "./pages/details/recipe-details.page";
import RecipesListPage from "./pages/list/recipe-list.page";

type RecipesPagePropsFromStore = { recipes: Recipe[] };
type RecipesPageProp = RecipesPagePropsFromStore;

const propsMap = ({ recipes }: RootState): RecipesPagePropsFromStore => {
  return { recipes };
};

const RecipesPage = connect(propsMap)(({ recipes }: RecipesPageProp) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <RecipesListPage></RecipesListPage>
      </Route>

      <Route path={`${path}/new`}>
        <RecipeDetailsPage new></RecipeDetailsPage>
      </Route>
    </Switch>
  );
});

export default RecipesPage;
