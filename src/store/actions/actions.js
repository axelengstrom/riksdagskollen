export const FETCH_DATA = "FETCH_DATA";
export const FILTER_DATA = "FILTER_DATA";
export const HANDLE_DRAWER_TOGGLE = "HANDLE_DRAWER_TOGGLE";
export const HANDLE_INPUT_CHANGE = "HANDLE_INPUT_CHANGE";
export const SET_DATA = "SET_DATA";
export const SET_AGE_RANGE = "SET_AGE_RANGE";
export const SET_AVERAGE_AGE = "SET_AVERAGE_AGE";
export const SET_GENDER_DISTRIBUTION = "SET_GENDER_DISTRIBUTION";
export const SET_PARTY_DISTRIBUTION = "SET_PARTY_DISTRIBUTION";
export const SET_OVERALL_AGE = "SET_OVERALL_AGE";

export const fetchData = () => dispatch =>
  fetch("https://data.riksdagen.se/personlista/?utformat=json")
    .then(response => response.json())
    .then(json => {
      dispatch(setData(json.personlista.person));
      dispatch(setOverallAge(json.personlista.person));
    });

export const filterData = payload => ({
  type: FILTER_DATA,
  payload
});

export const handleDrawerToggle = () => ({
  type: HANDLE_DRAWER_TOGGLE
});

export const handleInputChange = payload => ({
  type: HANDLE_INPUT_CHANGE,
  payload
});

export const setAgeRange = payload => ({
  type: SET_AGE_RANGE,
  payload
});

export const setAverageAge = payload => ({
  type: SET_AVERAGE_AGE,
  payload
});

export const setData = payload => ({
  type: SET_DATA,
  payload
});

export const setGenderDistribution = payload => ({
  type: SET_GENDER_DISTRIBUTION,
  payload
});

export const setOverallAge = payload => ({
  type: SET_OVERALL_AGE,
  payload
});

export const setPartyDistribution = payload => ({
  type: SET_PARTY_DISTRIBUTION,
  payload
});
