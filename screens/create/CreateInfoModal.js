
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Button, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal'

import { CustomText } from '../../components/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Styles from '../../App.style';
//import { ExploreParticipantCount } from './ExploreParticipantCount';

export class CreateInfoModal extends Component {

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
        <Modal isVisible={this.state.modalVisible}>
          <View style={Styles.modalContent}>
            <View style={styles.container}>
            <CustomText style={styles.paddingHalf} fontSize="medium">{this.props.title}</CustomText>
            <CustomText style={styles.paddingHalf} fontSize="small">{this.props.description}</CustomText>
            </View>
            <View style={styles.container}>
              <Button
                style={styles.button}
                onPress={() => {this.setModalVisible(false)} }
                title="OK"
                color={Colors.tintColor}
                accessibilityLabel="Click here to dismiss this window"
              />
            </View>
          </View>
        </Modal>
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
    alignItems: 'center',
    padding: paddingHalf,
  },
  paddingHalf: {
    padding: paddingHalf
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
