import React from 'react';
import { StackNavigator } from 'react-navigation';

import RootNavigation from './RootNavigation';
import SelectCommunity from '../screens/SelectCommunity';

const FirstLaunchStackNavigator = StackNavigator(
  {
    SelectCommunity: {
      screen: SelectCommunity,
    },
    RootNavigation: {
      screen: RootNavigation,
    },
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
);

export default class FirstLaunchNavigator extends React.Component {

  render() {
    return <FirstLaunchStackNavigator />;
  }
}
