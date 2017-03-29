import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight} from 'react-native';
import GeneralForm from '../../form/GeneralForm';
import GLOBAL from '../../Globals';

const default_source = require("../../sources/default_room_icon.imageset/default_area_icon.png");


export default class RoomsDetails extends Component {
	constructor(props) {
		super(props);
	}

	appendsInfo(items,campus_name,building_name,room_name){
		for(var i = 0;i < items.length; i++ ){
			items[i].campus_name = campus_name;
			items[i].building_name = building_name;
			items[i].room_name = room_name;
		}
		return items;
	}

	render(){
		
		if(this.props.route.data){
			var room = this.props.route.data; //contiene la informacion necesaria para que cuando entremos desde campus a building no truene
			var devices = room.devices;
		
		}else{
			var room = this.props.route.room;
			var devices = this.props.route.room.devices;
		}

		var image_route = "room/get/image/";

		var devices = this.appendsInfo(devices,room.campus_name,room.building_name,room.room_name);

  		return(
	  		<View style={{marginTop:56,backgroundColor:GLOBAL.SECONDARY_COLOR}}>
	  			<GeneralForm
	  			 	route={this.props.route} 
					image_route = {image_route}
	  			 	navigator={this.props.navigator}
	  			 	defaultImage = {default_source} 
	  			 	title = "AREA DETAILS"
	  			 	second_title="LOCATION INFORMATION"
	  			 	third_title = "DEVICES"
	  			 	item_id = {room.room_id}
	  			 	item_name = {room.room_name}
	  			 	item_description = {room.room_description}
					item_pieces = {devices}
					item_campus_name={room.campus_name}
					item_building_name={room.building_name}
					next_route = "access_points_details"
					campus = {true}
					building = {true}
	  			/>
	  		</View>
  		);
		 
	}
}