import { buildQueryString } from "../utils/queryStringBuilder";
import axiosInstance from "./axiosInstance";


const getKeysOfGroupApi = (group)=>{
    return axiosInstance.get(`/costexplorer/get-keys-by-group?group=${group}`)
}
const getCostByFiltersApi = (query) =>{
     const queryString = buildQueryString(query)
    return axiosInstance.get(`/costexplorer/getCost?${queryString}`)
}
export {getKeysOfGroupApi, getCostByFiltersApi}