import React from 'react';
import { StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors'

import MainTabNavigator from './MainTabNavigator';

import TipsScreen from '../screens/TipsScreen';
import TipsDetailScreen from '../screens/TipsDetailScreen';

const TipsStackNavigator = StackNavigator(
  {
    Main: {
      screen: TipsScreen,
    },
    Detail: {
      screen: TipsDetailScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal'
      },
    }),
  }
);

export default class TipsNavigation extends React.Component {
  static navigationOptions = {
    title: 'Tips',
    header: null,
    headerTintColor: Colors.tintColor,
  }

  render() {
    return <TipsStackNavigator />;
  }
}
