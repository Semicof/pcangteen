import { View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import styles from "./searchTitle.style";
import { SIZES } from "../../constants";

const SearchTitle = ({ item }) => {
  const navigation = useNavigation();
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
            <Text style={styles.productTitle}>
              <Text numberOfLines={1}>{item.title}</Text>
            </Text>
            <Text style={styles.supplier}>{item.supplier}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default SearchTitle;
