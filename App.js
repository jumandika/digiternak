/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, ActivityIndicator, Animated, Easing } from 'react-native';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { AuthContext } from './components/context';
import { Provider, connect } from 'react-redux';
import { store } from './src/redux';
import { enableScreens } from 'react-native-screens';
import RootStackScreen from './src/screens/RootStackScreen';
import { getLocalString, setLocalString } from './src/utils/asyncStorage'


enableScreens(true);
const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [pageInit, setPageInit] = useState('OnboardingScreen')

  useEffect(() => {
    getPageInit()

  }, [])

  const getPageInit = async () => {
    let x = await getLocalString('pageInit');
    // console.log('x',x)
    if (x == undefined) setLocalString('pageInit', 'LoginScreen');
    else setPageInit(x);
    setIsLoading(false);
  }

  return (
    <Provider store={store} >
      <NavigationContainer>
        {!isLoading &&
          <RootStackScreen initialRouteName={pageInit} />
        }
      </NavigationContainer>
    </Provider>
  );
};

export default App;
