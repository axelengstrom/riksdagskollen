import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import {
  AppBar,
  IconButton,
  Toolbar,
  Container,
  Typography
} from "@material-ui/core";

import logoInv from "../icons/logo-inv.svg";

const useStyles = makeStyles(theme => ({
  appBar: {
    background: "#413677",
    [theme.breakpoints.down("md")]: {
      position: "fixed"
    }
  },
  toolbar: { padding: 0 },
  logo: { maxHeight: 24, marginRight: 20 },
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
    <AppBar position="static" className={classes.appBar}>
      <Container>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Öppna filter"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.filterButton}
          >
            <FilterListOutlinedIcon />
          </IconButton>
          <img
            src={logoInv}
            alt="Riksdagskollen logo"
            className={classes.logo}
          />
          <Typography variant="h6" component="h1" noWrap>
            Riksdagskollen
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
