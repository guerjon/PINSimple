import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight} from 'react-native';
import UsersForm from '../../form/UsersForm';
import GLOBAL from '../../Globals';


export default class UsersDetails extends Component {
	constructor(props) {
		super(props);
	}

	render(){

		//cuando venimos de user this.props.route.data esta definida
		if(this.props.route.data){
			var user = this.props.route.data; //contiene la informacion necesaria para que cuando entremos desde user a user no truene
			var user_groups = user.user_groups;
		
		}else{
			//cuando no venimos de user pasamos la info a traves de this.props.route.user 
			var user = this.props.route.user;
			var user_groups = this.props.route.user.user_groups;
		}

		var user_groups = user.user_groups;

  		return(
	  		<View style={{marginTop:56,backgroundColor:GLOBAL.SECONDARY_COLOR}}>
	  			<UsersForm
	  			 	route={this.props.route} 
				 	navigator={this.props.navigator} 
	  			 	title = "USER DETAILS"
	  			 	second_title="LOCATION INFORMATION"
	  			 	third_title = "AREAS"
	  			 	item_id = {user.user_id}
	  			 	item_name = {user.user_full_name}
	  			 	item_description = {user.user_description}
					item_address= {user.user_address}
					item_city= {user.user_city}
					item_state= {user.user_state}
					item_zip= { user.user_city}
					item_user_name={user.user_name}
					item_user_name={user.user_name}
					item_pieces = {user_groups}
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