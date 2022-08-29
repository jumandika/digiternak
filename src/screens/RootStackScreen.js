import React from "react";
import { connect } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "./onboarding/OnboardingScreen";
import HomeScreen from "./home/HomeScreen";
import { LoginScreen } from "./auth/LoginScreen";
import { LupaScreen } from "./auth/LupaScreen";
import { RegistrationScreen } from "./auth/RegistrationScreen";
import { RoleScreen } from "./auth/RoleScreen";
import { OTPScreen } from "./auth/OTPScreen";
import { BottomTabs } from "./BottomTabs";
import { DetailProduct } from "./product/DetailProduct";
import { CheckoutScreen } from "./transaction/CheckoutScreen";
import { AddressScreen } from "./address/AddressScreen";
import { MapScreen } from "./address/MapScreen";
import { VoucherScreen } from "./voucher/VoucherScreen";
import { ProductPerCatScreen } from "./product/ProductPerCatScreen";
import { TransactionDetailScreen } from "./transaction/TransactionDetailScreen";

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ navigation, initialRouteName }) => {
  return (
    <RootStack.Navigator headerMode="none" initialRouteName={initialRouteName}>
      <RootStack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="HomeScreen"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="RoleScreen"
        component={RoleScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="LupaScreen"
        component={LupaScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="DetailProduct"
        component={DetailProduct}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="TransactionDetailScreen"
        component={TransactionDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="VoucherScreen"
        component={VoucherScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="ProductPerCatScreen"
        component={ProductPerCatScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default React.memo(RootStackScreen);
