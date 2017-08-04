import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

import Colors from '../constants/Colors'

export default class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.imageLogo} source={require('../assets/icons/loading-icon.png')}/>
        <Text style={styles.textTagLine} fontSize="small">Meet and share your knowledge</Text>
        <ActivityIndicator />
      </View>
    );
  }
}

const padding = 16
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding
  },
  imageLogo: {
    //height: 72,
    //width: 221,
    margin:8
  },
  textTagLine: {
    marginBottom: 66,
  }
});
