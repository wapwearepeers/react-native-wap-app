import React from 'react';
import { Platform, View, Text, Button, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from '../constants/Colors';
import { FormTextInput, FormTextDescription, FormTextInputHashtags, FormChooser } from '../components/Form';
import { ChooserText } from '../components/Chooser';
import { CreateThemeModal } from './create/CreateThemeModal';
import { CreateInfoModal } from './create/CreateInfoModal';
import Firebase from 'firebase'
import FirebaseApp from '../firebase.config.js';

const idCommunity = "1"

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
      date: 'Thursday, May 5 14:00',
      chooserOptionThemes: [],
      chooserOptionPlaces: [],
      isLoadingThemes: true,
      isLoadingPlaces: true,
    }
    const db = FirebaseApp.database()
    this.themesRef = db.ref("themes/"+idCommunity)
    this.placesRef = db.ref("places/"+idCommunity)
    this.wapsRef = db.ref("waps/"+idCommunity)
  }

  componentDidMount() {
    this.listenForThemes(this.themesRef);
    this.listenForPlaces(this.placesRef);
  }

  listenForThemes(themesRef) {
    themesRef.on('value', snap => {
      console.log("snap: " + JSON.stringify(snap.val()))
      var chooserOptionThemes = snap.val()
      this.setState({chooserOptionThemes, isLoadingThemes: false});
    });
  }

  listenForPlaces(placesRef) {
    placesRef.on('value', snap => {
      var chooserOptionPlaces = snap.val()
      const newTheme = this.newTheme
      if (newTheme && !chooserOptionPlaces.includes(newTheme))
        chooserOptionPlaces.push(newTheme)
      this.setState({chooserOptionPlaces, isLoadingPlaces: false});
    });
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
    this._showModal(
      "Why are some WAP themes unusable?",
      "When a theme is unusable, it means there are existing WAP proposals using this theme. In this case, you can either join the existing WAP, or create a different theme."
    )
  }

  _onPressInfoTopic() {
    const {theme} = this.state
    var currentTheme = theme ? `"${theme}"` : "the current theme"
    this._showModal(
      "What is a sharing?",
      `A sharing can be either your experience, interest, knowledge or questions.

You can share through showing, explaining, discussions or activities within 20 min.

In this WAP, your sharing should be related to ${currentTheme}.`
    )
  }

  _onPressInfoTime() {
    this._showModal(
      "Why can’t I choose the time?",
      "WAP is organized regularly on the same date and time in order to gather the community together."
    )
  }

  _onPressInfoPlace() {
    this._showModal(
      "What are the places?",
      `These places are chosen as the best open places in your campus for knowledge sharing.

At each place, you will find a WAP sign where you will meet your group.

After gathering, your group have the freedom to choose the place to start your WAP.`
    )
  }

  _onSelectValueTheme(theme, index) {
    this.setState({theme})
  }

  _onSelectValuePlace(place, index) {
    this.setState({place})
  }

  _onPressCreateTheme() {
    this.refs.modalTheme.show()
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

  _showModal(modalInfoTitle, modalInfoDescription) {
    this.setState({modalInfoTitle, modalInfoDescription}, () => {
      this.refs.modalInfo.show()
    })
  }

  _onPressValidateCreateWap() {
    if (this.newTheme) 
      this.themesRef.set(this.state.chooserOptionThemes)
    var newWapRef = this.wapsRef.push()
    const {name, phone, theme, tags, topic, date, place} = this.state
    newWapRef.set({
      theme,
      tags,
      topic,
      date,
      timestamp: Firebase.database.ServerValue.TIMESTAMP,
      place,
      participants:[{name, phone, topic, isOrganizer:true}]
    })
    this.props.navigation.goBack()
  }

  getContainerFromPlatform(content) {
    //if (Platform.OS === 'ios') {
      return (
        <KeyboardAwareScrollView>
          {content}
        </KeyboardAwareScrollView>
      )
    //}

    // return (
    //   <ScrollView>
    //     <KeyboardAvoidingView behavior="padding">
    //       {content}
    //     </KeyboardAvoidingView>
    //   </ScrollView>
    // )
  }

  getContent() {
    const placeholder = 'Type here'
    return (
      <View>
        <FormTextInput
          title="Your name"
          nextFocus={this.refs.inputPhone}
          inputProps={{
            placeholder,
            value: this.state.name,
            onChangeText: this._onChangeTextName.bind(this),
          }}
        />
        <FormTextInput
          ref="inputPhone"
          nextFocus={this.refs.inputTags}
          title="Your phone number"
          inputProps={{
            placeholder,
            value: this.state.phone,
            onChangeText: this._onChangeTextPhone.bind(this),
            keyboardType: "phone-pad",
          }}
          />
        <FormChooser
          ref={f => this.formChooserTheme = f}
          title="Theme"
          description="Choose a theme"
          onPressInfo={this._onPressInfoTheme.bind(this)}
          onSelectValue={this._onSelectValueTheme.bind(this)}
          onPressCreate={this._onPressCreateTheme.bind(this)}
          chooser={this.state.chooser}
          chooseTitle="Choose a WAP theme"
          chooserOptions={this.state.chooserOptionThemes}
          chooserCreateTitle="Create a new theme"
          isLoading={this.state.isLoadingThemes}
          />
        <FormTextInputHashtags
          ref="inputTags"
          nextFocus={this.refs.inputTopic}
          title="Describe your theme by 1-2 tags"
          onChangeHashtags={(tags => this.setState({tags}))}
          onChangeValue={(tagsToString => this.setState({tagsToString}))}
          inputProps={{
            placeholder: "Use space to separate"
          }}
          />
        <FormTextInput
          title="Title of your sharing"
          ref="inputTopic"
          onPressInfo={this._onPressInfoTopic.bind(this)}
          inputProps={{
            placeholder,
            value: this.state.topic,
            onChangeText: this._onChangeTextTopic.bind(this),
          }}
          />
        <FormTextDescription
          title="Time"
          description={this.state.date}
          onPressInfo={this._onPressInfoTime.bind(this)}
          />
        <FormChooser
          title="Place"
          description="Choose a place"
          onPressInfo={this._onPressInfoPlace.bind(this)}
          onSelectValue={this._onSelectValuePlace.bind(this)}
          chooser={this.state.chooser}
          chooseTitle="Choose a place"
          chooserOptions={this.state.chooserOptionPlaces}
          isLoading={this.state.isLoadingPlaces}
          />
        {false && <Text>{this.state.name} | {this.state.phone} | {this.state.theme} | {this.state.topic} | {this.state.tags}</Text>}
        <Button
          onPress={this._onPressValidateCreateWap.bind(this)}
          title="Create this WAP"
          color={Colors.tintColor}
          accessibilityLabel="Click here to create a WAP"
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <CreateThemeModal
          ref="modalTheme"
          onPressValidate={this._onPressValidateCreateTheme.bind(this)}
          currentThemes={this.state.chooserOptionThemes}
          />
        <CreateInfoModal
          ref="modalInfo"
          title={this.state.modalInfoTitle}
          description={this.state.modalInfoDescription}
          />
        {this.getContainerFromPlatform(this.getContent())}
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
