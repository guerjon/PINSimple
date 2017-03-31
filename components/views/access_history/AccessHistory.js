import Autocomplete from 'react-native-autocomplete-input';
import React, { Component} from 'react';
import {} from 'react-native';
import GLOBAL from '../../Globals';
import GlobalStyles from '../../GlobalStyles'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  ActivityIndicator,
  ListView
} from 'react-native';
import * as Keychain from 'react-native-keychain';


class CustomAutocomplete extends Component{
	
	constructor(props) {
		super(props);
	}

	_onPressButton(object) {
   	 	this.props.onPress(object)
  	}

	render(){
		
		//onEndEditing={this.props.onEndEditing}
		
		return ( 
			<Autocomplete
			onFocus={this.props.onFocus}
			onChangeText={this.props.onChangeText}
			underlineColorAndroid={'transparent'}
	  		autoCapitalize="none"
	  		autoCorrect={false}
			data={this.props.data}
			defaultValue={this.props.defaultValue}
			placeholder={this.props.placeholder}
	  		containerStyle={styles.autocompleteContainer}
			renderItem={(object) => {
				if(object === "Write at least 2 characters"){
					return (
						<View style={GlobalStyles.row}>
					    	<Text>{object}</Text>
				    	</View>
				    );
				}else{
					return (
						<View style={GlobalStyles.row}>
							<TouchableHighlight onPress={() => this._onPressButton(object)}>
						        <Text>{object}</Text>
						    </TouchableHighlight>
				    	</View>
			    	)
				}
			}}/>
	  	)
  	}
}

export default class AccessHistory extends Component {
  
  	constructor(props) {
		super(props);
		this.state = {
	  		loaded : false,
	  		typeQuery: '',
	  		deviceQuery: '',
	  		userQuery: '',
	  		directionQuery: '',
	  		resultQuery: '',
	  		pinCodeQuery: '',
	  		typeInputFocus : false,
	  		deviceInputFocus: false,
	  		userInputFocus : false,
	  		directionInputFocus : false,
	  		resultInputFocus : false,
	  		pinCodeInputFocus : false,
	  		data : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		};

		this.handleSelectInputOption = this.handleSelectInputOption.bind(this);
  	}

  	componentWillReceiveProps(nextProps) {
  		
  		if(nextProps){
  			this.setState({
  				loaded: true,
  				data : this.state.data.cloneWithRows(nextProps.data.events) 
  			});
  		}
  	}

  	componentDidMount() {
  		this.getUserDataFetch();
  		this.getDevicesDataFetch();
  	}

  	getUserDataFetch(){
		 
		return	Keychain
			  	.getGenericPassword()
			  	.then((credentials) => {
				    var headers = new Headers({
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded',
						'username': credentials.username,
						'password': credentials.password
					});
					var res = fetch(GLOBAL.BASE_URL + 'user/get', {
						method: 'GET',
						headers: headers,
					})
					.then((response) => response.json())
					.then((responseJson) => {
						var users = responseJson.data.users;
						var users_full_name = [];
						for (var i = 0; i < users.length; i++) {
							var user = users[i];
							var full_name = user.user_last_name + ", " + user.user_first_name;
							users_full_name.push(full_name);
						}
						this.setState({
							users: users_full_name
						});

					})
					.catch((error) => {
						console.warn(error);
					});
					return res;
			  	}).catch(function(error) {
			    	console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
				}
			);
	}

	getDevicesDataFetch(){
		return	
			Keychain
			  	.getGenericPassword()
			  	.then((credentials) => {
				    var headers = new Headers({
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded',
						'username': credentials.username,
						'password': credentials.password
					});
					var res = fetch(GLOBAL.BASE_URL + 'device/get', {
						method: 'GET',
						headers: headers,
					})
					.then((response) => response.json())
					.then((responseJson) => {
						this.setState({
							devices : responseJson.data 
						});
					})
					.catch((error) => {
						console.warn(error);
					});
					return res;
			  	}).catch(function(error) {
			    console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
			}
		);	
	}

