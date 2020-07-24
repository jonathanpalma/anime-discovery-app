import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_GRAY_ATHENS } from '@app/constants/colors';
import { getSelectedAnime } from '@app/store/slices/entities/anime';
import DetailHeader from '@app/components/DetailHeader';
import { useNavigation } from 'react-navigation-hooks';
import useAnimeDetail from '@app/hooks/useAnimeDetail';

function Detail() {
  const item = useSelector(getSelectedAnime); // Anime | Manga
  const { status, data, error, isFetching } = useAnimeDetail(item.id);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DetailHeader item={item} />
        {status === 'loading' && <Text>Loading...</Text>}
        {status === 'error' && <Text>Error: {error?.message}</Text>}
        {isFetching && <Text>Background Updating...</Text>}
        {data?.attributes.youtubeVideoId && <Text>Open YouTube video</Text>}
      </SafeAreaView>
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
  header: {
    flexDirection: 'row',
  },
  image: {
    height: 115,
    width: 100,
  },
});

export default Detail;
