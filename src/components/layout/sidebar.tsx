import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { matchPath, useHistory, useLocation } from "react-router";
import { useResolution } from "../../hooks";
import { useNav } from "../../store";
import { CloseIcon, RecipeIcon, SearchIcon, ShoppingIcon } from "../icons";

type SidebarProps = { className?: string };

const useStyles = makeStyles((theme) => ({
  sidebarPaper: {
    position: "static",
  },

  sidebarHeader: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },

  sidebarTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%,0)",
  },

  sidebarClose: {
    marginLeft: "auto",
  },

  listItemActive: {
    backgroundColor: theme.palette.secondary.light,
  },

  listItemIcon: {
    minWidth: "inherit",
    color: theme.palette.secondary.dark,
    fontSize: `${theme.spacing(3)}px`,
    marginRight: `${theme.spacing(4)}px`,
  },

  listItemIconActive: {
    color: theme.palette.secondary.contrastText,
  },

  listItemText: {
    color: theme.palette.secondary.dark,
    paddingRight: `${theme.spacing(2)}px`,
  },

  listItemTextActive: {
    fontWeight: "bold",
    color: theme.palette.secondary.contrastText,
    paddingRight: `${theme.spacing(2)}px`,
  },
}));

const iconsList = ({
  classes,
  pathMatcher,
  go,
}: {
  classes: ReturnType<typeof useStyles>;
  pathMatcher: (path: string) => boolean;
  go: (path: string) => void;
}) =>
  [
    { icon: RecipeIcon, text: "Recipes", path: "/recipes" },
    { icon: ShoppingIcon, text: "Grocery list", path: "/groceries" },
    { icon: SearchIcon, text: "Search", path: "/search" },
  ].map(({ icon: Icon, text, path }, index) => {
    const matches = pathMatcher(path);
    return (
      <Fragment key={index}>
        <ListItem
          button
          key={index}
          className={`${matches ? classes.listItemActive : ""}`}
          onClick={() => go(path)}
        >
          <ListItemIcon
            className={`${classes.listItemIcon} ${
              matches ? classes.listItemIconActive : ""
            }`}
          >
            <Icon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: `${classes.listItemText} ${
                matches ? classes.listItemTextActive : ""
              }`,
            }}
          >
            {text}
          </ListItemText>
        </ListItem>
        <Divider />
      </Fragment>
    );
  });

export default function Sidebar(props: SidebarProps) {
  const { variant, isOpen, toggle } = useNav();
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();
  const pathMatcher = (toMatch: string) => !!matchPath(pathname, toMatch);
  const go = (path: string) => {
    history.push(path);
    toggle();
  };

  return (
    <Drawer
      className={`${props.className}`}
      classes={{
        paper: classes.sidebarPaper,
      }}
      variant={variant}
      open={isOpen}
    >
      {variant === "temporary" && (
        <Toolbar className={classes.sidebarHeader}>
          <Typography variant="h6" className={classes.sidebarTitle}>
            Menu
          </Typography>

          <IconButton className={classes.sidebarClose} onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      )}
      <List>{iconsList({ classes, pathMatcher, go })}</List>
    </Drawer>
  );
}
