import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'react-navigation-hooks';
import { SharedElement } from 'react-navigation-shared-element';
import TextValue from '@app/components/TextValue';
import { COLOR_GRAY_ATHENS } from '@app/constants/colors';
import { Anime, Manga } from '@app/ts/types';

function Detail() {
  const { getParam } = useNavigation();
  const item: Anime | Manga = getParam('item', {});
  const imageId = getParam('imageId', '');
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <SharedElement id={`item.${imageId}.image`}>
            <Image
              style={styles.image}
              source={{ uri: item?.attributes.posterImage.small }}
              resizeMode="cover"
            />
          </SharedElement>
          <View>
            <TextValue
              label="Main Title"
              value={item?.attributes.canonicalTitle}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

Detail.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const imageId = navigation.getParam('imageId', '');
  return [`item.${imageId}.image`];
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_GRAY_ATHENS,
  },
  header: {
    flexDirection: 'row',
  },
  image: {
    height: 115,
    width: 100,
  },
});
