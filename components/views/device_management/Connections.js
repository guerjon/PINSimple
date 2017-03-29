import React, { Component } from 'react';
import { View, Text, Button, ListView,Image } from 'react-native';
import * as Keychain from 'react-native-keychain';
import GLOBAL from '../../Globals';
import GlobalStyles from '../../GlobalStyles';



const connection_image = require("../../sources/default_connection_image.imageset/connection_icon.png");
var global_connections = [];


export default class Connections extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		constrollers : [],
    		connections : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    		array_connections : []
    	}
    }

    componentWillReceiveProps(nextProps) {
    	if(nextProps.data.length > 0){
    		var controllers = nextProps.data 
    		var urls = [];
			
			for (var i = 0; i < controllers.length; i++) {
				var controller = controllers[i];					
				urls.push(GLOBAL.BASE_URL + 'device/getconnections/' + controller.device_id);
			}

			Promise.all(urls.map(this.grabContent)).then(values => {
				var connections = [];
				
				for (var i = 0; i < values.length; i++) {
					for (var j = 0; j < values[i].length; j++) {
						connections.push(values[i][j]);
					}
				}

				this.setState({
					connections : this.state.connections.cloneWithRows(connections)
				})		
			});
    	}
    }

	grabContent(url){
		// url hast lenght two, the first is the url to make the fetch the second one is the name of the device 	
		return  Keychain
		  		.getGenericPassword()
			  	.then((credentials) => {
				    var headers = new Headers({
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded',
						'username': credentials.username,
						'password': credentials.password
					});
					
					var responses = fetch(url, {
						method: 'GET',
						headers: headers,
					})
					.then((response) => response.json())
					.then((responseJson) => {
						return responseJson.data.connections;
					})
					.catch((error) => {
						console.warn(error);
					});
					return responses;
			  	}).catch(function(error) {
			    console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
			}
		);
	}

  	renderConnection(connection){
  		return (
  			<View style={{marginTop:15}}>
	  			<View style={GlobalStyles.row}>
	  				<View style={{width:140,height:20,alignItems:"center",justifyContent:"center"}}>
	  					<Text>
	  						{connection.sender_name}
	  					</Text>
	  				</View>
	  				<View style={{width:60,height:20,alignItems:"center",justifyContent:"center"}}>
	  					<Image 
	  						source={require('../../sources/default_connection_image.imageset/connection_icon.png')}
	  						style={{width:40,height:20}}
	  					/>
	  				</View>
	  				<View style={{width:140,height:20,alignItems:"center",justifyContent:"center"}}>
	  					<Text>
	  						{connection.target_name}
	  					</Text>
	  				</View>
	  			</View>
  			</View>
  		)
  	}

  	render() {
  		return (
	      	<View style={{backgroundColor:GLOBAL.SECONDARY_COLOR,marginTop:56}}>
				<ListView 
					dataSource={this.state.connections}
					renderRow={(connection) => this.renderConnection(connection)}
					enableEmptySections={true}
				/>        
	      	</View>
	    )
  	}
}