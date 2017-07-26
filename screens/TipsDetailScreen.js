import React from 'react';
import { ScrollView, Button, StyleSheet } from 'react-native';
import { AccentText } from '../components/StyledText';
import Colors from '../constants/Colors'

export default class TipsDetailScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
         title: navigation.state.params.title
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <AccentText style={styles.text} fontSize="medium">{this.props.navigation.state.params.content}</AccentText>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  text: {
    width: '100%',
    alignItems: 'center',
  },
});
