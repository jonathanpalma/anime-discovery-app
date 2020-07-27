import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import camelCase from 'lodash/camelCase';
import Card from '@app/components/commons/Card';
import ScrollCardSectionSkeleton from '@app/components/commons/ScrollCardSectionSkeleton';
import { COLOR_GRAY_HEATHER } from '@app/constants/colors';
import { CardCallback, CardItem } from '@app/ts/types';
import { PADDING } from '@app/constants/dimensions';

type Props = {
  isLoading: boolean;
  items: CardItem[];
  title: string;
  onCardPress: (cb: CardCallback) => void;
};

type ItemProps = {
  item: CardItem;
};

function ScrollCardSection({
  isLoading = false,
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
      {isLoading && isEmpty(items) ? (
        <ScrollCardSectionSkeleton />
      ) : (
        <FlatList
          contentContainerStyle={styles.horizontalScrollContainer}
          data={items}
          horizontal={true}
          keyExtractor={(item) => item?.id}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalScrollContainer: {
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: PADDING,
    paddingTop: 10,
  },
  cardSkeleton: {
    borderRadius: 14,
    height: 225,
    width: 150,
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
    marginHorizontal: PADDING,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScrollCardSection;
