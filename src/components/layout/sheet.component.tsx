import React, { PropsWithChildren } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#fff",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
  },
}));

type ContainerProps = {
  className?: string;
};

export default function ({
  children,
  className = "",
}: PropsWithChildren<ContainerProps>) {
  const classes = useStyles();

  return <div className={`${classes.container} ${className}`}>{children}</div>;
}
