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

const image_route = "campus/get/image/";
const default_image = require("../../sources/default_campus_icon.imageset/campus_default_icon.png");

export default class Campuses extends Component {

  	constructor(props) {
		super(props);
		this.state = {
			campuses : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		}
  	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data){
			this.setState({
				campuses : this.state.campuses.cloneWithRows(nextProps.data) ,
	 		});
  		}
	}

   	renderText(campus){
   		return (
   			<View>
   				<Text>{campus.campus_address}</Text>
   				<Text>{campus.campus_city} {campus.campus_state} {campus.campus_zip} </Text>
   			</View>
   		);
   	}
 
  	renderCampus(campus){
		
		var data = {
			index:"campuses_details",
			campus: campus		
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
			      			item_name={campus.campus_name} 
			      			item_id={campus.campus_id} 
			      			text={this.renderText(campus)} 
			      			defaultImage = {default_image}
			      		/>	
		      		</View>
				</TouchableHighlight >
			</View>
		);  		
  	}

  	renderCampusGrid(campus){
		var data = {
			index:"campuses_details",
			campus: campus		
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
		      			item_name={campus.campus_name} 
		      			item_id={campus.campus_id} 
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
				  		dataSource={this.state.campuses}
				  		renderRow={(campus) => this.renderCampus(campus)}
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
	        			dataSource={this.state.campuses}
	        			renderRow={(campus) => this.renderCampusGrid(campus)}
	      				enableEmptySections={true}
				  		key={this.props.activeView}
	      			/>	
      			</View>
		    );		
  		}
	}
}
