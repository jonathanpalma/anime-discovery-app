import React from 'react';
import { Dimensions, StyleSheet, Image } from 'react-native';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type Props = {
  isLoading?: boolean;
  image?: string;
  y: Animated.Value<number>;
};

const { height: wHeight, width: wWidth } = Dimensions.get('window');
export const HEADER_IMAGE_HEIGHT = wHeight / 3;
export const heightInterpolator = {
  inputRange: [-100, 0],
  outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
  extrapolateRight: Extrapolate.CLAMP,
};
export const topInterpolator = {
  inputRange: [0, 100],
  outputRange: [0, -100],
  extrapolateLeft: Extrapolate.CLAMP,
};

function DetailHeaderImage({ isLoading, image, y }: Props) {
  const height = interpolate(y, heightInterpolator);
  const top = interpolate(y, topInterpolator);
  return (
    <Animated.View style={[styles.container, { top, height }]}>
      {isLoading ? (
        <SkeletonPlaceholder speed={1200}>
          <SkeletonPlaceholder.Item
            position="absolute"
            height={HEADER_IMAGE_HEIGHT}
            width="100%"
          />
        </SkeletonPlaceholder>
      ) : (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <LinearGradient
        locations={[0, 0.4, 0.6, 1.0]}
        colors={[
          'rgba(0,0,0,0.60)',
          'rgba(0,0,0,0.00)',
          'rgba(0,0,0,0.00)',
          'rgba(0,0,0,0.60)',
        ]}
        style={styles.gradient}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: wWidth,
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default DetailHeaderImage;
