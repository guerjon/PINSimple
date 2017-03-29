import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet,TextInput, Image, ScrollView} from 'react-native';
import ItemDetails from './ItemDetails';
import LocationInformation from './LocationInformation';
import Pieces from './Pieces';
import GLOBAL from '../Globals';
import GlobalStyles from '../GlobalStyles';

import AccessGroups from '../pieces/users_pieces/AccessGroups';
import AccessInformation from '../pieces/users_pieces/AccessInformation';
import ContactInformation from '../pieces/users_pieces/ContactInformation';
import RecentActivity from '../pieces/users_pieces/RecentActivity';
import UsersDetails from '../pieces/users_pieces/UsersDetails';
import ImageHelper from '../helpers/ImageHelper';

const default_image = require("../sources/default_user_icon.imageset/default_user_icon.png");

export default class UsersForm extends Component{

	constructor(props) {
		super(props);

		var global_route = GLOBAL.BASE_URL + props.image_route + props.item_id;
		
		this.state = {
			edit_mode : false, 
		}

	}

	render(){

		var edit_mode = this.state.edit_mode;
		var user = this.props.route.user;
		var styles = GlobalStyles;
		var next_route = this.props.route.index;
		var image_route = "user/get/image/"; 
		return (	
			<View>
				<ScrollView style={{marginTop:10}}>
					<View style={styles.thumbnail_container} >
						<ImageHelper
							id={user.user_id}
							route = {image_route}
							defaultImage = {default_image}
				          	styles={styles.thumbnail}
				        />
					</View>
					<View style={{marginTop:10}}>
						<UsersDetails 
							login={user.user_login}
							first_name={user.user_first_name}
							last_name={user.user_last_name} 
							status={user.user_status}
						/>
					</View>
					<View style={{marginTop:10}}>
						<ContactInformation 
							address={user.user_address}
							city={user.user_city}
							state={user.user_state}
							zip={user.user_zip}
							phone={user.user_phone}
							email={user.user_email}
						/>
					</View>
					<View style={{marginTop:10}}>
						<AccessInformation
							pin={user.user_pin}
							fob={user.user_fob}
							fob_facility={user.user_fob_facility}
						/>
					</View>
					<View style={{marginTop:10}}>
						{user.user_groups &&
							<AccessGroups
								groups={user.user_groups}
								navigator={this.props.navigator}
								next_route="groups_details"
							/>
						}
					</View>
					
				</ScrollView>
			</View>
		);
	}
}
/*

				<View style={{marginTop:10,marginBottom:100}}>
					<RecentActivity/>
				</View>
				*/