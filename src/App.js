import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline, Grid, Hidden } from "@material-ui/core";
import Sticky from "react-sticky-el";

import * as actionCreators from "./store/actions/actions";

import Filter from "./components/Filter";
import FilterDrawer from "./components/FilterDrawer";
import Loading from "./components/Loading";
import Summary from "./components/Summary";
import Table from "./components/Table";
import TopBar from "./components/TopBar";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  sticky: {
    paddingTop: 40
  }
}));

const App = ({
  data,
  fetchData,
  filterData,
  setAverageAge,
  setPartyDistribution,
  setGenderDistribution
}) => {
  const { filter, filteredItems, items } = data;
  const classes = useStyles();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterData(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, filter]);

  useEffect(() => {
    setAverageAge(filteredItems);
    setPartyDistribution(filteredItems);
    setGenderDistribution(filteredItems);
  }, [
    filteredItems,
    setAverageAge,
    setPartyDistribution,
    setGenderDistribution
  ]);

  return (
    <>
      <CssBaseline />
      <TopBar />
      <FilterDrawer />
      <Container>
        {items && items.length > 0 ? (
          <div className={classes.root}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                {filteredItems && filteredItems.length > 0 ? (
                  <Summary />
                ) : (
                  <Summary loading />
                )}
              </Grid>
              <Grid item xs={12} md={3}>
                <Hidden smDown implementation="css">
                  {items && items.length > 0 ? (
                    <Sticky className={classes.sticky}>
                      <Filter />
                    </Sticky>
                  ) : null}
                </Hidden>
              </Grid>
              <Grid item xs={12} md={9}>
                <Table />
              </Grid>
            </Grid>
          </div>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};

const mapStateToProps = ({ data, filter }) => {
  return {
    data,
    filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(actionCreators.fetchData()),
    filterData: items => dispatch(actionCreators.filterData(items)),
    setAverageAge: filteredItems =>
      dispatch(actionCreators.setAverageAge(filteredItems)),
    setGenderDistribution: filteredItems =>
      dispatch(actionCreators.setGenderDistribution(filteredItems)),
    setPartyDistribution: filteredItems =>
      dispatch(actionCreators.setPartyDistribution(filteredItems))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
