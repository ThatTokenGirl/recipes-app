import { makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./pages";

const useStyles = makeStyles((theme) => ({
  mainContent: {
    padding: theme.spacing(4),
    width: "100%",
    height: "100%",
  },

  [theme.breakpoints.down("sm")]: {
    mainContent: {
      padding: theme.spacing(2),
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.mainContent}>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
