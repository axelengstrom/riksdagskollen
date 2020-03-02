import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline, Grid, Hidden } from "@material-ui/core";

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
    marginTop: 50,
    display: "flex",
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(5)
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
          filter.ageRange[1] >= getAge(person.fodd_ar)
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
        handleInputChange={handleInputChange}
        handleAgeChange={handleAgeChange}
        filter={filter}
        handleDrawerToggle={handleDrawerToggle}
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
                    <Filter
                      handleInputChange={handleInputChange}
                      handleAgeChange={handleAgeChange}
                      filter={filter}
                      data={data}
                    />
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
