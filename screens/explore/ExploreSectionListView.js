
import React, { Component } from 'react';
import { ListView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ExploreRow } from './ExploreRow'
import { SoftText } from '../../components/StyledText';
import Colors from '../../constants/Colors'
import FirebaseApp from '../../firebase.config.js';
import * as FirebaseUtils from '../../utilities/FirebaseUtils.js';

const idCommunity = 1

export class ExploreSectionListView extends Component {

  constructor(props) {
    super(props);
    this.wapsRef = FirebaseApp.database().ref("waps/"+idCommunity).orderByChild('timestamp')
    const dataBlob = {
      // '5 may': [
      //   {title:'Innovation & Design', tags:['informationredundance', 'educationchange'], participantCount:5, joined:true},
      //   {title:'Art & Culture', tags:['digitalnomadlifestyle', 'creativewriting'], participantCount:2, joined:true},
      //   {title:'Human Relationship', tags:['hackbrainreality', 'growthmindset'], participantCount:4, joined:false},
      //   {title:'Better Work', tags:['relearntolearn', 'sellinnovativeservices'], participantCount:6, joined:false},
      // ],
      // '12 may': [
      //   {title:'Pre-WAP', tags:['innovationanddesign'], participantCount:6, joined:false},
      //   {title:'How To', tags:['organiccooking', 'findyourspontaneity'], participantCount:6, joined:true},
      //   {title:'Human Relationship', tags:['hackbrainreality', 'growthmindset'], participantCount:4, joined:false},
      //   {title:'Better Work', tags:['relearntolearn', 'sellinnovativeservices'], participantCount:6, joined:false},
      // ],
      // '17 may': [
      //   {title:'Innovation & Design', tags:['informationredundance', 'educationchange'], participantCount:5, joined:true},
      //   {title:'Art & Culture', tags:['digitalnomadlifestyle', 'creativewriting'], participantCount:2, joined:true},
      //   {title:'Human Relationship', tags:['hackbrainreality', 'growthmindset'], participantCount:4, joined:false},
      //   {title:'Better Work', tags:['relearntolearn', 'sellinnovativeservices'], participantCount:6, joined:false},
      // ],
    }
    this.state = {
      isLoading: true,
      dataBlob,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }).cloneWithRowsAndSections(dataBlob)
    };


    // setTimeout(() => {
    //   const dataBlob = this.state.dataBlob;
    //   dataBlob['K'] = ['Kata', 'Khalil', 'Kata', 'Khalil', 'Kata', 'Khalil', 'Kata', 'Khalil', 'Kata', 'Khalil']
    //
    //   console.log("------------------------------")
    //   console.log(JSON.stringify(dataBlob))
    //   console.log("------------------------------")
    //
    //   this.setState({dataBlob, dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob)})
    // }, 3000)
  }

  componentDidMount() {
    this.listenForWaps(this.wapsRef);
  }

  listenForWaps(wapsRef) {
    wapsRef.on('value', snap => {
      console.log("snap:"+JSON.stringify(snap))

      // get children as an array
      var val = FirebaseUtils.snapshotToArray(snap)
      console.log("val: "+JSON.stringify(val))
      var dataBlob = {}
      val.forEach(x => {
        const key = x.date
        if (!dataBlob[key])
          dataBlob[key] = []
        dataBlob[key].push(x)
      })
      var dataSource = this.state.dataSource.cloneWithRowsAndSections(dataBlob)

      //console.log("dataBlob: "+JSON.stringify(dataBlob))

      // items.forEach((child) => {
      //   console.log(JSON.stringify(child.val()))
      //   //items.push({
      //     //title: child.val().title,
      //     //_key: child.key
      //   //});
      // });

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
