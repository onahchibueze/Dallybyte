import React, { useContext } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FoodInfo from "../store/FoodContext";

const GoogleAuthButton = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { setUserInfo, setAdmin } = useContext(FoodInfo);
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/google`, {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);

      console.log(res.data);
      toast.success("Login successful!");
      if (res.data.isAdmin) {
        setAdmin(res.data.user);
        navigate("/adminpage");
      } else {
        setUserInfo(res.data.user); // <-- Store user info
        navigate("/menupage");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      console.error(error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login failed")}
      useOneTap
      text="continue_with"
    />
  );
};

export default GoogleAuthButton;
