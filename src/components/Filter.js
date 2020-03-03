import React, { useState, useEffect } from "react";
import { Switch, Slider, Divider, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import { getOverallAge } from "../utils/functions";
import initialState from "../utils/initialState";

const useStyles = makeStyles(() => ({
  agerange: {
    marginTop: 20
  },
  container: {
    position: "relative",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40
  }
}));

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    "&$checked": {
      color: purple[500]
    },
    "&$checked + $track": {
      backgroundColor: purple[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

const Filter = ({ handleAgeChange, handleInputChange, filter, data }) => {
  const classes = useStyles();
  const { ageRange: appliedAgeRange } = filter;
  const [overallAge, setOverallAge] = useState({});
  const [ageRange, setAgeRange] = useState([]);

  useEffect(() => {
    setOverallAge(getOverallAge(data));
  }, [data]);

  useEffect(() => {
    setAgeRange(appliedAgeRange);
  }, [appliedAgeRange]);

  return (
    <aside className={classes.filter}>
      <form>
        <Typography variant="subtitle2">Åldersintervall</Typography>
        <div className={classes.container}>
          <Slider
            value={ageRange}
            onChangeCommitted={handleAgeChange}
            onChange={(event, value) => setAgeRange(value)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaLabel={i => (i === 0 ? "Age low" : "Age high")}
            getAriaValueText={i => ageRange[i]}
            min={overallAge.min}
            max={overallAge.max}
          />
          <span
            aria-hidden="true"
            className="MuiSlider-markLabel MuiSlider-markLabelActive"
            style={{ left: 0 }}
          >
            {overallAge.min} år
          </span>
          <span
            aria-hidden="true"
            className="MuiSlider-markLabel MuiSlider-markLabelActive"
            style={{ left: 100 + "%" }}
          >
            {overallAge.max} år
          </span>
        </div>
        <Divider />
        <Typography variant="subtitle2" className={classes.agerange}>
          Partier
        </Typography>
        {initialState.parties.map(party => {
          const { title, name } = party;
          return (
            <div key={title}>
              <Switch
                name={name}
                onChange={handleInputChange}
                checked={filter[name]}
              />
              {title}
            </div>
          );
        })}
        <Divider />
        <Typography variant="subtitle2" className={classes.agerange}>
          Kön
        </Typography>
        <div>
          <PurpleSwitch
            name="man"
            onChange={handleInputChange}
            checked={filter["man"]}
          />
          Män
        </div>
        <div>
          <PurpleSwitch
            name="kvinna"
            onChange={handleInputChange}
            checked={filter["kvinna"]}
          />
          Kvinnor
        </div>
      </form>
    </aside>
  );
};

export default Filter;
