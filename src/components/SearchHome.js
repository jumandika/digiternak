import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image, Dimensions, Animated, Platform, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { defaultStyles } from '../styles/defaultStyles';
import themeStyle from '../styles/theme.style';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const SearchHome = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={styles.headerFixedStyle}
      children={
        <View
          style={styles.childrenStyle}
        >
          <Feather name='search' style={{ fontSize: 20, color: '#A9A9A9', marginRight: 10 }} />
          <Text style={defaultStyles.baseText}>Cari kebutuhan kamu . . .</Text>
        </View>
      }
    />
  );
}


const styles = StyleSheet.create({
  headerFixedStyle: {
    flex: 1,
    position: "absolute",
    alignSelf: 'center',
    bottom: -18,
    borderRadius: 40,
    width: screenWidth - 30,
    height: 50,
  },
  childrenStyle: {
    height: 50,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});




export default SearchHome;