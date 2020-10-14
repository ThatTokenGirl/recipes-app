import React, { ComponentType } from "react";
import { makeStyles, Theme as DefaultTheme } from "@material-ui/core";
import { Styles, WithStylesOptions } from "@material-ui/core/styles/withStyles";

export default function <
  Props extends Object,
  Theme = DefaultTheme,
  ClassKey extends string = string
>(
  style: Styles<Theme, {}, ClassKey>,
  Component: ComponentType<Props & { classes: Record<ClassKey, string> }>,
  options?: Omit<WithStylesOptions<Theme>, "withTheme">
): ComponentType<Props> {
  const useStyles = makeStyles(style, options);

  return (props: Props) => {
    const classes = useStyles();

    return <Component {...props} classes={classes}></Component>;
  };
}
