import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useEffect, useState } from "react";

export const CartContext = createContext();

const STORAGE_KEY = "carts";

function CartProvider({ children }) {
  const [items, setItems] = useState({ items: [], total: 0, totalCount: 0 });

  const saveData = async (itemS, countS) => {
    try {
      const data = { ...items };
      let check = 0;

      data.items = data.items.map(({ item, count }) => {
        if (item._id === itemS._id) {
          count += countS;
          check = 1;
        }
        return { item, count };
      });

      if (check === 0) {
        data.items.push({ item: itemS, count: countS });
      }

      data.total = data.items.reduce((prev, { item, count }) => {
        return prev + parseInt(item.price) * count;
      }, 0);

      data.totalCount = data.items.reduce((prev, { count }) => {
        return prev + count;
      }, 0);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setItems(data);
      alert("Thêm thành công!!!");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  const removeData = async (id) => {
    try {
      const newData = { ...items };

      newData.items = newData.items.filter(({ item }) => item._id !== id);

      newData.total = newData.items.reduce((prev, { item, count }) => {
        return prev + parseInt(item.price) * count;
      }, 0);

      newData.totalCount = newData.items.reduce((prev, { count }) => {
        return prev + count;
      }, 0);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setItems(newData);
      alert("Loại bỏ thành công");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };
  

  const clearData = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setItems({ items: [], total: 0, totalCount: 0 });

      //   setItems((value) => ({ ...value, ...data }));
      alert("Xóa thành công");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  }, [items.totalCount]);

  const readData = useCallback(async () => {
    console.log("run here?-Read data storage");
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setItems(JSON.parse(value));
        // setItems((prev) => ({ ...prev, ...JSON.parse(value) }));
      }
    } catch (e) {
      setItems({ items: [], total: 0, totalCount: 0 });
      // alert("Failed to fetch the input from storage");
    }
  }, [items.totalCount]);

  useEffect(() => {
    readData();
  }, [items.totalCount]);
  console.log("re-render?");

  // return { saveData, readData, STORAGE_KEY, items, removeData };

  return (
    <CartContext.Provider
      value={{ saveData, readData, STORAGE_KEY, items, removeData, clearData }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
