import React, { Component } from 'react';
import { View,ActivityIndicator,Text, StyleSheet,TouchableHighlight } from 'react-native';
import RootNavigation from './RootNavigation';
import GlobalStyles from './GlobalStyles';
import * as Keychain from 'react-native-keychain';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');

var Login = t.struct({
	user_login: t.String,
	password: t.String
});

var inputStyle = StyleSheet.create({
	usernameInput : {
		backgroundColor : "white"
	}
});

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.backgroundColor = 'white';

var options = {
	fields: {
		user_login: {
			stylesheet: stylesheet
		},
		password: {
			stylesheet : stylesheet
		}
	}
}

export default class MainComponent extends Component {
	
	constructor(props) {
		super(props);

		//is LoggedIn 0 to no sendedform, 1 to pass form, 2 to rejected form, 3 loadign to resolve the promise
		this.state = {
			isLoggedIn : 0,
			user_name : '',
			password : '',
			user_data : {}
		}

		this.handleOnPress = this.handleOnPress.bind(this);
	
		Keychain
		  .setGenericPassword("trobbins2","prgm4life")
		  .then(function() {
		    
		});	
	}

	handleOnPress(event){
		event.preventDefault();
		//var body = "username=jperez&password=password";
		var value = this.refs.form.getValue();
		var body = "username=" + value.user_login + "&password=" + value.password;
		
		this.setState({
			isLoggedIn : 3 
		})

		Keychain
		  .setGenericPassword(value.user_login, value.password)
		  .then(function() {
		    
		});		        

		this.getLogin(body);
	}

	getLogin(body){

		var headers = new Headers({
		    'Accept': 'application/json',
		    'Content-Type': 'application/x-www-form-urlencoded',
		});

		fetch('http://admin.pinsimple.com/api/user/checklogin', {
			  method: 'POST',
			  headers: headers,
			  body: body
		  	})
		.then((response) => response.json())
      	.then((responseJson) => {
	        if(responseJson.status == "success"){
		        
		        this.setState({
		        	isLoggedIn: 1,
		        	user_data: responseJson.data
		        });				
		        
		        return responseJson;	        	
	        }else{
		        this.setState({
		        	isLoggedIn: 2
		        });	        	
	        }
      	})
		.catch((error) => {
		  console.warn(error);
		});
	}

	render() {

		//return <App username="trobbins2" password="prgm4life"/>
		//return  <Pruebas />
		var login_menu = (
 			<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
 				<View style={{width:250,backgroundColor:"#e5e5e5",padding:20,elevation:5}}>
	 				<Form ref="form" type={Login} options={options} />
		 			<View style={styles.buttonsContainer}>
						<TouchableHighlight style={styles.signInButton} onPress={this.handleOnPress} underlayColor='#99d9f4'>
      						<Text style={{color:"black"}}>Login</Text>
    					</TouchableHighlight>				 			
		 			</View>
	 			</View>	
 			</View>
		);

		return <RootNavigation />

		switch(this.state.isLoggedIn){
			case 0:
			 	return login_menu;
			case 1:
				return <RootNavigation/>
			case 2:
			 	return (
		 			<View>
		 				{login_menu}
		 				<Text>User or password incorrect</Text> 
		 			</View>
			 	);
			case 3:
				return <View><ActivityIndicator /></View>
		}
		
	}
};


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
		alignItems: "center",
		justifyContent: "center"
	},
	signInButton: {
		height: 36,
		backgroundColor: '#e5e5e5',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: "center",
		width:150,			
	}
});

