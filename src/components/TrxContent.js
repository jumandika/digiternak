

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView, TouchableNativeFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { defaultStyles } from '../styles/defaultStyles';
import themeStyle from '../styles/theme.style';

const AnimatableView = Animatable.createAnimatableComponent(View);

const TrxContent = ({ item, index, onPress, trxData }) => {


    let statusColor = themeStyle.BLACK
    if (item.paid == 'Pending') {
        statusColor = themeStyle.YELLOW_COLOR
    }
    if (item.paid == 'Paid') {
        statusColor = themeStyle.DARK_GREEN
    }
    let x = new Date().toISOString()
    let today = moment(x).format('YYYY-MM-DD');
    let trxDate = moment(item.created).format('YYYY-MM-DD');
    let diffday = moment(today).diff(trxDate, 'day');
    let dayDesc;
    if (diffday == 0) {
        dayDesc = "Hari ini"
    } else if (diffday == 1) {
        dayDesc = "Kemarin"
    }
    return <View>
        {index == 0
            || moment(item.created).format('YYYY-MM-DD') !== moment(trxData[index == 0 ? index : index - 1].created).format('YYYY-MM-DD')
            ?
            <View
                style={{ paddingHorizontal: 15, paddingVertical: 12, backgroundColor: '#F7F7F7' }}>
                {diffday == 0 || diffday == 1 ?
                    <Text style={[defaultStyles.baseTextBold, { fontSize: 16, }]}>{dayDesc}</Text>
                    :
                    <Text style={[defaultStyles.baseTextBold, { fontSize: 16, }]}>{moment(item.created).format('ddd, DD MMM YYYY')}</Text>
                }
            </View>
            :
            null
        }
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.05)')}
            onPress={onPress}
        >
            <AnimatableView
                animation={'slideInUp'}
                useNativeDriver={true}
                direction='alternate'
                style={{ backgroundColor: '#FFF', padding: 15, borderBottomWidth: 1, borderColor: '#E9E9E9' }}
            >
                <Text style={[defaultStyles.baseText, { fontSize: 12, paddingBottom: 15 }]}>{moment(item.created).format('HH:mm')}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={[defaultStyles.baseTextBold]}>#{item.code}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[defaultStyles.baseText, { paddingRight: 6, fontSize: 12, textAlign: 'right', color: themeStyle.GREY }]}>{moment(item.date).format('ddd, DD MMM YYYY')}</Text>
                        <MaterialCommunityIcons name='cube-send' style={{ fontSize: 20, color: '#A9A9A9' }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 6 }}>
                    <Text style={[defaultStyles.baseTextBold, { color: themeStyle.PRIMARY_COLOR, }]}>Rp{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                    <View style={{ borderWidth: 1, alignSelf: 'flex-end', padding: 1, paddingHorizontal: 4, borderRadius: 3, backgroundColor: statusColor }}>
                        <Text style={[defaultStyles.baseText, { fontSize: 14, textAlign: 'right', color: '#FFF' }]}>{item.paid}</Text>
                    </View>
                </View>
            </AnimatableView>
        </TouchableNativeFeedback>
    </View>;

}

export { TrxContent }