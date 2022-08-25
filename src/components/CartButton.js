import React from 'react';
import { useSelector } from 'react-redux';
import { defaultStyles } from '../styles/defaultStyles';
import themeStyle from '../styles/theme.style';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const CartButton = ({ children, onPress }) => {
    const cartLength = useSelector(state => state.DetailCart.cartLength)

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.container}
                onPress={onPress}
            >
                <LinearGradient
                    style={styles.wrapperStyle}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[
                        themeStyle.SECONDARY_COLOR,
                        themeStyle.PRIMARY_COLOR,
                    ]}
                >

                    {children}
                </LinearGradient>

            </TouchableOpacity>
            {cartLength != 0 &&
                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: themeStyle.RED_COLOR, minHeight: 22, minWidth: 22, top: -22, left: 0, borderRadius: 30, }}>
                    <Text style={[defaultStyles.baseTextBold, { color: '#FFF' }]} >{cartLength == 0 ? null : cartLength}</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperStyle: {
        elevation: 10,
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth: 0,
        borderColor: '#FFF',
        backgroundColor: themeStyle.PRIMARY_COLOR,
        justifyContent: 'center'
    }
})


export { CartButton }
