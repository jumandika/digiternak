import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, Dimensions, TouchableNativeFeedback, ImageBackground } from 'react-native'
import themeStyle from '../styles/theme.style';
import { ProductAction } from './ProductAction';
import * as Animatable from 'react-native-animatable';
import { ProductDesc } from './ProductDesc';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from './Button';
import { defaultStyles } from '../styles/defaultStyles';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const AnimatableView = Animatable.createAnimatableComponent(View);
const imageWidth = 260
const imageHeight = 300


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

    return <AnimatableView
        animation={animation}
        useNativeDriver={true}
        direction='alternate'
    >
        <Button
            onPress={onPress}
            style={styles.actionContainer}
        >
            <ImageBackground
                style={styles.imageStyle(imageWidth, imageHeight)}
                source={item?.path}
                resizeMode="cover"
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Ionicons name="star" style={{ fontSize: 16, paddingRight: 5, color: themeStyle.YELLOW_COLOR }} />
                    <Text style={[defaultStyles.baseTextBold, { color: themeStyle.YELLOW_COLOR, fontSize: 18 }]}>{item.rating}</Text>
                </View>
                <Text style={[defaultStyles.baseTextBold, { color: '#FFF', fontSize: 26 }]}>{item.farmerName}</Text>
                <Text style={[defaultStyles.baseText, { color: '#FFF', }]}>{item.ratePrice}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' , padding:5, paddingRight:15, position: 'absolute', top: 0, left: 0, backgroundColor: themeStyle.PRIMARY_COLOR, borderBottomRightRadius:10 }} >
                    <MaterialCommunityIcons name="map-marker" style={{ fontSize: 16, paddingRight: 5, color: themeStyle.WHITE }} />
                    <Text style={[defaultStyles.baseText, { color: themeStyle.WHITE, fontSize: 18 }]}>{item.region}</Text>
                </View>
            </ImageBackground>
        </Button>

    </AnimatableView >;
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    actionContainer: {
        width: imageWidth,
        height: imageHeight,
        borderRadius: 2,
        marginRight: 10,
        borderRadius: 1,
        elevation: 8,
    },
    imageStyle: (imageWidth, imageHeight) => ({
        width: imageWidth,
        height: imageHeight,
        padding: 20,
        justifyContent: 'flex-end',

    })
});

export { ProductContent }