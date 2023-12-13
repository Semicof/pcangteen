import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const STORAGE_KEY = "user";
const dataUnknow = {
  email: "unknow",
  phone: "unknow",
  avatar:
    "https://kenh14cdn.com/thumb_w/600/203336854389633024/2023/1/20/photo1674222518916-1674222519298329666697.jpg",
  password: "$2b$10$nNramybWrsfZG5/KU.vTm.FYk.PTYW26sRE4ZFg3/ulUcosc2NETu",
  address: "unknow",
  _id: "654a5ed18c237a2813778037",
  createdAt: "2023-11-07T15:59:13.500Z",
  updatedAt: "2023-11-07T15:59:13.500Z",
  __v: 0,
};

const useAuth = () => {
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

  return { saveData, readData, STORAGE_KEY, profile, clearAuth };
};

export default useAuth;
