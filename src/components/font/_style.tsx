import React, { PropsWithChildren } from "react";
import { makeStyles, Theme as DefaultTheme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

export function styling<Theme = DefaultTheme>(
  style: CSSProperties | ((theme: Theme) => CSSProperties)
): React.FunctionComponent<{}> {
  const useStyles = makeStyles<Theme>((theme) => {
    const styles = typeof style === "function" ? style(theme) : style;

    return { styles };
  });

  return ({ children }: PropsWithChildren<{}>) => {
    const classes = useStyles();

    return (
      <>
        {React.Children.map(children, (node) => {
          if (React.isValidElement(node)) {
            const { props = {} } = node;
            const { className: existingClasses = "" } = props;
            const className = `${existingClasses} ${classes.styles}`;

            return React.cloneElement(node, { className });
          }

          if (typeof node === "string" || typeof node === "number") {
            return <span className={classes.styles}>{node}</span>;
          }

          return node;
        })}
      </>
    );
  };
}
