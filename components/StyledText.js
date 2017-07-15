import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

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

export class AccentText extends React.Component {
  render() {
    const fontSizeKey = this.props.fontSize ? this.props.fontSize : 'medium'
    return (
      <Text
        {...this.props}
        style={[{
          fontFamily: 'raleway-medium',
          color: Colors.accentText,
          fontSize: fontSizeMap[fontSizeKey],
        }, this.props.style]}
      />
    );
  }
}

export class SoftText extends React.Component {
  render() {
    const fontSizeKey = this.props.fontSize ? this.props.fontSize : 'medium'
    return (
      <Text
        {...this.props}
        style={[{
          fontFamily: 'raleway-semi-bold',
          color: Colors.softText,
          fontSize: fontSizeMap[fontSizeKey],
        }, this.props.style]}
      />
    );
  }
}
