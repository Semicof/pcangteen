import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import styles from "./checkout.style";
import { COLORS, SIZES } from "../constants";
import {} from "../Components";
import CheckoutList from "../Components/Checkout/CheckoutList";
import { CartContext } from "../Components/Contexts/CartContext";
import { AuthContext } from "../Components/Contexts/AuthContext";
import Button from "../Components/Button";
import { LoadingIndicator } from "../Components/Loading/LoadingIndicator";
import { useCreateReceipt } from "../Components/Api";

const Checkout = ({ navigation }) => {
  const { profile } = useContext(AuthContext);
  const { items, clearData } = useContext(CartContext);

  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState(profile.address);
  const [phone, setPhone] = useState(profile.phone);

  const { mutate, isLoading } = useCreateReceipt();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const createReceipt = async () => {
    if (email && address && phone) {
      mutate(
        {
          address,
          products: items.items.map(({ item, count }) => ({
            item: item._id,
            count,
          })),
          price: items.total,
          user: profile._id,
        },
        {
          onSuccess: async () => {
            await clearData();
            console.log("order success");

            alert("Đặt mua thành công!");
            navigation.navigate("Home");
          },
        }
      );
    }
  };

  return (
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
          <Text style={styles.heading}>Thông tin</Text>
        </View>
        <View
          style={{
            paddingTop: SIZES.xxLarge,
          }}
        >
          <FlatList
            data={items.items}
            keyExtractor={(item) => item.item._id}
            renderItem={({ item }) => <CheckoutList data={item} />}
            style={{ marginHorizontal: 12 }}
          />
        </View>

        {/* <TouchableOpacity
          onPress={() => {
            // await saveData(item, starCount);
            // setStarCount(1);
            // navigation.navigate("Cart", { items: items.items });
            console.log("Buy");
          }}
          style={styles.cartBtn}
        >
          <Text style={styles.cartTitle}>Checkout Now!</Text>
        </TouchableOpacity> */}
      </View>
      {/* <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            // width: SIZES.width,
            flexDirection: "row",
            marginHorizontal: 12,
            padding: SIZES.xSmall,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: SIZES.medium,
              color: COLORS.primary,
              marginLeft: 5,
            }}
          >
            Products Fee:
          </Text>
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: SIZES.medium,
              color: COLORS.primary,
              marginLeft: 5,
            }}
          >
            {"$" + items.total}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            // width: SIZES.width,
            flexDirection: "row",
            marginHorizontal: 12,
            padding: SIZES.xSmall,
          }}
        >
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: SIZES.medium,
              color: COLORS.primary,
              marginLeft: 5,
            }}
          >
            Delivery Fee:
          </Text>
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: SIZES.medium,
              color: COLORS.primary,
              marginLeft: 5,
            }}
          >
            0
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            // width: SIZES.width,
            flexDirection: "row",
            marginHorizontal: 12,
            padding: SIZES.xSmall,
          }}
        >
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: SIZES.large,
              color: COLORS.primary,
              marginLeft: 5,
            }}
          >
            Total:
          </Text>
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: SIZES.large,
              color: COLORS.primary,
              marginLeft: 5,
            }}
          >
            {"$" + items.total}
          </Text>
        </View>
      </View> */}
      <ScrollView
        style={{
          flex: 1,
          marginHorizontal: 22,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Địa chỉ nhận hàng
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Nhập địa chỉ"
              placeholderTextColor={COLORS.black}
              keyboardType="default"
              style={{
                width: "100%",
              }}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Email
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Nhập email"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Số điện thoại
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="+84"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "12%",
                borderRightWidth: 1,
                borderLeftColor: COLORS.gray,
                height: "100%",
              }}
            />

            <TextInput
              placeholder="Nhập số điện thoại"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "80%",
              }}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ flex: 0.3, marginHorizontal: 22 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            // width: SIZES.width,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: SIZES.large,
              color: COLORS.primary,
            }}
          >
            Total:
          </Text>
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: SIZES.large,
              color: COLORS.primary,
            }}
          >
            {items.total+" vnd"}
          </Text>
        </View>
        <Button
          title="Đặt mua!"
          filled
          style={{
            marginTop: 5,
            marginBottom: 4,
          }}
          onPress={() => createReceipt()}
        />
      </View>
    </SafeAreaView>
  );
};
export default Checkout;
