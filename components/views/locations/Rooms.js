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

const image_route = "room/get/image/";
const default_image = require("../../sources/default_room_icon.imageset/default_area_icon.png");

export default class Rooms extends Component {

  	constructor(props) {
		super(props);
  		this.state = {
  			rooms :  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
  		}
  	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data){
			this.setState({
				rooms : this.state.rooms.cloneWithRows(nextProps.data) ,
	 		});
  		}
	}

   	renderText(room){
   		return (
   			<View>
   				<Text>{room.campus_name} - {room.building_name} </Text>
   			</View>
   		);
   	}
 
  	renderRoom(room){
		var data = {
			index:"rooms_details",
			room: room		
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
			      			item_name={room.room_name} 
			      			item_id={room.room_id} 
			      			text={this.renderText(room)} 
			      			defaultImage = {default_image}
			      		/>	
		      		</View>
				</TouchableHighlight >
			</View>
		);  		
  	}

  	renderRoomGrid(room){
		var data = {
			index:"rooms_details",
			room: room		
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
				<View >
					<GridItem 
		      			image_route={image_route} 
		      			item_name={room.room_name} 
		      			item_id={room.room_id} 
		      			defaultImage = {default_image}
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
				  		dataSource={this.state.rooms}
				  		renderRow={(room) => this.renderRoom(room)}
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
	        			dataSource={this.state.rooms}
	        			renderRow={(room) => this.renderRoomGrid(room)}
	      				enableEmptySections={true}
				  		key={this.props.separateData}
	      			/>	
      			</View>
		    );
		    
  		}
	}
}

/*

*/