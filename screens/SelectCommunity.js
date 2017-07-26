import React from 'react';
import { View, Picker, Image, StyleSheet, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation'
import ModalDropdown from 'react-native-modal-dropdown';

import { AccentText } from '../components/StyledText'

import Colors from '../constants/Colors'

const Item = Picker.Item;

export default class SelectCommunityScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      communities: ['WAP emlyon', 'WAP GRDF', 'WAP SNCF', 'WAP ALdes', 'WAP sanofi']
    }
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

  _onSelectCommunity(index, community) {
    this.setState({community}, () => console.log("community: "+community))
    this._navigateTo("RootNavigation")
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.imageLogo} source={require('../assets/images/wap-logo.png')}/>
        <AccentText style={styles.textTagLine} fontSize="small">Meet and share your knowledge</AccentText>
        <ModalDropdown
          style={ {width:"100%"} }
          dropdownStyle={styles.dropdownStyle}
          textStyle={styles.textStyle}
          dropdownTextStyle={styles.dropdownTextStyle}
          options={this.state.communities}
          defaultValue="Choose your community ▼"
          onSelect={ this._onSelectCommunity.bind(this) }
        />
      </View>
    );
  }
}

const padding = 16
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding
  },
  imageLogo: {
    //height: 72,
    //width: 221,
    margin:8
  },
  textTagLine: {
    marginBottom: 66,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16
  },
  dropdownTextStyle: {
    fontSize: 14,
  },
  dropdownStyle: {
    width: Dimensions.get('window').width - padding*2,
    //padding,
  }
});
