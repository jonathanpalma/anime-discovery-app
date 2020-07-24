import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from 'react-navigation-hooks';
import TextValue from '@app/components/TextValue';
import { Anime, NormalizedJsonApiResource } from '@app/ts/types';

type Props = {
  item: NormalizedJsonApiResource<Anime>;
};

function DetailHeader({ item }: Props) {
  const nav = useNavigation();
  const imageId = nav.getParam('imageId', '');
  return (
    <View style={styles.header}>
      <SharedElement id={`item.${imageId}.image`}>
        <Image
          style={styles.image}
          source={{ uri: item?.attributes.posterImage.small }}
          resizeMode="cover"
        />
      </SharedElement>
      <View>
        <TextValue label="Main Title" value={item?.attributes.canonicalTitle} />
      </View>
    </View>
  );
}

DetailHeader.sharedElements = (nav: ReturnType<typeof useNavigation>) => {
  const imageId = nav.getParam('imageId', '');
  return [`item.${imageId}.image`];
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  image: {
    height: 115,
    width: 100,
  },
});

export default DetailHeader;
