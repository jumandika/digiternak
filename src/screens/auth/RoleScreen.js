import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Screen } from '../../components/Screen';
import { defaultStyles } from '../../styles/defaultStyles';
import themeStyle from '../../styles/theme.style';
import helpers from '../../utils/helper';

const RoleScreen = (props) => {

    return (
        <Screen
            type={'fixed'}
            style={{ backgroundColor: themeStyle.PRIMARY_COLOR }}
        >
            <Image
                style={{
                    flex: 1,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                    height: 300,
                    width: 300,
                }}
                source={require('../../../assets/logo_putih.png')}
            />
            {/* <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ flex: 1, height: 50, borderBottomWidth: 2, borderColor: themeStyle.PRIMARY_COLOR, justifyContent: 'center', alignItems: "center" }}
                >
                    <Text style={defaultStyles.baseTextBold}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, height: 50, borderBottomWidth: 2, borderColor: themeStyle.PRIMARY_COLOR, justifyContent: 'center', alignItems: "center" }}
                >
                    <Text style={defaultStyles.baseTextBold}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View> */}
            <View style={defaultStyles.container}>
                <Text style={[defaultStyles.baseTextLight, { fontSize: 38, color: "#FFF", padding: 20 }]} numberOfLines={1}>
                    Select Your Role
                </Text>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('LoginScreen')}
                    style={{ flex: 1, paddingHorizontal: 20, marginTop: 0, backgroundColor: '#FFF', justifyContent: 'center', }}
                >
                    <Text style={[defaultStyles.baseTextExtraBold, { fontSize: 38 }]}>
                        User
                    </Text>
                    <Ionicons
                        name="arrow-forward"
                        color={themeStyle.BLACK}
                        size={28} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, paddingHorizontal: 20, backgroundColor: themeStyle.YELLOW_COLOR, justifyContent: 'center', }}
                >
                    <Text style={[defaultStyles.baseTextExtraBold, { fontSize: 38, color: '#FFF' }]}>
                        Member
                    </Text>
                    <Ionicons
                        name="arrow-forward"
                        color={"#FFF"}
                        size={28} />
                </TouchableOpacity>
            </View>


        </Screen>
    )


}

export { RoleScreen } 