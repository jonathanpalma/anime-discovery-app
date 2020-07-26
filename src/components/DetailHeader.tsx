import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  block,
  Extrapolate,
  greaterThan,
  interpolate,
  set,
  useCode,
} from 'react-native-reanimated';
import {
  useValue,
  withTimingTransition,
  interpolateColor,
} from 'react-native-redash';
import { useSafeArea } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  COLOR_GRAY_ATHENS,
  COLOR_FIORD,
  COLOR_RGB_WHITE,
  COLOR_RGB_FIORD,
} from '@app/constants/colors';
import {
  MIN_HEADER_HEIGHT,
  PADDING,
  ICON_SIZE,
} from '@app/constants/dimensions';
import { HEADER_IMAGE_HEIGHT } from '@app/components/DetailHeaderImage';
import { NormalizedAnime } from '@app/ts/types';

type Props = {
  item: NormalizedAnime;
  y: Animated.Value<number>;
};

const xInterpolator = {
  inputRange: [
    HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 50,
    HEADER_IMAGE_HEIGHT,
  ],
  outputRange: [-ICON_SIZE - PADDING, 0],
  extrapolate: Extrapolate.CLAMP,
};
const yInterpolator = {
  inputRange: [
    -100,
    HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 50,
    HEADER_IMAGE_HEIGHT,
  ],
  outputRange: [
    HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
    HEADER_IMAGE_HEIGHT -
      MIN_HEADER_HEIGHT -
      (HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 50),
    0,
  ],
  extrapolateRight: Extrapolate.CLAMP,
};
const colorInterpolator = {
  inputRange: [
    HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 50,
    HEADER_IMAGE_HEIGHT,
  ],
  outputRange: [COLOR_RGB_WHITE, COLOR_RGB_FIORD],
  extrapolateRight: Extrapolate.CLAMP,
};

function DetailHeader({ y, item: { attributes } }: Props) {
  const { goBack } = useNavigation();
  const insets = useSafeArea();
  const toggle = useValue<0 | 1>(0);
  useCode(
    () =>
      block([
        set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT)),
      ]),
    [toggle, y]
  );

  const translateX = interpolate(y, xInterpolator);
  const translateY = interpolate(y, yInterpolator);
  const color = interpolateColor(y, colorInterpolator);
  const opacity = withTimingTransition(toggle, { duration: 100 });
  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: 'white',
          height: MIN_HEADER_HEIGHT,
        }}
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <View>
            <Icon
              name="arrow-back"
              size={ICON_SIZE}
              color={COLOR_GRAY_ATHENS}
            />
            <Animated.View
              style={{ ...StyleSheet.absoluteFillObject, opacity }}
            >
              <Icon name="arrow-back" size={ICON_SIZE} color={COLOR_FIORD} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.Text
          style={[
            styles.title,
            {
              color,
              transform: [{ translateY }, { translateX }],
            },
          ]}
        >
          {attributes?.canonicalTitle}
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING,
  },
  title: {
    color: COLOR_GRAY_ATHENS,
    fontSize: 18,
    paddingLeft: PADDING,
    fontWeight: '600',
  },
});

export default DetailHeader;
