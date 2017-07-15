
import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { AccentText, SoftText } from '../../components/StyledText';
import Colors from '../../constants/Colors';

export class ExploreParticipantCount extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var maxCount = this.props.maxCount
    var count = this.props.count > maxCount ? maxCount : this.props.count
    var isFull = count >= maxCount

    return (
        <View style={styles.container}>
          <View style={isFull ? styles.containerCountFull : styles.containerCount}>
            <AccentText fontSize={'small'} style={isFull ? styles.textCountFull : styles.textCount}>{isFull ? 'Full' : count}</AccentText>
          </View>
          {this.props.joined && <SoftText fontSize={'micro'} style={styles.textDescription}>joined</SoftText>}
        </View>
    );
  }
}
const countSize = 32
const participantSize = 50
const padding = 16
const paddingBottomText = 4
const borderWidth = 1

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: participantSize,
    width: participantSize,
    marginLeft: padding/2,
  },
  containerCount: {
    justifyContent: 'center',
    alignItems: 'center',
    height: countSize,
    width: countSize,
    borderRadius: countSize/2,
    borderWidth: borderWidth,
    borderColor: Colors.tintColor,
  },
  containerCountFull: {
    justifyContent: 'center',
    alignItems: 'center',
    height: countSize,
    width: countSize,
    borderRadius: countSize/2,
    backgroundColor: Colors.tintColor,
  },
  textDescription: {
    marginTop: padding/4,
  },
  textCount: {
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: paddingBottomText,
  },
  textCountFull: {
    color: '#FFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    paddingBottom: paddingBottomText-2,
  }
})
