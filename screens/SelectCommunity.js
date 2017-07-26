import React from 'react';
import { View, Picker, Image, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation'

import { AccentText } from '../components/StyledText'

import Colors from '../constants/Colors'

const Item = Picker.Item;

export default class SelectCommunityScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  _goToApp(community) {
    this._navigateTo('RootNavigation')//, {community})
  }

  _navigateTo = (routeName: string) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.imageLogo} source={require('../assets/images/wap-logo.png')}/>
        <AccentText style={styles.textTagLine} fontSize="small">Meet and share your knowledge</AccentText>
        <Picker style={{width:'100%'}}
          selectedValue={this.state.language}
          onValueChange={(language, index) => this.setState({language})}>
          <Item label="Java" value="java" />
          <Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imageLogo: {
    //height: 72,
    //width: 221,
    margin:8
  },
  textTagLine: {
    marginBottom: 66,
  }
});
