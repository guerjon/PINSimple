import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight,Modal, Image} from 'react-native';
import GLOBAL from '../../Globals';
import ListItem from '../ListItem';
import GridItem from '../GridItem';

var styles = StyleSheet.create({
  	listView: {
    	backgroundColor: '#F5FCFF',
  	}
});
const image_route = "group/get/image/";
const default_source = require("../../sources/default_group_icon.imageset/default_group_icon.png");

export default class Groups extends Component {

  	constructor(props) {
		super(props);

		this.state = {
			data : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		}
  	}

  	componentWillReceiveProps(nextProps) {
		this.setState({
			data : this.state.data.cloneWithRows(nextProps.data),
  		});
	}
  	renderGroup(group){
		console.log(group.group_id);
		var data = {
			index:"groups_details",
			group: group		
		}

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
			      			item_name={group.group_name} 
			      			item_id={group.group_id} 
			      			defaultImage = {default_source}
			      		/>	
		      		</View>
				</TouchableHighlight >
			</View>
		);  		
  	}

  	renderGroupGrid(group){
		var data = {
			index:"groups_details",
			group: group		
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
		      			item_name={group.group_name} 
		      			item_id={group.group_id} 
		      			defaultImage = {default_source}
					/>
				</View>
			</TouchableHighlight>
		);
  	}

	render() {

  		if(this.props.activeView == "list_view"){
			return (
				<View style={{marginBottom:150}}>
			  	  	<ListView 
				  		dataSource={this.state.data}
				  		renderRow={(group) => this.renderGroup(group)}
				  		enableEmptySections={true}
				  		key={this.props.activeView}
				  	/>	
			  	</View>
		    );		

  		}else{	
  			var styles = {
			 	list: {
			        flexDirection: 'row',
			        flexWrap: 'wrap'
			    },   
			}
  			
			return (
				<View style={{marginBottom:150}}>
			  		<ListView 
			  			contentContainerStyle={styles.list}
	        			dataSource={this.state.data}
	        			renderRow={(group) => this.renderGroupGrid(group)}
	      				enableEmptySections={true}
				  		key={this.props.activeView}
	      			/>	
      			</View>
		    );		
  		}
	}
}