
import React, { Component } from 'react';
import { ListView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { ExploreRow } from './ExploreRow'
import { SoftText } from '../../components/StyledText';
import Colors from '../../constants/Colors'
import FirebaseApp from '../../firebase.config.js';
import * as FirebaseUtils from '../../utilities/FirebaseUtils.js';
import Moment from 'moment'

@connect((store) => {
  return {
    communityIndex: store.community.index
  }
})
export class ExploreSectionListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataBlob: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }).cloneWithRowsAndSections({})
    };
    const {communityIndex} = props
    this.communityIndex = communityIndex
    this._setRefs(communityIndex)
  }

  componentDidMount() {
    this._subscribeAll()
  }

  _refreshCommunity() {
    const {communityIndex} = this.props
    if (this.communityIndex != communityIndex) {
        this.communityIndex = communityIndex
        this._unsubscribeAll()
        this._setRefs(communityIndex)
        this._subscribeAll()
    }
  }

  _unsubscribeAll() {
    this.wapsRef.off()
  }

  _subscribeAll() {
    this._listenForWaps(this.wapsRef);
  }

  _setRefs(communityIndex) {
    this.wapsRef = FirebaseApp.database().ref("waps/"+communityIndex).orderByChild('createdAt')
  }

  _listenForWaps(wapsRef) {
    wapsRef.on('value', snap => {
      var val = FirebaseUtils.snapshotToArray(snap)
      var dataBlob = {}
      var offset = new Date().getTimezoneOffset()*60*1000
      val.forEach(x => {
        const key = Moment(x.timestamp+offset).format('LLLL')
        if (!dataBlob[key])
          dataBlob[key] = []
        dataBlob[key].push(x)
      })
      var dataSource = this.state.dataSource.cloneWithRowsAndSections(dataBlob)
      this.setState({dataBlob, dataSource, isLoading:false});

    });
  }

  _renderRow(row) {
    const {tags} = row
    var description = tags ? tags.join(" ") : " "
    return (
        <TouchableOpacity onPress={this.props.onPressRow.bind(this, row)}>
          <ExploreRow title={row.theme} description={description} participantCount={row.participants.length} joined={row.joined}  />
        </TouchableOpacity>
    )
  }

  _renderSectionHeader(sectionData, sectionID) {
    return (
      <SoftText fontSize={'small'} style={styles.textSectionHeader}>{sectionID}</SoftText>
    )
  }

  render() {
    this._refreshCommunity()
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ):(
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSectionHeader={this._renderSectionHeader.bind(this)}
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
   paddingTop: 0,
   justifyContent: "center",
  },
  textSectionHeader: {
    paddingTop: padding/2,
    paddingLeft: padding,
    paddingRight: padding,
    paddingBottom: padding/2,
    backgroundColor: Colors.sectionBackground,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
