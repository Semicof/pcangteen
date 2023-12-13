import { View, Image, TouchableOpacity, Text } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./orderTitle.style";

const OrderTitle = ({ data }) => {
  const { item, count } = data;
  console.log("Order Title", data);
  const navigation = useNavigation();

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.container}
          // onPress={() => navigation.navigate("ProductDetails", { item })}
        >
          {/* <View style={styles.image}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImg} />
          </View> */}
          <View style={styles.textContainer}>
            <Text style={styles.productTitle}>{data._id}</Text>
            <Text style={styles.supplier}>{data.address}</Text>
            <Text style={styles.price}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={20}
                />
                <Text> Giao hàng</Text>
              </View>
            </Text>
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
              <Text style={styles.price}>{data.price+" vnd"}</Text>
            </Text>
            {/* <Text style={styles.productTitle}>{count}</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default OrderTitle;
