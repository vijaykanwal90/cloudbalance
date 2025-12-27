import { ADDUSER, REMOVEUSER } from "./action-type";

export const addUser = (user) =>({type:ADDUSER, payload:user})
export const removeUser = () =>({type:REMOVEUSER})
