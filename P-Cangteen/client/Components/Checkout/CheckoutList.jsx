import { View, Image, TouchableOpacity, Text } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./checkoutList.style";
import { CartContext } from "../Contexts/CartContext";

const CheckoutList = ({ data }) => {
  const { item, count } = data;
  const navigation = useNavigation();

  const { removeData } = useContext(CartContext);

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("ProductDetails", { item })}
        >
          <View style={styles.image}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImg} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.supplier}>{item.supplier}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Text style={styles.productTitle}>
              <TouchableOpacity
                onPress={async () => await removeData(item._id)}
              >
                <Ionicons name="close" size={28} />
              </TouchableOpacity>
            </Text>
            <Text style={styles.productTitle}>{count}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default CheckoutList;
