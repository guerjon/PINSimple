import React, { Component } from 'react';
import {Modal, View, TouchableHighlight,Text, TextInput, StyleSheet,ScrollView} from 'react-native';
import GlobalStyles from '../GlobalStyles';
import * as Keychain from 'react-native-keychain';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var Campus = t.struct({
	name: t.String,
	description: t.maybe(t.String),
	address: t.maybe(t.String),
	city: t.maybe(t.String),
	state: t.maybe(t.String),
	zip: t.Number
});

export default class FormCampusModal extends Component {

	constructor(props) {
		super(props);
		
		this.onPress = this.onPress.bind(this);
	}

	onPress(){
		var values = this.form.getValue();
		Keychain
		  	.getGenericPassword()
		  	.then(function(credentials) {
					

					var headers = new Headers({
				        'Accept': 'application/json',
				        'Content-Type': 'application/x-www-form-urlencoded',
				        'username': credentials.username,
				        'password': credentials.password
				    });
			
					

				    fetch('http://admin.pinsimple.com/api/campus/create', {
				        method: 'POST',
				        headers: headers,
				        body: JSON.stringify({
				        	campus_name : values.name,
				        	campus_zip : values.zip 
				        })
				    }).then((response) => { return response.json()})
				        .then((responseJson) => {
				          	if(responseJson.status == "success"){
				            	return responseJson;            
				          	}
				        })
				    .catch((error) => {
				      console.warn(error);
				    });	

		  	}).catch(function(error) {
		    	console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
		  	});	    
	}

	render(){
		return (
				<Modal
		          	animationType={"slide"}
		          	transparent={false}
		          	visible={this.props.modalVisible}
		          	onRequestClose={this.props.onRequestClose}
		        	ref={(ref) => this.props.getModal(ref)}
		        >
			        <ScrollView>
			        	<View style={GlobalStyles.titleContainer}>
			        		<Text style={GlobalStyles.title}>Add Campus</Text>
			        	</View>
			          	<View style={styles.container}>
			          		<Form
			          			ref={(form) => { this.form = form; }}
			          			type={Campus}	
			          		/>
				 			<View style={styles.buttonsContainer}>
					 			<TouchableHighlight style={GlobalStyles.cancelButton} onPress={this.props.closeModal}>
					              	<Text style={GlobalStyles.buttonText}>Cancel</Text>
					            </TouchableHighlight>

								<TouchableHighlight style={styles.saveButton} onPress={this.onPress} underlayColor='#99d9f4'>
	          						<Text style={GlobalStyles.buttonText}>Save</Text>
	        					</TouchableHighlight>				 			
				 			</View>
			          	</View>
			        </ScrollView>
		        </Modal>					

		);
	}
}

var styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#ffffff',
	},
	title: {
		fontSize: 30,
		alignSelf: 'center',
		marginBottom: 30
	},
	buttonsContainer:{
		flex:1,
		flexDirection:"row",
		width: 320,
		marginTop: 15
	},
	saveButton: {
		height: 36,
		backgroundColor: '#83c341',
		borderRadius: 8,
		marginBottom: 10,
		right: 0,
		position: "absolute",
		justifyContent: 'center',
		width:150,	
	}
});