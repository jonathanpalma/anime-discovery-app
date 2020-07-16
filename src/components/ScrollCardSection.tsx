import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Card from '@app/components/Card';
import { Item } from '@app/ts/types';

type Props = {
  items: Item[];
  title: string;
};

type ItemProps = {
  item: Item;
};

function ScrollCardSection({ items = [], title }: Props) {
  const renderItem = ({ item }: ItemProps) => (
    <Card title={item.title} image={item.image} />
  );
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        contentContainerStyle={styles.horizontalScrollContainer}
        data={items}
        horizontal={true}
        keyExtractor={(item) => item.slug}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default ScrollCardSection;

const styles = StyleSheet.create({
  horizontalScrollContainer: {
    paddingBottom: 20,
    paddingEnd: 20,
  },
  title: {
    color: '#b8bece',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 20,
    marginTop: 20,
    textTransform: 'uppercase',
  },
});
