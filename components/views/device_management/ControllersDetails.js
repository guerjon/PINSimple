import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight} from 'react-native';
import ControllerForm from '../../form/ControllerForm';
import GLOBAL from '../../Globals';

const default_image = require("../../sources/default_controller_icon.imageset/default_controller_icon.png");

export default class ControllerDetails extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		if(this.props.route.data){
			var controller = this.props.route.data; //contiene la informacion necesaria para que cuando entremos desde campus a building no truene
		}else{
			var controller = this.props.route.controller;
		}

		var image_route = "device/get/image/";

  		return(
	  		<View style={{marginTop:56,backgroundColor:GLOBAL.SECONDARY_COLOR}}>
	  			<ControllerForm
	  			 	route={this.props.route} 
					image_route = {image_route}
					defaultImage = {default_image} 
	  			 	navigator={this.props.navigator} 
	  			 	title = "CONTROLLER DETAILS"
	  			 	second_title="LOCATION INFORMATION"
	  			 	third_title = "AREAS"
					next_route = {false}
					campus = {true}
					building = {true}
					area = {true}
					item_id = {controller.device_id}
	  			 	item_name = {controller.device_name}
	  			 	item_description = {controller.room_description}
	  			 	item_campus_name={controller.campus_name}
					item_building_name={controller.building_name}
					item_room_name={controller.room_name}
	  			/>
	  		</View>
  		);
		 
	}
}