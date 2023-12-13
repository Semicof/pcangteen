import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";

import styles from "./productDetail.style";
import { COLORS, SIZES } from "../constants";
import { CartContext } from "../Components/Contexts/CartContext";

const ProductDetail = () => {
  const route = useRoute();
  const { item } = route.params;
  // console.log(item);

  const { saveData } = useContext(CartContext);

  const navigation = useNavigation();
  const [starCount, setStarCount] = useState(1);

  const increment = () => {
    setStarCount((starCount) => starCount + 1);
  };
  const decrement = () => {
    setStarCount((starCount) => (starCount <= 1 ? 1 : starCount - 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri:
            item.imageUrl ||
            "https://static.vinwonders.com/production/bun-dau-mam-tom-ha-noi-banner.jpg",
        }}
        style={styles.image}
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title || "Sản phẩm"}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{item.price || "50.000 vnd"} đ</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons name="star" key={index} size={24} color={"gold"} />
            ))}
            <Text style={styles.ratingText}>(5)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{starCount}</Text>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.descText}>
          {item.description ||
            "Bún đậu mắm tôm là món ăn đặc sản Hà Nội nổi tiếng, sử dụng nguyên liệu chính là bún đậu và mắm tôm, hai thành phần tuy giản dị nhưng lại được xem là tinh túy của văn hóa ẩm thực Thủ đô. Một phần bún đậu đầy đủ thường bao gồm đậu phụ rán vàng, thịt chân giò, nem rán, dồi, lòng lợn, chả cốm."}
        </Text>
      </View>
      <View style={{ marginBottom: SIZES.small }}>
        <View style={styles.location}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <Text>{"  "} </Text>
            <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
            <Text>Giao ngay tại lớp học của bạn miễn phí!</Text>
          </View>
        </View>

        {/* Cart */}
        <View style={styles.cartRow}>
          <TouchableOpacity
            onPress={async () => {
              await saveData(item, starCount);
              setStarCount(1);
              navigation.navigate("Cart");
            }}
            style={styles.cartBtn}
          >
            <Text style={styles.cartTitle} >Đặt hàng ngay!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await saveData(item, starCount);
              setStarCount(1);
            }}
            style={styles.addCart}
          >
            <Fontisto name="shopping-bag" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <Text>Product Details</Text> */}
    </View>
  );
};
export default ProductDetail;
