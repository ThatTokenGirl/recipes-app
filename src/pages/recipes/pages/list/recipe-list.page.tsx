import {
  Button,
  InputAdornment,
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Mute, Sheet } from "../../../../components";
import { Recipe } from "../../../../models";
import { RootState } from "../../../../store";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, useRouteMatch } from "react-router-dom";

type RecipesPagePropsFromStore = { recipes: Recipe[] };

const useStyles = makeStyles({
  page: {
    display: "grid",
    gridTemplateColumns: "minmax(275px, 25%) 1fr",
    gap: "1rem",
    height: "100%",
  },

  listContainer: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridTemplateRows: "min-content 1fr",
    gap: "1em",
    justifySelf: "center",
    maxWidth: "972px",
    width: "100%",
  },

  list: {
    gridColumn: "1 / -1",
  },

  search: {
    width: "100%",
  },
});

const propsMap = ({ recipes }: RootState): RecipesPagePropsFromStore => {
  return { recipes };
};

const RecipesListPage = connect(propsMap)(({ recipes }) => {
  const classes = useStyles();
  const history = useHistory();
  const { path } = useRouteMatch();

  return (
    <div className={classes.page}>
      <Sheet>
        <Mute>
          <i>No categories</i>
        </Mute>
      </Sheet>

      <Sheet className={classes.listContainer}>
        <TextField
          variant="outlined"
          label="Search"
          className={classes.search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push(`${path}/new`)}
        >
          Create recipe
        </Button>

        <Table className={classes.list}>
          <TableHead>
            <TableRow>
              <TableCell>Recipe</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Sheet>
    </div>
  );
});

export default RecipesListPage;
