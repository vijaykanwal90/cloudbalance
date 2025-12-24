import { ADDUSER,REMOVEUSER } from "../actions/action-type";
const initialState = {
        user:null
}
function userReducer (state=initialState, action){
    switch(action.type){
        case ADDUSER:
            return {state}
        case REMOVEUSER:
            return {state}
    }

}
export default userReducer;