
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from './home/HomeScreen';
import themeStyle from '../styles/theme.style';
import fontStyle from '../styles/font.style';
import SearchScreen from './search/SearchScreen';
import TransactionScreen from './transaction/TransactionScreen';
import ProfileScreen from './profile/ProfileScreen';
import CartScreen from './transaction/CartScreen';
import { CartButton } from '../components/CartButton';
const Tab = createBottomTabNavigator();


const BottomTabs = () => {
    // console.log('cartLength', cartLength)

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                tabBarActiveTintColor: themeStyle.PRIMARY_COLOR,
                tabBarInactiveTintColor: themeStyle.GREY,
                tabBarLabelStyle: { fontFamily: fontStyle.NunitoSansMedium, fontSize: 14, }
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="shopping-bag" color={'#FFF'} size={22} style={{ top: 8 }} />
                    ),
                    tabBarButton: (props) => (
                        <CartButton {...props} />
                    ),
                    // tabBarBadge: cartLength == 0 ? null : cartLength,
                }}
            />
            <Tab.Screen
                name="TransactionScreen"
                component={TransactionScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Pesanan',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="reorder-four" color={color} size={size} />
                    ),

                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export { BottomTabs }