	handleSelectInputOption(text,kind){

		switch(kind){
			case "typeQuery":
				this.setState({typeQuery:text,typeInputFocus:false})
			break;
		  	case "deviceQuery":
		  		this.setState({deviceQuery:text,typeInputFocus:false})
		  	break;
		  	case "userQuery":
		  		this.setState({userQuery:text,typeInputFocus:false})
		  	break;
		  	case "directionQuery":
		  		this.setState({directionQuery:text,typeInputFocus:false})
		  	break;
		  	case "resultQuery":
		  		this.setState({resultQuery:text,typeInputFocus:false})
		  	break;
		  	case "pinCodeQuery":
		  		this.setState({pinCodeQuery:text,typeInputFocus:false})
		  	break;
		  	
		  	default:
		  	break;		
		}
	}

  	findSelects(query,kind,input_focus){

		switch(kind){
			case "type":
				var input_options = [
					"Code",
					"Sensor",
					"Auto",
					"Fob",
					"Info",
					"Schedule",
					"Manual"
				];
			break;
			case "device":
				var input_options = [
				]
			break;
			case "user":
				if(this.state.users)
				var input_options = this.state.users;
				else
				var input_options = [];
			break;
			case "direction":
				var input_options = [
					"Opening",
					"Closing",
					"No Movement"		
				];
			break;
			case "result":
				var input_options = [
					"Denied", 
					"Granted", 
					"Restricted", 
					"Conflict", 
					"No Change"				
				];
			break;
			case "pin_code":
				var input_options = [
				]
			break;
		}

		if(kind == 'user' && query.length <= 1 && input_focus)
			return ["Write at least 2 characters"];

		if(input_focus && query === '')
			return input_options;

		if(!input_focus && query == '')
			return [];

		

		var results = [];

		var toSearch = this.trimString(query).toLowerCase(); // trim it
		      	
      	for(var i=0; i < input_options.length; i++) {
        	var object = input_options[i]; 	
        	var title = object.toLowerCase();
        
      		if(title.indexOf(toSearch) != -1) {
        		if(!this.itemExists(results, object)) {
          			results.push(object);
        		}
      		}	         
    	}
    	return results;
  	}

  	trimString(s) {
      	var l=0, r=s.length -1;
      	while(l < s.length && s[l] == ' ') l++;
      	while(r > l && s[r] == ' ') r-=1;
      	return s.substring(l, r+1);
  	}

  	compareObjects(o1, o2) {
      	var k = '';
      	for(k in o1) if(o1[k] != o2[k]) return false;
      	for(k in o2) if(o1[k] != o2[k]) return false;
      	return true;
  	}
  
  	itemExists(haystack, needle) {
      	for(var i=0; i < haystack.length; i++) {
	      	if(this.compareObjects(haystack[i], needle)){
	          	return true;
	        } 
      	}
      	return false;
  	}

  	renderInfo(info){
  		return (
  			<View style={GlobalStyles.row}>
  				<View>
  					<Text> image </Text>
  				</View>
  				<View style={{flex:1}}>
  					<Text>{info.history_message}</Text>
  					<Text>{info.history_device_name}</Text>
  				</View>
  			</View>
  		);
  	}

