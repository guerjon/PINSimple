import React, { Component } from 'react';
import {Text,View,ListView,TouchableHighlight, Image} from 'react-native';
import styles from '../../GlobalStyles';
import GLOBAL from '../../Globals';
import ImageHelper from '../../helpers/ImageHelper';

const default_image	 = require("../../sources/default_user_icon.imageset/default_user_icon.png");

export default class Users extends Component{
	
	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		  this.state = {
	      	dataSource: ds.cloneWithRows(props.users)
	    };	
	}

	onError(error){
		this.setState({ image: this.props.defaultImageRoute })
	}

	renderPiece(user){
		
		var image_route =  GLOBAL.BASE_URL + 'user/get/image/' + user.user_id;

		return (	
			<TouchableHighlight  
				onPress={() => this.props.navigator.push(
						{
							index:this.props.next_route,
							user : user
						}
					)					
				} 
			>
				<View style={styles.row}>
					<View style={styles.little_piece_image_container}>
						<ImageHelper 
							id = {user.user_id}
							route = "user/get/image/"
							styles={styles.little_piece_image}
							defaultImage = {default_image}
						/>
						
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{user.user_last_name}, {user.user_first_name} 
						</Text>
					</View>
				</View>
            </TouchableHighlight>
		);				
	}

	render() {
		
		return(
			<View>
				<View style={styles.item_title_container}>
					<Text style={styles.item_title}>{this.props.title}</Text>
				</View>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(user) => this.renderPiece(user) }
				/>
			</View>
		);
	}
}