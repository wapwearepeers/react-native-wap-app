
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { AccentText, SoftText } from '../../components/StyledText';
//import { ExploreParticipantCount } from './ExploreParticipantCount';

const maxParticipantCount = 6

export class ExploreDetailSlot extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {name, title} = this.props
    return (
      <View style={styles.containerMain}>
        <Image source={{uri: 'http://i.pravatar.cc/50'}} style={styles.image} />
        <View style={styles.container}>
          <AccentText fontSize={'medium'} style={styles.textTitle}>{name}</AccentText>
          <SoftText fontSize={'small'} style={styles.textDescription}>{title}</SoftText>
        </View>
      </View>
    );
  }
}
const countSize = 32
const participantSize = 50
const padding = 16
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    padding: padding/2
  },
  image: {
    width: participantSize,
    height: participantSize,
    borderRadius: participantSize/2,
    marginRight: padding,
  },
  textTitle: {

  },
  textDescription: {

  }
})
