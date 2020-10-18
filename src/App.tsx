import { makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";
import Routes from "./pages";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateAreas: `
      "header   header"
      "sidebar  main"
    `,
    gridTemplateColumns: "minmax(250px, max-content) 1fr",
    gridTemplateRows: "auto 1fr",
    width: "100%",
    height: "100%",
  },

  header: {
    gridArea: "header",
  },

  sidebar: {
    gridArea: "sidebar",
    position: "static",
  },

  mainContent: {
    padding: theme.spacing(4),
    gridArea: "main",
    width: "100%",
    height: "100%",
    overflow: "auto",
  },

  [theme.breakpoints.down("sm")]: {
    root: {
      gridTemplateAreas: `
        "header"
        "main"
      `,
      gridTemplateColumns: "1fr",
    },
    mainContent: {
      padding: theme.spacing(2),
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Header className={classes.header}></Header>
        <Sidebar className={classes.sidebar}></Sidebar>
        <div className={classes.mainContent}>
          <Routes></Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
