// @ts-nocheck
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

type Theme = {
  background:string;
  surface:string;
  surface2:string;
  text:string;
  muted:string;
  border:string;
  primary:string;
  primary2:string;
  accent:string;
  danger:string;
  gold:string;
};

type CartItem = {
  id:string;
  name:string;
  category:string;
  price:number;
  image:string;
  quantity:number;
};

type ShopState = {
  cart:CartItem[];
  subtotal:number;
  updateQuantity:(id:string, amount:number) => void;
  removeFromCart:(id:string) => void;
  theme:Theme;
};

export default function CartScreen() {
  const { cart, subtotal, updateQuantity, removeFromCart, theme } =
    useShop() as ShopState;

  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (!cart.length) {
    return (
      <View style={[styles.empty,{backgroundColor:theme.background}]}>
        <View style={[styles.emptyIcon,{backgroundColor:theme.surface,borderColor:theme.border}]}>
          <Ionicons name="bag-handle-outline" size={44} color={theme.primary} />
        </View>
        <Text style={[styles.emptyTitle,{color:theme.text}]}>Your bag is empty</Text>
        <Text style={[styles.emptyText,{color:theme.muted}]}>
          Discover premium fashion, kids wear, bags, accessories and technology.
        </Text>
        <Pressable
          style={[styles.shopButton,{backgroundColor:theme.primary}]}
          onPress={() => router.push('/(tabs)/explore')}
        >
          <Text style={styles.shopButtonText}>Start shopping</Text>
          <Ionicons name="arrow-forward" size={17} color="#FFFFFF" />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.page,{backgroundColor:theme.background}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.brand,{color:theme.primary}]}>ALEX OBI</Text>
            <Text style={[styles.title,{color:theme.text}]}>Your bag</Text>
            <Text style={[styles.subtitle,{color:theme.muted}]}>
              {cart.length} products selected
            </Text>
          </View>
          <Ionicons name="bag-handle-outline" size={30} color={theme.text} />
        </View>

        {cart.map(item => (
          <View
            key={item.id}
            style={[styles.item,{backgroundColor:theme.surface,borderColor:theme.border}]}
          >
            <Image source={{uri:item.image}} style={styles.itemImage} />

            <View style={styles.itemInfo}>
              <Text style={[styles.category,{color:theme.muted}]}>
                {item.category}
              </Text>
              <Text style={[styles.name,{color:theme.text}]}>
                {item.name}
              </Text>
              <Text style={[styles.itemPrice,{color:theme.text}]}>
                ${item.price}
              </Text>

              <View style={styles.bottom}>
                <View style={[styles.quantity,{backgroundColor:theme.surface2}]}>
                  <Pressable
                    onPress={() => updateQuantity(item.id,-1)}
                    style={[styles.qtyButton,{backgroundColor:theme.surface}]}
                  >
                    <Ionicons name="remove" size={15} color={theme.text} />
                  </Pressable>
                  <Text style={[styles.qty,{color:theme.text}]}>{item.quantity}</Text>
                  <Pressable
                    onPress={() => updateQuantity(item.id,1)}
                    style={[styles.qtyButton,{backgroundColor:theme.surface}]}
                  >
                    <Ionicons name="add" size={15} color={theme.text} />
                  </Pressable>
                </View>

                <Pressable onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash-outline" size={18} color={theme.danger} />
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        <View style={[styles.summary,{backgroundColor:theme.surface,borderColor:theme.border}]}>
          <Text style={[styles.summaryTitle,{color:theme.text}]}>Order summary</Text>

          <View style={styles.row}>
            <Text style={[styles.label,{color:theme.muted}]}>Subtotal</Text>
            <Text style={[styles.value,{color:theme.text}]}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label,{color:theme.muted}]}>Shipping</Text>
            <Text style={[styles.value,{color:shipping ? theme.text : theme.accent}]}>
              {shipping ? `$${shipping.toFixed(2)}` : 'FREE'}
            </Text>
          </View>

          <View style={[styles.divider,{backgroundColor:theme.border}]} />

          <View style={styles.row}>
            <Text style={[styles.totalLabel,{color:theme.text}]}>Total</Text>
            <Text style={[styles.total,{color:theme.primary}]}>${total.toFixed(2)}</Text>
          </View>

          <Pressable style={[styles.checkout,{backgroundColor:theme.primary}]}>
            <Text style={styles.checkoutText}>Proceed to checkout</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>

          <View style={styles.secureRow}>
            <Ionicons name="shield-checkmark-outline" size={14} color={theme.accent} />
            <Text style={[styles.secure,{color:theme.muted}]}>
              Secure checkout · Free returns
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page:{flex:1},
  content:{padding:20,paddingBottom:40},
  header:{
    paddingTop:8,
    paddingBottom:22,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  brand:{fontSize:10,fontWeight:'900',letterSpacing:2},
  title:{fontSize:34,fontWeight:'900',letterSpacing:-1.2,marginTop:3},
  subtitle:{fontSize:11,marginTop:3,fontWeight:'600'},
  item:{
    borderRadius:18,
    borderWidth:1,
    padding:10,
    marginBottom:12,
    flexDirection:'row',
  },
  itemImage:{
    width:110,height:110,borderRadius:13,
    backgroundColor:'#F1F3F9',
  },
  itemInfo:{flex:1,paddingLeft:13,justifyContent:'space-between'},
  category:{fontSize:8,fontWeight:'900',textTransform:'uppercase',letterSpacing:.8},
  name:{fontSize:14,fontWeight:'800',marginTop:4},
  itemPrice:{fontSize:17,fontWeight:'900',marginTop:5},
  bottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:8,
  },
  quantity:{
    flexDirection:'row',
    alignItems:'center',
    borderRadius:10,
    padding:3,
  },
  qtyButton:{
    width:28,height:28,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },
  qty:{width:28,textAlign:'center',fontWeight:'900'},
  summary:{
    borderRadius:22,
    borderWidth:1,
    padding:20,
    marginTop:8,
  },
  summaryTitle:{fontSize:19,fontWeight:'900',marginBottom:15},
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:7,
  },
  label:{fontSize:13,fontWeight:'600'},
  value:{fontSize:13,fontWeight:'800'},
  divider:{height:1,marginVertical:10},
  totalLabel:{fontSize:17,fontWeight:'900'},
  total:{fontSize:23,fontWeight:'900'},
  checkout:{
    height:54,
    borderRadius:14,
    marginTop:17,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    gap:9,
  },
  checkoutText:{color:'#FFFFFF',fontSize:14,fontWeight:'900'},
  secureRow:{
    marginTop:12,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:5,
  },
  secure:{fontSize:10,fontWeight:'600'},
  empty:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:30,
  },
  emptyIcon:{
    width:96,height:96,
    borderRadius:30,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
  },
  emptyTitle:{fontSize:28,fontWeight:'900',marginTop:20},
  emptyText:{
    marginTop:8,
    maxWidth:420,
    textAlign:'center',
    lineHeight:21,
    fontSize:13,
  },
  shopButton:{
    marginTop:20,
    paddingHorizontal:22,
    paddingVertical:14,
    borderRadius:13,
    flexDirection:'row',
    alignItems:'center',
    gap:9,
  },
  shopButtonText:{color:'#FFFFFF',fontWeight:'900'},
});
