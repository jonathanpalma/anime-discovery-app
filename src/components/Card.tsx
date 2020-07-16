import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  image: string;
  title: string;
};

function Card({ image, title }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.cover}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 14,
    height: 225,
    width: 150,
    marginLeft: 20,
    marginTop: 20,
    // box-shadow
    elevation: 3,
    shadowColor: '#000',
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
    height: 150,
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    backgroundColor: 'gray',
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
  },
  title: {
    color: '#3c4560',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
