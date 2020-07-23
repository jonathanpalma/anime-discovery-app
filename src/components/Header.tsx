import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  COLOR_BLACK,
  COLOR_FIORD,
  COLOR_GRAY_HEATHER,
} from '@app/constants/colors';

function Header() {
  return (
    <View style={styles.header}>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://avatars3.githubusercontent.com/u/12414771?v=4',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Anime Discovery by:</Text>
        <Text style={styles.name}>Jonathan Palma</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginVertical: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: COLOR_BLACK,
    borderRadius: 22,
  },
  container: {
    paddingLeft: 10,
  },
  title: {
    color: COLOR_GRAY_HEATHER,
    fontSize: 16,
    fontWeight: '500',
  },
  name: {
    color: COLOR_FIORD,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
