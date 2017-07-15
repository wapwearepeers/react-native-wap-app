import React from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  //TouchableOpacity,
  View,
} from 'react-native';

// import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors'

import { ExploreSectionListView } from './explore/ExploreSectionListView';

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
    headerTintColor: Colors.tintColor,
    //header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <ExploreSectionListView
          onPressRow={this._onPressRow}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          />
      </View>
    );
  }

  _onPressRow = (row) => {
    // SHOULD PASS ROW
    this.props.navigation.navigate('Detail', {wap: row})
    //console.log("------------------------------")
    //console.log(JSON.stringify(row))
    //console.log("------------------------------")
  };

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will run slightly slower but
          you have access to useful development tools. {learnMoreButton}.
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
