import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import Card from '@app/components/Card';
import { CardItem } from '@app/ts/types';

type Props = {
  items: CardItem[];
  title: string;
};

type ItemProps = {
  item: CardItem;
};

function ScrollCardSection({ items = [], title }: Props) {
  const { navigate } = useNavigation();
  const renderItem = ({ item }: ItemProps) => (
    <TouchableNativeFeedback
      useForeground={true}
      onPress={() => {
        navigate('Detail', { item });
      }}
    >
      <View style={styles.touchable}>
        <Card id={item?.id} title={item?.title} image={item?.image} />
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
