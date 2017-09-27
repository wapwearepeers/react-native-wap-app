import React from 'react'
import { Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class KeyboardAwareScrollViewCompat extends React.Component {

  render() {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAwareScrollView {...this.props}>
          {this.props.children}
        </KeyboardAwareScrollView>
      )
    }

     return (
       <KeyboardAvoidingView {...this.props} behavior="padding" keyboardVerticalOffset={-1000}>
         <ScrollView>
           {this.props.children}
         </ScrollView>
       </KeyboardAvoidingView>
     )
  }
}
