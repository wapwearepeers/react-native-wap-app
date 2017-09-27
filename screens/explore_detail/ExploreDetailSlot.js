
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { AccentText, SoftText } from '../../components/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
//import { ExploreParticipantCount } from './ExploreParticipantCount';

export class ExploreDetailSlot extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    // <Image source={{uri: 'http://i.pravatar.cc/50'}} style={styles.image} />
    const {name, topic, isOrganizer, phone} = this.props
    return (
      <View style={styles.containerMain}>
        <View style={styles.image}>
          <FontAwesome
            name={'user'}
            size={24}
            color={Colors.tintColor}
          />
        </View>
        <View style={styles.container}>
          <AccentText fontSize={'medium'} style={styles.textTitle}>{name}</AccentText>
          <SoftText fontSize={'small'} style={styles.textDescription}>{topic}</SoftText>
        </View>
        <FontAwesome
          style={styles.iconPhone}
          name={isOrganizer ? 'phone' : 'pencil-square-o'}
          size={24}
          color={Colors.tintColor}
        />
      </View>
    );
  }
}
const countSize = 32
const participantSize = 50
const padding = 16
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    padding: padding/2,
    alignItems: 'center',
  },
  image: {
    width: participantSize,
    height: participantSize,
    borderRadius: participantSize/2,
    borderWidth: 1,
    borderColor: Colors.tintColor,
    marginRight: padding,
    //backgroundColor: Colors.darkerWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPhone: {
    marginLeft: padding,
  },
  textTitle: {

  },
  textDescription: {

  }
})
