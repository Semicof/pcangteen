import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const STORAGE_KEY = "user";
const dataUnknow = {
  email: "example@gmail.com",
  phone: "",
  avatar:
    "https://kenh14cdn.com/thumb_w/600/203336854389633024/2023/1/20/photo1674222518916-1674222519298329666697.jpg",
  password: "$2b$10$nNramybWrsfZG5/KU.vTm.FYk.PTYW26sRE4ZFg3/ulUcosc2NETu",
  address: "",
  _id: "",
  createdAt: "2023-11-07T15:59:13.500Z",
  updatedAt: "2023-11-07T15:59:13.500Z",
  __v: 0,
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(dataUnknow);

  const saveData = async (userData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setProfile(userData);
    } catch (e) {
      alert("Failed to save the data to the storage");
      setProfile(dataUnknow);
    }
  };

  const clearAuth = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setProfile(dataUnknow);
    } catch (e) {
      setProfile(dataUnknow);
      // alert("Failed to save the data to the storage");
    }
    alert("Logout success!!!");
  };

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setProfile(value ? JSON.parse(value) : dataUnknow);
      }
      console.log("profile", profile);
    } catch (e) {
      setItems(dataUnknow);
      // alert("Failed to fetch the input from storage");
    }
  };

  useEffect(() => {
    readData();
  }, [profile._id]);

  //   return { saveData, readData, STORAGE_KEY, profile, clearAuth };

  return (
    <AuthContext.Provider
      value={{ saveData, readData, STORAGE_KEY, profile, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
