import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight} from 'react-native';
import EndpointForm from '../../form/EndpointForm';
import GLOBAL from '../../Globals';

const default_source = require("../../sources/default_access_point_icon.imageset/default_endpoint_icon.png");

export default class EndPointsDetails extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		if(this.props.route.data){
			var endpoint = this.props.route.data; //contiene la informacion necesaria para que cuando entremos desde campus a building no truene
		}else{
			var endpoint = this.props.route.endpoint;
		}

		var image_route = "device/get/image/";

  		return(
	  		<View style={{marginTop:56,backgroundColor:GLOBAL.SECONDARY_COLOR}}>
	  			<EndpointForm
	  			 	route={this.props.route} 
					image_route = {image_route}
					defaultImage = {default_source} 
	  			 	navigator={this.props.navigator} 
	  			 	title = "BUILDING DETAILS"
	  			 	second_title = "LOCATION INFORMATION"
	  			 	next_route = {false}
					campus = {true}
					building = {true}
					area = {true}
					item_id = {endpoint.device_id}
	  			 	item_name = {endpoint.device_name}
	  			 	item_description = {endpoint.room_description}
	  			 	item_campus_name={endpoint.campus_name}
					item_building_name={endpoint.building_name}
					item_room_name={endpoint.room_name}
	  			/>
	  		</View>
  		);
		 
	}
}