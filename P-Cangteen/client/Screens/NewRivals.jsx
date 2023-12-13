import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./newRivals.style";
import { COLORS, SIZES } from "../constants";
import { ProductList } from "../Components";

const NewRivals = ({ navigation }) => {
  //   if (isLoading) {
  //     return <LoadingIndicator />;
  //   }
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
          <Text style={styles.heading}>Món ăn</Text>
        </View>
        <ProductList />
      </View>
    </SafeAreaView>
  );
};
export default NewRivals;
