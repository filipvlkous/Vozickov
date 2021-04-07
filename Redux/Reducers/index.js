import { combineReducers } from "redux";
import { user } from "./user";
import { admin } from "./admin";

const Reducers = combineReducers({
  userState: user,
  adminState: admin,
});

export default Reducers;
