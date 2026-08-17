import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useShop } from '../../context/ShopContext';

const { width } = Dimensions.get('window');

function ProductCard({ product }) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        {product.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}
        <Pressable
          style={styles.heart}
          onPress={(event) => event.stopPropagation()}
        >
          <Ionicons name="heart-outline" size={19} color="#111827" />
        </Pressable>
      </View>

      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={14} color="#F59E0B" />
        <Text style={styles.rating}>{product.rating}</Text>
        <Text style={styles.reviews}>({product.reviews})</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.oldPrice}>${product.oldPrice}</Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { products, cartCount } = useShop();

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>NOVA<span style={styles.logoDot}>.</span></Text>
            <Text style={styles.tagline}>EVERYDAY ESSENTIALS</Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="search-outline" size={23} color="#111827" />
            </Pressable>

            <Pressable
              style={styles.cartButton}
              onPress={() => router.push('/(tabs)/cart')}
            >
              <Ionicons name="bag-outline" size={23} color="#FFFFFF" />
              {cartCount > 0 ? (
                <View style={styles.count}>
                  <Text style={styles.countText}>{cartCount}</Text>
                </View>
              ) : null}
            </Pressable>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>NEW SEASON / 2026</Text>
            <Text style={styles.heroTitle}>Elevate your everyday.</Text>
            <Text style={styles.heroText}>
              Curated essentials designed for people who care about quality, style and simplicity.
            </Text>

            <Pressable
              style={styles.heroButton}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <Text style={styles.heroButtonText}>Shop collection</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
            }}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Trending now</Text>
              <Text style={styles.sectionSub}>Customer favorites this week</Text>
            </View>
            <Pressable onPress={() => router.push('/(tabs)/explore')}>
              <Text style={styles.viewAll}>View all</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalProducts}
          >
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.perks}>
          <View style={styles.perk}>
            <Ionicons name="car-outline" size={25} color="#111827" />
            <Text style={styles.perkTitle}>Free delivery</Text>
            <Text style={styles.perkText}>On orders over $75</Text>
          </View>
          <View style={styles.perk}>
            <Ionicons name="refresh-outline" size={25} color="#111827" />
            <Text style={styles.perkTitle}>Easy returns</Text>
            <Text style={styles.perkText}>30-day returns</Text>
          </View>
          <View style={styles.perk}>
            <Ionicons name="shield-checkmark-outline" size={25} color="#111827" />
            <Text style={styles.perkTitle}>Secure checkout</Text>
            <Text style={styles.perkText}>Protected payments</Text>
          </View>
        </View>

        <View style={styles.newsletter}>
          <Text style={styles.newsletterEyebrow}>NOVA MEMBERS</Text>
          <Text style={styles.newsletterTitle}>Get 15% off your first order.</Text>
          <Text style={styles.newsletterText}>
            Join our community for new arrivals, exclusive offers and early access.
          </Text>
          <Pressable style={styles.newsletterButton}>
            <Text style={styles.newsletterButtonText}>Join the community</Text>
          </Pressable>
        </View>

        <View style={{ height: 35 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { fontSize: 25, fontWeight: '900', letterSpacing: -1.5, color: '#111827' },
  logoDot: { color: '#6366F1' },
  tagline: { fontSize: 8, fontWeight: '800', letterSpacing: 1.7, color: '#9CA3AF', marginTop: 1 },
  headerActions: { flexDirection: 'row', gap: 10 },
  iconButton: {
    width: 45, height: 45, borderRadius: 14, backgroundColor: '#F3F4F6',
    alignItems: 'center', justifyContent: 'center',
  },
  cartButton: {
    width: 45, height: 45, borderRadius: 14, backgroundColor: '#111827',
    alignItems: 'center', justifyContent: 'center',
  },
  count: {
    position: 'absolute', right: -3, top: -3, width: 18, height: 18,
    borderRadius: 9, backgroundColor: '#6366F1', alignItems: 'center', justifyContent: 'center',
  },
  countText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  hero: {
    margin: 18, borderRadius: 28, overflow: 'hidden', minHeight: 430,
    backgroundColor: '#111827', position: 'relative', justifyContent: 'flex-end',
  },
  heroImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', opacity: 0.48 },
  heroCopy: { padding: 28, zIndex: 2, maxWidth: 570 },
  eyebrow: { color: '#C7D2FE', fontSize: 11, fontWeight: '900', letterSpacing: 1.8, marginBottom: 10 },
  heroTitle: { color: '#FFF', fontSize: width > 700 ? 52 : 39, lineHeight: width > 700 ? 57 : 45, fontWeight: '900', letterSpacing: -2 },
  heroText: { color: '#E5E7EB', fontSize: 15, lineHeight: 23, marginTop: 13, maxWidth: 470 },
  heroButton: {
    marginTop: 22, alignSelf: 'flex-start', backgroundColor: '#6366F1',
    paddingHorizontal: 20, paddingVertical: 14, borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  heroButtonText: { color: '#FFF', fontWeight: '800', fontSize: 14 },
  section: { paddingTop: 10, paddingBottom: 18 },
  sectionHeader: {
    paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-end', marginBottom: 17,
  },
  sectionTitle: { fontSize: 25, fontWeight: '900', color: '#111827', letterSpacing: -0.8 },
  sectionSub: { marginTop: 3, fontSize: 13, color: '#9CA3AF' },
  viewAll: { color: '#4F46E5', fontWeight: '800', fontSize: 13 },
  horizontalProducts: { paddingHorizontal: 18, gap: 14 },
  card: {
    width: width > 700 ? 245 : 205, backgroundColor: '#FFFFFF',
    borderRadius: 20, padding: 10, borderWidth: 1, borderColor: '#EEF0F4',
  },
  imageWrap: { height: width > 700 ? 245 : 205, borderRadius: 14, overflow: 'hidden', backgroundColor: '#F3F4F6' },
  productImage: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute', top: 10, left: 10, backgroundColor: '#111827',
    paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7,
  },
  badgeText: { color: '#FFF', fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  heart: {
    position: 'absolute', top: 10, right: 10, width: 34, height: 34,
    borderRadius: 17, backgroundColor: '#FFFFFFE8', alignItems: 'center', justifyContent: 'center',
  },
  category: { color: '#9CA3AF', fontSize: 10, fontWeight: '800', marginTop: 12, textTransform: 'uppercase', letterSpacing: 0.8 },
  productName: { color: '#111827', fontSize: 14, fontWeight: '800', marginTop: 5, minHeight: 36 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 7 },
  rating: { fontSize: 11, fontWeight: '800', color: '#374151' },
  reviews: { fontSize: 10, color: '#9CA3AF' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 7, paddingBottom: 3 },
  price: { fontSize: 17, fontWeight: '900', color: '#111827' },
  oldPrice: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
  perks: {
    marginHorizontal: 18, marginTop: 10, marginBottom: 18, backgroundColor: '#FFFFFF',
    borderRadius: 22, padding: 20, flexDirection: 'row', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#EEF0F4',
  },
  perk: { flex: 1, alignItems: 'center', paddingHorizontal: 5 },
  perkTitle: { marginTop: 8, fontWeight: '800', color: '#111827', fontSize: 12, textAlign: 'center' },
  perkText: { marginTop: 3, color: '#9CA3AF', fontSize: 10, textAlign: 'center' },
  newsletter: {
    marginHorizontal: 18, borderRadius: 24, padding: 28, backgroundColor: '#111827',
    alignItems: 'center',
  },
  newsletterEyebrow: { color: '#A5B4FC', fontWeight: '900', fontSize: 10, letterSpacing: 1.7 },
  newsletterTitle: { color: '#FFFFFF', fontSize: 27, fontWeight: '900', textAlign: 'center', marginTop: 8 },
  newsletterText: { color: '#9CA3AF', textAlign: 'center', maxWidth: 500, lineHeight: 21, marginTop: 8 },
  newsletterButton: { backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 13, marginTop: 18 },
  newsletterButtonText: { color: '#111827', fontWeight: '800' },
});
