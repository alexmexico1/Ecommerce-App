import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, Image } from "react-native";
import { getProductById } from "../api/api";
import { CartContext } from "../context/CartContext";

export default function ProductDetails({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, []);

  if (!product) return null;

  return (
    <View>
      <Image source={{ uri: product.image }} style={{ height: 200 }} />
      <Text>{product.title}</Text>
      <Text>{product.description}</Text>
      <Text>${product.price}</Text>

      <Button title="Add to Cart" onPress={() => addToCart(product)} />
    </View>
  );
}