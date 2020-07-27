import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ReadMore from 'react-native-read-more-text';
import { COLOR_FIORD, COLOR_GRAY_HEATHER } from '@app/constants/colors';

type Props = {
  label: string;
  value?: string;
};

const renderTruncatedFooter = (handlePress: () => void) => (
  <Text style={styles.textToggle} onPress={handlePress}>
    View more
  </Text>
);

const renderRevealedFooter = (handlePress: () => void) => (
  <Text style={styles.textToggle} onPress={handlePress}>
    View less
  </Text>
);

function TextValue({ label, value }: Props) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <ReadMore
        numberOfLines={4}
        renderTruncatedFooter={renderTruncatedFooter}
        renderRevealedFooter={renderRevealedFooter}
      >
        <Text style={styles.value}>{value}</Text>
      </ReadMore>
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
    color: COLOR_FIORD,
    fontSize: 14,
    fontWeight: '500',
  },
  textToggle: {
    color: COLOR_GRAY_HEATHER,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default TextValue;
