import Autocomplete from 'react-native-autocomplete-input';
import React, { Component} from 'react';
import {} from 'react-native';
import GLOBAL from '../../Globals';
import GlobalStyles from '../../GlobalStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	StyleSheet,
	Text,
	TouchableOpacity ,
	View,
	ScrollView,
	ActivityIndicator,
	ListView,
	Modal,
	TextInput
} from 'react-native';
import * as Keychain from 'react-native-keychain';

var filters = {};

function Value(props){
	if(props.type_selected == props.index)
		var styles = GlobalStyles.row_selected;
	else
		var styles = GlobalStyles.row;

	return(
		<TouchableOpacity  style={styles} onPress={() => props.addParameters(props.kind,props.index)}>
			<Text>{props.name}</Text>
		</TouchableOpacity >
	);
}


export default class AddFiltersToAccessHistory extends Component{

	constructor(props) {
		super(props);
		this.state = {
			values : null,
			devices : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
			users : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 }),
			users_array: [],
			devices_array: [],
			device_selected : {},
			user_selected : {},
			loaded : false,
			type_kind_selected : null,
			device_kind_selected: null,
			users_kind_selected: null,
			direction_kind_selected: null,
			result_kind_selected: null,
		}
	}

	getUserDataFetch(){
		Keychain
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
					var users_with_full_name = [];
					//the full name is appended because it'll be necesary for the search
					for (var i = 0; i < users.length; i++) {
						var user = users[i];
						user.full_name = user.user_first_name + " " + user.user_last_name; 
						users_with_full_name.push(user);
					}

					this.setState({
						users: this.state.users.cloneWithRows(users_with_full_name),
						users_array : users_with_full_name
					});
				})
				.catch((error) => {
					console.warn(error);
				});
		  	}).catch(function(error) {
		    	console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
			}
		);
	}

	getDevicesDataFetch(){
			
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
						devices : this.state.devices.cloneWithRows(responseJson.data),
						devices_array : responseJson.data
					});
				})
				.catch((error) => {
					console.warn(error);
				});
				
		  	}).catch(function(error) {
		   	 	console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
			}
		);	
	}

	componentDidMount() {
		this.getUserDataFetch();
		this.getDevicesDataFetch();
	}

	changeValues(kind){
		this.setState({
			values : kind
		});
		//the botton add is in RootNavigatorion so we need lift up the action to it
		this.props.showAdd([false,AddFiltersToAccessHistory]);
	}

	addParameters(kind,index){

		if(kind == 'type'){
			this.setState({
				type_kind_selected: index
			});
			filters.type = index;
		}

		if(kind == 'device'){
			this.setState({
				device_selected: index,
			});
			filters.device = index;
		}

		if(kind == 'user'){
			this.setState({
				user_selected: index
			});
			filters.user = index;
		}
		if(kind == 'direction'){
			this.setState({
				direction_kind_selected: index
			});
			filters.direction = index;
		}
		if(kind == 'result'){
			this.setState({
				result_kind_selected: index
			});
			filters.result = index;
		}
		if(kind == 'pin_code'){
			this.setState({
				pin_code_kind_selected: index
			});
			filters.pin_code = index;
		}
		this.props.showAdd([true,filters]);
	}

	renderDeviceRow(device){
		if(device.device_id == this.state.device_selected.device_id){
			var style = GlobalStyles.row_selected;
		}
		else
			var style = GlobalStyles.row;

		return (		
			<TouchableOpacity  style={style} onPress={() =>  this.addParameters('device',device) }>
				<Text>{device.device_name}</Text>
			</TouchableOpacity >
		);
	}

	renderUserRow(user){

		if(user.user_id == this.state.user_selected.user_id)
			var style = GlobalStyles.row_selected;
		else
			var style = GlobalStyles.row;

		return (
			<TouchableOpacity  style={style} onPress={() =>  this.addParameters('user',user) }>
				<Text>{user.user_first_name} , {user.user_last_name}</Text>
			</TouchableOpacity >
		);

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

	searchUser(query){

		var results = [];
		var toSearch = this.trimString(query).toLowerCase(); // trim it
		var input_options = this.state.users_array;

      	for(var i=0; i < input_options.length; i++) {
        	var object = input_options[i]; 	
        	var title = object.full_name.toLowerCase();
        
      		if(title.indexOf(toSearch) != -1) {
        		if(!this.itemExists(results, object)) {
          			results.push(object);
        		}
      		}	         
    	}

    	this.setState({
    		users: this.state.users.cloneWithRows(results)
    	})
	}

	searchDevice(query){
		var results = [];
		var toSearch = this.trimString(query).toLowerCase(); // trim it
		var input_options = this.state.devices_array;

      	for(var i=0; i < input_options.length; i++) {
        	var object = input_options[i]; 	
        	var title = object.device_name.toLowerCase();
        
      		if(title.indexOf(toSearch) != -1) {
        		if(!this.itemExists(results, object)) {
          			results.push(object);
        		}
      		}	         
    	}

    	this.setState({
    		devices: this.state.devices.cloneWithRows(results)
    	})
	}

	render() {
		var type_selected = this.state.type_kind_selected;
		var device_selected = this.state.device_kind_selected;
		var user_selected = this.state.users_kind_selected;
		var direction_selected = this.state.direction_kind_selected;
		var result_selected = this.state.result_kind_selected;

		return(
			<View style={{marginTop:56,backgroundColor: GLOBAL.SECONDARY_COLOR}}>
				<View style={{marginTop: 5}}>
					<View style={{flex:1,flexDirection:"row"}}>
						<Text style={{color:"white",padding:10}}>SEARCH PARAMETERS</Text>			
					</View>
					<View>	
						<TouchableOpacity  style={this.state.values == 'type' ?  GlobalStyles.row_selected : GlobalStyles.row} onPress={() => this.changeValues('type')}>
							<Text>Type</Text>
						</TouchableOpacity >
						<TouchableOpacity  style={this.state.values == 'device' ?  GlobalStyles.row_selected : GlobalStyles.row} onPress={() => this.changeValues('device')}>
							<Text>Device</Text>
						</TouchableOpacity >
						<TouchableOpacity  style={this.state.values == 'user' ?  GlobalStyles.row_selected : GlobalStyles.row} onPress={() => this.changeValues('user')}>
							<Text>User</Text>
						</TouchableOpacity >
						<TouchableOpacity  style={this.state.values == 'direction' ?  GlobalStyles.row_selected : GlobalStyles.row} onPress={() => this.changeValues('direction')}>
							<Text>Direction</Text>
						</TouchableOpacity >
						<TouchableOpacity  style={this.state.values == 'result' ?  GlobalStyles.row_selected : GlobalStyles.row} onPress={() => this.changeValues('result')}>
							<Text>Result</Text>
						</TouchableOpacity >
						<TouchableOpacity  style={GlobalStyles.row} onPress={() => this.changeValues('pin_code')}>
							<Text>PinCode</Text>
						</TouchableOpacity >
					</View>
				</View>
				{this.state.values == "type" && 
					<View>
						<Text style={{color:"white",padding:10}}>SELECT A TYPE</Text>
						<Value name="Code"  index="code" kind="type" type_selected={type_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />		
						<Value name="Sensor" index="sensor" kind="type" type_selected={type_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />
						<Value name="Auto" index="auto" kind="type" type_selected={type_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />
						<Value name="Fob" index="fob" type_selected={type_selected}  kind="type" addParameters={(kind,index) => this.addParameters(kind,index)} />
						<Value name="Info" index="info" type_selected={type_selected} kind="type" addParameters={(kind,index) => this.addParameters(kind,index)} />
						<Value name="Schedule" index="schedule" type_selected={type_selected} kind="type" addParameters={(kind,index) => this.addParameters(kind,index)} />
						<Value name="Manual" index="manual" type_selected={type_selected} kind="type" addParameters={(kind,index) => this.addParameters(kind,index)} />
					</View>
				}
				{this.state.values == "device" &&
					<View>
						<Text style={{color:"white",paddingTop:5,paddingLeft:10}}>SELECT A DEVICE</Text>
			            <View style={GlobalStyles.searchbarContainer}>
			                <View style={GlobalStyles.iconSearchContainer}>    
			                    <Icon name="search" size={20}/ >
			                </View>
			                <View>
			                    <TextInput
			                        style={GlobalStyles.searchBar}
			                        onChangeText={(text) => this.searchDevice(text)} 
			                        underlineColorAndroid={'transparent'}
			                        placeHolder="Search Device"
			                    />    
			                </View>            
			            </View>						
						<ListView
							dataSource={this.state.devices}
							renderRow={(row) => this.renderDeviceRow(row)}
							key={this.state.device_selected.device_id}
						/>
					</View>
				}
				{this.state.values == "user" &&
					<View>
						<Text style={{color:"white",paddingTop:5,paddingLeft:10}}>SELECT A USER</Text>

			            <View style={GlobalStyles.searchbarContainer}>
			                <View style={GlobalStyles.iconSearchContainer}>    
			                    <Icon name="search" size={20}/ >
			                </View>
			                <View>
			                    <TextInput
			                        style={GlobalStyles.searchBar}
			                        onChangeText={(text) => this.searchUser(text)} 
			                        underlineColorAndroid={'transparent'}
			                        placeholder="Search User"
			                    />    
			                </View>            
			            </View>						
						
						<ListView
							dataSource={this.state.users}
							renderRow={(row) => this.renderUserRow(row)}
							key={this.state.user_selected.user_id}
						/>
					</View>
				}
				{this.state.values == "direction" &&
					<View>
						<Text style={{color:"white",padding:10}}>SELECT A DIRECTION</Text>
						<Value name="Opening"  index="opening" kind="direction" type_selected={direction_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />		
						<Value name="Closing" index="closing" kind="direction" type_selected={direction_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />
						<Value name="No Movement" index="no movement" kind="direction" type_selected={direction_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />
					</View>

				}{
					this.state.values == "result" &&
					<View>
						<Text style={{color:"white",padding:10}}>SELECT A TYPE</Text>
						<Value name="Denied"  index="denied" kind="result" type_selected={result_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />
						<Value name="Granted"  index="granted" kind="result" type_selected={result_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />
						<Value name="Restricted"  index="restricted" kind="result" type_selected={result_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />
						<Value name="Conflict"  index="conflict" kind="result" type_selected={result_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />
						<Value name="No Change"  index="no change" kind="result" type_selected={result_selected} addParameters={(kind,index) => this.addParameters(kind,index)} />
					</View>
				}{
					this.state.values == "pin_code" &&
					<View>
						<Text style={{color:"white",padding:10}}>Insert a PIN CODE</Text>
						<TextInput style={GlobalStyles.row} onChangeText={(text) => this.addParameters("pin_code",text)} underlineColorAndroid={'transparent'} />
					</View>
				}

			</View>


		)
	}

}