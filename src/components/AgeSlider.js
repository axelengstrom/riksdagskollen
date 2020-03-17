import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@material-ui/core/Slider";

import { getAge } from "../utils/functions";
import * as actionCreators from "../store/actions/actions";

const valuetext = value => `${value} år`;

const AgeSlider = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const [value, setValue] = useState([24, 87]);

  const { overallAge } = data;
  const ageMin = getAge(Math.max(...overallAge));
  const ageMax = getAge(Math.min(...overallAge));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <label>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={(event, value) =>
          dispatch(actionCreators.setAgeRange(event, value))
        }
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={ageMin}
        max={ageMax}
      />
      <span
        aria-hidden="true"
        className="MuiSlider-markLabel MuiSlider-markLabelActive"
        style={{ left: 0 }}
      >
        {ageMin} år
      </span>
      <span
        aria-hidden="true"
        className="MuiSlider-markLabel MuiSlider-markLabelActive"
        style={{ left: 100 + "%" }}
      >
        {ageMax} år
      </span>
    </label>
  );
};

export default AgeSlider;
