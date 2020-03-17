import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, Hidden } from "@material-ui/core";

import * as actionTypes from "../store/actions/actions";
import Filter from "./Filter";

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      flexShrink: 0
    },
    padding: theme.spacing(2)
  },
  drawerPaper: {
    padding: theme.spacing(5)
  }
}));

const FilterDrawer = () => {
  const dispatch = useDispatch();
  const ui = useSelector(state => state.ui);
  const { mobileOpen } = ui;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.drawer} aria-label="filter">
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={() => dispatch(actionTypes.handleDrawerToggle())}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          <div className={classes.toolbar} />
          <Filter />
        </Drawer>
      </Hidden>
    </div>
  );
};

export default FilterDrawer;
