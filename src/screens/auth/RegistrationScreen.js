import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, ToastAndroid, FlatList } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/Button';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField';
import { defaultStyles } from '../../styles/defaultStyles';
import themeStyle from '../../styles/theme.style';
import DatePicker from 'react-native-modern-datepicker';
import helpers from '../../utils/helper';
import fontStyle from '../../styles/font.style';
import { CustomModal } from '../../components/CustomModal';
import { generalRegistration, getCompany, getUser, phoneLogin, staffRegistration } from '../../service/Apis';
import { Spinner } from '../../components/Spinner';

const datePickerOption = {
    backgroundColor: themeStyle.BLACK,
    textHeaderColor: "#FFF",
    textDefaultColor: "#EEE",
    selectedTextColor: themeStyle.BLACK,
    mainColor: '#FFF',
    textSecondaryColor: themeStyle.YELLOW_COLOR,
    borderColor: '#AAA',
    defaultFont: fontStyle.NunitoSansSemiBold,
    daysAnimationDistance: 10,
    textFontSize: 18,
    headerFont: fontStyle.NunitoSansRegular,
    textHeaderFontSize: 26,
}

const RegistrationScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [nip, setNip] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [modalDob, setModalDob] = useState('');
    const [base64, setBase64] = useState('');
    const [companyList1, setCompanyList1] = useState([]);
    const [companyList2, setCompanyList2] = useState([]);
    const [companyList3, setCompanyList3] = useState([]);
    const [selectedCompany1, setSelectedCompany1] = useState({ name: 'Pilih Perusahaan' });
    const [selectedCompany2, setSelectedCompany2] = useState({ name: 'Pilih Anak Perusahaan' });
    const [selectedCompany3, setSelectedCompany3] = useState({ name: 'Pilih Sub Anak Perusahaan' });
    const [expandSelect1, setExpandSelect1] = useState(false);
    const [expandSelect2, setExpandSelect2] = useState(false);
    const [expandSelect3, setExpandSelect3] = useState(false);

    const prevScreen = props.route?.params?.prevScreen;

    const nipRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneNumberRef = useRef(null);

    useEffect(() => {
        fetchCompanyList(1)
    }, [])

    const onSelectedChange = (date) => {
        setModalDob(false)
        setDob(date)
        console.log(date)
    }

    const options = {
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: true,
        maxWidth: 500,
        maxHeight: 500,
    }

    const openGallery = async () => {
        const result = await launchImageLibrary(options);
        // console.log(JSON.stringify(result));
        setBase64(result.assets[0].base64);

    }

    const fetchCompanyList = async (no, id = '') => {
        const response = await getCompany(no, id)
        if (response.status === true) {
            setCompanyList1(response.data)
        } else {

        }
    }


    const submitRegistration = async () => {
        setIsLoading(true);

        if (!phoneNumber || !email || !name || !dob) {
            console.log(!phoneNumber, !email, !name, !dob)
            setIsLoading(false);
            return
        };

        // let body = {
        //     "phone": phoneNumber.replace(/^0+/, ''),
        //     "email": email,
        //     "fname": firstName,
        //     "lname": lastName,
        //     "date": helpers.dateToYYYYMMdd(dob),
        //     "referal": null
        // }
        let bodyLogin = {
            "phone": phoneNumber.replace(/^0+/, ''),
        }
        let response = await generalRegistration(body);
        console.log('RESPONSE LAST', JSON.stringify(response));
        if (response.status == true) {
            const responseLogin = await phoneLogin(bodyLogin);
            console.log('RESPONSE LOGINN', JSON.stringify(responseLogin));
            if (responseLogin.status == true) {
                setIsLoading(false);
                props.navigation.navigate('OTPScreen', { userID: responseLogin.data.users_id, otp: responseLogin.data.tokens });
            } else {
                setIsLoading(false);
                ToastAndroid.show(response.message, ToastAndroid.BOTTOM)
            }
        } else {
            ToastAndroid.show(response.message, ToastAndroid.BOTTOM)
            setIsLoading(false);
        }

    }

    const submitRegistrationStaff = async () => {
        setIsLoading(true);

        if (
            !nip ||
            !selectedCompany1.id ||
            !selectedCompany2.id ||
            !selectedCompany3.id ||
           !name||
            !email ||
            !phoneNumber ||
            !dob ||
            !base64
        ) {
            setIsLoading(false);
            return
        };

        let body = {
            "nip": nip.toString(),
            "companys1_id": selectedCompany1.id.toString(),
            "companys2_id": selectedCompany2.id.toString(),
            "companys3_id": selectedCompany3.id.toString(),
            // "fname": firstName,
            // "lname": lastName,
            "phone": phoneNumber.replace(/^0+/, ''),
            "email": email,
            "date": helpers.dateToYYYYMMdd(dob),
            "picture": base64,
            "referal": 'null'
        }
        let bodyLogin = {
            "phone": phoneNumber.replace(/^0+/, ''),
        }
        let response = await staffRegistration(body);
        // console.log('RESPONSE LAST REGIST STAFF', JSON.stringify(response));
        if (response.status == true) {
            const responseLogin = await phoneLogin(bodyLogin);
            // console.log('RESPONSE LOGINN', JSON.stringify(responseLogin));
            if (responseLogin.status == true) {
                setIsLoading(false);
                props.navigation.navigate('OTPScreen', { userID: responseLogin.data.users_id, otp: responseLogin.data.tokens });
            } else {
                setIsLoading(false);
                ToastAndroid.show(response.message, ToastAndroid.BOTTOM)
            }
        } else {
            ToastAndroid.show(response.message, ToastAndroid.BOTTOM)
            setIsLoading(false);
        }

    }


    const submitSelectCompany1 = async (item) => {
        setExpandSelect1(!expandSelect1);
        setSelectedCompany1(item);
        const response = await getCompany(2, item.id);
        if (response.status == true) {
            setTimeout(() => {
                setCompanyList2(response.data)
            }, 600);
        } else {
            setTimeout(() => {
                setCompanyList2([])
                setCompanyList3([])
                setSelectedCompany2({ name: 'Pilih Anak Perusahaan' })
                setSelectedCompany3({ name: 'Pilih Sub Anak Perusahaan' })
            }, 600);
        }
    }
    const submitSelectCompany2 = async (item) => {
        setExpandSelect2(!expandSelect2);
        setSelectedCompany2(item);
        const response = await getCompany(3, item.id);
        if (response.status == true) {
            setTimeout(() => {
                setCompanyList3(response.data)
            }, 600);
        } else {
            setTimeout(() => {
                setCompanyList3([])
                setSelectedCompany3({ name: 'Pilih Sub Anak Perusahaan' })
            }, 600);
        }
    }
    const submitSelectCompany3 = async (item) => {
        setExpandSelect3(!expandSelect3);
        setSelectedCompany3(item);

    }


    return (
        <Screen
            type={'scroll'}
            style={{ padding: 20 }}
        >
            <CustomModal
                onRequestClose={() => {
                    setModalDob(!modalDob);
                }}
                visible={modalDob}
                title={'Tanggal Lahir'}
            >
                <DatePicker
                    onSelectedChange={onSelectedChange}
                    options={datePickerOption}
                    mode="calendar"
                // style={{borderRadius:18, marginBottom:20}}ß
                />
            </CustomModal>
            <View style={[defaultStyles.container, {}]}>
                <Text style={[defaultStyles.baseTextBold, { fontSize: 38, paddingTop: 40 }]}>
                    Registrasi {prevScreen ? 'Anggota' : ''}
                </Text>
                <Text style={[defaultStyles.baseText, {}]}>
                    Registrasi dengan mengisi form di bawah
                </Text>
                <View style={{ paddingTop: 10 }} >
                    {
                        prevScreen &&
                        <View>
                            <TextField
                                inputRef={nipRef}
                                onChangeText={(val) => setNip(val)}
                                value={nip}
                                textContentType='namePrefix'
                                label={'NIP'}
                                placeholder={'NIP'}
                                keyboardType='number-pad'
                                textType='numeric'
                                returnKeyType={'next'}
                                textStyle={styles.textStyle}
                                onSubmitEditing={() => firstNameRef.current.focus()}
                                blurOnSubmit={false}
                            />
                            <TouchableOpacity
                                onPress={() => setExpandSelect1(!expandSelect1)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 20,
                                    borderRadius: 6,
                                    paddingVertical: 5,
                                    borderWidth: 1.8,
                                }}>
                                <Text style={[defaultStyles.baseText, styles.textStyle]} >
                                    {selectedCompany1.name}
                                </Text>
                                <Ionicons name={'chevron-down'} style={{ fontSize: 18, color: themeStyle.BLACK, paddingRight: 10 }} />
                            </TouchableOpacity>
                            {expandSelect1 && companyList1.map((item) => <TouchableOpacity
                                onPress={() => submitSelectCompany1(item)}
                                key={item.id} style={{ padding: 10, flexDirection: 'row', backgroundColor: '#F6F6F6', borderColor: '#FFF', borderBottomWidth: 1 }}>
                                <Image style={{ height: 20, width: 20, marginRight: 10 }} source={{ uri: item.path }} />
                                <Text style={[defaultStyles.baseTextLight]}>{item.name}</Text>
                            </TouchableOpacity>)}
                            {companyList2.length > 0 &&
                                <TouchableOpacity
                                    onPress={() => setExpandSelect2(!expandSelect2)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 20,
                                        borderRadius: 6,
                                        paddingVertical: 5,
                                        borderWidth: 1.8,
                                    }}>
                                    <Text style={[defaultStyles.baseText, styles.textStyle]} >
                                        {selectedCompany2.name}
                                    </Text>
                                    <Ionicons name={'chevron-down'} style={{ fontSize: 18, color: themeStyle.BLACK, paddingRight: 10 }} />
                                </TouchableOpacity>
                            }
                            {expandSelect2 && companyList2.map((item) => <TouchableOpacity
                                onPress={() => submitSelectCompany2(item)}
                                key={item.id} style={{ padding: 10, flexDirection: 'row', backgroundColor: '#F6F6F6', borderColor: '#FFF', borderBottomWidth: 1 }}>
                                <Image style={{ height: 20, width: 20, marginRight: 10 }} source={{ uri: item.path }} />
                                <Text style={[defaultStyles.baseTextLight]}>{item.name}</Text>
                            </TouchableOpacity>)}
                            {companyList3.length > 0 &&
                                <TouchableOpacity
                                    onPress={() => setExpandSelect3(!expandSelect3)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 20,
                                        borderRadius: 6,
                                        paddingVertical: 5,
                                        borderWidth: 1.8,
                                    }}>
                                    <Text style={[defaultStyles.baseText, styles.textStyle]} >
                                        {selectedCompany3.name}
                                    </Text>
                                    <Ionicons name={'chevron-down'} style={{ fontSize: 18, color: themeStyle.BLACK, paddingRight: 10 }} />
                                </TouchableOpacity>
                            }
                            {expandSelect3 && companyList3.map((item) => <TouchableOpacity
                                onPress={() => submitSelectCompany3(item)}
                                key={item.id} style={{ padding: 10, flexDirection: 'row', backgroundColor: '#F6F6F6', borderColor: '#FFF', borderBottomWidth: 1 }}>
                                <Image style={{ height: 20, width: 20, marginRight: 10 }} source={{ uri: item.path }} />
                                <Text style={[defaultStyles.baseTextLight]}>{item.name}</Text>
                            </TouchableOpacity>)}
                        </View>
                    }


                    <TextField
                        inputRef={lastNameRef}
                        onChangeText={(val) => setName(val)}
                        textContentType='text'
                        value={name}
                        label={'Nama Lengkap'}
                        placeholder={'Nama Lengkap'}
                        keyboardType='default'
                        textType='text'
                        returnKeyType={'next'}
                        iconSource={require('../../../assets/name.png')}
                        textStyle={styles.textStyle}
                        style={{ flex: 1, }}
                        onSubmitEditing={() => emailRef.current.focus()}
                        blurOnSubmit={false}
                    />
                    <TextField
                        inputRef={emailRef}
                        onChangeText={(val) => setEmail(val)}
                        value={email}
                        label={'Email'}
                        placeholder={'Email'}
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        textType='text'
                        returnKeyType={'next'}
                        textStyle={styles.textStyle}
                        onSubmitEditing={() => phoneNumberRef.current.focus()}
                        blurOnSubmit={false}
                    />
                    <TextField
                        inputRef={phoneNumberRef}
                        onChangeText={(val) => setPhoneNumber(val)}
                        value={phoneNumber}
                        label={'Nomor Handphone'}
                        placeholder={'Nomor Handphone'}
                        keyboardType='numeric'
                        textType='phoneNumber'
                        returnKeyType={'next'}
                        maxLength={13}
                        textStyle={styles.textStyle}
                        onSubmitEditing={() => setModalDob(true)}
                    />
                    <TouchableOpacity
                        onPress={() => setModalDob(true)}
                    >
                        <TextField
                            editable={false}
                            value={dob}
                            label={'Tanggal Lahir'}
                            placeholder={'Tanggal Lahir'}
                            textType='none'
                            textStyle={styles.textStyle}
                        />
                    </TouchableOpacity>
                    {
                        prevScreen &&
                        <TouchableOpacity
                            onPress={openGallery}
                            style={{ height: 150, justifyContent: 'center', alignItems: 'center', marginTop: 20, borderWidth: 2, borderRadius: 6, borderColor: themeStyle.BLACK, justifyContent: 'center', }}
                        >
                            {
                                base64 ?
                                    <Image
                                        source={{ uri: `data:image/gif;base64,${base64}` }}
                                        style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                                    />
                                    :
                                    <View style={{ justifyContent: 'center', alignItems: 'center', }} >
                                        <Ionicons name='card-sharp' style={{ fontSize: 40, color: themeStyle.BLACK, }} />
                                        <Text style={[defaultStyles.baseText, {}]}>
                                            Photo ID Card
                                        </Text>
                                    </View>
                            }
                        </TouchableOpacity>
                    }

                </View>
                <View style={{ paddingTop: 40 }} >
                    <Button
                        onPress={() => prevScreen ? submitRegistrationStaff() : submitRegistration()}
                        label="Registrasi"
                    >
                        {isLoading && <Spinner />}
                    </Button>
                </View>
                {
                    prevScreen ?
                        <View style={[{ flexDirection: 'row', justifyContent: "center", paddingTop: 20 }]}>
                            <Text style={[defaultStyles.baseText, { padding: 5 }]}>
                                Sudah punya Akun?
                            </Text>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('LoginScreen')}
                            >
                                <Text style={[defaultStyles.baseText, { padding: 5, color: themeStyle.PRIMARY_COLOR, }]}>
                                    Login di sini
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={[{ flexDirection: 'row', justifyContent: "center", paddingTop: 20 }]}>
                            <Text style={[defaultStyles.baseText, { padding: 5 }]}>
                                Registrasi sebagai Anggota?
                            </Text>
                            <TouchableOpacity
                                onPress={() => props.navigation.push('RegistrationScreen', { prevScreen: 'member' })}
                            >
                                <Text style={[defaultStyles.baseText, { padding: 5, color: themeStyle.PRIMARY_COLOR, }]}>
                                    Registrasi di sini
                                </Text>
                            </TouchableOpacity>
                        </View>
                }

            </View>
        </Screen>
    )



}

const styles = StyleSheet.create({
    textStyle: {
        flex: 1, fontSize: 18, padding: 0, paddingHorizontal: 10, paddingVertical: 8,
    }
})


export { RegistrationScreen } 