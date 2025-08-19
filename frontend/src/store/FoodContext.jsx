import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "mongoose";

export const FoodInfo = createContext();

export const FoodInfoProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // ✅ moved inside provider
  const [userInfo, setUserInfo] = useState(null);
  const [search, setSearch] = useState(null);
  const [categories, setCategories] = useState(null);
  const [foods, setFoods] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const signUp = async (form) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      toast.success("Account created successfully!");

      return res.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      throw error;
    }
  };

  const logIn = async (form) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      toast.success(res.data.message);

      // Save token for later API calls
      localStorage.setItem("token", res.data.token);

      // Store user info

      return res.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      throw error;
    }
  };
  const addItem = async (formData) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/products/add", // removed duplicate `/api`
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      throw error;
    }
  };
  const addToCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add", // removed duplicate `/api`
        {
          itemId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      throw error;
    }
  };
  const addOrder = async (total) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders/add", // removed duplicate `/api`
        {
          address,
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      console.log(res.data.data);
      return res.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      throw error;
    }
  };
  const getItem = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products/" // removed duplicate `/api`
      );

      toast.success(res.data.message);
      setFoods(res.data.data);
      console.log(res.data.data);
      return res.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      throw error;
    }
  };
  const getCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      setCart(res.data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      throw error;
    }
  };
  const getProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/auth/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      setUserInfo(res.data.data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      setUserInfo(null);
      const errMsg = error.response?.data?.message || "Something went wrong";

      throw error;
    }
  };
  const logOut = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      setUserInfo(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const deleteCart = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message);

      console.log(res.data);

      return res.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      throw error;
    }
  };

  return (
    <FoodInfo.Provider
      value={{
        addOrder,
        setAddress,
        setTotalAmount,
        signUp,
        address,
        logIn,
        admin,
        setAdmin,
        userInfo,
        setUserInfo,
        addItem,
        search,
        setSearch,
        categories,
        setCategories,
        getItem,
        foods,
        setItemId,
        itemId,
        setQuantity,
        quantity,
        addToCart,
        cart,
        getCart,
        deleteCart,
        getProfile,
        logOut,
      }}
    >
      {children}
    </FoodInfo.Provider>
  );
};
export default FoodInfo;
