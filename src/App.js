import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline, Grid, Hidden } from "@material-ui/core";
import Sticky from "react-sticky-el";

import { getAge } from "./utils/functions";
import initialState from "./utils/initialState";
import dataSource from "./utils/dataSource";

import Filter from "./components/Filter";
import FilterDrawer from "./components/FilterDrawer";
import Loading from "./components/Loading";
import Summary from "./components/Summary";
import Table from "./components/Table";
import TopBar from "./components/TopBar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  sticky: {
    paddingTop: 40
  }
}));

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState(initialState.data);
  const [filter, setFilter] = useState(initialState.filter);
  const [filteredData, setFilteredData] = useState(initialState.filteredData);
  const [mobileOpen, setMobileOpen] = useState(initialState.mobileOpen);

  useEffect(() => {
    fetch(dataSource)
      .then(response => response.json())
      .then(json => setData(json.personlista.person));
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(
        person =>
          filter[person.parti] &&
          filter.ageRange[0] <= getAge(person.fodd_ar) &&
          filter.ageRange[1] >= getAge(person.fodd_ar) &&
          filter[person.kon]
      )
    );
  }, [data, filter]);

  const handleInputChange = (e, value) => {
    const name = e.target.name;
    setFilter({ ...filter, [name]: value });
  };

  const handleAgeChange = (e, value) => {
    setFilter({ ...filter, ageRange: value });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <CssBaseline />
      <TopBar handleDrawerToggle={handleDrawerToggle} />
      <FilterDrawer
        data={data}
        filter={filter}
        handleAgeChange={handleAgeChange}
        handleDrawerToggle={handleDrawerToggle}
        handleInputChange={handleInputChange}
        mobileOpen={mobileOpen}
      />
      <Container>
        {data && data.length > 0 ? (
          <div className={classes.root}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                {filteredData && filteredData.length > 0 ? (
                  <Summary data={filteredData} />
                ) : (
                  <Summary data={[]} loading={true} />
                )}
              </Grid>
              <Grid item xs={12} md={3}>
                <Hidden smDown implementation="css">
                  {data && data.length > 0 ? (
                    <Sticky className={classes.sticky}>
                      <Filter
                        data={data}
                        filter={filter}
                        handleAgeChange={handleAgeChange}
                        handleInputChange={handleInputChange}
                      />
                    </Sticky>
                  ) : null}
                </Hidden>
              </Grid>
              <Grid item xs={12} md={9}>
                <Table data={data} filteredData={filteredData} />
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

export default App;
