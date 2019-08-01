import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SearchScreen from '../screens/SearchScreen';


const config = Platform.select({
  web: { 
    headerMode: 'screen'
  },
  default: {
    headerMode: 'screen',
    // 导航栏默认属性
    defaultNavigationOptions: {
      headerStyle: {
        height: 50
      }
    }
  },
});



const SearchStack = createStackNavigator(
  {
    search: SearchScreen
  },
  config
);

export default SearchStack;
