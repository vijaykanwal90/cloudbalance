import { REMOVE_USER, AUTH_SUCCESS } from "../actions/action-type";
const initialState = {
  user: null,
  loading: true,
};
function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,

        user: action.payload,
        loading: false,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
export default authReducer;
