
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput } from 'react-native';
import { CustomTextInput } from '../../components/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
//import { ExploreParticipantCount } from './ExploreParticipantCount';

const maxParticipantCount = 6

export class ExploreDetailSlotEdit extends Component {

  constructor(props) {
    super(props);
    //this.state = {participant: {}}
  }

  render() {
    const focused = false
    return (
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
            placeholder={'Type your name'}
            returnKeyType={"next"}
            autoFocus={true}
            onChangeText={(name) => this.props.participant = {name, topic:this.props.participant.topic}}
            onSubmitEditing={(event) => {
              this.refs.descriptionInput.focus();
            }}
          />
          <TextInput
            ref={'descriptionInput'}
            style={styles.textInput}
            placeholder={'Type the title of your sharing'}
            onChangeText={(topic) => this.props.participant = {name:this.props.participant.name, topic}}
            onSubmitEditing={(event) => {
              this.props.onValidate(this.props.participant)
            }}
          />
        <Text>{this.props.participant.name + ': '+this.props.participant.topic}</Text>
        </View>
        <FontAwesome
          style={styles.iconEdit}
          name={'pencil-square-o'}
          size={24}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </View>
    );
  }
}

const countSize = 32
const participantSize = 50
const padding = 16
const paddingHalf = 8
const paddingBottomText = 4
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
  textTitle: {

  },
  textDescription: {

  }
})
