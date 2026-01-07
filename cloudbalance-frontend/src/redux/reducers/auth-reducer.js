import { ADD_USER, REMOVE_USER, AUTH_FAILURE, AUTH_SUCCESS  } from "../actions/action-type";
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};
function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };

    case AUTH_FAILURE:
    // case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
export default authReducer;
