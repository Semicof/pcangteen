import React, { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, AppState } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  QueryClientProvider,
  onlineManager,
  QueryClient,
  focusManager,
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

import BottomTabNavigation from "./Navigation/BottomTabNavigation";

import {
  Cart,
  LoginScreen,
  NewRivals,
  ProductDetail,
  Signup,
  WelcomeScreen,
  Settings,
  EditProfile,
  Checkout,
  Order,
} from "./Screens";
import CartProvider from "./Components/Contexts/CartContext";
import AuthProvider from "./Components/Contexts/AuthContext";
// import { queryClient } from "./Queries";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
    mutations: {
      onError(error, variables, context) {},
      retry: 1,
    },
  },
});

const Stack = createNativeStackNavigator();

export function useAppState(onChange) {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onChange);
    return () => {
      subscription.remove();
    };
  }, [onChange]);
}

export function useOnlineManager() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      return NetInfo.addEventListener((state) => {
        onlineManager.setOnline(
          state.isConnected != null &&
            state.isConnected &&
            Boolean(state.isInternetReachable)
        );
      });
    }
  }, []);
}

function onAppStateChange(status) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function App() {
  useOnlineManager();

  useAppState(onAppStateChange);

  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Bottom Navigation"
                component={BottomTabNavigation}
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>

              <Stack.Screen
                name="ProductDetails"
                component={ProductDetail}
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="ProductList"
                component={NewRivals}
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Setting"
                component={Settings}
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  headerShown: false,
                  navigationBarHidden: false,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{
                  headerShown: false,
                  navigationBarHidden: false,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Order"
                component={Order}
                options={{
                  headerShown: false,
                  navigationBarHidden: false,
                }}
              ></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontFamily: "extraBold",
    fontSize: 20,
  },
});
