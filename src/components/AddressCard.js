import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { defaultStyles } from '../styles/defaultStyles';
import themeStyle from '../styles/theme.style';
import { Spinner } from './Spinner';


const AddressCard = ({
    style,
    index,
    onSelect,
    onDelete,
    item,
    isSelectLoading,
    numberOfLines,
    hasNavigate
}) => {
    return <View>
        {index == 1 &&
            <Text style={[defaultStyles.baseTextBold, { fontSize: 16, paddingTop: 15, paddingLeft: 15 }]}>Alamat lainnya</Text>}
        <TouchableOpacity
            activeOpacity={hasNavigate ? 0.6 : 0.9}
            onPress={onSelect}
            style={[styles.container, { backgroundColor: item.priority == 1 && !hasNavigate ? themeStyle.HIGHLIGHT : '#FFF', paddingHorizontal: item.priority == 1 ? 0 : 15, ...style }]}>
            {isSelectLoading && index == 0 ?
                <View style={{ marginLeft: 5, marginRight: 10 }}>
                    <Spinner color={themeStyle.PRIMARY_COLOR} size={30} />
                </View>
                :
                index == 0 &&
                <MaterialCommunityIcons name={'map-marker'} style={{ fontSize: 30, color: themeStyle.PRIMARY_COLOR, marginLeft: 5, marginRight: 10 }} />}
            <View style={{ flex: 1 }}>
                <Text numberOfLines={numberOfLines} style={[defaultStyles.baseText, { fontSize: 16, paddingBottom: 6 }]}>{item.address}</Text>

                <Text style={[defaultStyles.baseText, { color: themeStyle.GREY, fontSize: 14, }]}>{item.note}</Text>
            </View>
            {hasNavigate &&
                <MaterialCommunityIcons name={'chevron-right'} style={{ fontSize: 20, alignSelf: 'center', color: themeStyle.BLACK, marginLeft: 10 }} />
            }
            {index != 0 &&
                <TouchableOpacity
                    onPress={onDelete}
                >
                    <MaterialCommunityIcons name={'close'} style={{ fontSize: 20, color: '#A9A9A9', marginLeft: 10 }} />
                </TouchableOpacity>
            }
        </TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginTop: 10,
        padding: 10,
    }
})

export { AddressCard }