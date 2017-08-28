
import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { AccentText, SoftText } from '../../components/StyledText';
import { ExploreDetailSlot } from './ExploreDetailSlot';
import { ExploreDetailSlotEmpty } from './ExploreDetailSlotEmpty';

const maxParticipantCount = 6

export class ExploreDetailSlotManager extends Component {

  constructor(props) {
    super(props)
  }

  _onPressSlot(participant, i) {
    this.props.onPressSlot(participant, i)
  }

  _onPressSlotEmpty(index) {
    this.props.onPressSlot(null, -1)
  }

  _buildSlotList() {
      return this.props.participants.map((participant, i) => {
        const {name, topic, isOrganizer, phone} = participant
        return (
          <TouchableOpacity key={"participant_"+i} onPress={this._onPressSlot.bind(this, participant, i)} style={styles.containerSlot}>
            <ExploreDetailSlot name={name} topic={topic} isOrganizer={isOrganizer} phone={phone} />
          </TouchableOpacity>
        )
      })
  }

  _buildSlotEmptyList() {
    const slotEmptyList = []
    for (i = this.props.participants.length; i < maxParticipantCount; i++)
      slotEmptyList.push(
        <TouchableOpacity key={`empty_${i}`} onPress={this._onPressSlotEmpty.bind(this, i)} style={styles.containerSlot}>
          <ExploreDetailSlotEmpty theme={this.props.theme} index={i+1} />
        </TouchableOpacity>
      )
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
    //flex: 1,
    width:'100%',
    padding: padding/2,
  },
  containerSlot: {
    //flex:1,
    width:'100%',
  },
  textTitle: {

  },
  textDescription: {

  }
})
