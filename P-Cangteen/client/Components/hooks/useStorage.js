import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "carts";

const useStorage = () => {
  const [items, setItems] = useState({ items: [], total: 0, totalCount: 0 });

  const saveData = useCallback(async (itemS, countS) => {
    // console.log("setData", value);

    const data = items;
    //data {items:[{item,count}],total}
    let check = 0;
    data.items = data.items.map(({ item, count }) => {
      // found data
      if (item._id === itemS._id) {
        count = count + countS;
        check = 1;
        return { item, count: count };
      }
      return { item, count };
    });
    // add new data
    if (check === 0) {
      data.items.push({ item: itemS, count: countS });
    }

    // calculate total
    data.total = data.items.reduce((prev, { item, count }) => {
      return prev + parseInt(item.price.slice(1)) * count;
    }, 0);

    data.totalCount = data.items.reduce((prev, { item, count }) => {
      return prev + count;
    }, 0);

    console.log(data);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setItems((value) => ({ ...value, ...data }));
      alert("Add to cart success!!!");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  }, []);

  const removeData = useCallback(async (id) => {
    const data = items;

    data.items = data.items.filter(({ item }) => item._id !== id);
    console.log(data.items);
    // calculate total
    data.total = data.items.reduce((prev, { item, count }) => {
      return prev + parseInt(item.price.slice(1)) * count;
    }, 0);

    data.totalCount = data.items.reduce((prev, { item, count }) => {
      return prev + count;
    }, 0);

    console.log("RemoveData", data);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setItems((value) => ({ ...value, ...data }));
      alert("Remove successfully item");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  }, []);

  const readData = useCallback(async () => {
    console.log("run here?-Read data storage");
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setItems((prev) =>
          value
            ? { ...prev, ...JSON.parse(value) }
            : { items: [], total: 0, totalCount: 0 }
        );
      }
    } catch (e) {
      setItems({ items: [], total: 0, totalCount: 0 });
      // alert("Failed to fetch the input from storage");
    }
  }, []);

  useEffect(() => {
    readData();
    console.log("what?", items.totalCount);
  }, [items.totalCount]);

  return { saveData, readData, STORAGE_KEY, items, removeData };
};

export default useStorage;
