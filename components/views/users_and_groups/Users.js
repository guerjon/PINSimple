import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView
		, StyleSheet,TouchableHighlight,Modal, Image,FlatList} from 'react-native';
import GLOBAL from '../../Globals';
import ListItem from '../ListItem';
import GridItem from '../GridItem';
import * as Keychain from 'react-native-keychain';
const image_route = "user/get/image/";
const default_image = require("../../sources/default_user_icon.imageset/default_user_icon.png");


class HeaderList extends Component{

	constructor(props) {
		super(props);
	}
	
	render() {
		var styles = StyleSheet.create({

		  	headerList:{
				backgroundColor:"#eaebed",
				alignItems:"center",
				justifyContent:"center",
				padding:3
		  	},
		  	headerListText:{
		  		color: "black"
		  	}
		});

		return(
			<View style={styles.headerList}><Text style={styles.headerListText}>{this.props.name}</Text></View>
		)
	}
}

export default class Users extends Component {

  	constructor(props) {
		super(props);

		this.state = {
			current_user : new ListView
				.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
			administrator_users : new ListView
				.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
			active_users : new ListView
				.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
			termed_users : new ListView
				.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		}			
  	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.data){
			this.setState({
				current_user : this.state.current_user.cloneWithRows(nextProps.data[0]) ,
				administrator_users : this.state.administrator_users.cloneWithRows(nextProps.data[1]),
				active_users : this.state.active_users.cloneWithRows(nextProps.data[2]),
				termed_users : this.state.termed_users.cloneWithRows(nextProps.data[3])
	  		});
  		}
	}


   	renderText(user){
   		var groups = user.user_groups;
   		var groups_string = '';
   		for (var i = 0; i < groups.length; i++) {
   			if(i == (groups.length -1))
   				groups_string += groups[i].group_name + " ";
   			else
   				groups_string += groups[i].group_name + ", ";
   		} 
   		return (
   			<View>
   				<Text>{groups_string}</Text>
   			</View>
   		);
   	}
 
  	renderUser(user){
		var data = {
			index:"users_details",
			user: user		
		}
		var full_name = user.user_first_name + ", " + user.user_last_name;

		return (	
			<View >
				<TouchableHighlight  
					 
					onPress={
						() => this.props.navigator.push(data)
					}
				>
		      		<View>
			      		<ListItem 
			      			image_route={image_route} 
			      			item_name={full_name} 
			      			item_id={user.user_id} 
			      			text={this.renderText(user)} 
			      			defaultImage = {default_image}
			      		/>	
		      		</View>
				</TouchableHighlight >
			</View>
		);  		
  	}

  	renderUserGrid(user){
		var data = {
			index:"users_details",
			user: user		
		}

		var styles = {
	        item: {
		        margin: 10,
		        width: 150,
		        height: 150,
		        borderWidth: 1,
		        elevation: 2
			},
		}

		var full_name = user.user_first_name + ", " + user.user_last_name;

		return (
				
			<TouchableHighlight
				onPress={
					() => this.props.navigator.push(data)
				}
				style={styles.item}
			>	
				<View>
					<GridItem 
						image_route={image_route} 
		      			item_name={full_name} 
		      			item_id={user.user_id} 
		      			defaultImage = {default_image}
					/>
				</View>
			</TouchableHighlight>
		);
  	}

	render() {
		var styles = StyleSheet.create({

		  	headerList:{
				backgroundColor:"#eaebed",
				alignItems:"center",
				justifyContent:"center",
				padding:3
		  	},
		  	headerListText:{
		  		color: "black"
		  	},
		  	list: {
		  			justifyContent: 'center',
			        flexDirection: 'row',
			        flexWrap: 'wrap'
			    },
		});

	  	var lists = (
	  		<View>	
	  			<View style={{overflow:'hidden'}}>
	  				{this.state.current_user.getRowCount() != 0 && <HeaderList name="Current User" />} 
			  	  	<ListView
			  	  		 initialListSize={5}
				  		dataSource={this.state.current_user}
				  		renderRow={(user) => this.renderUser(user)}
				  		enableEmptySections={true}
				  		key={this.props.activeView}
				  	/>	
	  				
	  			</View>
	  			<View style={{overflow:'hidden'}}>
	  				{this.state.administrator_users.getRowCount() != 0 && <HeaderList name="Administrators" />} 
	  				<ListView
	  					 initialListSize={5}
				  		dataSource={this.state.administrator_users}
				  		renderRow={(user) => this.renderUser(user)}
				  		enableEmptySections={true}
				  		key={this.props.activeView}
			  		/>	

	  			</View>
	  			<View style={{overflow:'hidden'}}>
	  				{this.state.active_users.getRowCount() != 0 && <HeaderList name="Active Users"/>}
	  				<ListView
	  					 initialListSize={5}
				  		dataSource={this.state.active_users}
				  		renderRow={(user) => this.renderUser(user)}
				  		enableEmptySections={true}
				  		key={this.props.activeView}
			  		/>	

	  			</View>
	  			<View style={{overflow:'hidden'}}>
	  				{this.state.termed_users.getRowCount() != 0 && <HeaderList name="Termed Users" /> }
	  				<ListView
	  					 initialListSize={5}
				  		dataSource={this.state.termed_users}
				  		renderRow={(user) => this.renderUser(user)}
				  		enableEmptySections={true}
				  		key={this.props.activeView}
			  		/>		  				
	  			</View>
	  		</View>
	  	);
		
		var grid_lists = (
	  		<View>	
	  			<View style={{overflow:'hidden'}}>
	  				{this.state.current_user.getRowCount() != 0 && <HeaderList name="Current User" />} 
			  	  	<ListView
			  	  		 initialListSize={5}
			  	  		contentContainerStyle={styles.list}
				  		dataSource={this.state.current_user}
				  		renderRow={(user) => this.renderUserGrid(user)}
				  		enableEmptySections={true}
				  		key={this.props.activeView}
				  	/>	
	  				
	  			</View>
	  			<View>
	  				{this.state.administrator_users.getRowCount() != 0 && <HeaderList name="Administrators" />}
	  				<ListView
	  					initialListSize={5}
	  					contentContainerStyle={styles.list} 
				  		dataSource={this.state.administrator_users}
				  		renderRow={(user) => this.renderUserGrid(user)}
				  		enableEmptySections={true}
				  		key={this.props.activeView}
			  		/>	

	  			</View>
	  			<View style={{overflow:'hidden'}}>
	  				{this.state.active_users.getRowCount() != 0 && <HeaderList name="Active Users"/>}
	  				<ListView
	  					 initialListSize={5}
	  					contentContainerStyle={styles.list}
				  		dataSource={this.state.active_users}
				  		renderRow={(user) => this.renderUserGrid(user)}
				  		enableEmptySections={true}
				  		key={this.props.activeView}
			  		/>	

	  			</View>
	  			<View style={{overflow:'hidden'}}>
	  				{this.state.termed_users.getRowCount() != 0 && <HeaderList name="Termed Users" /> }
	  				<ListView
	  					 initialListSize={5}
	  					contentContainerStyle={styles.list}
				  		dataSource={this.state.termed_users}
				  		renderRow={(user) => this.renderUserGrid(user)}
				  		enableEmptySections={true}
				  		key={this.props.activeView}
			  		/>		  				
	  			</View>	  			
	  		</View>
	  	);

  		if(this.props.activeView == "list_view"){
			return (
				<View>
					{lists}
		  	  	</View>	
		    );		
  		}else{
			return (
				<View>
		  		{grid_lists}
		  		</View>
		    );		
  		}
	}
}