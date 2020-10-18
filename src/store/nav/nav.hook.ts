import { useMediaQuery, useTheme } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "..";
import { useResolution } from "../../hooks";
import { persistent, temporary, close, open } from "./nav.actions";

export function useNav() {
  const { isMobile } = useResolution();

  const dispatch = useDispatch();
  const navState = useSelector(({ nav }: RootState) => nav);

  useEffect(() => {
    const action =
      navState.variant === "persistent" && isMobile
        ? () => dispatch(temporary())
        : navState.variant === "temporary" && !isMobile
        ? () => dispatch(persistent())
        : null;

    if (action) {
      setTimeout(action, 0);
    }
  }, [navState.variant, isMobile]);

  return {
    variant: navState.variant,
    isOpen: navState.open,
    toggle() {
      navState.open ? dispatch(close()) : dispatch(open());
    },
  };
}
