import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { CartContext } from "../context/CartContext";

export default function CartScreen() {
  const { cart } = useContext(CartContext);

  return (
    <View>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.title} - ${item.price}</Text>
        )}
      />
    </View>
  );
}