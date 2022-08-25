import React, { } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { defaultStyles } from '../styles/defaultStyles';
import themeStyle from '../styles/theme.style';

const Chips = ({ mode, label }) => {
    if (label == null) return null;
    return <View style={[styles.container, { marginRight: mode ? 6 : 3, }]}>
        <Text style={[defaultStyles.baseText, { fontSize: mode ? 16 : 10, padding: mode ? 5 : 0, paddingHorizontal: mode ? 10 : 5, }]}>{label}</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        borderRadius: 2,
        backgroundColor: '#E4EFE7',
        marginRight: 3,
        marginTop: 5
    },

})


export { Chips }