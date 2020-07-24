import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_GRAY_ATHENS } from '@app/constants/colors';
import { getSelectedAnime } from '@app/store/slices/entities/anime';
import DetailHeader from '@app/components/DetailHeader';

function Detail() {
  const item = useSelector(getSelectedAnime); // Anime | Manga
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DetailHeader item={item} />
      </SafeAreaView>
    </View>
  );
}

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
