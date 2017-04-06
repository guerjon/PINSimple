import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet,TextInput, Image, ScrollView} from 'react-native';
import ItemDetails from './ItemDetails';
import Pieces from './Pieces';
import GLOBAL from '../Globals';
import GlobalStyles from '../GlobalStyles';

import Users from '../pieces/groups_pieces/Users';
import ImageHelper from '../helpers/ImageHelper';
const default_image = require("../sources/default_group_icon.imageset/default_group_icon.png");

export default class GroupsForm extends Component{

	constructor(props) {
		super(props);

		var global_route = GLOBAL.BASE_URL + props.image_route + props.item_id;
		
		this.state = {
			edit_mode : false,
			image: { uri: global_route } 
		}
	}

	onError(error){
		this.setState({ image: this.props.defaultImageRoute })
	}

	render(){

		var edit_mode = this.state.edit_mode;
		var group = this.props.route.group;
		var styles = GlobalStyles;
		var next_route = this.props.route.index;
		var data = {item_name: group.group_name, item_description: group.group_description,title:"ACCESS GROUP HOLDINGS"};
		
		return (
			<View>
				<ScrollView style={{marginTop:10}}>
					<View style={styles.thumbnail_container} >
						<ImageHelper 
						 	id={this.props.item_id}
						 	route={this.props.image_route}
						 	styles={styles.thumbnail}
						 	defaultImage={default_image}
						/>
					</View>
					<View style={{marginTop:10}}>
						<ItemDetails 
							edit_mode={edit_mode} 
							data={data}
						/>
					</View>

					<ScrollView >
						{	group.group_users &&					
							<Users
								users={group.group_users}
								title= "USERS"
								next_route = "users_details"
								navigator = {this.props.navigator}
							/>
							
						}
					</ScrollView>
				</ScrollView>
			</View>
		);
	}
}
