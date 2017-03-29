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

const image_route = "device/get/image/";
const default_image = require("../../sources/default_controller_icon.imageset/default_controller_icon.png");

export default class Controllers extends Component {

    constructor(props) {
      	super(props);
      	this.state = {
        	controllers : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      	}
    }

  	componentWillReceiveProps(nextProps) {
 
    	if(nextProps.data){
      		this.setState({
        		controllers : this.state.controllers.cloneWithRows(nextProps.data) ,
      		});
      	}
  	}

    renderText(controller){
      	return (
        	<View>
          		<Text>{controller.campus_name} - {controller.building_name} - {controller.room_name} </Text>
        	</View>
      	);
    }
 
    renderAccessPoint(controller){
	    var data = {
	      	index:"controllers_details",
	      	controller: controller    
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
	                  item_name={controller.device_name} 
	                  item_id={controller.device_id} 
	                  text={this.renderText(controller)} 
	                  defaultImage = {default_image}
	                />  
	              </View>
	        </TouchableHighlight >
	      </View>
	    );      
    }

    renderAccessPointGrid(controller){
    var data = {
      index:"controllers_details",
      controller: controller    
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
                item_name={controller.device_name} 
                item_id={controller.device_id} 
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
				dataSource={this.state.controllers}
				renderRow={(controller) => this.renderAccessPoint(controller)}
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
                dataSource={this.state.controllers}
                renderRow={(controller) => this.renderAccessPointGrid(controller)}
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