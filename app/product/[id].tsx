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
import { router, useLocalSearchParams } from 'expo-router';
import { useShop } from '../../context/ShopContext';
import { getAlexObiTheme } from '../../lib/alexObiTheme';

type Product = {
  id:string;
  name:string;
  category:string;
  price:number;
  oldPrice:number;
  rating:number;
  reviews:number;
  image:string;
  description:string;
};

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

type ShopState = {
  products:Product[];
  addToCart:(product:Product) => void;
  cartCount:number;
  wishlist:string[];
  toggleWishlist:(id:string) => void;
  theme:Theme;
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const {
    products,
    addToCart,
    cartCount,
    wishlist,
    toggleWishlist,
    theme,
  } = useShop() as ShopState;

  const product = products.find(item => item.id === String(id));

  if (!product) {
    return (
      <View style={[styles.notFound,{backgroundColor:theme.background}]}>
        <Text style={[styles.notFoundTitle,{color:theme.text}]}>
          Product not found
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backText,{color:theme.primary}]}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  const wished = wishlist.includes(product.id);

  return (
    <View style={[styles.page,{backgroundColor:theme.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.imageContainer,{backgroundColor:theme.surface2}]}>
          <Image source={{uri:product.image}} style={styles.image} />

          <Pressable
            style={[styles.floatingButton,{backgroundColor:theme.surface}]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={21} color={theme.text} />
          </Pressable>

          <Pressable
            style={[styles.floatingButton,styles.wishlist,{backgroundColor:theme.surface}]}
            onPress={() => toggleWishlist(product.id)}
          >
            <Ionicons
              name={wished ? 'heart' : 'heart-outline'}
              size={21}
              color={wished ? theme.danger : theme.text}
            />
          </Pressable>

          <Pressable
            style={[styles.floatingButton,styles.bag,{backgroundColor:theme.surface}]}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <Ionicons name="bag-handle-outline" size={21} color={theme.text} />
            {cartCount > 0 ? (
              <View style={[styles.count,{backgroundColor:theme.primary2}]}>
                <Text style={styles.countText}>{cartCount}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={[styles.category,{color:theme.primary}]}>
            {product.category}
          </Text>

          <Text style={[styles.title,{color:theme.text}]}>
            {product.name}
          </Text>

          <View style={styles.rating}>
            <Ionicons name="star" size={17} color={theme.gold} />
            <Text style={[styles.ratingText,{color:theme.text}]}>{product.rating}</Text>
            <Text style={[styles.reviews,{color:theme.muted}]}>
              {product.reviews} reviews
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={[styles.price,{color:theme.text}]}>
              ${product.price}
            </Text>
            <Text style={[styles.oldPrice,{color:theme.muted}]}>
              ${product.oldPrice}
            </Text>
            <View style={[styles.save,{backgroundColor:theme.surface2}]}>
              <Text style={[styles.saveText,{color:theme.accent}]}>
                SAVE {discount}%
              </Text>
            </View>
          </View>

          <View style={[styles.divider,{backgroundColor:theme.border}]} />

          <Text style={[styles.sectionTitle,{color:theme.text}]}>
            About this product
          </Text>

          <Text style={[styles.description,{color:theme.muted}]}>
            {product.description}
          </Text>

          <View style={styles.features}>
            {[
              ['checkmark-circle','Premium quality materials'],
              ['car-outline','Fast delivery'],
              ['shield-checkmark-outline','Secure checkout'],
              ['refresh-circle-outline','30-day easy returns'],
            ].map(([icon,label]) => (
              <View style={styles.feature} key={label}>
                <Ionicons name={icon as any} size={19} color={theme.accent} />
                <Text style={[styles.featureText,{color:theme.text}]}>
                  {label}
                </Text>
              </View>
            ))}
          </View>

          <Pressable
            style={[styles.add,{backgroundColor:theme.primary}]}
            onPress={() => {
              addToCart(product);
              router.push('/(tabs)/cart');
            }}
          >
            <Ionicons name="bag-add-outline" size={21} color="#FFFFFF" />
            <Text style={styles.addText}>
              Add to bag · ${product.price}
            </Text>
          </Pressable>

          <View style={{height:30}} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page:{flex:1},
  imageContainer:{
    height:440,
    position:'relative',
  },
  image:{width:'100%',height:'100%'},
  floatingButton:{
    position:'absolute',
    top:18,
    left:18,
    width:44,
    height:44,
    borderRadius:14,
    alignItems:'center',
    justifyContent:'center',
  },
  wishlist:{left:74},
  bag:{left:'auto',right:18},
  count:{
    position:'absolute',
    right:-4,
    top:-4,
    minWidth:18,
    height:18,
    borderRadius:9,
    alignItems:'center',
    justifyContent:'center',
  },
  countText:{color:'#171321',fontSize:9,fontWeight:'900'},
  content:{padding:24},
  category:{
    fontSize:10,
    fontWeight:'900',
    letterSpacing:1.2,
    textTransform:'uppercase',
  },
  title:{
    fontSize:32,
    lineHeight:38,
    fontWeight:'900',
    letterSpacing:-1.2,
    marginTop:6,
  },
  rating:{flexDirection:'row',alignItems:'center',gap:5,marginTop:12},
  ratingText:{fontWeight:'900'},
  reviews:{fontSize:12},
  priceRow:{flexDirection:'row',alignItems:'center',gap:9,marginTop:16},
  price:{fontSize:29,fontWeight:'900'},
  oldPrice:{fontSize:14,textDecorationLine:'line-through'},
  save:{paddingHorizontal:8,paddingVertical:5,borderRadius:7},
  saveText:{fontSize:9,fontWeight:'900'},
  divider:{height:1,marginVertical:22},
  sectionTitle:{fontSize:18,fontWeight:'900'},
  description:{lineHeight:23,marginTop:8,fontSize:14},
  features:{marginTop:20,gap:12},
  feature:{flexDirection:'row',alignItems:'center',gap:9},
  featureText:{fontSize:13,fontWeight:'700'},
  add:{
    height:56,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    gap:10,
    marginTop:25,
  },
  addText:{color:'#171321',fontSize:15,fontWeight:'900'},
  notFound:{flex:1,alignItems:'center',justifyContent:'center'},
  notFoundTitle:{fontSize:24,fontWeight:'900'},
  backText:{marginTop:15,fontWeight:'900'},
});
