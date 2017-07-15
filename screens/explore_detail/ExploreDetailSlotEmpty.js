
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { AccentText, SoftText } from '../../components/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
//import { ExploreParticipantCount } from './ExploreParticipantCount';

const maxParticipantCount = 6

export class ExploreDetailSlotEmpty extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const focused = false
    const iconName = 'pencil-square-o'
    return (
      <View style={styles.containerMain}>
        <View style={styles.image} />
        <View style={styles.container}>
          <SoftText fontSize={'medium'} style={styles.textTitle}>Free spot</SoftText>
          <SoftText fontSize={'small'} style={styles.textDescription}>Join to share about Innovative Design</SoftText>
        </View>
        <FontAwesome
          style={styles.iconEdit}
          name={iconName}
          size={24}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </View>
    );
  }
}

const countSize = 32
const participantSize = 50
const padding = 16
const paddingBottomText = 4
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    padding: padding / 2,
    alignItems: 'center',
  },
  image: {
    width: participantSize,
    height: participantSize,
    borderRadius: participantSize/2,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.separator,
    marginRight: padding,
    //backgroundColor: Colors.darkerWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEdit: {
    marginLeft: padding,
  },
  textIndex: {
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: paddingBottomText,
  },
  textDescription: {

  }
})
