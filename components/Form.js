
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AccentText, SoftText, SoftThinText } from './StyledText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Styles from '../App.style.js';
import ActionSheet from 'react-native-actionsheet';

export class BaseForm extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  focus() {
    this.refs.textInput.focus()
  }

  render() {
    return (
      <View style={styles.containerMain}>
        <View style={styles.container}>
          <SoftText fontSize="medium" style={styles.textTitle}>{this.props.title}</SoftText>
            { this.props.formContent }
      </View>
      { this.props.onPressInfo &&
        <TouchableOpacity onPress={this.props.onPressInfo}>
          <FontAwesome
            style={styles.iconEdit}
            name="info-circle"
            size={24}
            color={Colors.tintColor}
            />
        </TouchableOpacity>
      }
      </View>
    );
  }
}

export class FormTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  focus() {
    this.refs.textInput.focus()
  }

  render() {
    return (
      <BaseForm
        formContent={
          <TextInput
            style={Styles.textInput}
            ref="textInput"
            returnKeyType="next"
            autoFocus={false}
            onSubmitEditing={(event) => { if (this.props.nextFocus) this.props.nextFocus.focus(); }}
            autoCapitalize="sentences"
            {...this.props.inputProps}
          />
        }
        {...this.props}
      />
    );
  }
}

export class FormTextDescription extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  focus() {
    this.refs.textInput.focus()
  }

  render() {
    return (
      <BaseForm
        formContent={
          <SoftThinText fontSize="small" style={Styles.textInput}>{this.props.description}</SoftThinText>
        }
        {...this.props}
      />
    );
  }
}

export class FormChooser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  focus() {
    this.refs.textInput.focus()
  }

  _onPressChooser() {
    if (this.props.onPressChooser)
      this.props.onPressChooser()
    const chooser = this.props.chooser
    if (chooser) {
      chooser.onSelectValue = this._onSelectValue.bind(this)
      chooser.onPressCreate = this._onPressCreate.bind(this)
      chooser.setContent(this.props.chooserTitle, this.props.chooserOptions, this.props.chooserCreateTitle,
        () => chooser.show()
      )
    }
  }

  _onSelectValue(value, index) {
    this.setState({value})
    if (this.props.onSelectValue)
      this.props.onSelectValue(value, index)
  }

  _onPressCreate() {
    if (this.props.onPressCreate)
    this.props.onPressCreate()
  }

  render() {
    return (
      <View>
        <BaseForm
          formContent={
            <TouchableOpacity onPress={this._onPressChooser.bind(this)}>
              <AccentText fontSize="small" style={Styles.textInput}>{this.state.value ? this.state.value : this.props.description}</AccentText>
            </TouchableOpacity>
          }
          {...this.props}
        />
      </View>
    );
  }
}

export class FormTextInputHashtags extends Component {
  constructor(props) {
    super(props);
    this.state = {value:null}
  }

  focus() {
    this.refs.textInput.focus()
  }

  getHashtags() {
    return this.state.value.replace(" ", "").split("#")
  }

  _onChangeText(text) {
    var tags = text.split(" ")
    var value = ""
    tags.forEach((tag, i) => {
      tag = tag.replace(/[^\w\s]/gi, '')
      if (tag && tag !== "") {
        value += "#" + tag
        if (i < tags.length-1)
          value += " "
      }
    })
    this.setState({value})
    if (this.props.onChangeValue)
      this.props.onChangeValue(value)

    if (this.props.onChangeHashtags)
      this.props.onChangeHashtags(Array.from(new Set(tags)))
  }

  _onBlur() {
    var value = null
    if (this.state.value) {
      value = this.state.value.trim()
      var last = value.length-1
      if (value[last] == '#') {
        value = value.slice(0, -1).trim()
      }
    }

    this.setState({value})
  }

  render() {
    return (
      <FormTextInput
        ref="textInput"
        {...this.props}
        inputProps={{
          ...this.props.inputProps,
          value: this.state.value,
          onChangeText: this._onChangeText.bind(this),
          onBlur: this._onBlur.bind(this),
          keyboardType: "email-address"
        }}
        />
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
    flex:1,
    //width: '100%',
  },
  containerMain: {
    width: '100%',
    flexDirection: 'row',
    padding: padding / 2,
    alignItems: 'flex-end',
  },
  iconEdit: {
    marginLeft: padding,
    marginBottom: paddingHalf
  },
  textIndex: {
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: paddingBottomText,
  },
  textDescription: {

  }
})
