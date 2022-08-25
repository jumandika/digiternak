import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView, FlatList } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { defaultStyles } from '../../styles/defaultStyles';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import fontStyle from '../../styles/font.style';
import { deleteAddress, getAddress, selectAddress } from '../../service/Apis';
import { getLocalObject, setLocalObject } from '../../utils/asyncStorage';
import { Spinner } from '../../components/Spinner';
import { AddressCard } from '../../components/AddressCard';
import { HeaderNavbar } from '../../components/HeaderNavbar';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const AddressScreen = ({ navigation }) => {


    const dispatch = useDispatch()

    const [addressList, setAddressList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSelectLoading, setIsSelectLoading] = useState(false);

    useEffect(() => {
        // getAddressList()
        const unsubscribe = navigation.addListener('focus', () => {
            getAddressList()
        });
        return unsubscribe
    }, [])

    const gotoMap = () => {
        navigation.navigate('MapScreen')
    }

    const getUserData = async () => {
        let userData = await getLocalObject('userData');
        console.log('response userData', userData);
        return userData
    }

    const getAddressList = async () => {
        const userData = await getUserData()
        const response = await getAddress(userData.id);
        if (response.status == true) {
            setAddressList(response.data)
            if (response.data.length > 0) {
                setLocalObject('selectedAddress', response.data[0])
            }
            dispatch({
                type: 'SET_SELECTED_ADDRESS',
                selectedAddress: response.data[0],
                indexSelectedAddress: 0
            })
        } else {
            setAddressList([])
        }
        setIsLoading(false)
        setIsSelectLoading(false)

        console.log('response ADDRESS', response)
    }

    const doDeleteAddress = async (id) => {
        setIsLoading(true)
        const userData = await getUserData()
        let body = {
            "users_id": userData.id,
            "address_id": id.toString()
        }
        const response = await deleteAddress(body);
        if (response.status == true) {
            getAddressList()
        } else {
            setIsLoading(false)
            setIsSelectLoading(false)
        }

        console.log('response ADDRESS', response)
    }

    const doSelectAddress = async (id) => {
        setIsSelectLoading(true)
        const userData = await getUserData()
        let body = {
            "users_id": userData.id,
            "address_id": id.toString()
        }
        const response = await selectAddress(body);
        if (response.status == true) {
            getAddressList()
        } else {
            setIsSelectLoading(false)
        }
        // console.log('response SELECT', response)

    }

    const renderItem = ({ item, index }) => {
        return (
            <AddressCard
                index={index}
                item={item}
                isSelectLoading={isSelectLoading}
                onSelect={() => doSelectAddress(item.id)}
                onDelete={() => doDeleteAddress(item.id)}
            />
        )
    }

    return (
        <View
            style={[styles.container, { backgroundColor: '#FAFAFA', }]}
        >
            <HeaderNavbar navigation={navigation} title={`Alamat Pengiriman`} />
            {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Spinner color={themeStyle.PRIMARY_COLOR} size={40} />
                </View>
                :
                <FlatList
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 40, }}
                    renderItem={renderItem}
                    data={addressList}
                    keyExtractor={(item) => { return item.id }}
                    ListEmptyComponent={<Text style={[defaultStyles.baseText, { alignSelf: 'center', fontSize: 16, paddingBottom: 6 }]}>Tidak ada Alamat </Text>}
                />

            }
            <Button
                onPress={gotoMap}
                type='secondary'
                style={{ height: 40, borderRadius: 4, margin: 10, marginBottom: 10 }}
                fontStyle={{ fontSize: 16, fontFamily: fontStyle.NunitoSansBold }}
                label={'Tambah Alamat'}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export { AddressScreen };

