import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Detail from '@app/screens/Detail';
import Home from '@app/screens/Home';

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Home,
      Detail,
    },
    {
      headerMode: 'none',
      defaultNavigationOptions: {
        // cardStyle: {
        //   backgroundColor: 'transparent',
        // },
      },
    }
  )
);

export default AppNavigator;
