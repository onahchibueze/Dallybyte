import React, { useContext } from "react";
import FoodInfo from "../store/FoodContext";

const Profile = () => {
  const { userInfo } = useContext(FoodInfo);
  return (
    <div>
      <h1>hiii</h1>
      <li>{userInfo._id}</li>
    </div>
  );
};

export default Profile;
