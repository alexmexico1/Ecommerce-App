// @ts-nocheck
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useShop } from '../../context/ShopContext';

type Product = {
  id:string;
  name:string;
  category:string;
  price:number;
  oldPrice:number;
  rating:number;
  reviews:number;
  badge:string;
  image:string;
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
  wishlist:string[];
  toggleWishlist:(id:string) => void;
  theme:Theme;
};

const categories = [
  'All',
  'Caps',
  'Sneakers',
  'Shoes',
  'Men',
  'Women',
  'Dresses',
  'Kids',
  'Kiddies Wears',
  'Hoodies',
  'Bags',
  'Female Bags',
  'Accessories',
  'Phones',
  'Gadgets',
  'Laptops',
];

export default function ExploreScreen() {
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams();
  const initial = typeof params.category === 'string' ? params.category : 'All';
  const { products, wishlist, toggleWishlist, theme } = useShop() as ShopState;
  const [category, setCategory] = useState(initial);

  const filtered = useMemo(
    () => category === 'All'
      ? products
      : products.filter(product => product.category === category),
    [category, products]
  );

  const columns = width >= 1200 ? 4 : width >= 800 ? 3 : 2;

  return (
    <View style={[styles.page,{backgroundColor:theme.background}]}>
      <FlatList
        data={filtered}
        numColumns={columns}
        key={columns}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columns}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={[styles.brand,{color:theme.text}]}>ALEX OBI</Text>
                <Text style={[styles.title,{color:theme.text}]}>Shop everything.</Text>
                <Text style={[styles.subtitle,{color:theme.muted}]}>
                  Fashion, kids, bags, accessories and tech.
                </Text>
              </View>
              <Pressable
                style={[styles.filter,{backgroundColor:theme.surface,borderColor:theme.border}]}
              >
                <Ionicons name="options-outline" size={21} color={theme.text} />
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
                  style={[
                    styles.chip,
                    {
                      backgroundColor:category === item ? theme.primary : theme.surface,
                      borderColor:category === item ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      {color:category === item ? '#FFFFFF' : theme.muted},
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />

            <View style={styles.resultRow}>
              <Text style={[styles.result,{color:theme.text}]}>
                {filtered.length} products
              </Text>
              <Text style={[styles.sort,{color:theme.muted}]}>
                Featured
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const discount = Math.round((1 - item.price / item.oldPrice) * 100);
          const wished = wishlist.includes(item.id);

          return (
            <Pressable
              style={[
                styles.card,
                {backgroundColor:theme.surface,borderColor:theme.border},
              ]}
              onPress={() => router.push(`/product/${item.id}`)}
            >
              <View style={[styles.imageWrap,{backgroundColor:theme.surface2}]}>
                <Image source={{uri:item.image}} style={styles.image} />
                <View style={[styles.badge,{backgroundColor:theme.danger}]}>
                  <Text style={styles.badgeText}>-{discount}%</Text>
                </View>
                <Pressable
                  style={[styles.heart,{backgroundColor:theme.surface}]}
                  onPress={event => {
                    event.stopPropagation();
                    toggleWishlist(item.id);
                  }}
                >
                  <Ionicons
                    name={wished ? 'heart' : 'heart-outline'}
                    size={17}
                    color={wished ? theme.danger : theme.text}
                  />
                </Pressable>
              </View>

              <Text style={[styles.category,{color:theme.muted}]}>
                {item.category}
              </Text>

              <Text style={[styles.name,{color:theme.text}]} numberOfLines={2}>
                {item.name}
              </Text>

              <View style={styles.rating}>
                <Ionicons name="star" size={13} color={theme.gold} />
                <Text style={[styles.ratingText,{color:theme.text}]}>
                  {item.rating}
                </Text>
                <Text style={[styles.reviews,{color:theme.muted}]}>
                  ({item.reviews})
                </Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={[styles.price,{color:theme.text}]}>${item.price}</Text>
                <Text style={[styles.old,{color:theme.muted}]}>${item.oldPrice}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page:{flex:1},
  list:{padding:18,paddingBottom:40},
  header:{
    paddingTop:8,
    paddingBottom:18,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  brand:{
    fontSize:11,
    fontWeight:'900',
    letterSpacing:2,
  },
  title:{
    fontSize:34,
    lineHeight:38,
    fontWeight:'900',
    letterSpacing:-1.4,
    marginTop:3,
  },
  subtitle:{fontSize:12,marginTop:4,fontWeight:'600'},
  filter:{
    width:45,height:45,
    borderRadius:14,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
  },
  categories:{gap:8,paddingBottom:18},
  chip:{
    paddingHorizontal:14,
    paddingVertical:10,
    borderRadius:12,
    borderWidth:1,
  },
  chipText:{fontSize:10,fontWeight:'900'},
  resultRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:12,
  },
  result:{fontSize:12,fontWeight:'900'},
  sort:{fontSize:11,fontWeight:'800'},
  columns:{gap:12},
  card:{
    flex:1,
    minWidth:0,
    borderRadius:18,
    borderWidth:1,
    padding:9,
    marginBottom:12,
  },
  imageWrap:{
    height:220,
    borderRadius:13,
    overflow:'hidden',
    position:'relative',
  },
  image:{width:'100%',height:'100%'},
  badge:{
    position:'absolute',
    left:8,
    top:8,
    paddingHorizontal:7,
    paddingVertical:5,
    borderRadius:7,
  },
  badgeText:{color:'#FFFFFF',fontSize:8,fontWeight:'900'},
  heart:{
    position:'absolute',
    right:8,
    top:8,
    width:32,
    height:32,
    borderRadius:16,
    alignItems:'center',
    justifyContent:'center',
  },
  category:{
    marginTop:9,
    fontSize:8,
    fontWeight:'900',
    textTransform:'uppercase',
    letterSpacing:.8,
  },
  name:{
    marginTop:4,
    fontSize:13,
    lineHeight:17,
    fontWeight:'800',
    minHeight:34,
  },
  rating:{flexDirection:'row',alignItems:'center',gap:4,marginTop:5},
  ratingText:{fontSize:10,fontWeight:'900'},
  reviews:{fontSize:9},
  priceRow:{flexDirection:'row',alignItems:'center',gap:7,marginTop:5},
  price:{fontSize:16,fontWeight:'900'},
  old:{fontSize:10,textDecorationLine:'line-through'},
});
