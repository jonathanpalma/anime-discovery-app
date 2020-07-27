import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from 'react-navigation-hooks';
import Animated, { interpolate } from 'react-native-reanimated';
import {
  HEADER_IMAGE_HEIGHT,
  topInterpolator,
} from '@app/components/detail/DetailHeaderImage';

type Props = {
  image?: string;
  y: Animated.Value<number>;
};

function DetailHeaderAvatar({ image, y }: Props) {
  const { getParam } = useNavigation();
  const top = interpolate(y, topInterpolator);
  const imageId = getParam('imageId', '');
  return (
    <Animated.View style={[styles.container, { top }]}>
      <SharedElement id={`item.${imageId}.image`}>
        <Image
          style={styles.avatar}
          source={{ uri: image }}
          resizeMode="cover"
        />
      </SharedElement>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
});

export default DetailHeaderAvatar;
