import { View, FlatList } from "react-native";
import React from "react";

import styles from "./productList.style";
import { SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";
import { useProducts } from "../Api";
import { LoadingIndicator } from "../Loading/LoadingIndicator";
import { ErrorMessage } from "../Loading/ErrorMessage";

const ProductList = () => {
  const { isLoading, error, data, refetch } = useProducts();

  if (isLoading) {
    <LoadingIndicator />;
  }
  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;
  // console.log(data, error);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
          numColumns={2}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={(w) => {
            // console.log(w);

            return <ProductCardView item={w.item} />;
          }}
        />
      </View>
    </>
  );
};
export default ProductList;
