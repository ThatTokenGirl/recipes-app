import {
  Button,
  createStyles,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  TextField,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Sheet } from "../../../../components";
import {
  defaultRecipe,
  Recipe,
  updateRecipe,
  addIngredient as addIngredientToRecipe,
  updateIngredient as updateIngredientOnRecipe,
  Ingredient,
} from "../../../../models";
import { RootState } from "../../../../store";
import Add from "@material-ui/icons/Add";

const styles = createStyles({
  page: {
    display: "flex",
    justifyContent: "center",
  },

  container: {
    maxWidth: "750px",
    width: "100%",
    display: "grid",
    gap: "1rem",
  },

  ingredientsContainer: {
    display: "grid",
    gap: ".5em",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "max-content",
  },
});

type PropsFromStore = { recipe: Recipe };
type OwnProps = { id: string } | { new: true };

type Props = PropsFromStore & WithStyles<typeof styles>;

const propsMap: MapStateToProps<PropsFromStore, OwnProps, RootState> = (
  { recipes },
  ownProps
): PropsFromStore => {
  const recipe =
    "new" in ownProps
      ? defaultRecipe()
      : recipes.find((x) => x.id === ownProps.id);

  if (!recipe) throw `Unable to find recipe with id = ${(ownProps as any).id}`;

  return { recipe };
};

const _RecipeDetailsPage = withStyles(styles)(
  ({ recipe: recipeProp, classes }: Props) => {
    const [recipe, setRecipe] = useState(recipeProp);

    const update = (value: Partial<Recipe>) => {
      if (recipe) setRecipe(updateRecipe(recipe, value));
    };
    
    const addIngredient = () => {
      update(addIngredientToRecipe(recipe)[0]);
    };

    const updateIngredient = (value: Partial<Ingredient>, index: number) => {
      update(updateIngredientOnRecipe(recipe, index, value)[0])
    }

    useEffect(() => setRecipe(recipeProp), [recipeProp]);

    return (
      <div className={classes.page}>
        <Sheet className={classes.container}>
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input
              autoFocus
              onChange={({ target }) => update({ name: target.value })}
            ></Input>
          </FormControl>

          <div className={classes.ingredientsContainer}>
            <FormLabel component="div">Ingredients</FormLabel>

            {recipe.ingredients.map(({ name }, index) => (
              <div>
                <TextField
                  autoFocus
                  placeholder={`Ingredient ${index}`}
                  value={name}
                  onChange={({ target }) => updateIngredient({ name: target.value }, index)}
                />
              </div>
            ))}

            <div>
              <Button
                onClick={addIngredient}
                variant="contained"
                color="primary"
              >
                <Add /> Add Ingredient
              </Button>
            </div>
          </div>
        </Sheet>
      </div>
    );
  }
);

const RecipeDetailsPage = connect(propsMap)(_RecipeDetailsPage);

export default RecipeDetailsPage;
