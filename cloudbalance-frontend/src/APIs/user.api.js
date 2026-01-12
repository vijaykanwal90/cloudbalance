import axiosInstance from "./axiosInstance";

const getAllUserApi = async () => {

  return axiosInstance.get("/user");
};
const createUserApi = async (formData) => {
    
  return axiosInstance.post(`/user`,  formData );
};

const updateUserApi= async(id, formData) =>{
    
    return axiosInstance.put(`/user?id=${id}`, formData)
}
const getUserByIdApi = async (id) => {
  return axiosInstance.get(`/user/${id}`);
};

export { getAllUserApi, getUserByIdApi, createUserApi, updateUserApi };
