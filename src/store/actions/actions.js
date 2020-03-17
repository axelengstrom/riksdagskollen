export const FETCH_DATA = "FETCH_DATA";
export const SET_DATA = "SET_DATA";
export const FILTER_DATA = "FILTER_DATA";
export const HANDLE_DRAWER_TOGGLE = "HANDLE_DRAWER_TOGGLE";
export const HANDLE_INPUT_CHANGE = "HANDLE_INPUT_CHANGE";
export const SET_AVERAGE_AGE = "SET_AVERAGE_AGE";
export const SET_GENDER_DISTRIBUTION = "SET_GENDER_DISTRIBUTION";
export const SET_PARTY_DISTRIBUTION = "SET_PARTY_DISTRIBUTION";
export const SET_OVERALL_AGE = "SET_OVERALL_AGE";
export const SET_AGE_RANGE = "SET_AGE_RANGE";

export const setAgeRange = (event, value) => ({
  type: SET_AGE_RANGE,
  event,
  value
});

export const setAverageAge = filteredData => ({
  type: SET_AVERAGE_AGE,
  data: filteredData
});

export const setGenderDistribution = filteredData => ({
  type: SET_GENDER_DISTRIBUTION,
  data: filteredData
});

export const setPartyDistribution = filteredData => ({
  type: SET_PARTY_DISTRIBUTION,
  data: filteredData
});

export const fetchData = () => dispatch =>
  fetch("https://data.riksdagen.se/personlista/?utformat=json")
    .then(response => response.json())
    .then(json => {
      dispatch(setData(json.personlista.person));
      dispatch(setOverallAge(json.personlista.person));
    });

export const setData = data => ({
  type: SET_DATA,
  data
});

export const filterData = data => ({
  type: FILTER_DATA,
  data
});

export const setOverallAge = data => ({
  type: SET_OVERALL_AGE,
  data
});

export const handleDrawerToggle = () => ({
  type: HANDLE_DRAWER_TOGGLE
});

export const handleInputChange = (event, value) => ({
  type: HANDLE_INPUT_CHANGE,
  event,
  value
});
