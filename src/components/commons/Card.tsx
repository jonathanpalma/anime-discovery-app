import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { COLOR_BLACK, COLOR_FIORD, COLOR_WHITE } from '@app/constants/colors';

type Props = {
  id: string;
  image: string;
  title: string;
};

function Card({ id, image, title }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.cover}>
        <SharedElement id={`item.${id}.image`}>
          <Image
            style={styles.image}
            source={{ uri: image }}
            resizeMode="cover"
          />
        </SharedElement>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_WHITE,
    borderRadius: 14,
    height: 225,
    width: 150,
    // box-shadow
    elevation: 3,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cover: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 175,
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 175,
    width: 150,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  title: {
    color: COLOR_FIORD,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Card;
