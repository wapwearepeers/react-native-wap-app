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
import FirebaseApp from '../firebase.config.js';

const idCommunity = 1

export default class ExploreDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'WAP',
    headerTintColor: "#000",
    //header: null,
  }

  constructor(props) {
    super(props)
    const {state} = this.props.navigation;
    const {wap} = state.params;
    const {key, tags, theme, place, date, participants} = wap
    var description = tags ? tags.join(" ") : " "
    this.state = {
      modalVisible: false,
      tags, theme, place, date, participants
    };
    this.editedParticipant = null
    this.editedParticipantIndex = -1
    this.wapRef = FirebaseApp.database().ref("waps/"+idCommunity+"/"+key)
    this.participantsRef = FirebaseApp.database().ref("waps/"+idCommunity+"/"+key+"/participants")
  }

  componentDidMount() {
    this._listenForWap(this.wapRef);
  }

  _listenForWap(wapRef) {
    wapRef.on('value', snap => {
      console.log("snap:"+JSON.stringify(snap))
      const {key, tags, theme, place, date, participants} = snap.val()
      this.setState({tags, theme, place, date, participants});
    });
  }

  _setModalVisible(visible) {
    this.refs.modal.setModalVisible(visible)
  }

  _addParticipant(name, topic) {
    const { participants } = this.state
    participants.push({name, topic})
    this.setState({participants})
    this.participantsRef.set(participants)
  }

  _updateParticipant(name, topic, i) {
    var { participants } = this.state
    participants[i].name = name
    participants[i].topic = topic
    this.setState({participants})
    this.participantsRef.set(participants)
  }

  _onPressSlot(participant, i) {
    //console.log(`_onPressSlot -> name: ${participant.name} | topic: ${participant.topic} | i: ${i}`)
    if (participant && participant.isOrganizer) {
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
    const {tags, theme, date, place} = this.state
    var description = (tags ? tags.join(" ") : " ") + "\n"
    return (
      <ScrollView>
        <View style={styles.container}>
          <ExploreDetailSlotModal ref={'modal'} onPressValidate={this._onPressValidate.bind(this)}/>
          <View style={styles.containerWithPadding}>
            <View style={styles.containerTitle}>
              <AccentText fontSize={'mediumBig'} style={styles.textTitle}>{theme}</AccentText>
              <SoftText fontSize={'small'} style={styles.textDescription}>{description}</SoftText>
            </View>
            <AccentText fontSize={'medium'} style={styles.textTitle}>{date}</AccentText>
            <AccentText fontSize={'medium'} style={styles.textTitle}>{place}</AccentText>
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
