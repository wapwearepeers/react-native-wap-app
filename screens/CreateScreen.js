import React from 'react';
import { Platform, View, Text, Button, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import Moment from 'moment'
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import { FormTextInput, FormTextDescription, FormTextInputHashtags, FormChooser } from '../components/Form';
import { ChooserText } from '../components/Chooser';
import KeyboardAwareScrollViewCompat from '../components/KeyboardAwareScrollViewCompat';
import { CreateValueModal } from './create/CreateValueModal';
import { CreateInfoModal } from './create/CreateInfoModal';
import Firebase from 'firebase'
import FirebaseApp from '../firebase.config.js';
import * as FirebaseUtils from '../utilities/FirebaseUtils.js';


//const communityId = "1"
@connect((store) => {
  return {
    communityId: store.community.id,
    canAddPlaces: store.community.canAddPlaces
  }
})
export default class CreateScreen extends React.Component {
  static navigationOptions = {
    title: 'Create',
    headerTintColor: "#000",
    // header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      date: '',
      topic: '',
      chooserOptionThemes: [],
      chooserOptionPlaces: [],
      chooserOptionDates: [],
      isLoadingThemes: true,
      isLoadingPlaces: true,
      isLoadingSchedule: true,
    }
    const {communityId} = props
    this.communityId = communityId
    this._setRefs(communityId)
  }

  componentDidMount() {
    this._subscribeAll()
  }

  _refreshCommunity() {
    const {communityId} = this.props
    if (this.communityId != communityId) {
        this.communityId = communityId
        this._unsubscribeAll()
        this._setRefs(communityId)
        this._subscribeAll()
    }
  }

  _unsubscribeAll() {
    this.themesRef.off()
    this.placesRef.off()
    //this.wapsRef.off()
    this.scheduleRef.off()
  }

  _subscribeAll() {
    this._listenForThemes(this.themesRef);
    this._listenForPlaces(this.placesRef);
    //this._listenForWaps(this.wapsRef);
    this._downloadSchedule(this.scheduleRef);
  }

  _setRefs(communityId) {
    const db = FirebaseApp.database()
    this.themesRef = db.ref(`themes/${communityId}`)
    this.placesRef = db.ref(`places/${communityId}`)
    this.wapsRef = db.ref(`waps/${communityId}`)
    this.scheduleRef = db.ref(`communities/${communityId}/schedule/`)
  }

  _listenForThemes(ref) {
    ref.on('value', snap => {
      //console.log("snap: " + JSON.stringify(snap.val()))
      var chooserOptionThemes = snap.val()
      const t = this.newTheme
      if (t && !chooserOptionThemes.includes(t))
        chooserOptionThemes.push(t)
      this.setState({chooserOptionThemes, isLoadingThemes: false});
    });
  }

  _listenForPlaces(ref) {
    ref.on('value', snap => {
      var chooserOptionPlaces = snap.val()
      const p = this.newPlace
      if (p && !chooserOptionPlaces.includes(p))
        chooserOptionPlaces.push(p)
      this.setState({chooserOptionPlaces, isLoadingPlaces: false});
    });
  }

  _listenForWaps(ref) {
    // ref.on('value', snap => {
    //   var waps = FirebaseUtils.snapshotToArray(snap)
    //   this.nextWeekThemes = []
    //   this.forbiddenThemes = []
    //   waps.forEach(wap => {
    //     const {theme} = wap
    //     if (this.nextWeekThemes.includes(theme))
    //       this.forbiddenThemes.push(theme)
    //     else
    //       this.nextWeekThemes.push(theme)
    //   })
    // });
  }

  _downloadSchedule(ref) {
    ref.once('value', snap => {
      this.schedule = snap.val()
      this._setDateFromSchedule(this.schedule)
    });
  }

  _buildDateFromSchedule(s, addOneMoreWeek) {
    var d = new Date();
    var dif = s.day - d.getDay()
    if (dif < 0)
      dif = 7 + dif
    var newDate = d.getDate()+dif
    if (addOneMoreWeek) newDate += 7
    d.setUTCDate(newDate)
    d.setUTCHours(s.hour)
    d.setUTCMinutes(s.min)
    d.setUTCSeconds(0)
    d.setUTCMilliseconds(0)
    return d
  }

  _buildDateFormated(d) {
    console.log("Platform.OS", Platform.OS)
    var offset = 0//Platform.OS == 'ios' ? 0 : d.getTimezoneOffset()*60*1000
    var dateFormated = Moment(d.getTime()+offset).format('LLLL')
    return dateFormated
  }

  _setDateFromSchedule(schedule, addOneMoreWeek) {
    var chooserOptionDates = []
    this.wapDateArray = []

    var addToArrays = (s, i, addOneMoreWeek) => {
      var date = this._buildDateFromSchedule(s, addOneMoreWeek)
      if (i == 0)
        this.wapDate = date
      this.wapDateArray.push(date)
      var dateFormated = this._buildDateFormated(date)
      chooserOptionDates.push(dateFormated)
    }

    schedule.forEach((s, i) => {
      addToArrays(s, i, false)
    })

    schedule.forEach((s, i) => {
      addToArrays(s, i, true)
    })

    this.setState({chooserOptionDates, isLoadingSchedule:false});
  }

  _onChangeTextName(name) {
    this.setState({name})
  }

  _onChangeTextPhone(phone) {
    this.setState({phone})
  }

  _onChangeTextTopic(topic) {
    this.setState({topic})
  }

  _onPressInfoTheme() {
    const { title, description } = Strings.create.INFO_THEME
    this._showModal(title, description)
  }

  _onPressInfoTopic() {
    const {theme} = this.state
    var currentTheme = theme ? `"${theme}"` : "the current theme"
    const { title, description } = Strings.create.INFO_TOPIC
    this._showModal(title, description(currentTheme))
  }

  _onPressInfoDate() {
    const { title, description } = Strings.create.INFO_DATE
    this._showModal(title, description)
  }

  _onPressInfoPlace() {
    const { title, description } = Strings.create.INFO_PLACE
    this._showModal(title, description)
  }

  _onSelectValueTheme(theme, index) {
    // if (this.forbiddenThemes.includes(theme)) {
    //   this.formChooserTheme.setState({value: null}, () => {
    //     this.setState({theme:null}, () => {
    //       this._showModal(
    //         "Can't select this theme",
    //         "They already are 2 WAP currently happening with this theme. Please join one of theme or select another theme."
    //       )
    //     })
    //   })
    // } else {
    //   if (this.nextWeekThemes.includes(theme)) {
    //     this._setDateFromSchedule(this.schedule, true)
    //   }
    //   this.setState({theme})
    // }
    // NO MORE LIMITATION
    this.setState({theme})
  }

  _onSelectValuePlace(place, index) {
    this.setState({place})
  }

  _onSelectValueDate(date, index) {
    var i = index - 1
    this.wapDate = this.wapDateArray[i]
    this.setState({date})
  }

  _onPressCreateTheme() {
    this.refs.modalTheme.show()
  }

  _onPressCreatePlace() {
    this.refs.modalPlace.show()
  }

  _onPressValidateCreateTheme(theme) {
    const chooserOptionThemes = []
    if (this.state.chooserOptionThemes)
      this.state.chooserOptionThemes.forEach(o => {
        if (o !== this.newTheme)
          chooserOptionThemes.push(o)
      })
    chooserOptionThemes.push(theme)
    this.newTheme = theme
    this.setState({chooserOptionThemes, theme})
    this.formChooserTheme.setState({value: theme})
  }

  _onPressValidateCreatePlaces(place) {
    const chooserOptionPlaces = []
    if (this.state.chooserOptionPlaces)
      this.state.chooserOptionPlaces.forEach(o => {
        if (o !== this.newPlace)
          chooserOptionPlaces.push(o)
      })
    chooserOptionPlaces.push(place)
    this.newPlace = place
    this.setState({chooserOptionPlaces, place})
    this.formChooserPlace.setState({value: place})
  }

  _showModal(modalInfoTitle, modalInfoDescription) {
    this.setState({modalInfoTitle, modalInfoDescription}, () => {
      this.refs.modalInfo.show()
    })
  }

  _onPressValidateCreateWap() {
    if (this.newTheme) 
      this.themesRef.set(this.state.chooserOptionThemes)
    if (this.newPlace) 
      this.placesRef.set(this.state.chooserOptionPlaces)

    var newWapRef = this.wapsRef.push()
    var {name, phone, theme, tags, topic, place} = this.state
    if (!theme) theme = ''
    newWapRef.set({
      theme,
      tags,
      topic,
      timestamp: this.wapDate.getTime(),
      createdAt: Firebase.database.ServerValue.TIMESTAMP,
      place,
      participants:[{name, phone, topic, isOrganizer:true}]
    })
    this.props.navigation.goBack()
  }

  render() {
    this._refreshCommunity()
    const placeholder = 'Type here'
    const {name, phone, theme, tags, topic, place, date, isLoadingThemes, isLoadingPlaces, isLoadingSchedule, chooser, chooserOptionThemes, chooserOptionPlaces, chooserOptionDates} = this.state
    const {canAddPlaces} = this.props
    var isButtonEnabled = name && phone && tags && place && date && this.wapDate

    var onPressCreatePlace
    var createNewPlaceTitle
    if (canAddPlaces == "true") {
      onPressCreatePlace = this._onPressCreatePlace.bind(this)
      createNewPlaceTitle = "Create a new place"
    }
    return (
      <View style={styles.container}>
        <CreateValueModal
          ref="modalTheme"
          onPressValidate={this._onPressValidateCreateTheme.bind(this)}
          currentValues={this.state.chooserOptionThemes}
          />
        <CreateValueModal
          ref="modalPlace"
          onPressValidate={this._onPressValidateCreatePlaces.bind(this)}
          currentValues={this.state.chooserOptionPlaces}
          />
        <CreateInfoModal
          ref="modalInfo"
          title={this.state.modalInfoTitle}
          description={this.state.modalInfoDescription}
          />
        <KeyboardAwareScrollViewCompat>
          <FormTextInput
            title="Your name"
            nextFocus={this.refs.inputPhone}
            inputProps={{
              placeholder,
              value: name,
              onChangeText: this._onChangeTextName.bind(this),
            }}
          />
          <FormTextInput
            ref="inputPhone"
            nextFocus={this.refs.inputTopic}
            title="Your phone number"
            inputProps={{
              placeholder,
              value: phone,
              onChangeText: this._onChangeTextPhone.bind(this),
              keyboardType: "phone-pad",
            }}
            />
          <FormTextInput
            title="Title of your sharing"
            ref="inputTopic"
            nextFocus={this.refs.inputTags}
            onPressInfo={this._onPressInfoTopic.bind(this)}
            inputProps={{
              placeholder,
              value: topic,
              onChangeText: this._onChangeTextTopic.bind(this),
            }}
            />
          {false && <FormChooser
            ref={f => this.formChooserTheme = f}
            title="Theme"
            description="Choose a theme"
            onPressInfo={this._onPressInfoTheme.bind(this)}
            onSelectValue={this._onSelectValueTheme.bind(this)}
            onPressCreate={this._onPressCreateTheme.bind(this)}
            chooser={chooser}
            chooseTitle="Choose a WAP theme"
            chooserOptions={chooserOptionThemes}
            chooserCreateTitle="Create a new theme"
            isLoading={isLoadingThemes}
            />}
          <FormTextInputHashtags
            ref="inputTags"
            title="Describe your wap by 1-2 tags"
            onChangeHashtags={(tags => this.setState({tags}))}
            onChangeValue={(tagsToString => this.setState({tagsToString}))}
            inputProps={{
              placeholder: "Use space to separate"
            }}
            />
          <FormChooser
            title="Date"
            description="Choose a date"
            onPressInfo={this._onPressInfoDate.bind(this)}
            onSelectValue={this._onSelectValueDate.bind(this)}
            chooser={chooser}
            chooseTitle="Choose a date"
            chooserOptions={chooserOptionDates}
            isLoading={isLoadingSchedule}
            />
          <FormChooser
            ref={f => this.formChooserPlace = f}
            title="Place"
            description="Choose a place"
            onPressInfo={this._onPressInfoPlace.bind(this)}
            onSelectValue={this._onSelectValuePlace.bind(this)}
            onPressCreate={onPressCreatePlace}
            chooser={chooser}
            chooseTitle="Choose a place"
            chooserOptions={chooserOptionPlaces}
            chooserCreateTitle={createNewPlaceTitle}
            isLoading={isLoadingPlaces}
            />
          <Button
            onPress={this._onPressValidateCreateWap.bind(this)}
            title="Create this WAP"
            color={Colors.tintColor}
            accessibilityLabel="Click here to create a WAP"
            disabled={!isButtonEnabled}
          />
        </KeyboardAwareScrollViewCompat>
        <ChooserText ref={chooser => !this.state.chooser && this.setState({chooser})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:8,
  },
});
