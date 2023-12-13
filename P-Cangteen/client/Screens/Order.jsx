import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import Modal from "react-native-modal";

import { SIZES, COLORS } from "../constants";
import ProductTitle from "../Components/Cart/ProductTitle";
import styles from "./order.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "../Components/Contexts/CartContext.jsx";
import Button from "../Components/Button.jsx";
import { AuthContext } from "../Components/Contexts/AuthContext.jsx";
import OrderTitle from "../Components/Order/OrderTitle.jsx";
import { useReceiptByUser } from "../Components/Api.js";
import { LoadingIndicator } from "../Components/Loading/LoadingIndicator.jsx";

const Order = ({ navigation }) => {
  // console.log("Cart items", items);
  const { profile } = useContext(AuthContext);
  const { items } = useContext(CartContext);

  const { data, isLoading } = useReceiptByUser(profile._id);
  console.log("orderdata", data);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle"
                size={30}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>Đơn hàng của tôi</Text>
          </View>
          <View
            style={{
              paddingTop: SIZES.xxLarge,
            }}
          >
            <FlatList
              data={data}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <OrderTitle data={item} />}
              style={{ marginHorizontal: 12 }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default Order;
