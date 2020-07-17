import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: string;
};

function TextValue({ label, value }: Props) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default TextValue;

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
  value: {
    fontWeight: '600',
  },
});
