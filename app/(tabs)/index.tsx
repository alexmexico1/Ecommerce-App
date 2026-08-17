// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
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
  cartCount:number;
  wishlist:string[];
  toggleWishlist:(id:string) => void;
  theme:Theme;
  isDark:boolean;
  toggleTheme:() => void;
};

const slides = [
  {
    eyebrow:'NEW SEASON',
    title:'Fashion That Inspires',
    accent:'Every You.',
    copy:'Discover colourful styles, premium essentials and effortless everyday looks.',
    button:'Shop Women',
    category:'Women',
    image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85',
    colors:['#6D28D9','#EC4899'],
  },
  {
    eyebrow:'SNEAKER COLLECTION',
    title:'Step Up Your',
    accent:'Game.',
    copy:'Premium comfort. Bold colour. Unmatched street-ready style.',
    button:'Shop Sneakers',
    category:'Sneakers',
    image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85',
    colors:['#FF7A00','#FF1744'],
  },
  {
    eyebrow:'TECH ESSENTIALS',
    title:'Future At Your',
    accent:'Fingertips.',
    copy:'Smart phones, laptops and gadgets for a smarter everyday life.',
    button:'Shop Gadgets',
    category:'Gadgets',
    image:'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1400&q=85',
    colors:['#008F8C','#06B6D4'],
  },
];

const categories = [
  ['Caps','baseball-outline'],
  ['Sneakers','footsteps-outline'],
  ['Men','man-outline'],
  ['Women','woman-outline'],
  ['Kids','happy-outline'],
  ['Kiddies Wears','shirt-outline'],
  ['Hoodies','shirt-outline'],
  ['Bags','bag-handle-outline'],
  ['Female Bags','bag-outline'],
  ['Accessories','sparkles-outline'],
  ['Phones','phone-portrait-outline'],
  ['Gadgets','headset-outline'],
  ['Laptops','laptop-outline'],
];

const nav = [
  ['Home','Home'],
  ['Shop','All'],
  ['Men','Men'],
  ['Women','Women'],
  ['Kids','Kids'],
  ['Shoes','Shoes'],
  ['Bags','Bags'],
  ['Accessories','Accessories'],
  ['Gadgets','Gadgets'],
  ['New Arrivals','All'],
  ['🔥 Deals','All'],
];

