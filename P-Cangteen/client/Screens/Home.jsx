import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import {} from "react-native-gesture-handler";

import { Welcome } from "../Components";
import styles from "./home.style";
import Carousel from "../Components/Home/Carousel";
import Headings from "../Components/Home/Heading";
import ProductRow from "../Components/Products/ProductRow";
import LoadingIndicator from "../Components/Loading/LoadingIndicator";
import { SIZES } from "../constants";
import { CartContext } from "../Components/Contexts/CartContext";

const Home = ({ navigation }) => {
  const { items } = useContext(CartContext);

  const isLoading = false;

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="happy-outline" size={28} />
          <Text style={styles.location}>Have a nice day!</Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>
                {items.totalCount ? items.totalCount : 0}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Fontisto name="shopping-basket-add" size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          paddingBottom: SIZES.large,
        }}
      >
        <Welcome />
        <Carousel />
        <Headings />
        <ProductRow />
        {/* <Headings title="" /> */}
        <View style={{ height: SIZES.xxLarge + 150 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
