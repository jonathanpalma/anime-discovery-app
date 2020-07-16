import React from 'react';
import ReduxProvider from '@app/components/ReduxProvider';
import AppNavigator from '@app/navigation/AppNavigator';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <ReduxProvider>
      <AppNavigator />
    </ReduxProvider>
  );
};

export default App;
