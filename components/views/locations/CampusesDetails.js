import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight} from 'react-native';
import GeneralForm from '../../form/GeneralForm';
import GLOBAL from '../../Globals';

const default_image = require("../../sources/default_campus_icon.imageset/campus_default_icon.png");

export default class CampusesDetails extends Component {
	constructor(props) {
		super(props);
	}

	appendsCampusName(items,name){
		for(var i = 0;i < items.length; i++ ){
			items[i].campus_name = name;
		}
		return items;
	}

	render(){
		var campus = this.props.route.campus;
		var image_route = "campus/get/image/";
		var buildings = this.appendsCampusName(campus.buildings,campus.campus_name);

  		return(
	  		<View style={{marginTop:56,backgroundColor:GLOBAL.SECONDARY_COLOR}}>
	  			<GeneralForm
	  			 	route={this.props.route} 
					image_route = {image_route}
					defaultImage = {default_image}
	  			 	navigator={this.props.navigator} 
	  			 	title = "CAMPUS DETAILS"
	  			 	second_title="LOCATION INFORMATION"
	  			 	third_title = "BUILDINGS"
	  			 	item_id = {campus.campus_id}
	  			 	item_name = {campus.campus_name}
	  			 	item_description = {campus.campus_description}
					item_address= {campus.campus_address}
					item_city= {campus.campus_city}
					item_state= {campus.campus_state}
					item_zip= { campus.campus_city}
					item_pieces = {buildings}
					next_route = "buildings_details"
					address = {true}
					city = {true}
					state= {true}
					zip = {true}
	  			/>
	  		</View>
  		);
		 
	}
}