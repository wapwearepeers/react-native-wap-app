import React from 'react';
import { Text, TextInput } from 'react-native';
import Colors from '../constants/Colors';

const padding = 16
const paddingHalf = 8

const fontSizeMap = {
  micro: 12,
  small: 16,
  medium: 20,
  mediumBig: 24,
}

export class MonoText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'space-mono' }]}
      />
    );
  }
}

export class CustomText extends React.Component {
  render() {
    const fontSizeKey = this.props.fontSize ? this.props.fontSize : 'medium'
    return (
      <Text
        {...this.props}
        style={[{
          fontFamily: 'raleway-medium',
          fontSize: fontSizeMap[fontSizeKey],
        }, this.props.style]}
      />
    );
  }
}

export class CustomTextInput extends React.Component {
  render() {
    const fontSizeKey = this.props.fontSize ? this.props.fontSize : 'medium'
    return (
      <TextInput
        {...this.props}
        style={[{
          fontFamily: 'raleway-medium',
          fontSize: fontSizeMap[fontSizeKey],
          paddingLeft: padding,
          paddingRight: padding,
          paddingTop: paddingHalf,
          paddingBottom: paddingHalf,
        }, this.props.style]}
      />
    );
  }
}

export class AccentText extends React.Component {
  render() {
    return (
      <CustomText
        {...this.props}
        style={[{
          color: Colors.accentText,
        }, this.props.style]}
      />
    );
  }
}

export class SoftText extends React.Component {
  render() {
    return (
      <CustomText
        {...this.props}
        style={[{
          fontFamily: 'raleway-semi-bold',
          color: Colors.softText,
        }, this.props.style]}
      />
    );
  }
}
