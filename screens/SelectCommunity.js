import React from 'react';
import { AsyncStorage, View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import ModalDropdown from 'react-native-modal-dropdown';
import FirebaseApp from '../firebase.config.js';

import { AccentText } from '../components/StyledText'
import { setCommunityId, setCommunityCanAddPlaces } from "../actions/communityActions"

import Colors from '../constants/Colors'

@connect()
export default class SelectCommunityScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.itemsRef = FirebaseApp.database().ref("communities")
    this.state = { communities: [], isLoading: true }
    //   communities: ['WAP emlyon', 'WAP GRDF', 'WAP SNCF', 'WAP ALdes', 'WAP sanofi']
    // }
  }

  componentDidMount() {
    console.log("componentDidMount -> _queryCommunities")
    this._queryCommunities(this.itemsRef)
  }

  _queryCommunities(itemsRef) {
    itemsRef.once('value').then(snap => {
      var snapArray = snap.val()
      this.communities = snapArray
      console.log(JSON.stringify(snapArray))
      var communities = snapArray.map(x => x.name)
      var isLoading = false
      this.setState({communities, isLoading})
    });
  }

  _goToApp() {
    this._navigateTo('RootNavigation')
  }

  _navigateTo = (routeName: string) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  _onSelectCommunity(index, community) {
    var { canAddPlaces, id } = this.communities[index]
    if (!canAddPlaces)
      canAddPlaces = "false"
    else
      canAddPlaces = canAddPlaces.toString()

    this.setState({isLoadingListView:true}, () => { // HACK this state is useless but avoid doing async storage while already writing state
      AsyncStorage.multiSet([['communityId', id.toString()], ['canAddPlaces', canAddPlaces]], () => {
        this.props.dispatch(setCommunityId(id))
        this.props.dispatch(setCommunityCanAddPlaces(canAddPlaces))
        this._goToApp()
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.imageLogo} source={require('../assets/images/wap-logo.png')}/>
        <AccentText style={styles.textTagLine} fontSize="small">Meet and share your knowledge</AccentText>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ):(
          <ModalDropdown
            style={{width:"100%"}}
            dropdownStyle={styles.dropdownStyle}
            textStyle={styles.textStyle}
            dropdownTextStyle={styles.dropdownTextStyle}
            options={this.state.communities}
            defaultValue="Choose your community ▼"
            onSelect={ this._onSelectCommunity.bind(this) }
          />
        )}
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
