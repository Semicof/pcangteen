import { View, FlatList } from "react-native";
import React from "react";

import styles from "./productRow.style";
import { SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";
import { useProducts } from "../Api";
import { LoadingIndicator } from "../Loading/LoadingIndicator";
import { ErrorMessage } from "../Loading/ErrorMessage";
import Headings from "../Home/Heading";

const ProductRow = () => {
  const products = [1, 2, 3, 4];

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
          renderItem={(w) => {
            // console.log(w);

            return <ProductCardView item={w.item} />;
          }}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      </View>
    </>
  );
};
export default ProductRow;
