import React, { } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { defaultStyles } from '../styles/defaultStyles';
import themeStyle from '../styles/theme.style';

const BadgeDiscount = ({ mode, type, value }) => {
    let label = ''
    if (type == 0) {
        return null
    }
    if (type == 1) {
        label = `- Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    }
    if (type == 2) {
        label = `disc. ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}%`
    }
    return <View style={styles.container}>
        <Text style={[defaultStyles.baseTextBold, { fontSize: mode ? 20 : 10, padding: 5, color: '#FFF' }]}>{label}</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        borderRadius: 3,
        backgroundColor: themeStyle.RED_COLOR,
        marginBottom: 5,
    },

})


export { BadgeDiscount }