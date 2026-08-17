import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useShop } from '../../context/ShopContext';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const { products, addToCart, cartCount } = useShop();
  const product = products.find(item => item.id === String(id));

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundTitle}>Product not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Pressable style={styles.back} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={21} color="#111827" />
          </Pressable>
          <Pressable style={styles.bag} onPress={() => router.push('/(tabs)/cart')}>
            <Ionicons name="bag-outline" size={21} color="#111827" />
            {cartCount > 0 ? <View style={styles.count}><Text style={styles.countText}>{cartCount}</Text></View> : null}
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.rating}>
            <Ionicons name="star" size={17} color="#F59E0B" />
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviews}>{product.reviews} reviews</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.oldPrice}>${product.oldPrice}</Text>
            <View style={styles.save}><Text style={styles.saveText}>SAVE {Math.round((1 - product.price / product.oldPrice) * 100)}%</Text></View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>About this product</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.features}>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={19} color="#6366F1" />
              <Text style={styles.featureText}>Premium quality materials</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={19} color="#6366F1" />
              <Text style={styles.featureText}>Fast worldwide delivery</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={19} color="#6366F1" />
              <Text style={styles.featureText}>30-day easy returns</Text>
            </View>
          </View>

          <Pressable
            style={styles.add}
            onPress={() => {
              addToCart(product);
              router.push('/(tabs)/cart');
            }}
          >
            <Ionicons name="bag-add-outline" size={21} color="#FFFFFF" />
            <Text style={styles.addText}>Add to bag · ${product.price}</Text>
          </Pressable>

          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#FFFFFF' },
  imageContainer: { height: 430, backgroundColor: '#F3F4F6', position: 'relative' },
  image: { width: '100%', height: '100%' },
  back: { position: 'absolute', top: 18, left: 18, width: 44, height: 44, borderRadius: 14, backgroundColor: '#FFFFFFE8', alignItems: 'center', justifyContent: 'center' },
  bag: { position: 'absolute', top: 18, right: 18, width: 44, height: 44, borderRadius: 14, backgroundColor: '#FFFFFFE8', alignItems: 'center', justifyContent: 'center' },
  count: { position: 'absolute', right: -3, top: -3, width: 18, height: 18, borderRadius: 9, backgroundColor: '#6366F1', alignItems: 'center', justifyContent: 'center' },
  countText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900' },
  content: { padding: 24 },
  category: { fontSize: 10, fontWeight: '900', color: '#9CA3AF', letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontSize: 32, lineHeight: 37, fontWeight: '900', color: '#111827', letterSpacing: -1.1, marginTop: 6 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 12 },
  ratingText: { fontWeight: '900', color: '#111827' },
  reviews: { color: '#9CA3AF', fontSize: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 16 },
  price: { fontSize: 29, fontWeight: '900', color: '#111827' },
  oldPrice: { fontSize: 14, color: '#9CA3AF', textDecorationLine: 'line-through' },
  save: { backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7 },
  saveText: { color: '#059669', fontSize: 9, fontWeight: '900' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 22 },
  sectionTitle: { fontSize: 17, fontWeight: '900', color: '#111827' },
  description: { color: '#6B7280', lineHeight: 22, marginTop: 8, fontSize: 14 },
  features: { marginTop: 18, gap: 11 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  featureText: { color: '#374151', fontSize: 13, fontWeight: '600' },
  add: { height: 55, borderRadius: 15, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, marginTop: 24 },
  addText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundTitle: { fontSize: 24, fontWeight: '900' },
  backText: { color: '#6366F1', marginTop: 15, fontWeight: '800' },
});
