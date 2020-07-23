import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import camelCase from 'lodash/camelCase';
import Card from '@app/components/Card';
import { COLOR_GRAY_HEATHER } from '@app/constants/colors';
import { CardCallback, CardItem } from '@app/ts/types';

type Props = {
  items: CardItem[];
  title: string;
  onCardPress: (cb: CardCallback) => void;
};

type ItemProps = {
  item: CardItem;
};

function ScrollCardSection({
  items = [],
  onCardPress = (_) => {},
  title,
}: Props) {
  const renderItem = ({ item }: ItemProps) => {
    const imageId = `${camelCase(title)}.${item?.id}`;
    return (
      <TouchableNativeFeedback
        useForeground={true}
        onPress={() => {
          onCardPress({ id: item.id, imageId });
        }}
      >
        <View style={styles.touchable}>
          <Card id={imageId} title={item.title} image={item.image} />
        </View>
      </TouchableNativeFeedback>
    );
  };
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
        keyExtractor={(item) => item?.id}
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
    color: COLOR_GRAY_HEATHER,
    fontWeight: '600',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  link: {
    color: COLOR_GRAY_HEATHER,
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
