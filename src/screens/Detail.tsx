import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'react-navigation-hooks';
import { SharedElement } from 'react-navigation-shared-element';
import TextValue from '@app/components/TextValue';
import { CardItem } from '@app/ts/types';

function Detail() {
  const { getParam } = useNavigation();
  const item: CardItem = getParam('item', {});
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <SharedElement id={`item.${item?.id}.image`}>
            <Image
              style={styles.image}
              source={{ uri: item?.image }}
              resizeMode="cover"
            />
          </SharedElement>
          <View>
            <TextValue label="Main Title" value={item?.title} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

Detail.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const item = navigation.getParam('item', {});
  return [`item.${item?.id}.image`];
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f3f5',
  },
  header: {
    flexDirection: 'row',
  },
  image: {
    height: 115,
    width: 100,
  },
});
