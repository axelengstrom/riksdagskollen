import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Divider, Drawer, Hidden } from "@material-ui/core";

import Filter from "./Filter";

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      flexShrink: 0,
      padding: theme.spacing(5)
    },
    padding: theme.spacing(5)
  },
  drawerPaper: {
    padding: theme.spacing(5)
  }
}));

const FilterDrawer = ({
  data,
  filter,
  handleDrawerToggle,
  handleInputChange,
  handleAgeChange,
  mobileOpen
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <Divider />
      {data && data.length > 0 ? (
        <Filter
          handleInputChange={handleInputChange}
          handleAgeChange={handleAgeChange}
          filter={filter}
          data={data}
        />
      ) : null}
    </>
  );

  return (
    <div className={classes.drawer} aria-label="filter">
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
};

export default FilterDrawer;
