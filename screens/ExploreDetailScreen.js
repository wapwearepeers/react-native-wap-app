import React from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  //TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import { AccentText, SoftText } from '../components/StyledText';
import { ExploreDetailSlotManager } from './explore_detail/ExploreDetailSlotManager';

export default class ExploreDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'WAP',
    headerTintColor: Colors.tintColor,
    //header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      participants: [
        { id:0, name:'Diane Lenne', title:'Design like a Finnish' }
      ]
    };
  }

  render() {
    const {state} = this.props.navigation;
    const {wap} = state.params;
    var description = ""
    wap.tags.forEach(tag => {
      description += `#${tag} \n`
    })
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerWithPadding}>
            <View style={styles.containerTitle}>
              <AccentText fontSize={'mediumBig'} style={styles.textTitle}>{wap.title}</AccentText>
              <SoftText fontSize={'small'} style={styles.textDescription}>{description}</SoftText>
            </View>
            <AccentText fontSize={'medium'} style={styles.textTitle}>Thursday May 5, 14:00</AccentText>
            <AccentText fontSize={'medium'} style={styles.textTitle}>Maker's Lab</AccentText>
          </View>
          <ExploreDetailSlotManager participants={this.state.participants} />
        </View>
      </ScrollView>
    );
  }
}

const padding = 16
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  containerWithPadding: {
    width: '100%',
    alignItems: 'center',
    padding,
  },
  textDescription: {
    marginTop: padding/2,
    textAlign: 'center',
  },
  containerTitle: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 0,
    marginBottom: padding,
    borderBottomColor: Colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textSectionHeader: {
    paddingTop: padding/2,
    paddingLeft: padding,
    paddingRight: padding,
    paddingBottom: padding/2,
    width: '100%',
    textAlign: 'center',
    backgroundColor: Colors.sectionBackground,
  },
});
