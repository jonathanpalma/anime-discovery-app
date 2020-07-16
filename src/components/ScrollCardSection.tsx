import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
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
    <TouchableNativeFeedback useForeground={true}>
      <View style={styles.touchable}>
        <Card title={item.title} image={item.image} />
      </View>
    </TouchableNativeFeedback>
  );
  return (
    <View>
      <View style={styles.titleBar}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.link}>View All</Text>
      </View>
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
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 10,
  },
  touchable: {
    marginLeft: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
  title: {
    color: '#b8bece',
    fontWeight: '600',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  link: {
    color: '#b8bece',
    fontWeight: '600',
    fontSize: 13,
  },
  titleBar: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
