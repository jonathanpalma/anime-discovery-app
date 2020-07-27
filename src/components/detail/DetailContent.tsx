import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import TextValue from '@app/components/commons/TextValue';
import useAnimeDetail from '@app/hooks/useAnimeDetail';
import { COLOR_FIORD } from '@app/constants/colors';
import { PADDING } from '@app/constants/dimensions';

type Props = {
  query: ReturnType<typeof useAnimeDetail>;
};

function DetailContent({ query: { data, error, status } }: Props) {
  const [shouldDisplaySpinner, setShouldDisplaySpinner] = useState(false);
  useEffect(() => {
    const timer = setTimeout(
      () => setShouldDisplaySpinner(status === 'loading'),
      1000 // waits 1 sec to show spinner to improve UX
    );
    return () => clearTimeout(timer);
  }, [status, setShouldDisplaySpinner]);
  return (
    <View style={styles.container}>
      {status === 'loading' && (
        <View style={styles.loadingContainer}>
          {shouldDisplaySpinner && (
            <ActivityIndicator size="large" color={COLOR_FIORD} />
          )}
        </View>
      )}

      {status !== 'loading' && status !== 'error' && data?.id && (
        <>
          <TextValue label="Synopsis" value={data?.attributes.synopsis} />
          {data?.attributes.youtubeVideoId && <Text>Open YouTube video</Text>}
        </>
      )}

      {status === 'error' && <Text>Error: {error?.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default DetailContent;
