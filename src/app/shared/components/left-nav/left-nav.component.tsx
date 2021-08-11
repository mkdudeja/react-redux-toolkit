import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import LayersIcon from "@material-ui/icons/Layers";
import PeopleIcon from "@material-ui/icons/People";
import clsx from "clsx";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserRole } from "../../config";
import { useAuthState } from "../../hooks";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

interface ILeftNavProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const LeftNavigation: React.FC<ILeftNavProps> = (props: ILeftNavProps) => {
  const classes = useStyles(),
    { user } = useAuthState();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !props.open && classes.drawerPaperClose
        ),
      }}
      open={props.open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <ListItem button component={RouterLink} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={RouterLink} to="/documents">
        <ListItemIcon>
          <InsertDriveFileIcon />
        </ListItemIcon>
        <ListItemText primary="Documents" />
      </ListItem>
      {user.role === UserRole.Admin && (
        <React.Fragment>
          <ListItem button component={RouterLink} to="/language">
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Language Management" />
          </ListItem>
          <ListItem button component={RouterLink} to="/user-management">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItem>
        </React.Fragment>
      )}

      <Divider />
    </Drawer>
  );
};

export default LeftNavigation;
