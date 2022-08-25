import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image, Dimensions, Animated, Platform, TouchableOpacity, ScrollView, FlatList, TouchableNativeFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { defaultStyles } from '../styles/defaultStyles';
import themeStyle from '../styles/theme.style';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const AnimatableView = Animatable.createAnimatableComponent(View);

const CategoryList = ({ navigation, categoryList }) => {

  const openCategory = (item) => {
    navigation.navigate('ProductPerCatScreen', { item: item });
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.05)')}
        onPress={() => openCategory(item)}
        key={item.id}
      >
        <AnimatableView
          animation={'slideInRight'}
          useNativeDriver={true}
          direction='alternate'
          style={styles.card}
        >
          <Image source={{ uri: item.path }} style={{ height: 30, width: 30 }} />
          <Text style={[defaultStyles.baseText, { color: themeStyle.GREY, textAlign: 'center', paddingVertical: 8 }]}>{item.name}</Text>
        </AnimatableView>
      </TouchableNativeFeedback>
    )
  }

  // console.log('categoryList', categoryList);
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 15 }}>
      <View style={{ flex: 1, paddingBottom: 15, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[defaultStyles.baseTextBold, { fontSize: 20 }]}>{'Kategori'}</Text>
      </View>
      <FlatList
        style={styles.container}
        horizontal
        data={categoryList}
        contentContainerStyle={{ minWidth: screenWidth, paddingLeft: 15, paddingBottom: 15 }}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        windowSize={5}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
      />

    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: 70,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    paddingTop: 10,
    marginRight: 10,
    borderRadius: 6,

  },
  icon: {
    fontSize: 22,
  },
  image: {
    width: 30,
    height: 30,
    paddingLeft: 10
  }
});




export { CategoryList };