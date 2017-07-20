
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal'

import { CustomTextInput } from '../../components/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Styles from '../../App.style';
//import { ExploreParticipantCount } from './ExploreParticipantCount';

export class ExploreDetailSlotModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name:'',
      topic:'',
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _onPressValidate() {
    this.props.onPressValidate(this.state.name, this.state.topic)
    this.setModalVisible(false)
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
              <View style={styles.image}>
              <FontAwesome
                name={'user'}
                size={24}
                color={Colors.tabIconDefault}
              />
              </View>
              <View style={styles.container}>
                <TextInput
                  style={styles.textInput}
                  value={this.state.name}
                  placeholder={'Type your name'}
                  returnKeyType={"next"}
                  autoFocus={true}
                  onChangeText={(name) => this.setState({name})}
                  onSubmitEditing={(event) => { this.refs.descriptionInput.focus(); }}
                  autoCapitalize={'words'}
                />
                <TextInput
                  ref={'descriptionInput'}
                  style={styles.textInput}
                  value={this.state.topic}
                  placeholder={'Type the title of your sharing'}
                  onChangeText={(topic) => this.setState({topic})}
                  onSubmitEditing={(event) => { this._onPressValidate() }}
                  autoCapitalize={'sentences'}
                />
              </View>
              <FontAwesome
                style={styles.iconEdit}
                name={'pencil-square-o'}
                size={24}
                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={[Styles.button, styles.button]} onPress={ () => {this.setModalVisible(false)} }>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[Styles.button, styles.button]} disabled={!this._canValidate()} onPress={() => { this._onPressValidate() }}>
                <Text>Validate</Text>
              </TouchableOpacity>
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
