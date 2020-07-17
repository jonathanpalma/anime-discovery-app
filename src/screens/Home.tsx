import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ScrollCardSection from '@app/components/ScrollCardSection';
import { Item } from '@app/ts/types';

// TODO: get information from API
const ITEMS: Item[] = [
  {
    image:
      'https://media.kitsu.io/anime/poster_images/5714/small.jpg?1408456259',
    slug: '1',
    title: 'Kimetsu No Yaiba',
  },
  {
    image:
      'https://media.kitsu.io/anime/poster_images/5714/small.jpg?1408456259',
    slug: '2',
    title: 'Boku No Hero Academia',
  },
  {
    image:
      'https://media.kitsu.io/anime/poster_images/5714/small.jpg?1408456259',
    slug: '3',
    title: 'Shingeki No Kyoji',
  },
];

function Home() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView style={styles.scrollContainer}>
          <ScrollCardSection title="Title 1" items={ITEMS} />
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
