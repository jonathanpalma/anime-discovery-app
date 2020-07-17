import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'react-navigation-hooks';

function Detail() {
  const { getParam } = useNavigation();
  const image = getParam('image', '');
  const title = getParam('title', '');
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Detail: {title}</Text>
        {image !== '' && <Image style={styles.image} source={{ uri: image }} />}
      </SafeAreaView>
    </View>
  );
}

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
    // position: 'absolute',
    // left: 0,
    // top: 0,
  },
});
