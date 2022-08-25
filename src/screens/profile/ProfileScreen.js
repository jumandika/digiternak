import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { defaultStyles } from '../../styles/defaultStyles';
import { HeaderNavbar } from '../../components/HeaderNavbar';
import { getLocalObject } from '../../utils/asyncStorage';
import { getUserDetail } from '../../service/Apis';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ProfileScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserData()
        });
        return unsubscribe
    }, [])

    const getUserData = async () => {
        let userData = await getLocalObject('userData');
        let response = await getUserDetail(userData.id)
        console.log('response userData', response);
        // setUserData(userData);
        return userData
    }

    return (
        <View
            style={[styles.container, { backgroundColor: '#FFFFFF', }]}
        >
            <HeaderNavbar navigation={navigation} title={'Profile'} />
            {/* <StatusBar backgroundColor={themeStyle.PRIMARY_COLOR} barStyle="light-content" animated={true} translucent={true} /> */}

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ProfileScreen;