/**
 * @flow
 */

import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import ExploreNavigation from './ExploreNavigation';
import TipsNavigation from './TipsNavigation';

import CreateScreen from '../screens/CreateScreen';

export default TabNavigator(
  {
    Explore: {
      screen: ExploreNavigation,
    },
    // Create: {
    //   screen: CreateScreen,
    // },
    Tips: {
      screen: TipsNavigation,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      // Set the tab bar icon
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        let size
        switch (routeName) {
          case 'Explore':
            iconName = 'calendar-o';
            size = 30
            break;
          case 'Create':
            iconName = 'plus-circle';
            size = 30
            break;
          case 'Tips':
            iconName = 'lightbulb-o';
            size = 34
        }
        return (
          <FontAwesome
            name={iconName}
            size={size}
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
