import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useShop } from '../../context/ShopContext';

const { width } = Dimensions.get('window');

export default function ExploreScreen() {
  const { products } = useShop();
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Bags', 'Watches', 'Sneakers', 'Clothing', 'Accessories', 'Tech'];

  const filtered = useMemo(
    () => category === 'All' ? products : products.filter(p => p.category === category),
    [category, products]
  );

  return (
    <View style={styles.page}>
      <FlatList
        data={filtered}
        numColumns={width > 800 ? 3 : 2}
        key={width > 800 ? 'three' : 'two'}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.top}>
              <View>
                <Text style={styles.title}>Shop</Text>
                <Text style={styles.subtitle}>Find something you&apos;ll love.</Text>
              </View>
              <Pressable style={styles.filter}>
                <Ionicons name="options-outline" size={20} color="#111827" />
              </Pressable>
            </View>

            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setCategory(item)}
                  style={[styles.chip, category === item && styles.chipActive]}
                >
                  <Text style={[styles.chipText, category === item && styles.chipTextActive]}>
                    {item}
                  </Text>
                </Pressable>
              )}
            />

            <View style={styles.resultRow}>
              <Text style={styles.result}>{filtered.length} products</Text>
              <Text style={styles.sort}>Featured <Ionicons name="chevron-down" size={13} /></Text>
            </View>
          </View>
        }
        columnWrapperStyle={styles.columns}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <View style={styles.imageWrap}>
              <Image source={{ uri: item.image }} style={styles.image} />
              {item.badge ? (
                <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View>
              ) : null}
              <View style={styles.heart}>
                <Ionicons name="heart-outline" size={18} color="#111827" />
              </View>
            </View>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={13} color="#F59E0B" />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviews}>({item.reviews})</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.old}>${item.oldPrice}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { padding: 18, paddingBottom: 35 },
  top: { paddingTop: 8, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 34, fontWeight: '900', color: '#111827', letterSpacing: -1 },
  subtitle: { color: '#9CA3AF', marginTop: 3 },
  filter: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#EEF0F4' },
  categories: { gap: 8, paddingBottom: 20 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' },
  chipActive: { backgroundColor: '#111827', borderColor: '#111827' },
  chipText: { fontSize: 12, fontWeight: '800', color: '#6B7280' },
  chipTextActive: { color: '#FFFFFF' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  result: { fontWeight: '800', color: '#374151', fontSize: 13 },
  sort: { color: '#6B7280', fontSize: 12, fontWeight: '700' },
  columns: { gap: 12 },
  card: { flex: 1, minWidth: 0, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 9, marginBottom: 12, borderWidth: 1, borderColor: '#EEF0F4' },
  imageWrap: { height: width > 800 ? 250 : 170, borderRadius: 13, overflow: 'hidden', backgroundColor: '#F3F4F6', position: 'relative' },
  image: { width: '100%', height: '100%' },
  badge: { position: 'absolute', left: 9, top: 9, backgroundColor: '#111827', paddingHorizontal: 7, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#FFF', fontSize: 7, fontWeight: '900' },
  heart: { position: 'absolute', right: 9, top: 9, width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFFFFFE8', alignItems: 'center', justifyContent: 'center' },
  category: { fontSize: 9, fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: .7, marginTop: 10 },
  name: { fontSize: 13, fontWeight: '800', color: '#111827', marginTop: 4, minHeight: 34 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 },
  ratingText: { fontSize: 10, fontWeight: '800', color: '#374151' },
  reviews: { color: '#9CA3AF', fontSize: 9 },
  priceRow: { flexDirection: 'row', gap: 7, alignItems: 'center', marginTop: 5 },
  price: { fontSize: 16, fontWeight: '900', color: '#111827' },
  old: { fontSize: 10, color: '#9CA3AF', textDecorationLine: 'line-through' },
});
