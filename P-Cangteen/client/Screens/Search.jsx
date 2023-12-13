import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Text,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";

import styles from "./search.style";
import { COLORS, SIZES } from "../constants";
import { useDebounce, useProductsSearch } from "../Components/Api";
import { LoadingIndicator } from "../Components/Loading/LoadingIndicator";
import SearchTitle from "../Components/Products/SearchTitle";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  // const debouncedValue = useDebounce(searchKey, 1000);

  const { mutate, isLoading, data } = useProductsSearch();

  if (isLoading) {
    <LoadingIndicator />;
  }
  if (!data?.length) {
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../assets/images/nofb.png")}
        style={styles.searchImage}
      />
    </View>;
  }
  console.log(data);

  return (
    <SafeAreaView>
      {/* Search */}
      <View style={styles.searchContainer}>
        <Text>
          {"  "}
        </Text>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={(text) => setSearchKey(text)}
            placeholder="Nhập đồ ăn, đồ uống bạn muốn tìm kiếm..."
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => {
              if (searchKey) {
                mutate(searchKey);
              }
            }}
          >
            <Feather
              name="search"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>
      {data?.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require("../assets/images/nofb.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <SearchTitle item={item} />}
            style={{ marginHorizontal: 12 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
export default Search;
