import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const { user } = useContext(AuthContext);

return (
  <NavigationContainer>
    {user ? <MainApp /> : <AuthStack />}
  </NavigationContainer>
);


import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ProductDetails from "../screens/ProductDetails";
import CartScreen from "../screens/CartScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={ProductDetails} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}