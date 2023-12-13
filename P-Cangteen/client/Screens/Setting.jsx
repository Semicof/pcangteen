import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../Components/Contexts/AuthContext";

const Settings = ({ navigation }) => {
  const { clearAuth } = useContext(AuthContext);
  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const navigateToMyOrder = () => {
    navigation.navigate("Order");
  };

  const logout = async () => {
    // console.log("Logout");
    await clearAuth();
    navigation.navigate("Welcome");
  };

  const accountItems = [
    {
      icon: "person-outline",
      text: "Thông tin cá nhân",
      action: navigateToEditProfile,
    },
    { icon: "security", text: "Đơn hàng của bạn", action: navigateToMyOrder },
  ];

  const actionsItems = [
    { icon: "logout", text: "Đăng xuất", action: logout },
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: COLORS.secondary,
      }}
    >
      <MaterialIcons name={icon} size={24} color="red" />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.semiBold,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3,color:COLORS.primary }}>Cài Đặt</Text>
      </View>

      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10,color:COLORS.primary }}>Tài khoản</Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.secondaryGray,
            }}
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Actions Settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10,color:COLORS.primary}}>Thao tác</Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.secondaryGray,
            }}
          >
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
