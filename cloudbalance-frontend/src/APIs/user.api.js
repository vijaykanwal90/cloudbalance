import axiosInstance from "./axiosInstance";

const getAllUserApi = async () => {
  console.log("this is getting app apis");

  return axiosInstance.get("/user");
};
const createUserApi = async (formData) => {
    console.log("creating user api")
    console.log(formData)
  return axiosInstance.post(`/user`,  formData );
};

const updateUserApi= async(id, formData) =>{
    console.log("updating user details ")
    console.log(formData)
    return axiosInstance.put(`/user?id=${id}`, formData)
}
const getUserByIdApi = async (id) => {
  return axiosInstance.get(`/user/${id}`);
};

export { getAllUserApi, getUserByIdApi, createUserApi, updateUserApi };
