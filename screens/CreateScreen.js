import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import { FormTextInput, FormTextDescription, FormTextInputHashtags, FormChooser } from '../components/Form';
import { ChooserText } from '../components/Chooser';
import { CreateThemeModal } from './create/CreateThemeModal';

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
      time: 'Thursday, May 5 14:00',
      chooserOptionsTheme: ["Innovation & Design", "Arts & Culture", "Better Work", "Human Relationship", "Digital & Tech", "How-To", "Future of Society", "Share Anything"],
      chooserOptionsPlace: ["Maker's Lab", "Cafeteria", "Learning Hub"],
    }
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

  }

  _onPressInfoTopic() {

  }

  _onPressInfoTime() {

  }

  _onPressInfoPlace() {

  }

  _onPressValidate() {

  }

  _onSelectValueTheme(theme, index) {
    this.setState({theme})
  }

  _onSelectValuePlace(place, index) {
    this.setState({place})
  }

  _onPressCreateTheme() {
    this.refs.modal.show()
  }

  _onPressValidateCreateTheme(theme) {
    const chooserOptionsTheme = []
    this.state.chooserOptionsTheme.forEach(o => chooserOptionsTheme.push(o))
    chooserOptionsTheme.push(theme)
    this.setState({chooserOptionsTheme})
    this.formChooserTheme.setState({value: theme})
  }

  render() {
    const placeholder = 'Type here'
    return (
      <View style={styles.container}>
        <CreateThemeModal
          ref={'modal'}
          onPressValidate={this._onPressValidateCreateTheme.bind(this)}
          currentThemes={this.state.chooserOptionsTheme}
          />
        <ScrollView>
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
              }}
              />
            <FormChooser
              ref={f => this.formChooserTheme = f}
              title="Theme"
              description="Choose a theme"
              onPressInfo={this._onPressInfoTheme.bind(this)}
              onPressChooser={this._onSelectValueTheme.bind(this)}
              onPressCreate={this._onPressCreateTheme.bind(this)}
              chooser={this.state.chooser}
              chooseTitle="Choose a WAP theme"
              chooserOptions={this.state.chooserOptionsTheme}
              chooserCreateTitle="Create a new theme"
              />
            <FormTextInputHashtags
              ref="inputTags"
              nextFocus={this.refs.inputTopic}
              title="Describe your theme by 1-2 tags"
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
              description={this.state.time}
              onPressInfo={this._onPressInfoTime.bind(this)}
              />
            <FormChooser
              title="Place"
              description="Choose a place"
              onPressInfo={this._onPressInfoPlace.bind(this)}
              onPressChooser={this._onSelectValuePlace.bind(this)}
              chooser={this.state.chooser}
              chooseTitle="Choose a place"
              chooserOptions={this.state.chooserOptionsPlace}
              />
            {false && <Text>{this.state.name} | {this.state.phone} | {this.state.topic} | {this.state.tags}</Text>}
            <Button
              onPress={this._onPressValidate.bind(this)}
              title="Create this WAP"
              color={Colors.tintColor}
              accessibilityLabel="Click here to create a WAP"
            />
        </ScrollView>
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
