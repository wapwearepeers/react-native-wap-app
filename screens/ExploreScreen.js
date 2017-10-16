import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import { setCommunityId, setCommunityCanAddPlaces } from "../actions/communityActions"

import Colors from '../constants/Colors'

import { ExploreSectionListView } from './explore/ExploreSectionListView';
import FirebaseApp from '../firebase.config.js';
import * as FirebaseUtils from '../utilities/FirebaseUtils.js';
import Moment from 'moment'

const padding = 16
const dropdownHeight = 32



export const EventButton = (props) => {
  let testButton = (
  <TouchableOpacity onPress={() => props.navigation.navigate('Create', { name: 'Create'})}>
    <FontAwesome
      style={{margin:12}}
      name={'plus-circle'}
      size={32}
      color={Colors.tabIconSelected}
    />
  </TouchableOpacity>)
  return testButton
}



///////////////////////////////////
// SCREEN STARTS HERE
@connect((store) => {
  return {
    communityId: store.community.id
  }
})
export default class ExploreScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    let { params } = navigation.state
    return {
      title: 'Agenda',
      headerTitleStyle: {alignSelf:'center', fontWeight:'normal'},
      headerTintColor: "#000",
      headerRight: (
        <EventButton
          navigation={navigation}
        />
      ),
      headerLeft: !params || params.isLoadingDropdown ? (
          <ActivityIndicator style={{padding:8}} />
        ):(
          <ModalDropdown
            ref="modalDropdown"
            style={[styles.dropdown, {width:120}]}
            dropdownStyle={styles.dropdownStyle}
            textStyle={styles.textStyle}
            dropdownTextStyle={styles.dropdownTextStyle}
            options={params ? params.communities : null}
            defaultValue={params ? params.defaultValue : "Choose your community ▼"}
            onSelect={params ? params.onSelect : null}
          />
        )
    };
  };


  constructor(props) {
    super(props)
    this.state = {
      dataBlob: {},
      isLoadingListView: true
    }
    const {communityId} = props
    this.communityId = communityId
    this._setRefs(communityId)
  }

  componentDidMount() {
    console.log("componentDidMount -> _queryCommunities")
    this._queryCommunities()
    this._subscribeAll()
    this.props.navigation.setParams({isLoadingDropdown:true, onSelect:this._onSelectCommunity.bind(this)})
  }

  _refreshCommunity() {
    const {communityId} = this.props
    if (this.communityId != communityId) {
        this.communityId = communityId
        this._unsubscribeAll()
        this._setRefs(communityId)
        this._subscribeAll()
    }
  }

  _unsubscribeAll() {
    this.wapsRef.off()
  }

  _subscribeAll() {
    this._listenForWaps(this.wapsRef);
  }

  _setRefs(communityId) {
    this.wapsRef = FirebaseApp.database()
      .ref(`waps/${communityId}`)
      .orderByChild('timestamp')
      .startAt(new Date().getTime()-(4 * 7 * 24 * 3600 * 1000)); // 2 Hours in mili sec
  }

  _listenForWaps(wapsRef) {
    wapsRef.on('value', snap => {
      var val = FirebaseUtils.snapshotToArray(snap)
      var dataBlob = {}
      var offset = 0 //Platform.OS === 'ios' ? 0 : new Date().getTimezoneOffset()*60*1000
      // val.sort(function (a, b) {
      //   return a.createdAt - b.createdAt;
      // });
      val.forEach(x => {
        const key = Moment(x.timestamp+offset).format('LLLL')
        if (!dataBlob[key])
          dataBlob[key] = []
        dataBlob[key].push(x)
      })
      this.setState({dataBlob, isLoadingListView:false});
    });
  }

  _queryCommunities() {
    FirebaseApp.database().ref("communities").once('value').then(snap => {
      let communities = snap.val()
      this.communities = communities
      let communitiesJson = communities.map(x => x.name)
      let isLoadingDropdown = false
      let {communityId} = this.props
      let defaultValue = communities.filter(x => {console.log("x.id", x.id); console.log("communityId", communityId); return x.id == communityId})[0].name
      this.props.navigation.setParams({communities: communitiesJson, isLoadingDropdown, communityId, defaultValue})
    });
  }

  _onSelectCommunity(index, community) {
    var { canAddPlaces, id } = this.communities[index]
    if (!canAddPlaces)
      canAddPlaces = "false"
    else
      canAddPlaces = canAddPlaces.toString()

    this.setState({isLoadingListView:true}, () => {
      AsyncStorage.multiSet([['communityId', id.toString()], ['canAddPlaces', canAddPlaces]], () => {
        this.props.dispatch(setCommunityId(id))
        this.props.dispatch(setCommunityCanAddPlaces(canAddPlaces))
        console.log("canAddPlaces", canAddPlaces)
      })
    })
  }

  render() {
    this._refreshCommunity()
    return (
      <View style={styles.container}>
        <ExploreSectionListView
          ref="listView"
          onPressRow={this._onPressRow}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          dataBlob={this.state.dataBlob}
          isLoading={this.state.isLoadingListView}
          onPressEmptyView={() => this.props.navigation.navigate('Create', { name: 'Create'})}
          />
      </View>
    );
  }

  _onPressRow = (row) => {
    // SHOULD PASS ROW
    this.props.navigation.navigate('Detail', {wap: row})
    //console.log("------------------------------")
    //console.log(JSON.stringify(row))
    //console.log("------------------------------")
  };

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will run slightly slower but
          you have access to useful development tools. {learnMoreButton}.
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  dropdown: {
    width: "100%",
    height: dropdownHeight,
    padding: 8
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.tintColor,
  },
  dropdownTextStyle: {
    fontSize: 14,
  },
  dropdownStyle: {
    width: Dimensions.get('window').width - padding,
    //padding,
  }
});
