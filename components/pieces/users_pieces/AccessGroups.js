import React, { Component } from 'react';
import {Text,View,ListView,TouchableHighlight, Image} from 'react-native';
import styles from '../../GlobalStyles';
import GLOBAL from '../../Globals';
import ImageHelper from '../../helpers/ImageHelper';

const image_route = "group/get/image/";
const default_image = require("../../sources/default_group_icon.imageset/default_group_icon.png");

export default class AccessGroups extends Component{
	
	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		  this.state = {
	      	dataSource: ds.cloneWithRows(props.groups)
	    };	
	}

	renderPiece(user_group){
		
		return (	
			<TouchableHighlight  
				onPress={() => this.props.navigator.push(
						{
							index:this.props.next_route,
							group: user_group
						}
					)					
				} 
			>
				<View style={styles.row}>
					<View style={styles.item_name_container}>
						<ImageHelper
				        	id={user_group.group_id}
				        	defaultImage = {default_image}
				        	route={image_route} 
				        	styles={styles.thumbnail_mini}
			        	/>
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{user_group.group_name}
						</Text>
					</View>
				</View>
            </TouchableHighlight>
		);				
	}

	render() {
		
		return(
			<View>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(user_group) => this.renderPiece(user_group) }
				/>
			</View>
		);
	}
}