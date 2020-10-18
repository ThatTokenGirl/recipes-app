import React from "react";
import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import { useNav } from "../../store";
import { MenuIcon } from "../icons";

type HeaderProps = { className?: string };

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    marginLeft: "auto",
    color: theme.palette.primary.contrastText,
  },
}));

export default function Header(props: HeaderProps) {
  const classes = useStyles();
  const { variant, toggle } = useNav();

  return (
    <>
      <AppBar className={props.className} position="static">
        <Toolbar>
          {variant === "temporary" && (
            <IconButton className={classes.menuIcon} onClick={() => toggle()}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
