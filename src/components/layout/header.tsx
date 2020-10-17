import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

type HeaderProps = { className?: string };

export default function Header(props: HeaderProps) {
  return (
    <>
      <AppBar className={props.className} position="static">
        <Toolbar></Toolbar>
      </AppBar>
    </>
  );
}
