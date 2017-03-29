import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight} from 'react-native';
import GeneralForm from '../../form/GeneralForm';
import GLOBAL from '../../Globals';

const default_source = require("../../sources/default_access_point_icon.imageset/default_endpoint_icon.png");

export default class AccessPointsDetails extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		if(this.props.route.data){
			var access_point = this.props.route.data; //contiene la informacion necesaria para que cuando entremos desde campus a building no truene
		}else{
			var access_point = this.props.route.access_point;
		}

		var image_route = "device/get/image/";

  		return(
	  		<View style={{marginTop:56,backgroundColor:GLOBAL.SECONDARY_COLOR}}>
	  			<GeneralForm
	  			 	route={this.props.route} 
					image_route = {image_route}
					defaultImage = {default_source} 
	  			 	navigator={this.props.navigator} 
	  			 	title = "BUILDING DETAILS"
	  			 	second_title="LOCATION INFORMATION"
	  			 	third_title = "AREAS"
					next_route = {false}
					campus = {true}
					building = {true}
					area = {true}
					item_id = {access_point.room_id}
	  			 	item_name = {access_point.device_name}
	  			 	item_description = {access_point.room_description}
	  			 	item_campus_name={access_point.campus_name}
					item_building_name={access_point.building_name}
					item_room_name={access_point.room_name}
	  			/>
	  		</View>
  		);
		 
	}
}