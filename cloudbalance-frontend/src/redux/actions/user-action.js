import { ADD_USERS ,RESET_USERS_STORE} from "./action-type"
export const addUsers = (users)=>({type:ADD_USERS, payload:users})
export const resetUserStore = ()=>({type:RESET_USERS_STORE})