import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { COLOR_GRAY_ATHENS } from '@app/constants/colors';
import { getSelectedAnime } from '@app/store/slices/entities/anime';
import DetailHeader from '@app/components/detail/DetailHeader';
import { useNavigation } from 'react-navigation-hooks';
import useAnimeDetail from '@app/hooks/useAnimeDetail';
import DetailHeaderImage, {
  HEADER_IMAGE_HEIGHT,
} from '@app/components/detail/DetailHeaderImage';
import Animated from 'react-native-reanimated';
import { useValue, onScrollEvent } from 'react-native-redash';
import DetailHeaderAvatar from '@app/components/detail/DetailHeaderAvatar';
import DetailContent from '@app/components/detail/DetailContent';
import { PADDING } from '@app/constants/dimensions';

function Detail() {
  const item = useSelector(getSelectedAnime); // Anime | Manga
  const detailQuery = useAnimeDetail(item.id);
  const y = useValue(0);
  return (
    <View style={styles.container}>
      <DetailHeaderImage
        isLoading={detailQuery?.status === 'loading'}
        image={detailQuery?.data?.attributes.coverImage.original}
        y={y}
      />
      <DetailHeaderAvatar image={item?.attributes.posterImage.small} y={y} />
      <Animated.ScrollView
        onScroll={onScrollEvent({ y })}
        scrollEventThrottle={1}
        style={StyleSheet.absoluteFill}
        contentContainerStyle={styles.scrollContainer}
      >
        <DetailContent query={detailQuery} />
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
    paddingTop: HEADER_IMAGE_HEIGHT + PADDING,
    paddingBottom: PADDING,
  },
  header: {
    flexDirection: 'row',
  },
});

export default Detail;
