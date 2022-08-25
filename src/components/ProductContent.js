import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, Dimensions, TouchableNativeFeedback } from 'react-native'
import themeStyle from '../styles/theme.style';
import { ProductAction } from './ProductAction';
import * as Animatable from 'react-native-animatable';
import { ProductDesc } from './ProductDesc';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const AnimatableView = Animatable.createAnimatableComponent(View);


const ProductContent = ({
    isLoading,
    addToCart,
    onIncrement,
    onDecrement,
    onPress,
    item,
    activeItem,
    vertical
}) => {
    let animation = 'slideInRight'
    let contentWidth = 160
    let imageWidth = 130
    let imageHeight = 100
    if (vertical) {
        animation = 'slideInUp';
        contentWidth = screenWidth / 2;
        imageWidth = (screenWidth / 2) - 30;
        imageHeight = 130;
    }
    return <AnimatableView
        animation={animation}
        useNativeDriver={true}
        direction='alternate'
        style={styles.card(contentWidth)}>
        <TouchableNativeFeedback
            useForeground={true}
            background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.05)')}
            onPress={onPress}
        >
            <View
                style={styles.container}
            >
                <Image
                    style={styles.imageStyle(imageWidth, imageHeight)}
                    source={{ uri: item?.picture[0]?.path }}
                    resizeMode="cover" />
                <ProductDesc item={item} />
            </View>
        </TouchableNativeFeedback>
        <View
            style={styles.actionContainer}
        >
            <ProductAction
                isLoading={isLoading}
                addToCart={addToCart}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                id={item.id}
                max={item.max}
                activeItem={activeItem}
            />
        </View>
    </AnimatableView >;
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingBottom: 0
    },
    actionContainer: {
        padding: 15,
        paddingTop: 10
    },
    card: (contentWidth) => ({
        borderRightWidth: 0.6,
        borderTopWidth: 1,
        borderColor: '#F1F1F1',
        overflow: 'hidden',
        width: contentWidth,
    }),
    imageStyle: (imageWidth, imageHeight) => ({
        width: imageWidth,
        height: imageHeight,
        borderRadius: 2,
    })
});

export { ProductContent }