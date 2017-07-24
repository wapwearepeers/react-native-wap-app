import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

import Colors from '../constants/Colors'

export default class TipsScreen extends React.Component {
  static navigationOptions = {
    title: 'Tips',
    headerTintColor: "#000",
    //header: null,
  };

  render() {
    return (
      <ScrollView style={styles.container}>

        {/* Go ahead and delete ExpoConfigView and replace it with your
           * content, we just wanted to give you a quick view of your config */}
        <ExpoConfigView />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
