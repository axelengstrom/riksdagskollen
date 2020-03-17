import * as actionTypes from "../actions/actions";

const initialState = {
  mobileOpen: false
};

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case actionTypes.HANDLE_DRAWER_TOGGLE:
      return {
        ...state,
        mobileOpen: !state.mobileOpen
      };

    default:
      return state;
  }
};

export default reducer;
