import {
  Button,
  createStyles,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import React, { Fragment, useEffect, useState } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Sheet } from "../../../../components";
import {
  addIngredient as addIngredientToRecipe,
  defaultRecipe,
  Ingredient,
  Recipe,
  updateIngredient as updateIngredientOnRecipe,
  updateRecipe,
} from "../../../../models";
import { RootState } from "../../../../store";
import { UnitSelector } from "../../components";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "grid",
      gap: `${theme.spacing(2)}px`,
      gridTemplateAreas: `
        "save         save"
        "ingredients  instructions"
      `,
      gridTemplateColumns: "1fr 1fr",
    },

    container: {
      maxWidth: "750px",
      width: "100%",
      display: "grid",
      gap: `${theme.spacing(4)}px`,
    },

    ingredientsContainer: {
      gridArea: "ingredients",
      display: "grid",
      gap: `${theme.spacing(2)}px`,
      gridTemplateColumns: "max-content minmax(100px, 35%) 1fr",
      gridTemplateRows: "max-content",
    },

    ingredientLabel: {
      gridColumn: "1 / -1",
    },

    instructionsContainer: {
      gridArea: "instructions",
    },

    saveButton: {
      gridArea: "save",
      justifySelf: "end",
    },

    counter: {
      alignSelf: "end",
      fontSize: `${theme.spacing(2)}px`,
      paddingBottom: `${theme.spacing(0.25)}px`,
    },

    buttonContainer: {
      gridColumn: "1 / -1",
    },
  })
);

type PropsFromStore = { recipe: Recipe; isNew: boolean };
type OwnProps = { id: string } | { new: true };

type Props = PropsFromStore;

const propsMap: MapStateToProps<PropsFromStore, OwnProps, RootState> = (
  { recipes },
  ownProps
): PropsFromStore => {
  const recipe =
    "new" in ownProps
      ? defaultRecipe()
      : recipes.find((x) => x.id === ownProps.id);

  if (!recipe)
    throw new Error(`Unable to find recipe with id = ${(ownProps as any).id}`);

  return { recipe, isNew: "new" in ownProps };
};

const _RecipeDetailsPage = ({ recipe: recipeProp, isNew }: Props) => {
  const classes = useStyles();
  const [recipe, setRecipe] = useState(recipeProp);

  const update = (value: Partial<Recipe>) => {
    if (recipe) setRecipe(updateRecipe(recipe, value));
  };

  const addIngredient = () => {
    update(addIngredientToRecipe(recipe)[0]);
  };

  const updateIngredient = (value: Partial<Ingredient>, index: number) => {
    update(updateIngredientOnRecipe(recipe, index, value)[0]);
  };

  useEffect(() => setRecipe(recipeProp), [recipeProp]);

  return (
    <div className={classes.root}>
      <Button
        className={classes.saveButton}
        variant="contained"
        color="primary"
      >
        {isNew ? "Create" : "Save"}
      </Button>
      <Sheet className={classes.ingredientsContainer}>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input
            autoFocus
            onChange={({ target }) => update({ name: target.value })}
          ></Input>
        </FormControl>

        {/* <div className={classes.ingredientsContainer}>
          <FormLabel component="div" className={classes.ingredientLabel}>
            Ingredients
          </FormLabel>

          {recipe.ingredients.map(({ name }, index) => (
            <Fragment key={index}>
              <span className={classes.counter}>{index + 1}.</span>
              <UnitSelector size="small"></UnitSelector>
              <TextField
                label={`Ingredient ${index}`}
                autoFocus
                placeholder={`Ingredient ${index}`}
                value={name}
                onChange={({ target }) =>
                  updateIngredient({ name: target.value }, index)
                }
              />
            </Fragment>
          ))}

          <div className={classes.buttonContainer}>
            <Button
              onClick={addIngredient}
              variant="contained"
              color="secondary"
            >
              <Add /> Add Ingredient
            </Button>
          </div>
        </div> */}
      </Sheet>
      <Sheet className={classes.instructionsContainer}>
        <TextField label="Tags" />
      </Sheet>
    </div>
  );
};

const RecipeDetailsPage = connect(propsMap)(_RecipeDetailsPage);

export default RecipeDetailsPage;
