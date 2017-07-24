
import React, { Component } from 'react';
import Colors from '../constants/Colors';
import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 1
const title = 'Which one do you like?'

export class ChooserText extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: '',
      options: [ 'Cancel', 'Apple', 'Banana', 'Watermelon', 'Durian' ],
      title: 'Which one do you like?',
    }
    this.handlePress = this.handlePress.bind(this)
    this.show = this.show.bind(this)
  }

  setContent(title, optionsNoCancel, createTitle, callback) {
    const options =  ['Cancel']
    optionsNoCancel.forEach(o => options.push(o))
    var destructiveButtonIndex = -1
    if (createTitle) {
      options.push(createTitle)
      destructiveButtonIndex = options.length-1
    }
    this.setState({title, options, destructiveButtonIndex}, callback)
  }

  show() {
    this.ActionSheet.show()
  }

  handlePress(i) {
    this.setState({
      selected: i
    })
    const destructiveButtonIndex = this.state.destructiveButtonIndex
    if (i !== destructiveButtonIndex) {
      if (i > 0 && this.onSelectValue) {
        const value = this.state.options[i]
        this.onSelectValue(value, i)
      }
    } else {
      if (this.onPressCreate)
        this.onPressCreate()
    }

  }

  render() {
    return (
      <ActionSheet
         ref={o => this.ActionSheet = o}
         title={this.state.title}
         options={this.state.options}
         cancelButtonIndex={CANCEL_INDEX}
         destructiveButtonIndex={this.state.destructiveButtonIndex}
         onPress={this.handlePress}
         tintColor={Colors.tintColor}
       />
    );
  }
}
