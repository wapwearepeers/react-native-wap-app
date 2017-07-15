/**
 * @flow
 */

import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import ExploreNavigation from './ExploreNavigation';

import ExploreScreen from '../screens/ExploreScreen';
import CreateScreen from '../screens/CreateScreen';
import MeScreen from '../screens/MeScreen';

export default TabNavigator(
  {
    Explore: {
      screen: ExploreNavigation,
    },
    Create: {
      screen: CreateScreen,
    },
    Me: {
      screen: MeScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      // Set the tab bar icon
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Explore':
            iconName = 'home';
            break;
          case 'Create':
            iconName = 'plus';
            break;
          case 'Me':
            iconName = 'user-circle-o';
        }
        return (
          <FontAwesome
            name={iconName}
            size={24}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    // Put tab bar on bottom of screen on both platforms
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    // Disable animation so that iOS/Android have same behaviors
    animationEnabled: false,
    // Don't show the labels
    tabBarOptions: {
      showLabel: true,
    },
  }
);
