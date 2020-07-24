import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLOR_GRAY_HEATHER, COLOR_FIORD } from '@app/constants/colors';

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

const styles = StyleSheet.create({
  label: {
    color: COLOR_FIORD,
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: COLOR_GRAY_HEATHER,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TextValue;
