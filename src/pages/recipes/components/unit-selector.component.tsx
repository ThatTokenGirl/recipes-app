import {
  createStyles,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React from "react";
import { units } from "../../../models/units";
import { groupBy } from "../../../utils";

const styles = createStyles({
  root: {
    display: "flex",
  },

  quantity: {
    flex: "1 1 50%",
    minWidth: "50px",
  },

  unit: {
    flex: "1 1 50%",
    marginLeft: ".5rem",
  },
});

type UnitSelectorValue = { unit: string; quantity: number };
type UnitSelectorProps = WithStyles<typeof styles> & {
  value?: UnitSelectorValue;
  onChange?: (value: UnitSelectorValue) => void;
  className?: string;
  size?: "small" | "medium";
};

const items = groupBy(units, "group").map((group) => {
  return [
    <ListSubheader key={group.key}>{group.key}</ListSubheader>,
    ...group.items.map((unit, index) => (
      <MenuItem key={index} value={unit.symbol}>{`${unit.symbol}`}</MenuItem>
    )),
  ];
});

const UnitSelector = withStyles(styles)(
  ({ value, classes, className, onChange, ...rest }: UnitSelectorProps) => {
    const { unit, quantity } = value ?? {};

    return (
      <div className={`${classes.root} ${className ?? ""}`}>
        <TextField
          className={classes.quantity}
          label="Quantity"
          type="number"
          value={quantity}
          {...rest}
        />

        <FormControl className={classes.unit} {...rest}>
          <InputLabel>Unit</InputLabel>
          <Select value={unit}>{items}</Select>
        </FormControl>
      </div>
    );
  }
);

export default UnitSelector;
