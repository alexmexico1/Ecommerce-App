// @ts-nocheck
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../../context/ShopContext';

export default function TabLayout() {
  const { theme, cartCount } = useShop();

  return (
    <Tabs
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:theme.primary,
        tabBarInactiveTintColor:theme.muted,
        tabBarStyle:{
          height:76,
          paddingTop:8,
          paddingBottom:10,
          borderTopWidth:1,
          borderTopColor:theme.border,
          backgroundColor:theme.surface,
        },
        tabBarLabelStyle:{
          fontSize:11,
          fontWeight:'800',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title:'Home',
          tabBarIcon:({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title:'Shop',
          tabBarIcon:({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title:'Cart',
          tabBarBadge:cartCount || undefined,
          tabBarBadgeStyle:{
            backgroundColor:theme.danger,
            color:'#171321',
            fontSize:9,
          },
          tabBarIcon:({ color, size }) => (
            <Ionicons name="bag-handle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
