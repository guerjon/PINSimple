import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight,Modal, Image} from 'react-native';
import GLOBAL from '../../Globals';
import ListItem from '../ListItem';
import GridItem from '../GridItem';

var styles = StyleSheet.create({
    listView: {
      backgroundColor: '#F5FCFF',
    }
});

const image_route = "access_point/get/image/";
const default_image = require("../../sources/default_access_point_icon.imageset/default_endpoint_icon.png");

export default class AccessPoints extends Component {

    constructor(props) {
      super(props);
      this.state = {
        access_points : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      }
      
    }


  componentWillReceiveProps(nextProps) {
    if(nextProps.data){
      this.setState({
        access_points : this.state.access_points.cloneWithRows(nextProps.data) ,
      });
      }
  }

    renderText(access_point){
      return (
        <View>
          <Text>{access_point.campus_name} - {access_point.building_name} - {access_point.room_name} </Text>
        </View>
      );
    }
 
    renderAccessPoint(access_point){
    var data = {
      index:"access_points_details",
      access_point: access_point    
    }

    return (  
      <View >
        <TouchableHighlight  
           
          onPress={
            () => this.props.navigator.push(data)
          }
        >
              <View>
                <ListItem 
                  image_route={image_route} 
                  item_name={access_point.device_name} 
                  item_id={access_point.access_point_id} 
                  text={this.renderText(access_point)} 
                  defaultImage = {default_image}
                />  
              </View>
        </TouchableHighlight >
      </View>
    );      
    }

    renderAccessPointGrid(access_point){
    var data = {
      index:"access_points_details",
      access_point: access_point    
    }

    var styles = {
          item: {
            margin: 10,
            width: 150,
            height: 150,
            borderWidth: 1,
            elevation: 2
      },
      
    }
    return (
      <TouchableHighlight
        onPress={
          () => this.props.navigator.push(data)
        }
        style={styles.item}
      >
        <View>
          <GridItem 
                image_route={image_route} 
                item_name={access_point.device_name} 
                item_id={access_point.access_point_id} 
                defaultImage = {default_image}
          />
        </View>
      </TouchableHighlight>
    );
    }

  render() {


    if(this.props.activeView == "list_view"){
      return (
        <View style={{marginBottom:150}}>
          <ListView 
            dataSource={this.state.access_points}
            renderRow={(access_point) => this.renderAccessPoint(access_point)}
            enableEmptySections={true}
            key={this.props.activeView}
          />        
        </View>
      );    
      }else{  
        var styles = {
        list: {
              flexDirection: 'row',
              flexWrap: 'wrap'
          },   
      }
          
        return (
          <View style={{marginBottom:150}}>
            <ListView 
                contentContainerStyle={styles.list}
                dataSource={this.state.access_points}
                renderRow={(access_point) => this.renderAccessPointGrid(access_point)}
                enableEmptySections={true}
                key={this.props.separateData}
            />  
          </View>
        );
        
      }
  }
}

/*

*/