import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  COLOR_BLACK,
  COLOR_FIORD,
  COLOR_GRAY_HEATHER,
} from '@app/constants/colors';
import { PADDING } from '@app/constants/dimensions';

const openGithub = () => {
  Linking.openURL('https://github.com/jonathanpalma');
};

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={require('../assets/avatar.jpeg')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Anime Discovery by:</Text>
          <Text style={styles.name}>Jonathan Palma</Text>
        </View>
      </View>
      <TouchableNativeFeedback useForeground={true} onPress={openGithub}>
        <View style={styles.touchable}>
          <Icon name="github" size={32} color={COLOR_FIORD} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: PADDING,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: COLOR_BLACK,
    borderRadius: 22,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
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
  touchable: {
    borderRadius: 25,
    overflow: 'hidden',
    // android's ripple effect
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: -10,
    marginVertical: -8,
  },
  icon: {
    position: 'absolute',
    right: PADDING,
    top: 5,
  },
});

export default Header;
