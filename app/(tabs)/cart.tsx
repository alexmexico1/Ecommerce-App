import React from 'react';
import {
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

export default function CartScreen() {
  const { cart, subtotal, updateQuantity, removeFromCart } = useShop();
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  if (!cart.length) {
    return (
      <View style={styles.empty}>
        <View style={styles.emptyIcon}>
          <Ionicons name="bag-outline" size={42} color="#6366F1" />
        </View>
        <Text style={styles.emptyTitle}>Your bag is empty</Text>
        <Text style={styles.emptyText}>
          Looks like you haven&apos;t added anything yet. Discover our collection and find something you love.
        </Text>
        <Pressable style={styles.shopButton} onPress={() => router.push('/(tabs)/explore')}>
          <Text style={styles.shopButtonText}>Start shopping</Text>
          <Ionicons name="arrow-forward" size={17} color="#FFFFFF" />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Your bag</Text>
            <Text style={styles.subtitle}>{cart.length} items selected</Text>
          </View>
          <Ionicons name="bag-handle-outline" size={27} color="#111827" />
        </View>

        {cart.map(item => (
          <View key={item.id} style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>

              <View style={styles.bottom}>
                <View style={styles.quantity}>
                  <Pressable onPress={() => updateQuantity(item.id, -1)} style={styles.qtyButton}>
                    <Ionicons name="remove" size={15} color="#111827" />
                  </Pressable>
                  <Text style={styles.qty}>{item.quantity}</Text>
                  <Pressable onPress={() => updateQuantity(item.id, 1)} style={styles.qtyButton}>
                    <Ionicons name="add" size={15} color="#111827" />
                  </Pressable>
                </View>

                <Pressable onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.remove}>Remove</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order summary</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.value}>{shipping ? `$${shipping.toFixed(2)}` : 'FREE'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>${total.toFixed(2)}</Text>
          </View>

          <Pressable style={styles.checkout}>
            <Text style={styles.checkoutText}>Proceed to checkout</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>

          <Text style={styles.secure}>
            <Ionicons name="lock-closed-outline" size={12} /> Secure checkout · Free returns
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 20, paddingBottom: 40 },
  header: { paddingTop: 8, paddingBottom: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 34, fontWeight: '900', color: '#111827', letterSpacing: -1 },
  subtitle: { color: '#9CA3AF', marginTop: 3 },
  item: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 10, marginBottom: 12, flexDirection: 'row', borderWidth: 1, borderColor: '#EEF0F4' },
  itemImage: { width: 108, height: 108, borderRadius: 13, backgroundColor: '#F3F4F6' },
  itemInfo: { flex: 1, paddingLeft: 13, justifyContent: 'space-between' },
  category: { fontSize: 9, color: '#9CA3AF', fontWeight: '900', textTransform: 'uppercase', letterSpacing: .8 },
  name: { fontSize: 14, color: '#111827', fontWeight: '800', marginTop: 4 },
  itemPrice: { fontSize: 16, fontWeight: '900', color: '#111827', marginTop: 5 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 9 },
  quantity: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 10, padding: 3 },
  qtyButton: { width: 27, height: 27, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  qty: { width: 27, textAlign: 'center', fontWeight: '800', color: '#111827' },
  remove: { color: '#EF4444', fontSize: 11, fontWeight: '800' },
  summary: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 20, marginTop: 8, borderWidth: 1, borderColor: '#EEF0F4' },
  summaryTitle: { fontSize: 18, fontWeight: '900', color: '#111827', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 7 },
  label: { color: '#6B7280', fontSize: 13 },
  value: { color: '#374151', fontSize: 13, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 9 },
  totalLabel: { color: '#111827', fontWeight: '900', fontSize: 16 },
  total: { color: '#111827', fontWeight: '900', fontSize: 22 },
  checkout: { marginTop: 17, height: 52, borderRadius: 14, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 },
  checkoutText: { color: '#FFFFFF', fontWeight: '900', fontSize: 14 },
  secure: { textAlign: 'center', color: '#9CA3AF', fontSize: 10, marginTop: 12 },
  empty: { flex: 1, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center', padding: 30 },
  emptyIcon: { width: 90, height: 90, borderRadius: 30, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { marginTop: 20, fontSize: 26, fontWeight: '900', color: '#111827' },
  emptyText: { marginTop: 8, maxWidth: 390, textAlign: 'center', color: '#9CA3AF', lineHeight: 21 },
  shopButton: { marginTop: 20, backgroundColor: '#6366F1', paddingHorizontal: 22, paddingVertical: 14, borderRadius: 13, flexDirection: 'row', gap: 9, alignItems: 'center' },
  shopButtonText: { color: '#FFFFFF', fontWeight: '900' },
});
