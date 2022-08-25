import React from 'react';
import { View, ActivityIndicator } from "react-native";
import themeStyle from "../styles/theme.style";


const Spinner = ({  size = 24, color = '#FFF' }) => (
    <ActivityIndicator size={size} color={color} />
)

export { Spinner }