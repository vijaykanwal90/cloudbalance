import { ADD_USER, REMOVE_USER, AUTH_FAILURE, AUTH_SUCCESS } from "./action-type";

export const fetchCurrentUser = () =>({type:ADD_USER})
export const removeUser = () =>({type:REMOVE_USER})
export const authSuccess = () => ({type:AUTH_SUCCESS})
export const authFailure = () => ({type:AUTH_FAILURE})


