import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@app/store/configureStore';

type Props = {
  children: React.ReactNode;
};

const store = configureStore();

function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
