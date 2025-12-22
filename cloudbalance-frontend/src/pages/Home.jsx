import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

const Home = () => {
  const navigate = useNavigate();

  const checkIsLoggedIn = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/me`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      
      navigate("/login");
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, []); 

  return null;
};

export default Home;
