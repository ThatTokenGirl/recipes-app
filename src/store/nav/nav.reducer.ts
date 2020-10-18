import { createReducer } from "../helpers";
import { persistent, temporary, open, close } from "./nav.actions";

type NavState = {
  variant: "persistent" | "temporary";
  open: boolean;
};

export const navReducer = createReducer<NavState>(
  {
    variant: "persistent",
    open: true,
  },
  {
    [persistent.type]() {
      return { variant: "persistent", open: true };
    },

    [temporary.type]() {
      return { variant: "temporary", open: false };
    },

    [open.type](_, state) {
      return { ...state, open: true };
    },

    [close.type](_, state) {
      return { ...state, open: false };
    },
  }
);
