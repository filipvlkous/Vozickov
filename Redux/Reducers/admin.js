import { GET_ALL_USERS, GET_ALL_VOZIKY, CLEAR_DATA } from "../Constants/index";

const initialState = {
  allUsers: [],
  allVoziky: [],
};

export const admin = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS: {
      return { ...state, allUsers: action.allUsers };
    }
    case GET_ALL_VOZIKY: {
      return { ...state, allVoziky: action.allVoziky };
    }
    case CLEAR_DATA: {
      return { currentUser: null, allVoziky: [], userVoziky: [] };
    }
    default:
      return state;
  }
};
