
import React, { Component } from 'react';
import { Platform, Image, ListView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ExploreRow } from './ExploreRow'
import { SoftText } from '../../components/StyledText';
import Colors from '../../constants/Colors'

export class ExploreSectionListView extends Component {

  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    }).cloneWithRowsAndSections({})
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

  _renderListView(dataSource) {
    const isEmpty = dataSource.getRowCount() == 0
    if (isEmpty)
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Image source={require('../../assets/images/empty-wap-icon.png')}/>
          <SoftText style={{textAlign:"center", margin:16}} fontSize="small">No future waps to come... {"\n"}Be the first one to create one !</SoftText>
        </View>
      )
    else
      return (
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
        />
      )
  }

  render() {
    this.dataSource = this.dataSource.cloneWithRowsAndSections(this.props.dataBlob)
    return (
      <View style={styles.container}>
        {
          this.props.isLoading ?
          (<ActivityIndicator />) : this._renderListView(this.dataSource)
        }
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
