import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Text, Image, ToastAndroid } from "react-native";
import { StackActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/Button';
import { Screen } from '../../components/Screen';
import { Spinner } from '../../components/Spinner';
import { TextField } from '../../components/TextField';
import { verifyOTP } from '../../service/Apis';
import { defaultStyles } from '../../styles/defaultStyles';
import themeStyle from '../../styles/theme.style';
import { setLocalObject, setLocalString } from '../../utils/asyncStorage';
import helpers from '../../utils/helper';
import { decrypt } from '../../utils/crypto';

const OTPScreen = (props) => {
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setText1(props.route.params.otp.charAt(0))
            setText2(props.route.params.otp.charAt(1))
            setText3(props.route.params.otp.charAt(2))
            setText4(props.route.params.otp.charAt(3))
        }, 1000);
    }, [])

    useEffect(() => {
        if (text1 && text2 && text3 && text4) {
            submitOTP();
        }
    }, [
        text1, text2, text3, text4
    ])


    const onChangeText1 = (val) => {
        setText1(val);
        if (val) inputRef2.current && inputRef2.current.focus();
    }
    const onChangeText2 = (val) => {
        setText2(val);
        if (val) inputRef3.current && inputRef3.current.focus();
    }
    const onChangeText3 = (val) => {
        setText3(val);
        if (val) inputRef4.current && inputRef4.current.focus();
    }
    const onChangeText4 = (val) => {
        setText4(val);
    }

    const submitOTP = async () => {
        setIsLoading(true);

        let body = {
            users_id: props.route.params.userID,
            OTP: text1 + text2 + text3 + text4
        }
        console.log('body OTP', body);
        const response = await verifyOTP(body);
        console.log('response OTP', response);
        if (response.status === true) {
            setIsLoading(false);
            setLocalString('pageInit', 'HomeScreen')
            let userData = decrypt(response.data.data, response.data.key)
            // console.log('decrypt', userData);
            setLocalObject('userData', userData);
            props.navigation.reset({
                index: 0,
                routes: [{
                    name: 'HomeScreen'
                }]
            })
        } else {
            setIsLoading(false);
            ToastAndroid.show(response.message, ToastAndroid.BOTTOM)
        }

    }

    return (
        <Screen
            type={'fixed'}
            style={{ padding: 20 }}
        >
            <View style={[defaultStyles.container, {}]}>
                <Text style={[defaultStyles.baseTextBold, { fontSize: 38, paddingTop: 40 }]}>
                    Konfirmasi OTP
                </Text>
                <Text style={[defaultStyles.baseText, {}]}>
                    Kami mengirimkan kode OTP ke nomor
                </Text>
                <Text style={[defaultStyles.baseText, { fontSize: 20 }]}>
                    XXX-XXX
                </Text>
                <View style={{ justifyContent: 'space-evenly', paddingTop: 40, flexDirection: 'row', }} >
                    <TextField
                        onChangeText={onChangeText1}
                        value={text1}
                        placeholder={'-'}
                        keyboardType='numeric'
                        textType='otp'
                        maxLength={1}
                        inputRef={inputRef1}
                        style={{ width: "20%" }}
                        textStyle={{ flex: 1, textAlign: 'center', fontSize: 28, padding: 0, paddingHorizontal: 10, paddingVertical: 8 }}

                    />
                    <TextField
                        onChangeText={onChangeText2}
                        value={text2}
                        placeholder={'-'}
                        keyboardType='numeric'
                        textType='otp'
                        maxLength={1}
                        inputRef={inputRef2}
                        style={{ width: "20%" }}
                        textStyle={{ flex: 1, textAlign: 'center', fontSize: 28, padding: 0, paddingHorizontal: 10, paddingVertical: 8 }}

                    />
                    <TextField
                        onChangeText={onChangeText3}
                        value={text3}
                        placeholder={'-'}
                        keyboardType='numeric'
                        textType='otp'
                        maxLength={1}
                        inputRef={inputRef3}
                        style={{ width: "20%" }}
                        textStyle={{ flex: 1, textAlign: 'center', fontSize: 28, padding: 0, paddingHorizontal: 10, paddingVertical: 8 }}

                    />
                    <TextField
                        onChangeText={onChangeText4}
                        value={text4}
                        placeholder={'-'}
                        keyboardType='numeric'
                        textType='otp'
                        maxLength={1}
                        inputRef={inputRef4}
                        style={{ width: "20%" }}
                        textStyle={{ flex: 1, textAlign: 'center', fontSize: 28, padding: 0, paddingHorizontal: 10, paddingVertical: 8 }}

                    />
                </View>
                <View style={[{ alignSelf: 'center', flexDirection: 'row', paddingTop: 20 }]}>
                    <Text style={[defaultStyles.baseText, {}]}>
                        Tidak menerima kode?
                    </Text>
                    <Text style={[defaultStyles.baseText, { paddingLeft: 10, color: themeStyle.PRIMARY_COLOR, }]}>
                        Kirim Ulang
                    </Text>
                </View>
                <View style={{ paddingTop: 40 }} >
                    <Button
                        onPress={submitOTP}
                        label="Konfirmasi"
                    >
                        {isLoading && <Spinner />}
                    </Button>
                </View>

            </View>

        </Screen>
    )


}

export { OTPScreen } 