import React from 'react';
import { ScrollView, View, StyleSheet, Text, } from 'react-native';
import { defaultStyles } from '../styles/defaultStyles';
import helpers from '../utils/helper';


const Screen = ({ type, children, style }) => {
    return (
        type == 'scroll' ?
            <ScrollView
                style={[defaultStyles.container, { backgroundColor:'#F7F7F7', paddingTop: helpers.statusBarHeight(), ...style }]}
                removeClippedSubView={true}
            >
                {children}
            </ScrollView>
            :
            <View
                style={[defaultStyles.container, { backgroundColor:'#F7F7F7', paddingTop: helpers.statusBarHeight(), ...style }]}
            >
                {children}
            </View>

    )
}

export { Screen } 