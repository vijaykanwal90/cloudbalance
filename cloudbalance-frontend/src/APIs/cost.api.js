import axiosInstance from "./axiosInstance";


const getKeysOfGroupApi = (group)=>{
    return axiosInstance.get(`/costexplorer/get-keys-by-group?group=${group}`)
}
const getCostByFiltersApi = (filters) =>{
    // const group = filters.group;
    return axiosInstance.get(`/costexplorer/getCost?group=SERVICE`)
}
export {getKeysOfGroupApi, getCostByFiltersApi}