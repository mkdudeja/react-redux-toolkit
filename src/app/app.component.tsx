import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouterOutlet from "./app-router.component";
import { AppHeader, LeftNavigation } from "./shared/components";
import { useAuthState } from "./shared/hooks";

const appTheme = createTheme({
  palette: {
    type: "light",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();
  const { user } = useAuthState();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <ThemeProvider theme={appTheme}>
        <div className={classes.root}>
          <CssBaseline />
          {user && (
            <AppHeader open={open} handleDrawerOpen={handleDrawerOpen} />
          )}
          {user && (
            <LeftNavigation open={open} handleDrawerClose={handleDrawerClose} />
          )}
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="xl" className={classes.container}>
              <AppRouterOutlet />
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
