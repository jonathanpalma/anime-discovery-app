import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from 'react-navigation-hooks';
import TextValue from '@app/components/TextValue';
import { NormalizedAnime } from '@app/ts/types';

type Props = {
  item: NormalizedAnime;
};

function DetailHeader({ item: { attributes } }: Props) {
  const { getParam } = useNavigation();
  const imageId = getParam('imageId', '');
  return (
    <View style={styles.header}>
      <SharedElement id={`item.${imageId}.image`}>
        <Image
          style={styles.image}
          source={{ uri: attributes?.posterImage.small }}
          resizeMode="cover"
        />
      </SharedElement>
      <View style={styles.textContainer}>
        <TextValue label="Canonical Title" value={attributes?.canonicalTitle} />
        <TextValue
          label="Type"
          value={`${attributes?.showType}, ${attributes?.subtype}`}
        />
        <TextValue
          label="Year"
          value={`${attributes?.startDate} ~ ${attributes?.endDate}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  textContainer: {
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
});

export default DetailHeader;
