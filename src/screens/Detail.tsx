import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'react-navigation-hooks';
import { SharedElement } from 'react-navigation-shared-element';

function Detail() {
  const { getParam } = useNavigation();
  const item = getParam('item', {});
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Detail: {item?.title}</Text>
        <SharedElement id={`item.${item?.slug}.image`}>
          <Image
            style={styles.image}
            source={{ uri: item?.image }}
            resizeMode="cover"
          />
        </SharedElement>
      </SafeAreaView>
    </View>
  );
}

Detail.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const item = navigation.getParam('item', {});
  return [`item.${item?.slug}.image`];
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f3f5',
  },
  image: {
    height: 115,
    width: 100,
  },
});
