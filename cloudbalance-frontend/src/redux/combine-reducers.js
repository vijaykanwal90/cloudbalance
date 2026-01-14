import { combineReducers } from "redux";
import authReducer from "./reducers/auth-reducer";
import userReducer from "./reducers/user-reducer";
import queryReducer from "./reducers/query-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  query: queryReducer

});
export default rootReducer;
