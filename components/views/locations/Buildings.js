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

const image_route = "building/get/image/";
const default_image = require("../../sources/default_building_icon.imageset/default_building_icon.png");

export default class Buildings extends Component {

  	constructor(props) {
		super(props);
  		this.state = {
			buildings : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		}
  	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data){
			this.setState({
				buildings : this.state.buildings.cloneWithRows(nextProps.data) ,
	 		});
  		}
	}

   	renderText(building){
   		return (
   			<View>
   				<Text>{building.building_address}</Text>
   				<Text>{building.building_city} {building.building_state} {building.building_zip} </Text>
   			</View>
   		);
   	}
 
  	renderBuilding(building){
		var data = {
			index:"buildings_details",
			building: building	
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
			      			item_name={building.building_name} 
			      			item_id={building.building_id} 
			      			text={this.renderText(building)} 
			      			defaultImage = {default_image}
			      		/>	
		      		</View>
				</TouchableHighlight >
			</View>
		);  		
  	}

  	renderBuildingGrid(building){
		var data = {
			index:"buildings_details",
			building: building		
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
		      			item_name={building.building_name} 
		      			item_id={building.building_id} 
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
				  		dataSource={this.state.buildings}
				  		renderRow={(building) => this.renderBuilding(building)}
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
	        			dataSource={this.state.buildings}
	        			renderRow={(building) => this.renderBuildingGrid(building)}
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