import { ADD_USERS, RESET_USERS_STORE } from "../actions/action-type";

const initialState = {
  users: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USERS:
      return {
        ...state,

        users: action.payload,
      };

    case RESET_USERS_STORE:
      return { initialState };

    default:
      return state;
  }
}
export default userReducer;