  	render() {

		const { typeQuery,deviceQuery,userQuery,directionQuery,resultQuery,pinCodeQuery } = this.state;

		const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
		
		const types = this.findSelects(typeQuery,'type',this.state.typeInputFocus);
		const devices = this.findSelects(deviceQuery,'device',this.state.deviceInputFocus);
		const users = this.findSelects(userQuery,'user',this.state.userInputFocus);
		const directions = this.findSelects(directionQuery,'direction',this.state.directionInputFocus);
		const results = this.findSelects(resultQuery,'result',this.state.resultInputFocus);
		const pin_codes = this.findSelects(pinCodeQuery,'pin_code',this.state.pinCodeInputFocus);
		
		//				onEndEditing={(cosa) => this.tumama(cosa)  }
		
		if(this.state.loaded) {
			return (
			  	<View style={styles.container}>
					<View style={{paddingLeft:5,paddingTop:5}}>
						<Text style={{color:"white"}}>Type</Text>
					</View>
					<CustomAutocomplete 
						onFocus={() => this.setState({typeInputFocus: true})} 
						onChangeText={text => this.setState({ typeQuery: text })}
						placeholder="Select a type"
						data={types.length === 1 && comp(typeQuery, types[0]) ? [] : types}
						defaultValue={typeQuery}
						onPress={(text) => this.handleSelectInputOption(text,"typeQuery")}
					/>
					<View style={{paddingLeft:5,paddingTop:5}}>
						<Text style={{color:"white"}}>Direction</Text>
					</View>
					<CustomAutocomplete
						onFocus={() => this.setState({directionInputFocus: true})} 
						onEndEditing={() => this.setState({directionInputFocus: false})}
						onChangeText={text => this.setState({ directionQuery: text })}
						placeholder="Select a direction"
						data={directions.length === 1 && comp(directionQuery, directions[0]) ? [] : directions}
						defaultValue={directionQuery}	
						onPress={(text) => this.handleSelectInputOption(text,"directionQuery")}
					/>
					<View style={{paddingLeft:5,paddingTop:5}}>
						<Text style={{color:"white"}}>Result</Text>
					</View>					
					<CustomAutocomplete
						onFocus={() => this.setState({resultInputFocus: true})} 
						onEndEditing={() => this.setState({resultInputFocus: false})}
						onChangeText={text => this.setState({ resultQuery: text })}
						placeholder="Select a result"
						data={results.length === 1 && comp(resultQuery, results[0]) ? [] : results}
						defaultValue={resultQuery}	
						onPress={(text) => this.handleSelectInputOption(text,"resultQuery")}
					/>
					<View style={{paddingLeft:5,paddingTop:5}}>
						<Text style={{color:"white"}}>User</Text>
					</View>					
					<CustomAutocomplete
						onFocus={() => this.setState({userInputFocus: true})} 
						onEndEditing={() => this.setState({userInputFocus: false})}
						onChangeText={text => this.setState({ userQuery: text })}
						placeholder="Select a user"
						data={users.length === 1 && comp(userQuery, users[0]) ? [] : users}
						defaultValue={userQuery}
						onPress={(text) => this.handleSelectInputOption(text,"userQuery")}	
					/>
					<View>
						<ListView
							dataSource={this.state.data}
							renderRow={(info) => this.renderInfo(info)}
						/>
					</View>
			  	</View>
			);
  		}
		return (
			<View style={{marginTop:57,alignItems:"center",justifyContent:"center"}}>
				<ActivityIndicator />
			</View>
		);
  	}
}

const styles = StyleSheet.create({
  	container: {
		backgroundColor: GLOBAL.SECONDARY_COLOR,
		flex: 1,
		marginTop: 56
  	},
  	autocompleteContainer: {
		flex: 1,
		padding: 5,
		zIndex: 1,
  	},
  	itemText: {
		fontSize: 15,
		margin: 2
  	},
  	descriptionContainer: {
		// `backgroundColor` needs to be set otherwise the
		// autocomplete input will disappear on text input.
		backgroundColor: '#F5FCFF',
		paddingBottom: 400
  	},
  	infoText: {
		textAlign: 'center'
  	},
  	titleText: {
		fontSize: 18,
		fontWeight: '500',
		marginBottom: 10,
		marginTop: 10,
		textAlign: 'center'
  	},
  	directorText: {
		color: 'grey',
		fontSize: 12,
		marginBottom: 10,
		textAlign: 'center'
  	},
  	openingText: {
		textAlign: 'center'
  	}
});