
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Button, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal'

import { CustomTextInput } from '../../components/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Styles from '../../App.style';
//import { ExploreParticipantCount } from './ExploreParticipantCount';

const padding = 16
const paddingHalf = 8
const paddingBottomText = 4
const countSize = 32
const participantSize = 50

export class CreateValueModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      value:'',
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setValue(value, callback) {
    this.setState({value}, callback);
  }

  show() {
    this.setModalVisible(true)
  }

  _onPressValidate() {
    var values = this.props.currentValues
    var value = this.state.value.trim()
    if (values == null || !values.includes(value)) {
      this.props.onPressValidate(value)
      this.setState({value: null})
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
        <Modal isVisible={this.state.modalVisible}
          onLayout={(event) => {
            var {x, y, width, height} = event.nativeEvent.layout;
            this.setState({
              textInputWidth: (width - padding*3),
            })
          }}>
          <View style={Styles.modalContent}>
            <View style={styles.containerMain}>
              <View style={styles.container}>
                <TextInput
                  ref="input"
                  autoFocus={true}
                  style={[Styles.textInput, {width:this.state.textInputWidth}]}
                  value={this.state.value}
                  placeholder={'Type here'}
                  onChangeText={(value) => this.setState({value})}
                  onSubmitEditing={(event) => { this._onPressValidate() }}
                  autoCapitalize={'sentences'}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop:padding}}>
              <View style={{flex:1}}>
                <Button
                  onPress={() => {this.setModalVisible(false)} }
                  title="Cancel"
                  color={Colors.tintColor}
                  accessibilityLabel="Click here to Cancel"
                />
              </View>
              <View style={{flex:1, marginLeft:padding}}>
                <Button
                  disabled={!this._canValidate()}
                  onPress={() => { this._onPressValidate() }}
                  title="Submit"
                  color={Colors.tintColor}
                  accessibilityLabel="Click here to create a new Theme"
                />
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

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
  buttonWrapper: {
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
