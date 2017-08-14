import React from 'react';
import { AsyncStorage, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import SplashScreen from './screens/SplashScreen';
import FirstLaunchNavigation from './navigation/FirstLaunchNavigation';
import Store from "./Store"
import { setCommunityId, setCommunityCanAddPlaces } from "./actions/communityActions"

import cacheAssetsAsync from './utilities/cacheAssetsAsync';

//const SPLASH_SCREEN_MIN_DURATION = 0

export default class AppContainer extends React.Component {
  state = {
    appIsReady: false,
    hasFinishedMinDuration: true,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  componentDidMount() {
    // if (SPLASH_SCREEN_MIN_DURATION > 0) {
    //   setTimeout(() => {
    //     this.setState({hasFinishedMinDuration: true})
    //   }, SPLASH_SCREEN_MIN_DURATION)
    // } else {
    //   this.setState({hasFinishedMinDuration: true})
    // }
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
      AsyncStorage.multiGet(['communityId', 'canAddPlaces'], (err, stores) =>{
        if (err) {
          console.log("error: ", err);
        } else {
          console.log("stores", stores);
          stores.map((result, i, store) => {
           // get at each store's key/value so you can work with it
           let key = store[i][0];
           let value = store[i][1];
           switch(key) {
             case 'communityId': this.communityId = value; break;
             case 'canAddPlaces': this.canAddPlaces = value; break;
           }
          });
          Store.dispatch(setCommunityId(this.communityId))
          Store.dispatch(setCommunityCanAddPlaces(this.canAddPlaces))
          this.setState({ appIsReady: true });
        }
      })

      // AsyncStorage.getItem('communityId', (err, communityId) => {
      //   if (err) {
      //     console.log("error: ", err);
      //   } else {
      //     console.log(communityId);
      //     this.communityId = communityId
      //     Store.dispatch(setCommunityId(communityId))
      //     this.setState({ appIsReady: true });
      //   }
      // });
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
            {this.communityId && this.communityId > -1 ? (
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
