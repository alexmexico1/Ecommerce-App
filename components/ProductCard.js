import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function ProductCard({ product, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={styles.category}>
          {product.category}
        </Text>

        <Text style={styles.price}>
          ${Number(product.price).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  image: {
    width: 96,
    height: 96,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },

  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  category: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
    textTransform: "capitalize",
  },

  price: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
  },
});
