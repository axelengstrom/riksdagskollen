import * as actionTypes from "../actions/actions";
import { getAge, sortBy } from "../../utils/functions";

const initialState = {
  averageAge: 0,
  filter: {
    "-": true,
    S: true,
    M: true,
    KD: true,
    SD: true,
    L: true,
    C: true,
    V: true,
    MP: true,
    ageRange: [0, 100],
    man: true,
    kvinna: true
  },
  filteredItems: [],
  genderDistribution: { genders: [], values: [], colors: [] },
  items: [],
  overallAge: [],
  overallActivity: 0,
  parties: [
    { title: "Politiska vildar", name: "-" },
    { title: "Centerpartiet", name: "C" },
    { title: "Kristdemokraterna", name: "KD" },
    { title: "Liberalerna", name: "L" },
    { title: "Moderaterna", name: "M" },
    { title: "Miljöpartiet", name: "MP" },
    { title: "Socialdemokraterna", name: "S" },
    { title: "Sverigedemokraterna", name: "SD" },
    { title: "Vänsterpartiet", name: "V" }
  ],
  partyDistribution: { parties: [], values: [], colors: [] }
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FILTER_DATA:
      return {
        ...state,
        filteredItems: payload.filter(
          person =>
            state.filter[person.parti] &&
            state.filter.ageRange[0] <= getAge(person.fodd_ar) &&
            state.filter.ageRange[1] >= getAge(person.fodd_ar) &&
            state.filter[person.kon]
        )
      };

    case actionTypes.HANDLE_INPUT_CHANGE:
      const name = payload.event.target.name;
      return {
        ...state,
        filter: {
          ...state.filter,
          [name]: payload.value
        }
      };

    case actionTypes.SET_AGE_RANGE:
      return {
        ...state,
        filter: {
          ...state.filter,
          ageRange: payload.value
        }
      };

    case actionTypes.SET_AVERAGE_AGE:
      return {
        ...state,
        averageAge: Math.floor(
          payload
            .map(person => getAge(person.fodd_ar))
            .reduce((a, b) => a + b, 0) / payload.length
        )
      };

    case actionTypes.SET_DATA:
      return {
        ...state,
        items: payload
      };

    case actionTypes.SET_GENDER_DISTRIBUTION:
      let genders = [];
      let values = [];
      let colors = [];

      const colorsArr = {
        kvinna: "#413677",
        man: "#5e5b6b"
      };

      const map = payload.reduce(
        (acc, person) => acc.set(person.kon, (acc.get(person.kon) || 0) + 1),
        new Map()
      );

      map.forEach(function(val, key) {
        colors.push(colorsArr[key]);
        genders.push(key);
        values.push(val);
      });

      return {
        ...state,
        genderDistribution: {
          genders,
          values,
          colors
        }
      };

    case actionTypes.SET_PARTY_DISTRIBUTION:
      let parties = [];
      let pValues = [];
      let pColors = [];

      const pColorsArr = {
        "-": "#919191",
        C: "#026D41",
        KD: "#0073CA",
        L: "#0168B4",
        M: "#3C2CFF",
        MP: "#0FAA4C",
        S: "#FF3845",
        SD: "#d8d800",
        V: "#FF0000"
      };

      const pMap = payload
        .sort(sortBy("parti"))
        .reduce(
          (acc, person) =>
            acc.set(person.parti, (acc.get(person.parti) || 0) + 1),
          new Map()
        );

      pMap.forEach((val, key) => {
        pColors.push(pColorsArr[key]);
        parties.push(key);
        pValues.push(val);
      });

      return {
        ...state,
        partyDistribution: { parties, values: pValues, colors: pColors }
      };

    case actionTypes.SET_OVERALL_AGE:
      return {
        ...state,
        overallAge: payload.map(person => Number(person.fodd_ar))
      };

    default:
      return state;
  }
};

export default reducer;
