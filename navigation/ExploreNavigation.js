import React from 'react';
import { StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors'

import MainTabNavigator from './MainTabNavigator';

import ExploreScreen from '../screens/ExploreScreen';
import ExploreDetailScreen from '../screens/ExploreDetailScreen';
import CreateScreen from '../screens/CreateScreen';

const ExploreStackNavigator = StackNavigator(
  {
    Main: {
      screen: ExploreScreen,
    },
    Detail: {
      screen: ExploreDetailScreen,
    },
    Create: {
      screen: CreateScreen,
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

export default class ExploreNavigation extends React.Component {
  static navigationOptions = {
    title: 'Explore',
    header: null,
    headerTintColor: Colors.tintColor,
  }

  render() {
    return <ExploreStackNavigator />;
  }
}
