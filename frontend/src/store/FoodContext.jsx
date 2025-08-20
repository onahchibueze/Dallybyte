import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const FoodInfo = createContext();

export const FoodInfoProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [search, setSearch] = useState(null);
  const [categories, setCategories] = useState(null);
  const [foods, setFoods] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL; // ✅ Use environment variable

  const signUp = async (form) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, form);
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
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
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
      const res = await axios.post(`${API_URL}/api/products/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
        `${API_URL}/api/cart/add`,
        { itemId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
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
        `${API_URL}/api/orders/add`,
        { address, totalPrice: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      throw error;
    }
  };

  const getItem = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/`);
      setFoods(res.data.data);
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
      const res = await axios.get(`${API_URL}/api/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
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
      const res = await axios.get(`${API_URL}/api/auth/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(res.data.data);
      return res.data;
    } catch (error) {
      setUserInfo(null);
      throw error;
    }
  };

  const logOut = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
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
      const res = await axios.delete(`${API_URL}/api/cart/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
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
