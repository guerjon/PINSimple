import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight} from 'react-native';
import GeneralForm from '../../form/GeneralForm';
import GLOBAL from '../../Globals';

const default_source = require("../../sources/default_building_icon.imageset/default_building_icon.png");

export default class BuildingsDetails extends Component {
	constructor(props) {
		super(props);
	}

	appendsInfo(items,campus_name,building_name){
		for(var i = 0;i < items.length; i++ ){
			items[i].campus_name = campus_name;
			items[i].building_name = building_name;
		}
		return items;
	}

	render(){

		//cuando venimos de campus this.props.route.data esta definida
		if(this.props.route.data){
			var building = this.props.route.data; //contiene la informacion necesaria para que cuando entremos desde campus a building no truene
			var rooms = building.rooms;
		
		}else{
			//cuando no venimos de campus pasamos la info a traves de this.props.route.building 
			var building = this.props.route.building;
			var rooms = this.props.route.building.rooms;
		}

		var image_route = "building/get/image/";
		var rooms = this.appendsInfo(rooms,building.campus_name,building.building_name);

  		return(
	  		<View style={{marginTop:56,backgroundColor:GLOBAL.SECONDARY_COLOR}}>
	  			<GeneralForm
	  			 	route={this.props.route} 
					image_route = {image_route}
					defaultImageRoute = {default_source}
	  			 	navigator={this.props.navigator} 
	  			 	title = "BUILDING DETAILS"
	  			 	second_title="LOCATION INFORMATION"
	  			 	third_title = "AREAS"
	  			 	item_id = {building.building_id}
	  			 	item_name = {building.building_name}
	  			 	item_description = {building.building_description}
					item_address= {building.building_address}
					item_city= {building.building_city}
					item_state= {building.building_state}
					item_zip= { building.building_city}
					item_campus_name={building.campus_name}
					item_building_name={building.building_name}
					item_pieces = {rooms}
					next_route = "rooms_details"
					campus = {true}
					address = {true}
					city = {true}
					state= {true}
					zip = {true}
	  			/>
	  		</View>
  		);
		 
	}
}