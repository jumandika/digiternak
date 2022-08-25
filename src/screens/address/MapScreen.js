import React, { useEffect, useRef, useState, useCallback, useMemo, } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView, PermissionsAndroid, Platform, SafeAreaView, ToastAndroid } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import themeStyle from '../../styles/theme.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { defaultStyles } from '../../styles/defaultStyles';
import { Button } from '../../components/Button';
import { Spinner } from '../../components/Spinner';
import { addAddress } from '../../service/Apis';
import { getLocalObject } from '../../utils/asyncStorage';
import { TextField } from '../../components/TextField';


const MapScreen = (props) => {

    const mapRef = useRef(null);

    const [region, setRegion] = useState({
        latitude: -6.171540456619049,
        longitude: 106.82659898747386,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    })
    const [locData, setLocData] = useState({})
    const [userData, setUserData] = useState({})
    const [displayName, setDisplayName] = useState('')
    const [searchText, setSearchText] = useState('')
    const [note, setNote] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [noteData, setNoteData] = useState('')

    const [isLoadAddress, setIsLoadAddress] = useState(true);


    useEffect(() => {
        requestPermissions()
        getUserData()
    }, [])

    const getUserData = async () => {
        let userData = await getLocalObject('userData');
        setUserData(userData);
        return userData
    }

    const requestPermissions = async () => {

        var result;
        if (Platform.OS === 'android') {
            result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (result == "granted") {
                getCurrentLoc()
            }
        }
    }

    const getCurrentLoc = () => {
        // console.log("requestPermissions GRANTED")
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                // console.log("getCurrentPosition", position);

                const currentRegion = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015 * (Platform.OS === "ios" ? 0.5 : 1),
                    longitudeDelta: 0.0121 * (Platform.OS === "ios" ? 0.5 : 1),
                };

                // setRegion(currentRegion);
                setTimeout(() => {
                    if (mapRef.current) mapRef.current.animateToRegion(currentRegion, 1000);
                }, 700)
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000
            },
        );
    }

    const getAdressDetail = (lat, lng) => {
        setIsLoadAddress(true);
        Geocoder.init('AIzaSyAbqR17b0QAB8KNtGLjAyyYNkdWGlP5s4U');
        Geocoder.from(lat, lng)
            .then(response => {
                let latitude = response.results[0].geometry.location.lat
                let longitude = response.results[0].geometry.location.lng
                let locName = response.results[0].formatted_address
                let newData = {
                    latitude: latitude,
                    longitude: longitude,
                    locName: locName,
                }
                // console.log('response MAPPP', JSON.stringify(response))
                let obj = response.results[0].address_components.find(o => o.types[0] === 'postal_code');
                console.log('POSTAL CODE', obj)
                if (obj) setPostalCode(obj?.long_name ?? obj?.short_name)
                else { setPostalCode(''); ToastAndroid.showWithGravity('Titik tidak valid', ToastAndroid.LONG, ToastAndroid.CENTER) }
                // console.log('response obj', JSON.stringify(obj))
                setLocData(newData);
                setIsLoadAddress(false);
                setDisplayName(response.results[0].formatted_address);
            })
            .catch(error => console.warn(error));
    }

    const saveAddress = async () => {
        setIsLoadAddress(true);
        let body = {
            "users_id": userData.id,
            "address": displayName,
            "zipcode": postalCode.toString(),
            "note": note,
            "lat": region.latitude.toString(),
            "long": region.longitude.toString(),
        }
        const response = await addAddress(body)
        console.log('response SAVE ADDRESS', JSON.stringify(response))
        if (response.status == true) {
            props.navigation.goBack();
        } else {
            ToastAndroid.show('Titik tidak valid', ToastAndroid.CENTER)
        }
        setIsLoadAddress(false);
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={themeStyle.PRIMARY_COLOR} barStyle="light-content" translucent={true} />
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={region}
                // showsUserLocation={true}
                ref={mapRef}
                onRegionChangeComplete={(reg) => {
                    if (reg.latitude.toFixed(6) === region.latitude.toFixed(6)
                        && reg.longitude.toFixed(6) === region.longitude.toFixed(6)) {
                        return;
                    }
                    setRegion(reg);
                    getAdressDetail(reg.latitude, reg.longitude)
                }}
            >
                <Marker
                    coordinate={region}
                >
                    <MaterialCommunityIcons name='map-marker' style={{ fontSize: 50, color: themeStyle.RED_COLOR }} />
                </Marker>
            </MapView>
            <View style={{ padding: 15, elevation: 20, borderRadius: 1, backgroundColor: '#FFF' }} >
                <Text style={[defaultStyles.baseTextBold, { fontSize: 20, }]}>Alamat</Text>
                <Text style={[defaultStyles.baseText, { paddingTop: 10, }]}>{displayName}</Text>
                <TextField
                    onChangeText={(val) => setNote(val)}
                    value={note}
                    textContentType='text'
                    label={'Catatan*'}
                    placeholder={'Catatan*'}
                    keyboardType='none'
                    textType='text'
                    textStyle={styles.textStyle}
                    style={{ marginTop: 10, marginBottom: 15 }}
                />
                <Button
                    onPress={saveAddress}
                    style={{ height: 45, borderRadius: 6, }}
                    fontStyle={{ fontSize: 16, }}
                    label={'Simpan'}
                >
                    {isLoadAddress && <Spinner color={'#FFF'} />}
                </Button>
                <TouchableOpacity
                    onPress={getCurrentLoc}
                    style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: themeStyle.PRIMARY_COLOR, height: 40, width: 40, borderRadius: 15, elevation: 5, right: 20, top: -55 }}
                >
                    <MaterialIcons name='my-location' style={{ fontSize: 22, color: '#FFF' }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        flex: 3,
    },
    textStyle: {
        flex: 1, fontSize: 18, padding: 0, paddingHorizontal: 10, paddingVertical: 8,
    }

});


export { MapScreen }