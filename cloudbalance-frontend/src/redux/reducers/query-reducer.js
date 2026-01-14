import { ADD_TO_QUERY } from "../actions/action-type";
const initialState = {
  
};
function queryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_QUERY:
      return {
        ...state,
        ...action.payload,
        
      };

    default:
      return state;
  }
}
export default queryReducer;
