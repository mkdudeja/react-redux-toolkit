import { createTheme } from "@material-ui/core";

const theme = createTheme({
  spacing: 6,
  typography: {
    h1: {
      fontSize: "2.25rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.75rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "1rem",
    },
  },
  props: {
    MuiButton: {
      size: "small",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiFab: {
      size: "small",
    },
    MuiTable: {
      size: "small",
    },
    MuiToolbar: {
      variant: "dense",
    },
    MuiListItem: {
      dense: true,
    },
    MuiFormControl: {
      margin: "dense",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiTextField: {
      margin: "dense",
      variant: "standard",
      fullWidth: true,
    },
    MuiFormHelperText: {
      margin: "dense",
    },
  },
});

export default theme;
