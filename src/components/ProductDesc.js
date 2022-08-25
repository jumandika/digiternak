import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Chips } from './Chips';
import { defaultStyles } from '../styles/defaultStyles';
import { BadgeDiscount } from './BadgeDiscount';
import themeStyle from '../styles/theme.style';

const ProductDesc = ({ hideChips, mode, item, style }) => {
    let priceNormal = `Rp${item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    let price = `Rp${item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} /${item.unit}`
    if (item?.discount_type != 0) {
        price = `Rp${item?.discount_totals?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} /${item.unit}`
    }

    return (
        mode == 'detail' ?
            <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
                <BadgeDiscount mode={mode} value={item.discount_total} type={item.discount_type} />
                <Text style={[defaultStyles.baseTextBold, { fontSize: 32 }]}>{item.name}</Text>
                <Text style={[defaultStyles.baseText, { fontSize: 24, }]}>{price}</Text>
                {item.discount_type != 0 &&
                    <Text style={[defaultStyles.baseText, { fontSize: 22, color: '#A6A6A6', textDecorationStyle: 'solid', textDecorationLine: 'line-through' }]}>{priceNormal}</Text>
                }
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                    <Chips mode={mode} label={item.category1} />
                    <Chips mode={mode} label={item.category2} />
                    <Chips mode={mode} label={item.category3} />
                </View>
                <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY, }]}>Minimal {item.min}  |  Maksimal {item.max}</Text>
            </View>
            :
            <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 0, ...style }}>
                <BadgeDiscount value={item.discount_total} type={item.discount_type} />
                <Text style={defaultStyles.baseText}>{price}</Text>
                {item.discount_type != 0 &&
                    <Text style={[defaultStyles.baseText, { fontSize: 14, color: '#A6A6A6', textDecorationStyle: 'solid', textDecorationLine: 'line-through' }]}>{priceNormal}</Text>
                }
                <Text style={defaultStyles.baseTextBold}>{item.name}</Text>
                {!hideChips &&
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Chips label={item.category1} />
                        <Chips label={item.category2} />
                        <Chips label={item.category3} />
                    </View>
                }
            </View>
    )
};

export { ProductDesc }
