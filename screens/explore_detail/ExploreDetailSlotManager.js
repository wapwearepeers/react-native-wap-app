
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { AccentText, SoftText } from '../../components/StyledText';
import { ExploreDetailSlot } from './ExploreDetailSlot';
import { ExploreDetailSlotEmpty } from './ExploreDetailSlotEmpty';

const maxParticipantCount = 6

export class ExploreDetailSlotManager extends Component {

  _buildSlotList() {
      return this.props.participants.map((parcipant) => {
        return (
          <ExploreDetailSlot key={parcipant.id} name={parcipant.name} title={parcipant.title} />
        )
      })
  }

  _buildSlotEmptyList() {
    const slotEmptyList = []
    for (i = this.props.participants.length; i < maxParticipantCount; i++)
      slotEmptyList.push(<ExploreDetailSlotEmpty index={i+1} key={`empty_${i}`}/>)
    return slotEmptyList
  }

  render() {
    return (
      <View style={styles.container}>
        {this._buildSlotList()}
        {this._buildSlotEmptyList()}
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
    padding: padding/2
  },
  textTitle: {

  },
  textDescription: {

  }
})
