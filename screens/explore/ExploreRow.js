
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { AccentText, SoftText } from '../../components/StyledText';
import { ExploreParticipantCount } from './ExploreParticipantCount';

const maxParticipantCount = 6

export class ExploreRow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.containerMain}>
        <View style={styles.container}>
          <AccentText fontSize={'medium'} style={styles.textTitle}>{this.props.title}</AccentText>
          <SoftText fontSize={'small'} style={styles.textDescription}>{this.props.description}</SoftText>
        </View>
        <ExploreParticipantCount maxCount={maxParticipantCount} count={this.props.participantCount} joined={this.props.joined} />
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
    alignItems: 'center',
    padding,
  },
  textTitle: {

  },
  textDescription: {

  }
})
