import React from 'react';
import { AsyncStorage, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import SplashScreen from './screens/SplashScreen';
import FirstLaunchNavigation from './navigation/FirstLaunchNavigation';
import Store from "./Store"
import { setCommunityIndex } from "./actions/communityActions"

import cacheAssetsAsync from './utilities/cacheAssetsAsync';

const SPLASH_SCREEN_MIN_DURATION = 2000

export default class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({hasFinishedMinDuration: true})
    }, SPLASH_SCREEN_MIN_DURATION)
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [require('./assets/images/expo-wordmark.png')],
        fonts: [
          FontAwesome.font,
          //{ 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
          { 'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf') },
          { 'raleway-semi-bold': require('./assets/fonts/Raleway-SemiBold.ttf') },
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      AsyncStorage.getItem('communityIndex', (err, communityIndex) => {
        if (err) {
          console.log("error: "+err);
        } else {
          console.log(communityIndex);
          this.communityIndex = communityIndex
          Store.dispatch(setCommunityIndex(communityIndex))
          this.setState({ appIsReady: true });
        }
      });
    }
  }

  render() {
    if (this.state.appIsReady && this.state.hasFinishedMinDuration) {
      return (
        <Provider store={Store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' &&
              <View style={styles.statusBarUnderlay} />}
            {this.communityIndex && this.communityIndex > -1 ? (
              <RootNavigation />
            ) : (
              <FirstLaunchNavigation />
            )}
          </View>
        </Provider>
      );
    } else {
      return <SplashScreen />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