function ProductCard({
  product,
  theme,
  wished,
  onWish,
}: {
  product:Product;
  theme:Theme;
  wished:boolean;
  onWish:() => void;
}) {
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  return (
    <Pressable
      style={[styles.productCard,{backgroundColor:theme.surface,borderColor:theme.border}]}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View style={[styles.productImageWrap,{backgroundColor:theme.surface2}]}>
        <Image source={{ uri:product.image }} style={styles.productImage} />
        <View style={[styles.discount,{backgroundColor:theme.danger}]}>
          <Text style={styles.discountText}>-{discount}%</Text>
        </View>
        <Pressable
          style={[styles.wishButton,{backgroundColor:theme.surface}]}
          onPress={(event) => {
            event.stopPropagation();
            onWish();
          }}
        >
          <Ionicons
            name={wished ? 'heart' : 'heart-outline'}
            size={18}
            color={wished ? theme.danger : theme.text}
          />
        </Pressable>
      </View>
      <Text style={[styles.productCategory,{color:theme.muted}]}>{product.category}</Text>
      <Text style={[styles.productName,{color:theme.text}]} numberOfLines={2}>
        {product.name}
      </Text>
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={13} color={theme.gold} />
        <Text style={[styles.rating,{color:theme.text}]}>{product.rating}</Text>
        <Text style={[styles.reviews,{color:theme.muted}]}>({product.reviews})</Text>
      </View>
      <View style={styles.priceRow}>
        <Text style={[styles.price,{color:theme.text}]}>${product.price}</Text>
        <Text style={[styles.oldPrice,{color:theme.muted}]}>${product.oldPrice}</Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { products, cartCount, wishlist, toggleWishlist, theme, isDark, toggleTheme } =
    useShop() as ShopState;

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(current => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const current = slides[slide];
  const desktop = width >= 900;

  const goCategory = (category:string) => {
    router.push({
      pathname:'/(tabs)/explore',
      params:{ category },
    });
  };

  return (
    <View style={[styles.page,{backgroundColor:theme.background}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={[styles.announcement,{backgroundColor:theme.primary}]}>
          <View style={styles.announcementItem}>
            <Ionicons name="car-outline" size={14} color="#FFFFFF" />
            <Text style={styles.announcementText}>Free Delivery over $100</Text>
          </View>
          <View style={styles.announcementItem}>
            <Ionicons name="diamond-outline" size={14} color="#FFFFFF" />
            <Text style={styles.announcementText}>Premium Quality Guaranteed</Text>
          </View>
          <View style={styles.announcementItem}>
            <Ionicons name="refresh-outline" size={14} color="#FFFFFF" />
            <Text style={styles.announcementText}>30-Day Easy Returns</Text>
          </View>
        </View>

        <View style={[styles.header,{backgroundColor:theme.surface,borderBottomColor:theme.border}]}>
          <View style={styles.brand}>
            <Text style={[styles.logo,{color:theme.text}]}>
              ALEX <Text style={{color:theme.primary2}}>OBI</Text>
            </Text>
            <Text style={[styles.tagline,{color:theme.muted}]}>PREMIUM ESSENTIALS</Text>
          </View>

          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={19} color={theme.muted} />
            <Text style={[styles.searchText,{color:theme.muted}]}>
              Search for products, brands and more...
            </Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable
              style={[styles.headerIcon,{backgroundColor:theme.surface2}]}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <Ionicons name="search-outline" size={20} color={theme.text} />
            </Pressable>

            <Pressable
              style={[styles.headerIcon,{backgroundColor:theme.surface2}]}
              onPress={toggleTheme}
            >
              <Ionicons
                name={isDark ? 'sunny-outline' : 'moon-outline'}
                size={20}
                color={theme.text}
              />
            </Pressable>

            <Pressable
              style={[styles.headerIcon,{backgroundColor:theme.surface2}]}
              onPress={() =>
                Alert.alert(
                  'Notifications',
                  'Your latest ALEX OBI offers, order updates and new arrivals will appear here.'
                )
              }
            >
              <Ionicons name="notifications-outline" size={20} color={theme.text} />
              <View style={[styles.notificationDot,{backgroundColor:theme.danger}]}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </Pressable>

            <Pressable
              style={[styles.cartHeader,{backgroundColor:theme.text}]}
              onPress={() => router.push('/(tabs)/cart')}
            >
              <Ionicons name="bag-handle-outline" size={21} color={theme.surface} />
              {cartCount > 0 ? (
                <View style={[styles.cartBadge,{backgroundColor:theme.primary2}]}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              ) : null}
            </Pressable>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.nav,
            {backgroundColor:theme.surface,borderBottomColor:theme.border},
          ]}
        >
          {nav.map(([label,category]) => (
            <Pressable
              key={label}
              style={styles.navItem}
              onPress={() => category === 'Home' ? router.replace('/(tabs)') : goCategory(category)}
            >
              <Text
                style={[
                  styles.navText,
                  {color:label === 'Home' ? theme.primary : theme.muted},
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={[styles.hero,{marginHorizontal:desktop ? 36 : 14}]}>
          <LinearGradient
            colors={current.colors as [string,string]}
            style={StyleSheet.absoluteFillObject}
            start={{x:0,y:0}}
            end={{x:1,y:1}}
          />
          <Image
            source={{uri:current.image}}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />

          <Pressable
            style={[styles.carouselArrow,styles.leftArrow]}
            onPress={() => setSlide((slide - 1 + slides.length) % slides.length)}
          >
            <Ionicons name="chevron-back" size={22} color="#111426" />
          </Pressable>

          <View style={styles.heroContent}>
            <Text style={styles.heroEyebrow}>{current.eyebrow}</Text>
            <Text style={styles.heroTitle}>{current.title}</Text>
            <Text style={[styles.heroTitle,{color:'#FFD84D',marginTop:-8}]}>
              {current.accent}
            </Text>
            <Text style={styles.heroCopy}>{current.copy}</Text>
            <Pressable
              style={styles.heroButton}
              onPress={() => goCategory(current.category)}
            >
              <Text style={styles.heroButtonText}>{current.button}</Text>
              <Ionicons name="arrow-forward" size={17} color="#111426" />
            </Pressable>
          </View>

          <View style={styles.slideDots}>
            {slides.map((_,index) => (
              <Pressable
                key={index}
                onPress={() => setSlide(index)}
                style={[
                  styles.dot,
                  index === slide && styles.dotActive,
                ]}
              />
            ))}
          </View>

          <Pressable
            style={[styles.carouselArrow,styles.rightArrow]}
            onPress={() => setSlide((slide + 1) % slides.length)}
          >
            <Ionicons name="chevron-forward" size={22} color="#111426" />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map(([label,icon]) => (
            <Pressable
              key={label}
              style={styles.categoryItem}
              onPress={() => goCategory(label === 'Female Bags' ? 'Female Bags' : label)}
            >
              <View style={[styles.categoryCircle,{backgroundColor:theme.surface,borderColor:theme.border}]}>
                <Ionicons name={icon as any} size={24} color={theme.primary} />
              </View>
              <Text style={[styles.categoryLabel,{color:theme.text}]}>{label}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.categoryItem} onPress={() => goCategory('All')}>
            <View style={[styles.categoryCircle,{backgroundColor:theme.surface,borderColor:theme.border}]}>
              <Ionicons name="ellipsis-horizontal" size={24} color={theme.primary2} />
            </View>
            <Text style={[styles.categoryLabel,{color:theme.text}]}>More</Text>
          </Pressable>
        </ScrollView>

        <View style={[styles.perks,{backgroundColor:theme.surface,borderColor:theme.border}]}>
          {[
            ['car-outline','Free Shipping','On orders over $100'],
            ['card-outline','Secure Payment','100% secure checkout'],
            ['diamond-outline','Premium Quality','Genuine top quality'],
            ['headset-outline','24/7 Support',"We're here to help"],
            ['refresh-circle-outline','Easy Returns','30-day return policy'],
          ].map(([icon,title,copy]) => (
            <View style={styles.perk} key={title}>
              <Ionicons name={icon as any} size={26} color={theme.primary} />
              <View style={styles.perkCopy}>
                <Text style={[styles.perkTitle,{color:theme.text}]}>{title}</Text>
                <Text style={[styles.perkText,{color:theme.muted}]}>{copy}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.promoGrid}>
          {[
            ['MEGA SALE','Up to 50% OFF','On selected items','#8B5CF6','#EC4899'],
            ['NEW ARRIVALS','Fresh styles','Just dropped','#EC4899','#F97316'],
            ['KIDS COLLECTION','Stylish & Fun','For little ones','#2563EB','#8B5CF6'],
            ['LAPTOPS & MORE','Power up','Your productivity','#16A34A','#84CC16'],
          ].map(([eyebrow,title,copy,c1,c2]) => (
            <LinearGradient
              key={title}
              colors={[c1,c2] as [string,string]}
              style={styles.promo}
              start={{x:0,y:0}}
              end={{x:1,y:1}}
            >
              <Text style={styles.promoEyebrow}>{eyebrow}</Text>
              <Text style={styles.promoTitle}>{title}</Text>
              <Text style={styles.promoCopy}>{copy}</Text>
              <Pressable style={styles.promoButton} onPress={() => goCategory('All')}>
                <Text style={styles.promoButtonText}>Shop Now</Text>
              </Pressable>
            </LinearGradient>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle,{color:theme.text}]}>🔥 Trending Now</Text>
            <Text style={[styles.sectionSub,{color:theme.muted}]}>
              Customer favourites this week
            </Text>
          </View>
          <Pressable onPress={() => goCategory('All')}>
            <Text style={[styles.viewAll,{color:theme.primary}]}>View All →</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsRow}
        >
          {products.slice(0,10).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              theme={theme}
              wished={wishlist.includes(product.id)}
              onWish={() => toggleWishlist(product.id)}
            />
          ))}
        </ScrollView>

        <View style={[styles.bottomBanner,{backgroundColor:theme.text}]}>
          <View style={{flex:1}}>
            <Text style={styles.bottomEyebrow}>ALEX OBI MEMBERS</Text>
            <Text style={styles.bottomTitle}>Get 15% off your first order.</Text>
            <Text style={styles.bottomCopy}>
              New arrivals, exclusive deals and premium essentials delivered to you.
            </Text>
          </View>
          <Pressable
            style={[styles.bottomButton,{backgroundColor:theme.surface}]}
            onPress={() => goCategory('All')}
          >
            <Text style={[styles.bottomButtonText,{color:theme.text}]}>Explore Shop</Text>
          </Pressable>
        </View>

        <View style={{height:30}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page:{flex:1},
  scroll:{paddingBottom:20},
  announcement:{
    minHeight:32,
    paddingHorizontal:18,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    gap:12,
  },
  announcementItem:{flexDirection:'row',alignItems:'center',gap:5},
  announcementText:{color:'#FFFFFF',fontSize:10,fontWeight:'800'},
  header:{
    minHeight:82,
    paddingHorizontal:20,
    paddingVertical:14,
    flexDirection:'row',
    alignItems:'center',
    gap:18,
    borderBottomWidth:1,
  },
  brand:{minWidth:170},
  logo:{fontSize:27,fontWeight:'900',letterSpacing:-1.8},
  tagline:{fontSize:7,fontWeight:'900',letterSpacing:2,marginTop:1},
  searchBox:{
    flex:1,
    height:48,
    borderWidth:1,
    borderColor:'#E5E7EB',
    borderRadius:16,
    paddingHorizontal:15,
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    maxWidth:720,
  },
  searchText:{fontSize:12,fontWeight:'600'},
  headerActions:{flexDirection:'row',alignItems:'center',gap:8},
  headerIcon:{
    width:44,height:44,borderRadius:14,
    alignItems:'center',justifyContent:'center',
    position:'relative',
  },
  notificationDot:{
    position:'absolute',right:0,top:-2,
    width:16,height:16,borderRadius:8,
    alignItems:'center',justifyContent:'center',
  },
  notificationText:{color:'#FFFFFF',fontSize:8,fontWeight:'900'},
  cartHeader:{
    width:46,height:46,borderRadius:14,
    alignItems:'center',justifyContent:'center',
    position:'relative',
  },
  cartBadge:{
    position:'absolute',right:-4,top:-4,
    minWidth:18,height:18,borderRadius:9,
    alignItems:'center',justifyContent:'center',
  },
  cartBadgeText:{color:'#FFFFFF',fontSize:9,fontWeight:'900'},
  nav:{
    paddingHorizontal:18,
    minHeight:48,
    alignItems:'center',
    borderBottomWidth:1,
    gap:24,
  },
  navItem:{paddingVertical:14},
  navText:{fontSize:12,fontWeight:'800'},
  hero:{
    minHeight:430,
    marginTop:16,
    borderRadius:26,
    overflow:'hidden',
    position:'relative',
    justifyContent:'center',
  },
  heroImage:{
    ...StyleSheet.absoluteFillObject,
    width:'100%',
    height:'100%',
    opacity:.42,
  },
  heroOverlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'rgba(8,10,18,.20)',
  },
  heroContent:{
    paddingHorizontal:34,
    maxWidth:650,
    zIndex:3,
  },
  heroEyebrow:{
    color:'#FFFFFF',
    fontSize:11,
    fontWeight:'900',
    letterSpacing:1.5,
    marginBottom:9,
  },
  heroTitle:{
    color:'#FFFFFF',
    fontSize:44,
    lineHeight:47,
    fontWeight:'900',
    letterSpacing:-2,
  },
  heroCopy:{
    color:'#FFFFFF',
    fontSize:15,
    lineHeight:22,
    maxWidth:460,
    marginTop:10,
    fontWeight:'600',
  },
  heroButton:{
    marginTop:20,
    alignSelf:'flex-start',
    paddingHorizontal:19,
    paddingVertical:13,
    borderRadius:13,
    backgroundColor:'#FFFFFF',
    flexDirection:'row',
    alignItems:'center',
    gap:8,
  },
  heroButtonText:{color:'#111426',fontSize:13,fontWeight:'900'},
  carouselArrow:{
    position:'absolute',
    zIndex:5,
    top:'45%',
    width:42,height:42,borderRadius:21,
    backgroundColor:'rgba(255,255,255,.88)',
    alignItems:'center',justifyContent:'center',
  },
  leftArrow:{left:12},
  rightArrow:{right:12},
  slideDots:{
    position:'absolute',
    bottom:18,
    left:0,
    right:0,
    flexDirection:'row',
    justifyContent:'center',
    gap:7,
    zIndex:5,
  },
  dot:{width:8,height:8,borderRadius:4,backgroundColor:'rgba(255,255,255,.5)'},
  dotActive:{width:28,backgroundColor:'#FFFFFF'},
  categories:{
    paddingHorizontal:18,
    paddingVertical:20,
    gap:15,
  },
  categoryItem:{width:80,alignItems:'center'},
  categoryCircle:{
    width:64,height:64,borderRadius:32,
    alignItems:'center',justifyContent:'center',
    borderWidth:1,
  },
  categoryLabel:{
    fontSize:9,
    fontWeight:'800',
    marginTop:7,
    textAlign:'center',
  },
  perks:{
    marginHorizontal:18,
    borderWidth:1,
    borderRadius:20,
    padding:16,
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
    gap:12,
  },
  perk:{
    flexDirection:'row',
    alignItems:'center',
    gap:9,
    flex:1,
    minWidth:150,
  },
  perkCopy:{flex:1},
  perkTitle:{fontSize:12,fontWeight:'900'},
  perkText:{fontSize:9,marginTop:2,fontWeight:'600'},
  promoGrid:{
    padding:18,
    flexDirection:'row',
    flexWrap:'wrap',
    gap:12,
  },
  promo:{
    flex:1,
    minWidth:230,
    minHeight:145,
    borderRadius:20,
    padding:18,
    overflow:'hidden',
  },
  promoEyebrow:{color:'rgba(255,255,255,.82)',fontSize:9,fontWeight:'900',letterSpacing:1},
  promoTitle:{color:'#FFFFFF',fontSize:22,fontWeight:'900',marginTop:6},
  promoCopy:{color:'rgba(255,255,255,.9)',fontSize:12,fontWeight:'700',marginTop:1},
  promoButton:{
    alignSelf:'flex-start',
    marginTop:13,
    backgroundColor:'#FFFFFF',
    borderRadius:10,
    paddingHorizontal:13,
    paddingVertical:8,
  },
  promoButtonText:{fontSize:10,fontWeight:'900',color:'#111426'},
  sectionHeader:{
    paddingHorizontal:20,
    paddingTop:5,
    paddingBottom:14,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end',
  },
  sectionTitle:{fontSize:24,fontWeight:'900',letterSpacing:-.8},
  sectionSub:{fontSize:11,marginTop:3,fontWeight:'600'},
  viewAll:{fontSize:11,fontWeight:'900'},
  productsRow:{paddingHorizontal:18,gap:12},
  productCard:{
    width:205,
    borderRadius:18,
    borderWidth:1,
    padding:9,
  },
  productImageWrap:{
    height:205,
    borderRadius:13,
    overflow:'hidden',
    position:'relative',
  },
  productImage:{width:'100%',height:'100%'},
  discount:{
    position:'absolute',
    top:8,left:8,
    paddingHorizontal:7,
    paddingVertical:5,
    borderRadius:7,
  },
  discountText:{color:'#FFFFFF',fontSize:8,fontWeight:'900'},
  wishButton:{
    position:'absolute',
    top:8,right:8,
    width:32,height:32,
    borderRadius:16,
    alignItems:'center',justifyContent:'center',
    opacity:.94,
  },
  productCategory:{
    marginTop:10,
    fontSize:8,
    fontWeight:'900',
    letterSpacing:.8,
    textTransform:'uppercase',
  },
  productName:{
    marginTop:4,
    fontSize:13,
    lineHeight:17,
    fontWeight:'800',
    minHeight:34,
  },
  ratingRow:{flexDirection:'row',alignItems:'center',gap:4,marginTop:6},
  rating:{fontSize:10,fontWeight:'900'},
  reviews:{fontSize:9},
  priceRow:{flexDirection:'row',alignItems:'center',gap:7,marginTop:5},
  price:{fontSize:16,fontWeight:'900'},
  oldPrice:{fontSize:10,textDecorationLine:'line-through'},
  bottomBanner:{
    marginHorizontal:18,
    borderRadius:24,
    padding:24,
    flexDirection:'row',
    alignItems:'center',
    gap:20,
  },
  bottomEyebrow:{color:'#A5B4FC',fontSize:9,fontWeight:'900',letterSpacing:1.5},
  bottomTitle:{color:'#FFFFFF',fontSize:24,fontWeight:'900',marginTop:5},
  bottomCopy:{color:'#D9D6FF',fontSize:12,lineHeight:18,marginTop:5,maxWidth:600},
  bottomButton:{
    borderRadius:13,
    paddingHorizontal:18,
    paddingVertical:13,
  },
  bottomButtonText:{fontSize:11,fontWeight:'900'},
});
