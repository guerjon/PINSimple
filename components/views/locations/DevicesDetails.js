import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight} from 'react-native';
import GeneralForm from '../../form/GeneralForm';
import GLOBAL from '../../Globals';

const default_source = require("../../sources/default_access_point_icon.imageset/default_endpoint_icon.png");

export default class DeviceDetails extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		var device = this.props.route.data;
		var image_route = "device/get/image/";
		
  		return(
	  		<View style={{marginTop:57,backgroundColor:GLOBAL.SECONDARY_COLOR}}>
	  			<GeneralForm
	  			 	route={this.props.route} 
					image_route = {image_route}
					defaultImageRoute = {default_source}
	  			 	navigator={this.props.navigator} 
	  			 	title = "DEVICE DETAILS"
	  			 	second_title="LOCATION INFORMATION"
	  			 	third_title = "access_points"
	  			 	item_id = {device.device_id}
	  			 	item_name = {device.device_name}
	  			 	item_description = {device.device_description}
	  			 	next_route = {false}
					campus = {true}
					building= {true}
					area = {true}
	  			/>
	  		</View>
  		);
		 
	}
}