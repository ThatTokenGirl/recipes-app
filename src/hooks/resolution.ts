import { useMediaQuery, useTheme } from "@material-ui/core";

export default function useResolution() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return {
    isMobile,
  };
}
