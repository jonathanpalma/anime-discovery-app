import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { COLOR_GRAY_ATHENS } from '@app/constants/colors';
import { getSelectedAnime } from '@app/store/slices/entities/anime';
import DetailHeader from '@app/components/DetailHeader';
import { useNavigation } from 'react-navigation-hooks';
import useAnimeDetail from '@app/hooks/useAnimeDetail';
import DetailHeaderImage, {
  HEADER_IMAGE_HEIGHT,
} from '@app/components/DetailHeaderImage';
import Animated from 'react-native-reanimated';
import { useValue, onScrollEvent } from 'react-native-redash';
import DetailHeaderAvatar from '@app/components/DetailHeaderAvatar';

function Detail() {
  const item = useSelector(getSelectedAnime); // Anime | Manga
  const { status, data, error, isFetching } = useAnimeDetail(item.id);
  const y = useValue(0);
  return (
    <View style={styles.container}>
      <DetailHeaderImage image={data?.attributes.coverImage.original} y={y} />
      <DetailHeaderAvatar image={data?.attributes.posterImage.small} y={y} />
      <Animated.ScrollView
        onScroll={onScrollEvent({ y })}
        scrollEventThrottle={1}
        style={styles.scrollContainer}
      >
        <View>
          {[...new Array(25)].map((i, index) => (
            <Text key={`${i}${index}`} style={{ marginBottom: 25 }}>
              This is a test {i}
            </Text>
          ))}
        </View>
        {status === 'loading' && <Text>Loading...</Text>}
        {status === 'error' && <Text>Error: {error?.message}</Text>}
        {isFetching && <Text>Background Updating...</Text>}
        {data?.attributes.youtubeVideoId && <Text>Open YouTube video</Text>}
      </Animated.ScrollView>
      <DetailHeader item={item} y={y} />
    </View>
  );
}

Detail.sharedElements = (nav: ReturnType<typeof useNavigation>) => {
  const imageId = nav.getParam('imageId', '');
  return [`item.${imageId}.image`];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_GRAY_ATHENS,
  },
  scrollContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: HEADER_IMAGE_HEIGHT + 10,
  },
  header: {
    flexDirection: 'row',
  },
});

export default Detail;
