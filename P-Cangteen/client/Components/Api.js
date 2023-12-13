import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

const BASE_URL = `http://192.168.2.7:4000/api`;

// Products
const PRODUCT_KEY = {
  PRODUCT_LIST: "PRODUCT_LIST",
  PRODUCT_DETAIL: "PRODUCT_DETAIL",
  PRODUCT_CREATE: "PRODUCT_CREATE",
  PRODUCT_DELETE: "PRODUCT_DELETE",
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    // console.log("data" + response.data);
    // console.log("data", response);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export function useProducts() {
  return useQuery({
    queryKey: [PRODUCT_KEY.PRODUCT_LIST],
    queryFn: fetchProducts,
  });
}

//searchProducts

const fetchProductsSearch = async (searchKey) => {
  console.log(searchKey);

  try {
    const response = await axios.get(
      `${BASE_URL}/products/search/${searchKey || ""}`
    );
    console.log(searchKey);
    console.log("data" + response.data);
    console.log("data", response);
    return response.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export function useProductsSearch() {
  return useMutation({
    // mutationKey: [PRODUCT_KEY.PRODUCT_LIST],
    mutationFn: (searchKey) => fetchProductsSearch(searchKey),
    initialData: [],
  });
}

// Products
const USER_KEY = {
  USER_LIST: "USER_LIST",
  USER_DETAIL: "USER_DETAIL",
  USER_CREATE: "USER_CREATE",
  USER_DELETE: "USER_DELETE",
};

// sign up
const createUser = async (data) => {
  // data simple
  //   {
  //     "email":"a@a.com",
  //     "password":"a",
  //     "address":"a",
  //     "phone":123321
  // }
  console.log("data", data);
  try {
    const response = await axios.post(`${BASE_URL}/users`, data);
    // console.log("data" + response.data);
    // console.log("data", response);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export function useCreateUser() {
  // const queryClient = useQueryClient()
  return useMutation({ mutationFn: (body) => createUser(body) });
}

// sign up
const loginUser = async (data) => {
  // data simple
  //   {
  //     "email":"a@a.com",
  //     "password":"a",
  // }
  console.log("data", data);
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, data);
    // console.log("data" + response.data);
    // console.log("data", response);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export function useLogin() {
  // const queryClient = useQueryClient()
  return useMutation({ mutationFn: (body) => loginUser(body) });
}

//getdetail

const getUser = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    // console.log("data" + response.data);
    // console.log("data", response);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export function useGetUser(id) {
  // const queryClient = useQueryClient()
  return useQuery({
    queryKey: [USER_KEY.USER_DETAIL],
    queryFn: () => getUser(id),
    initialData: {},
  });
}

// Receipt Key
const RECEIPT_KEY = {
  RECEIPT_LIST: "RECEIPT_LIST",
  RECEIPT_DETAIL: "RECEIPT_DETAIL",
  RECEIPT_CREATE: "RECEIPT_CREATE",
  RECEIPT_DELETE: "RECEIPT_DELETE",
};

// create Receipt
const createReceipt = async (data) => {
  // data simple
  // {
  //   address: "easdasd",
  //   price: 12289,
  //   products: [
  //     { count: 2, item: "652fb8c0baa8e41247d72a36" },
  //     { count: 7, item: "652fb8eabaa8e41247d72a38" },
  //     { count: 1, item: "652fb56bbaa8e41247d72a28" },
  //     { count: 1, item: "652fb78ebaa8e41247d72a2b" },
  //   ],
  //   user: "654aeb203eaafbd60655252e",
  // }
  console.log("data", data);
  try {
    const response = await axios.post(`${BASE_URL}/receipts`, data);
    // console.log("data" + response.data);
    // console.log("data", response);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export function useCreateReceipt() {
  // const queryClient = useQueryClient()
  return useMutation({ mutationFn: (body) => createReceipt(body) });
}

const fetchReceipt = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/receipts/${id}`);
    // console.log("data" + response.data);
    // console.log("data", response);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export function useReceiptByUser(id) {
  return useQuery({
    queryKey: [RECEIPT_KEY.RECEIPT_DETAIL, id],
    queryFn: () => fetchReceipt(id),
  });
}
