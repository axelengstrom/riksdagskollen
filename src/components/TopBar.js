import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: { background: "#413677" },
  filterButton: {
    marginRight: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

const TopBar = ({ handleDrawerToggle }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Öppna filter"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.filterButton}
        >
          <FilterListOutlinedIcon />
        </IconButton>
        <Typography variant="h6" component="h1" noWrap>
          Riksdagskollen
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
