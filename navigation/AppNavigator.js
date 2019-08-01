import React from 'react';
import { createAppContainer, createStackNavigator  } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DetailScreen from '../screens/SearchScreen';


const appNavigator = createStackNavigator({
  Main: {
    screen: MainTabNavigator,
  },
  detail: {
    screen: DetailScreen,
  }

})


export default createAppContainer(
  appNavigator
);
