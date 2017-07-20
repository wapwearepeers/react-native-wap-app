import React from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import Communications from 'react-native-communications';

import Colors from '../constants/Colors';
import Styles from '../App.style';
import { AccentText, SoftText } from '../components/StyledText';
import { ExploreDetailSlotManager } from './explore_detail/ExploreDetailSlotManager';
import { ExploreDetailSlotModal } from './explore_detail/ExploreDetailSlotModal';


export default class ExploreDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'WAP',
    headerTintColor: Colors.tintColor,
    //header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      participants: [
        { id:0, name:'Diane Lenne', topic:'Design like a Finnish', isOwner:true, phone:'+33612345678' },
        { id:1, name:'Gabriel Morin', topic:'UX Design for kids' }
      ],
    };
    this.editedParticipant = null
    this.editedParticipantIndex = -1
  }

  _setModalVisible(visible) {
    this.refs.modal.setModalVisible(visible)
  }

  _addParticipant(name, topic) {
    const { participants } = this.state
    const id = participants.length
    participants.push({ id, name, topic })
    this.setState({participants})
  }

  _updateParticipant(name, topic, i) {
    var { participants } = this.state
    participants[i].name = name
    participants[i].topic = topic
    this.setState({participants})
  }

  _onPressSlot(participant, i) {
    //console.log(`_onPressSlot -> name: ${participant.name} | topic: ${participant.topic} | i: ${i}`)
    if (participant && participant.isOwner) {
      Communications.phonecall(participant.phone, true)

    } else {
      var state = {name:'', topic:''}
      if (participant) {

        const {name, topic} = participant
        this.editedParticipant = participant
        state = {name, topic}
      }
      this.editedParticipantIndex = i
      this.refs.modal.setState(state)
      this._setModalVisible(true)
    }
  }

  _onPressValidate(name, topic) {
    console.log(`name: ${name} | topic: ${topic}`)
    console.log(`wasEditing participant? ${this.editedParticipant}`)
    console.log(`editedParticipantIndex: ${this.editedParticipantIndex}`)
    if (this.editedParticipantIndex > -1)
      this._updateParticipant(name, topic, this.editedParticipantIndex)
    else
      this._addParticipant(name, topic)

    this.editedParticipant = null
    this.editedParticipantIndex = -1
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
          <ExploreDetailSlotModal ref={'modal'} onPressValidate={this._onPressValidate.bind(this)}/>
          <View style={styles.containerWithPadding}>
            <View style={styles.containerTitle}>
              <AccentText fontSize={'mediumBig'} style={styles.textTitle}>{wap.title}</AccentText>
              <SoftText fontSize={'small'} style={styles.textDescription}>{description}</SoftText>
            </View>
            <AccentText fontSize={'medium'} style={styles.textTitle}>Thursday May 5, 14:00</AccentText>
            <AccentText fontSize={'medium'} style={styles.textTitle}>Maker's Lab</AccentText>
          </View>
          <ExploreDetailSlotManager
            style={{width:'100%'}}
            participants={this.state.participants}
            onPressSlot={this._onPressSlot.bind(this)}
            />
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
