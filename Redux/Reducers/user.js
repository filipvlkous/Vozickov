import {
  USER_STATE_CHANGE,
  CLEAR_DATA,
  GET_ALL_VOZIKY,
} from "../Constants/index";

const initialState = {
  currentUser: null,
  allVoziky: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE: {
      return { ...state, currentUser: action.currentUser };
    }
    case GET_ALL_VOZIKY: {
      return { ...state, allVoziky: action.allVoziky };
    }
    case CLEAR_DATA: {
      return { currentUser: null, allVoziky: [] };
    }
    default:
      return state;
  }
};
