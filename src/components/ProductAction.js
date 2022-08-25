import React from 'react';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { defaultStyles } from '../styles/defaultStyles';
import themeStyle from '../styles/theme.style';
import { Button } from "./Button"
import { Spinner } from './Spinner';
const AnimatableText = Animatable.createAnimatableComponent(Text);

const ProductAction = ({
    addToCart,
    onIncrement,
    onDecrement,
    isLoading,
    id,
    max,
    activeItem,
}) => {
    let cartValue = useSelector(state => state.DetailCart.detailCart)
    cartValue = cartValue?.find((item) => item.id == id ? item.qty : null)
    return (
        cartValue != undefined ?
            <View style={{ flexDirection: 'row', }}>
                <Button
                    type='secondary'
                    onPress={onDecrement}
                    style={{ flex: 0.9, height: 35, borderRadius: 4, alignSelf: 'flex-start', backgroundColor: '#FFF', borderWidth: 1, borderColor: themeStyle.PRIMARY_COLOR }}
                    fontStyle={{ fontSize: 22, color: themeStyle.PRIMARY_COLOR }}
                    label="-"
                >
                </Button>
                {isLoading && activeItem.id == id ?
                    <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                        <Spinner color={'#A9A9A9'} size={20} />
                    </View>
                    :
                    <AnimatableText
                        animation={'rotate'}
                        duration={700}
                        direction='normal'
                        style={[defaultStyles.baseTextBold, { fontSize: 18, flex: 1.5, textAlignVertical: 'center', textAlign: 'center' }]} >{cartValue.qty}
                    </AnimatableText>

                }
                <Button
                    onPress={onIncrement}
                    style={{ flex: 1, height: 35, borderRadius: 4, alignSelf: 'flex-end', }}
                    fontStyle={{ fontSize: 22 }}
                    label="+"
                    disabled={cartValue.qty >= max}
                >
                </Button>


            </View>
            :
            <Button
                onPress={addToCart}
                style={{ height: 35, borderRadius: 4, }}
                fontStyle={{ fontSize: 16 }}
                label="Beli"
            >
                {isLoading && activeItem.id == id ? <Spinner /> : null}
            </Button>
    )
}


export { ProductAction }