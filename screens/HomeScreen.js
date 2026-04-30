import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate("Details", { id: item.id })}
          />
        )}
      />
    </View>
  );
}