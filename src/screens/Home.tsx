import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

function Home() {
  const { navigate } = useNavigation();
  const goToDetail = () => {
    navigate('Detail');
  };
  return (
    <View>
      <Text>Home</Text>
      <View>
        <Button onPress={goToDetail} title="Go to detail" />
      </View>
    </View>
  );
}

export default Home;
