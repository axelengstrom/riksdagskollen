import React from "react";
import { connect } from "react-redux";
import { Divider, Switch, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import * as actionCreators from "../store/actions/actions";
import AgeSlider from "./AgeSlider";

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

const Filter = ({ handleInputChange, data }) => {
  const { filter, parties } = data;
  const classes = useStyles();

  return (
    <aside className={classes.filter}>
      <form>
        <Typography variant="subtitle2" gutterBottom>
          Åldersintervall
        </Typography>
        <div className={classes.container}>
          <AgeSlider />
        </div>
        <Divider />
        <Typography variant="subtitle2" className={classes.agerange}>
          Partier
        </Typography>
        {parties.map(party => {
          const { title, name } = party;
          return (
            <div key={title}>
              <label>
                <Switch
                  name={name}
                  onChange={handleInputChange}
                  checked={filter[name]}
                />
                {title}
              </label>
            </div>
          );
        })}
        <Divider />
        <Typography variant="subtitle2" className={classes.agerange}>
          Kön
        </Typography>
        <div>
          <label>
            <PurpleSwitch
              name="man"
              onChange={handleInputChange}
              checked={filter["man"]}
            />
            Män
          </label>
        </div>
        <div>
          <label>
            <PurpleSwitch
              name="kvinna"
              onChange={handleInputChange}
              checked={filter["kvinna"]}
            />
            Kvinnor
          </label>
        </div>
      </form>
    </aside>
  );
};

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleInputChange: (event, value) =>
      dispatch(actionCreators.handleInputChange(event, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
