import React, { useState, useEffect } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Grid, Paper, Typography } from "@material-ui/core";

import {
  getAverageAge,
  getPartyDistribution,
  getGender,
  getGenderDistribution
} from "../utils/functions";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 40,
    marginBottom: 40
  },
  averageAge: {
    margin: "20px 0"
  },
  paper: {
    padding: 20
  },
  placeholder: {
    padding: 20,
    minHeight: 297
  }
}));

const Summary = ({ data, loading }) => {
  const [averageAge, setAverageAge] = useState(0);
  const [partyDistribution, setPartyDistribution] = useState({});
  const [genderDistribution, setGenderDistribution] = useState({});
  const classes = useStyles();

  useEffect(() => {
    setAverageAge(getAverageAge(data));
    setPartyDistribution(getPartyDistribution(data));
    setGenderDistribution(getGenderDistribution(data));
  }, [data]);

  if (!loading) {
    return (
      <>
        <Typography variant="h5">Nuvarande urval</Typography>
        <Divider />
        <div className={classes.root}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={2}>
              <Paper className={classes.paper}>
                <Typography variant="h6">Medelålder</Typography>
                <Typography
                  variant="h4"
                  component="p"
                  className={classes.averageAge}
                >
                  {averageAge} år
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper className={classes.paper}>
                <Typography variant="h6">Partitillhörighet</Typography>
                <Doughnut
                  aria-label="Partitillhörighet"
                  options={{
                    layout: {
                      padding: 20
                    },
                    events: ["mousemove", "mouseout", "touchstart", "touchmove"]
                  }}
                  data={{
                    labels: partyDistribution.parties,
                    datasets: [
                      {
                        label: "Partitillhörighet",
                        data: partyDistribution.values,
                        backgroundColor: partyDistribution.colors,
                        borderColor: partyDistribution.colors,
                        borderWidth: 1
                      }
                    ]
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper className={classes.paper}>
                <Typography variant="h6">Könsfördelning</Typography>
                <Pie
                  aria-label="Könsfördelning"
                  options={{
                    layout: {
                      padding: 20
                    },
                    events: ["mousemove", "mouseout", "touchstart", "touchmove"]
                  }}
                  data={{
                    labels: genderDistribution.genders.map(gender =>
                      getGender(gender)
                    ),
                    datasets: [
                      {
                        label: "Könsfördelning",
                        data: genderDistribution.values,
                        backgroundColor: genderDistribution.colors,
                        borderColor: genderDistribution.colors,
                        borderWidth: 1
                      }
                    ]
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Typography variant="h5">Nuvarande urval</Typography>
        <Divider />
        <div className={classes.root}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={2}>
              <Paper className={classes.paper}>
                <Typography variant="h6">Medelålder</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper className={classes.placeholder}>
                <Typography variant="h6">Partitillhörighet</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper className={classes.placeholder}>
                <Typography variant="h6">Könsfördelning</Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </>
    );
  }
};

export default Summary;
