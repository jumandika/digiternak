import React, { useState, useRef, createRef } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { defaultStyles } from '../styles/defaultStyles';
import themeStyle from '../styles/theme.style';


const TextField = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
    textContentType,
    secureTextEntry = false,
    maxLength,
    iconSource = null,
    textType = 'none',
    textStyle,
    inputRef,
    editable,
    style,
    returnKeyType,
    onSubmitEditing,
    isValid = true,
    message,
    blurOnSubmit = true,
    onPressEye,

}) => {
    const [focus, setFocus] = useState(false)
    const [borderColor, setBorderColor] = useState('#DDDDDD')
    const [borderWidth, setBorderWidth] = useState(1.8)

    if (focus) placeholder = '';

    const onFocus = () => {
        setFocus(true)
        setBorderColor(themeStyle.PRIMARY_COLOR)
        // setBorderWidth(1.8)
    }

    const onBlur = () => {
        setFocus(false)
        setBorderColor('#DDDDDD')
        // setBorderWidth(1.8)
    }

    return (
        <View style={[styles.containerStyle, { borderColor: borderColor, ...style }]}>
            {/* {
                (focus && label) ||
                    value &&
                    textType != 'otp'
                    ?
                    FloatingLabel(label)
                    :
                    null
            } */}
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {textType == 'phoneNumber' &&
                    <Text style={[defaultStyles.baseTextMedium, { fontSize: 18, paddingLeft: 10 }]}>+62</Text>
                }
                {iconSource &&
                    <View style={{ paddingLeft: 10 }}>
                        <Image
                            source={iconSource}
                            resizeMode='contain'
                            style={{ height: 18, width: 18 }}
                        />
                    </View>
                }
                <TextInput
                    ref={inputRef}
                    style={[defaultStyles.baseTextBold, { ...textStyle }]}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={themeStyle.GREY}
                    keyboardType={keyboardType}
                    textContentType={textContentType}
                    returnKeyType={returnKeyType}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    editable={editable}
                    onSubmitEditing={onSubmitEditing}
                    blurOnSubmit={blurOnSubmit}
                    secureTextEntry={secureTextEntry}

                />
                {textContentType == 'password' &&
                    <TouchableOpacity onPress={onPressEye} style={styles.eyeStyle}>
                        <Image
                            source={secureTextEntry ? require('../../assets/view-password.png') : require('../../assets/hide-password.png')}
                            resizeMode='contain'
                            style={{ height: 18, width: 18 }}
                        />
                    </TouchableOpacity>
                }
            </View>
            {!isValid &&
                <Text style={[defaultStyles.baseText, { position: 'absolute', bottom: -15, left: 0, fontSize: 12, color: 'red' }]}>{message}</Text>
            }

        </View>
    )

}

export { TextField }

function FloatingLabel(label) {
    return <View style={{ position: 'absolute', top: -16, left: 15, padding: 5, backgroundColor: '#FFF' }}>
        <Text style={[defaultStyles.baseTextBold, { fontSize: 18 }]}>{label}</Text>
    </View>;
}


const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#FFF',
        marginTop: 10,
        height:60,
        justifyContent: 'center',
        borderRadius: 2,
        borderWidth: 1,
        padding: 5
    },
    eyeStyle: {
        position: 'absolute',
        right: 0,
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})