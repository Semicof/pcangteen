import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./productCardView.style";
import { COLORS } from "../../constants";
import { CartContext } from "../Contexts/CartContext";

const ProductCardView = ({ item }) => {
  const navigation = useNavigation();
  const { saveData } = useContext(CartContext);

  // console.log(item);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
        </View>

        {/* Text */}
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {" "}
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {" "}
            {item.supplier}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            {" "}
            {item.price}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={async () => await saveData(item, 1)}
        >
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default ProductCardView;
