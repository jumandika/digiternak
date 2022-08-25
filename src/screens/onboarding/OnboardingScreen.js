import React, { useEffect, useContext, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ListViewBase, } from 'react-native';
import helper from "../../utils/helper";
import themeStyle from '../../styles/theme.style';
import { defaultStyles } from '../../styles/defaultStyles'
import Swiper from 'react-native-swiper';
import RNBootSplash from "react-native-bootsplash";
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const OnboardingScreen = ({ navigation }) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const swiperRef = useRef(null);

    useEffect(() => {
        RNBootSplash.hide();
    }, []);


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='rgba(0,0,0,0)' barStyle="dark-content" translucent={true} />
            <Swiper
                ref={swiperRef}
                onMomentumScrollEnd={(e, state, context) => {
                    // console.log('index:', state.index)
                    setActiveIndex(state.index)
                }}
                dot={
                    <View
                        style={{
                            backgroundColor: "green",
                            opacity: activeIndex == 2 ? 0 : 0.4,
                            width: helper.normalize(10),
                            height: helper.normalize(10),
                            borderRadius: helper.normalize(10),
                            marginLeft: helper.normalize(4),
                            marginRight: helper.normalize(8),
                            marginTop: helper.normalize(4),
                            marginBottom: helper.normalize(4)
                        }}
                    />
                }
                index={activeIndex}
                activeDot={
                    <View
                        style={{
                            opacity: activeIndex == 2 ? 0 : 1,
                            backgroundColor: "green",
                            width: helper.normalize(10),
                            height: helper.normalize(10),
                            borderRadius: helper.normalize(10),
                            marginLeft: helper.normalize(4),
                            marginRight: helper.normalize(8),
                            marginTop: helper.normalize(4),
                            marginBottom: helper.normalize(4)
                        }}
                    />
                }
                paginationStyle={{
                    bottom: helper.normalize(50),
                    right: null,
                    left: helper.normalize(20),
                }}
                loop={false}
            >
                {/* <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        backgroundColor: 'transparent'
                    }}
                >
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require('../../../assets/swiper1.png')}
                    />
                </View> */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        backgroundColor: 'transparent'
                    }}
                >
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require('../../../assets/swiper2.png')}
                    />
                    <View style={{ flex: 1, paddingHorizontal: helper.normalize(20) }}>
                        <Image
                            resizeMode="contain"
                            style={styles.imageHalalgo}
                            source={require('../../../assets/logo.png')}
                        />
                        <Text style={[defaultStyles.baseTextBold, { fontSize: 32 }]} numberOfLines={1}>Pengiriman Cepat - </Text>
                        <Text style={[defaultStyles.baseTextBold, { fontSize: 32 }]} numberOfLines={1}>Sampai Kerumah</Text>
                    </View>

                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        backgroundColor: 'transparent'
                    }}
                >
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require('../../../assets/swiper3.png')}
                    />
                    <View style={{ flex: 1, paddingHorizontal: helper.normalize(20) }}>
                        <Image
                            resizeMode="contain"
                            style={styles.imageHalalgo}
                            source={require('../../../assets/logo.png')}
                        />
                        <Text style={[defaultStyles.baseTextBold, { fontSize: 32 }]} >{`Belanja di \nSupermarket dan\nPasar Kesayangan`}</Text>
                        <View style={{ paddingTop: helper.normalize(15) }}>
                            <Text style={defaultStyles.baseTextBold} numberOfLines={1}>Beli kebutuhan harian kamu dari berbagai</Text>
                            <Text style={defaultStyles.baseTextBold} numberOfLines={1}>supermarket & traditional market kesayangan kamu</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        backgroundColor: 'transparent'
                    }}
                >
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require('../../../assets/swiper4.png')}
                    />
                    <View style={{ flex: 1, paddingHorizontal: helper.normalize(20) }}>
                        <Image
                            resizeMode="contain"
                            style={styles.imageHalalgo}
                            source={require('../../../assets/logo.png')}
                        />
                        <Text style={[defaultStyles.baseTextBold, { fontSize: 32 }]} numberOfLines={1}>Mencari sesuatu yang</Text>
                        <Text style={[defaultStyles.baseTextBold, { fontSize: 32 }]} numberOfLines={1}>istimewa ?</Text>
                        <View style={{ paddingTop: helper.normalize(15) }}>
                            <Text style={defaultStyles.baseTextBold} numberOfLines={1}>Yuk mulai sekarang dan nikmati berbagai</Text>
                            <Text style={defaultStyles.baseTextBold} numberOfLines={1}>kemudahan belanja kebutuhan harian kamu</Text>
                        </View>
                    </View>

                </View>
            </Swiper>
            {
                activeIndex != 2 ?
                    <TouchableOpacity
                        onPress={() => swiperRef.current.scrollBy(1)}
                        style={{ flexDirection: "row", justifyContent: 'space-between', position: "absolute", bottom: helper.normalize(30), right: helper.normalize(20), alignItems: "center" }}>
                        <Text style={defaultStyles.baseTextBold} numberOfLines={1}>Skip</Text>
                        <View
                            style={{
                                backgroundColor: "black",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: helper.normalize(20),
                                height: helper.normalize(50),
                                width: helper.normalize(50),
                                borderRadius: helper.normalize(50),
                            }}
                        >
                            <Ionicons
                                name="arrow-forward"
                                color="white"
                                size={helper.normalize(20)} />
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            overflow: 'hidden',
                            bottom: helper.normalize(30),
                            backgroundColor: themeStyle.BLACK,
                            alignSelf: 'center',
                            alignItems: "center",
                            justifyContent: "center",
                            height: helper.normalize(50),
                            width: screenWidth - helper.normalize(40),
                            borderRadius: helper.normalize(30),
                        }}
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        <Text style={[defaultStyles.baseTextBold, { fontSize: 20, color: '#FFFFFF' }]} numberOfLines={1}>Mulai Sekarang</Text>
                    </TouchableOpacity>
            }
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    image: {
        width: screenWidth,
        flex: 1,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0)"
    },
    imageHalalgo: {
        width: helper.normalize(120),
        height: helper.normalize(80),
        top: helper.normalize(12)
    },
});

