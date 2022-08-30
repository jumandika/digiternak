import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { defaultStyles } from '../../styles/defaultStyles';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const SearchScreen = ({ navigation }) => {
    return (
        <View
            style={[styles.container, { backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }]}
        >
      {/* <StatusBar backgroundColor={themeStyle.SECONDARY_COLOR}  barStyle="light-content" animated={true} translucent={true} /> */}
            <Text style={[defaultStyles.baseTextBold, {}]} numberOfLines={1}>SEARCH</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SearchScreen;