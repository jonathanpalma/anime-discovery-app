import { createAppContainer } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Detail from '@app/screens/Detail';
import Home from '@app/screens/Home';

const AppNavigator = createAppContainer(
  createSharedElementStackNavigator(
    {
      Home,
      Detail,
    },
    {
      headerMode: 'none',
      defaultNavigationOptions: {
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: { opacity: progress },
        }),
        cardStyle: {
          backgroundColor: 'transparent',
        },
      },
    }
  )
);

export default AppNavigator;
