import {
  USER_STATE_CHANGE,
  CLEAR_DATA,
  GET_ALL_VOZIKY,
  GET_USER_VOZIKY,
} from "../Constants/index";

const initialState = {
  currentUser: null,
  allVoziky: [],
  userVoziky: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE: {
      return { ...state, currentUser: action.currentUser };
    }
    case GET_ALL_VOZIKY: {
      return { ...state, allVoziky: action.allVoziky };
    }
    case GET_USER_VOZIKY: {
      return { ...state, userVoziky: action.userVoziky };
    }
    case CLEAR_DATA: {
      return { currentUser: null, allVoziky: [], userVoziky: [] };
    }
    default:
      return state;
  }
};
