import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight} from 'react-native';
import GroupsFrom from '../../form/GroupsForm';
import GLOBAL from '../../Globals';


export default class groupsDetails extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		//cuando venimos de user this.props.route.data esta definida
		if(this.props.route.data){
			var group = this.props.route.data; //contiene la informacion necesaria para que cuando entremos desde user a user no truene
			
		}else{
			//cuando no venimos de user pasamos la info a traves de this.props.route.user 
			var group = this.props.route.group;
			
		}

		const image_route = "group/get/image/";		
		var group_users = group.group_users;

  		return(
	  		<View style={{marginTop:56,backgroundColor:GLOBAL.SECONDARY_COLOR,height:550}}>
	  			<GroupsFrom
	  			 	route={this.props.route} 
					image_route = {image_route}
	  			 	navigator={this.props.navigator} 
	  			 	title = "USER DETAILS"
	  			 	second_title="LOCATION INFORMATION"
	  			 	third_title = "AREAS"
	  			 	item_id = {group.group_id}
	  			 	item_name = {group.group_full_name}
	  			 	item_description = {group.group_description}
					item_address= {group.group_address}
					item_city= {group.group_city}
					item_state= {group.group_state}
					item_zip= { group.group_city}
					item_user_name={group.group_name}
					item_user_name={group.group_name}
					item_pieces = {group_users}
					next_route = "user_groups_details"
					user = {true}
					address = {true}
					city = {true}
					state= {true}
					zip = {true}
	  			/>
	  		</View>
  		);
		 
	}
}