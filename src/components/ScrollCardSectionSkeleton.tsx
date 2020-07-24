import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function ScrollCardSectionSkeleton() {
  return (
    <FlatList
      contentContainerStyle={styles.horizontalScrollContainer}
      data={[...Array(10).keys()]}
      horizontal={true}
      keyExtractor={(item) => `${item}`}
      renderItem={() => (
        <SkeletonPlaceholder speed={1200}>
          <SkeletonPlaceholder.Item
            width={150}
            height={225}
            borderRadius={14}
            marginLeft={10}
          />
        </SkeletonPlaceholder>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  horizontalScrollContainer: {
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 10,
  },
});

export default React.memo(ScrollCardSectionSkeleton);
