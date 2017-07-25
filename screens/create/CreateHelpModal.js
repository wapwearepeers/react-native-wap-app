
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Button, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal'

import { CustomTextInput } from '../../components/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Styles from '../../App.style';
//import { ExploreParticipantCount } from './ExploreParticipantCount';

export class CreateThemeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      theme:'',
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  show() {
    this.setModalVisible(true)
  }

  _onPressValidate() {
    var themes = this.props.currentThemes
    var theme = this.state.theme
    if (themes && !themes.includes(theme)) {
      this.props.onPressValidate(theme)
      this.setState({theme: null})
      this.setModalVisible(false)
    }
  }

  _canValidate() {
    return true
  }

  render() {
    const focused = false
    return (
      <KeyboardAvoidingView behavior={'position'}>
        <Modal isVisible={this.state.modalVisible}>
          <View style={Styles.modalContent}>
            <View style={styles.containerMain}>
              <View style={styles.container}>
                <TextInput
                  ref="input"
                  autoFocus={true}
                  style={Styles.textInput}
                  value={this.state.theme}
                  placeholder={'Type here'}
                  onChangeText={(theme) => this.setState({theme})}
                  onSubmitEditing={(event) => { this._onPressValidate() }}
                  autoCapitalize={'sentences'}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button
                style={styles.button}
                onPress={() => {this.setModalVisible(false)} }
                title="Cancel"
                color={Colors.tintColor}
                accessibilityLabel="Click here to Cancel"
              />

              <Button
                style={styles.button}
                disabled={!this._canValidate()}
                onPress={() => { this._onPressValidate() }}
                title="Submit"
                color={Colors.tintColor}
                accessibilityLabel="Click here to create a new Theme"
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

const padding = 16
const paddingHalf = 8
const paddingBottomText = 4
const countSize = 32
const participantSize = 50

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerMain: {
    flexDirection: 'row',
    width: '100%',
    padding: padding / 2,
    alignItems: 'center',
  },
  button: {
    flex:1,
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
  textInput: {
    height: 40,
    fontFamily: 'raleway-medium',
    fontSize: 16,
    paddingLeft: padding,
    paddingRight: padding,
    paddingTop: paddingHalf,
    paddingBottom: paddingHalf,
  },
});
