import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, ToastAndroid, StatusBar } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/Button';
import { Screen } from '../../components/Screen';
import { Spinner } from '../../components/Spinner';
import { TextField } from '../../components/TextField';
import { phoneLogin } from '../../service/Apis';
import RNBootSplash from "react-native-bootsplash";
import { defaultStyles } from '../../styles/defaultStyles';
import themeStyle from '../../styles/theme.style';
import helpers from '../../utils/helper';

const LoginScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');


    useEffect(() => {
        RNBootSplash.hide();
    }, []);

    const submitLogin = async () => {
        if (!phoneNumber) return;
        setIsLoading(true);
        let bodyLogin = {
            "phone": phoneNumber.replace(/^0+/, ''),
        }
        const responseLogin = await phoneLogin(bodyLogin);
        console.log('responseLogin', responseLogin)
        if (responseLogin.status == true) {
            setIsLoading(false);
            props.navigation.navigate('OTPScreen', { userID: responseLogin.data.users_id, otp: responseLogin.data.tokens });
        } else {
            setIsLoading(false);
            ToastAndroid.show(responseLogin.message, ToastAndroid.BOTTOM)
        }
    }

    return (
        <Screen
            type={'fixed'}
            style={{ padding: 20 }}
        >
            <StatusBar backgroundColor='rgba(0,0,0,0.5)' barStyle="light-content" translucent={true} />

            <View style={[defaultStyles.container, {}]}>
                <Text style={[defaultStyles.baseTextBold, { fontSize: 38, paddingTop: 40 }]}>
                    Masuk
                </Text>
                <Text style={[defaultStyles.baseText, {}]}>
                    Masuk dengan menggunakan nomor handphone
                </Text>
                <View style={{ paddingTop: 40 }} >
                    <Text style={[defaultStyles.baseText, { paddingTop: 10 }]}>
                        Kami akan mengirimkan kode verifikasi ke nomor handphone
                    </Text>
                    {/* <TextField
                        onChangeText={onChangeText}
                        value={phoneNumber}
                        label={'Nomor Handphone'}
                        placeholder={'Nomor Handphone'}
                        keyboardType='numeric'
                        textType='phoneNumber'
                        maxLength={13}
                        textStyle={{ flex: 1, fontSize: 18, padding: 0, paddingHorizontal: 10, paddingVertical: 8 }}
                    /> */}
                    <TextField
                        onChangeText={(val) => setPhoneNumber(val)}
                        value={phoneNumber}
                        label={'Nomor Handphone'}
                        placeholder={'Nomor Handphone'}
                        keyboardType='numeric'
                        textType='phoneNumber'
                        maxLength={13}
                        textStyle={{
                            flex: 1, fontSize: 18, padding: 0, paddingHorizontal: 10, paddingVertical: 8,
                        }}
                    />
                </View>
                <View style={{ paddingTop: 40 }} >
                    <Button
                        onPress={submitLogin}
                        label="Masuk" >
                        {isLoading && <Spinner />}
                    </Button>
                </View>

                <View style={[{ flexDirection: 'row', justifyContent: "center", paddingTop: 20 }]}>
                    <Text style={[defaultStyles.baseText, { padding: 5 }]}>
                        Belum punya Akun?
                    </Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('RegistrationScreen')}
                    >
                        <Text style={[defaultStyles.baseText, { padding: 5, color: themeStyle.PRIMARY_COLOR, }]}>
                            Registrasi di sini
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[{ flexDirection: 'row', justifyContent: "center" }]}>
                <Text style={[defaultStyles.baseText, { padding: 5 }]}>
                    Login Sebagai Anggota?
                </Text>
                <Text style={[defaultStyles.baseText, { padding: 5, color: themeStyle.PRIMARY_COLOR, }]}>
                    Login di sini
                </Text>
            </View>
        </Screen>
    )


}

export { LoginScreen } 