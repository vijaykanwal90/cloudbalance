import axiosInstance from "./axiosInstance";

const getAllAccountsApi = ()=>{
      return axiosInstance.get('/account')
}

const getAccountByIdApi = (accountId)=>{
return axiosInstance.get(`/account/${accountId}`)
}

const assignAccountsApi=(userId, formData)=>{
return axiosInstance.patch(`/account/assign-accounts/${userId}`,formData)
}

const userAccountsApi = (userId)=>{
return axiosInstance.get(`/account/user-accounts/${userId}`)
}

const myAccountsApi = ()=>{
      console.log("my accounts")
return axiosInstance.get('/account/my-accounts')
}
const onboardAccountApi = (formData)=>{
return axiosInstance.post('/account',formData)
}

export {getAllAccountsApi,getAccountByIdApi,assignAccountsApi,userAccountsApi,myAccountsApi,onboardAccountApi}