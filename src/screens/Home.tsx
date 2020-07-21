import React, { useEffect } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScrollCardSection from '@app/components/ScrollCardSection';
import { useNavigation } from 'react-navigation-hooks';
import {
  fetchHighestRated,
  getHighestRatedAnime,
  getMostPopularAnime,
  fetchMostPopular,
  getNormalizedList,
} from '@app/store/slices/anime';
import { mapAnimeToCard } from '@app/utils/dataMappers';
import { CardCallback } from '@app/ts/types';

function Home() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const anime = useSelector(getNormalizedList);
  const highestRatedAnime = useSelector(getHighestRatedAnime);
  const mostPopularAnime = useSelector(getMostPopularAnime);
  useEffect(() => {
    dispatch(fetchHighestRated());
    dispatch(fetchMostPopular());
  }, [dispatch]);
  const onCardPress = ({ id, imageId }: CardCallback) => {
    navigate('Detail', {
      item: anime[id],
      imageId,
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView style={styles.scrollContainer}>
          <ScrollCardSection
            title="Highest Rated"
            items={highestRatedAnime.list.map(mapAnimeToCard)}
            onCardPress={onCardPress}
          />
          <ScrollCardSection
            title="Most Popular"
            items={mostPopularAnime.list.map(mapAnimeToCard)}
            onCardPress={onCardPress}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f3f5',
  },
  scrollContainer: {
    height: '100%',
  },
});
