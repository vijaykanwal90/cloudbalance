import { ADDUSER,REMOVEUSER } from "../actions/action-type";
const initialState = {
        user:null
}
function userReducer (state=initialState, action){
    switch(action.type){
        case ADDUSER:
            return {
                ...state,
                user: action.payload
            }
        case REMOVEUSER:
            return {
                ...state,
                user:null
            }
        default :
            return state;
    }

}
export default userReducer;