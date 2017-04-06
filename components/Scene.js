import React, {Component} from 'react';
import {ListView, ActivityIndicator,View,Text,TouchableHighlight,ScrollView} from 'react-native';

import Home from './views/Home';

//Users & groups
import Users from './views/users_and_groups/Users';
import Groups from './views/users_and_groups/Groups';

// Locations
import Campuses from './views/locations/Campuses';
import Buildings from './views/locations/Buildings';
import Rooms from './views/locations/Rooms';
import Devices from './views/locations/Devices';
import AccessPoints from './views/locations/AccessPoints';

//DeviceManagement
import Controllers from './views/device_management/Controllers';
import Endpoints from './views/device_management/Endpoints';
import Connections from './views/device_management/Connections';

//Access History
import AccessHistory from './views/access_history/AccessHistory';
import AddFiltersToAccessHistory from './views/access_history/AddFiltersToAccessHistory';

import UsersDetails from './views/users_and_groups/UsersDetails';
import GroupsDetails from './views/users_and_groups/GroupsDetails';

import CampusesDetails from './views/locations/CampusesDetails';
import BuildingsDetails from './views/locations/BuildingsDetails';
import RoomsDetails from './views/locations/RoomsDetails';
import DevicesDetails from './views/locations/DevicesDetails';
import AccessPointsDetails from './views/locations/AccessPointsDetails';

import ControllersDetails from './views/device_management/ControllersDetails';
import EndpointsDetails from './views/device_management/EndpointsDetails';
import ConnectionsDetails from './views/device_management/ConnectionsDetails';

import GLOBAL from './Globals';
import ListItem from './views/ListItem';
import SearchBarContainer from './views/SearchBarContainer';
import * as Keychain from 'react-native-keychain';

	/*
		component is a string to represent the name of component by example <Home/> this will be used in SpecifiScene
		searchBar : boolean is a flag to decided if the scene would be shown
		gridView : boolean similar to searchBar
		routeFetch : string | boolean 
	*/
const components = {
	home: {component: Home},
	users : {component: Users, searchBar:true, gridView:true,routeFetch:'user/get'},
	groups : {component: Groups, searchBar:true, gridView:true,routeFetch:'group/get' },
	campuses : {component:Campuses,searchBar:true,gridView:true,routeFetch:'client/get/areas'} ,
	buildings : {component:Buildings,searchBar:true,gridView:true,routeFetch:'client/get/areas'} ,
	rooms : {component:Rooms,searchBar:true,gridView:true,routeFetch:'client/get/areas'} ,
	devices : {component:Devices,searchBar:true,gridView:true,routeFetch:'client/get/areas',},
	access_points : {component:AccessPoints,searchBar:true,gridView:true,routeFetch:'client/get/areas'} ,
	controllers : {component:Controllers,searchBar:true,gridView:true,routeFetch:'client/get/areas'} ,
	endpoints : {component:Endpoints,searchBar:true,gridView:true,routeFetch:'client/get/areas'} ,
	connections : {component:Connections,routeFetch: 'client/get/areas'} ,
	access_history : {component:AccessHistory} ,
	access_history_filters : {component: AddFiltersToAccessHistory},
	users_details : {component:UsersDetails},
	groups_details : {component:GroupsDetails},

	campuses_details : {component:CampusesDetails} ,
	buildings_details : {component:BuildingsDetails} ,
	rooms_details : {component:RoomsDetails} ,
	devices_details: {component:DevicesDetails} ,
	access_points_details : {component:AccessPointsDetails},

	controllers_details : {component: ControllersDetails},
	endpoints_details : {component: EndpointsDetails},
	connections_details : {component: ConnectionsDetails}

};

const normalTabStyle = {
	flex:1,
	backgroundColor:"white",
	height:25, 
	alignItems: "center", 
	justifyContent:"center",
	borderWidth:1,
	borderColor:"#57bbdf"							
};

const activeTabStyle = {
	flex:1,
	backgroundColor:"#57bbdf",
	height:25,
	alignItems:"center",
	justifyContent:"center",
	borderRadius:1							
}

var getListViewStyles = function(active_view){
	if(active_view == 'list_view'){
		return activeTabStyle;
	}
	
	return normalTabStyle;
}

var getGridViewStyles = function(active_view){
	if(active_view == "grid_view"){
		return activeTabStyle;
	}	
	return normalTabStyle;	
}

var getListTextStyles = function(active_view){
	if(active_view == "list_view"){
		return {color:"white"};
	}
	return {color: "#57bbdf"};	
}

var getGridTextStyles = function(active_view){
	if(active_view == "grid_view"){
		return {color:"white"}
	}
	return {color:"#57bbdf"}
}
var global_credentials = null;

export default class Scene extends Component{

	constructor(props) {
		super(props);
		this.state = {
			data:  [],
			allData : [],
			activeView: "list_view",
			test : null,
		}
		this.handleKindOfViewChange = this.handleKindOfViewChange.bind(this);
		this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
	}

	onChangeTextHandler(info){

		var results = this.searchFor(info.searchText,this.state.allData,this.props.scene);
		
		this.setState({       
			data: results,
	  	});	
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

	searchFor(toSearch,objects,scene){
		var results = [];
	  	
	  	console.log(toSearch);
	  	console.log(objects);
	  	console.log(scene);

	  	toSearch = this.trimString(toSearch); // trim it
	  	for(var i=0; i < objects.length; i++) {
		    var index = null;
		    var object = objects[i]; 
			switch(scene){
		  		case "users":
		  			index = object.full_name;
		  			break;
		  		case "groups":
		  			index = object.group_name;
		  			break;
		  		case "campuses":			
					index = object.campus_name; 
					break;
				case "buildings":
					index = object.building_name;
					break;
				case "rooms":
					index = object.room_name;
					break;
				case "access_points":
					index = object.device_name;
					break;
				case "controllers":
					index = object.device_name;
					break;
				case "endpoints":
					index = object.device_name;
					break;
				default:
					return;
		  	}

			if(index.toLowerCase().indexOf(toSearch) != -1) {
				if(!this.itemExists(results, object)) {
					results.push(object);
				}
			}		  		
		}

		if(scene == 'users')
			results = this.separateUsersData(results,global_credentials);
		
		return results;
	}
/*
	filterData(searchText, data) {
	  	let text = searchText.toLowerCase();

	  	return data.filter( (n) => {
	    	let note = n.body.toLowerCase();
	    	return note.search(text) !== -1;
	  	});
	}
*/
  	renderLoadingView() {
	    return (
	      	<ActivityIndicator size={30} />
	    );
  	}

	handleKindOfViewChange(active_view){
		this.setState({
			activeView: active_view
		});
	}

	componentDidMount() {
		var route = components[this.props.scene].routeFetch;
		if(route){
			switch(this.props.scene){
				case 'users' :
					this.getUserDataFetch(route);
					break;
				case 'groups' :
					this.getGeneralDataFetch(route)
					break;
				case 'campuses': 
					this.getLocationDataFetch(route)
					break;
				case 'buildings':
					this.getLocationDataFetch(route)
					break;				
				case 'rooms':
					this.getLocationDataFetch(route)
					break;
				case 'access_points':				
					this.getLocationDataFetch(route)
					break;
				case 'controllers':
					this.getLocationDataFetch(route);
					break;
				case 'endpoints':
					this.getLocationDataFetch(route);
				case 'connections':
					this.getLocationDataFetch(route);
					break;
				default:
					break;
			}
		}
	}

	separateUsersData(data,credentials){
	  	var current_user = [];
	  	var administrator_users = [];
	  	var active_users = [];
	  	var rest_users = [];
	
	  	for (var i = 0 ; i < data.length ; i++) { 
	  		var user = data[i];
	  		user.full_name = user.user_first_name + " " + user.user_last_name;
	  		
	  		if(user.user_login == credentials.username){
	  			current_user.push(user);
	  		}
	  		else if(user.user_is_client_admin){
	  			administrator_users.push(user); 
	  		}else if(user.user_status){
	  			active_users.push(user);
	  		}else{
	  			rest_users.push(user);
	  		}
	  	}

		data = [current_user,administrator_users,active_users,rest_users];
		return data;			  	
	}

	stickUsersData(data){
		if(data){
			var stickData = data[0].concat(data[1],data[2],data[3])
			return stickData;
		}else{
			return [];
		}
	}

	getUserDataFetch(route){
		Keychain
			  	.getGenericPassword()
			  	.then((credentials) => {
				    var headers = new Headers({
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded',
						'username': credentials.username,
						'password': credentials.password
					});
					fetch(GLOBAL.BASE_URL + route, {
						method: 'GET',
						headers: headers,
					})
					.then((response) => response.json())
					.then((responseJson) => {
					  		
					  	var data = this.separateUsersData(responseJson.data.users,credentials);
						global_credentials = credentials;

					  	if(responseJson.status == "success"){
						  	this.setState({       
								data: data,
								allData : responseJson.data.users,
						  		loaded: true
						  	});            
					  	}
					})
					.catch((error) => {
						console.warn(error);
					});
			  	}).catch(function(error) {
			    console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
			}
		);
	}

	getGeneralDataFetch(route){
		Keychain
			  	.getGenericPassword()
			  	.then((credentials) => {
				    var headers = new Headers({
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded',
						'username': credentials.username,
						'password': credentials.password
					});
					global_credentials = credentials;

					fetch(GLOBAL.BASE_URL + route, {
						method: 'GET',
						headers: headers,
					})
					.then((response) => response.json())
					.then((responseJson) => {
					  	if(responseJson.status == "success"){
						  	this.setState({       
								data: responseJson.data,
						  		loaded: true,
						  		allData : responseJson.data
						  	});            
					  	}
					})
					.catch((error) => {
						console.warn(error);
					});
			  	}).catch(function(error) {
			    console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
			}
		);
	}

	selectAccessPointsAndControllers(devices){
		var access_points = [];
		var controllers = [];

		for (var i = 0; i < devices.length; i++) {
			var device = devices[i];

			if (device.device_type_id == 4 || device.device_type_id == 7) {
				access_points.push(device);
			} 
			if(device.device_type_id == 5 || device.device_type_id == 5)
				controllers.push(device);
		}
		var devices = [access_points,controllers];
		return devices;
	}


	getLocationDataFetch(route){
		
		Keychain
		  .getGenericPassword()
		  .then((credentials) => {
			    var headers = new Headers({
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
					'username': credentials.username,
					'password': credentials.password
				});
				fetch(GLOBAL.BASE_URL + route , {
					method: 'GET',
					headers: headers,
				})
				.then((response) => response.json())
				.then((responseJson) => {
				  	global_credentials = credentials;	
				  	var data = responseJson.data;
					var buildings = GLOBAL.GET_TREE(data,'buildings');
				  	var rooms = GLOBAL.GET_TREE(buildings,'rooms');
				  	var devices = this.selectAccessPointsAndControllers(GLOBAL.GET_TREE(rooms,'devices'));
				  	var access_points = devices[0];
				  	var controllers = devices[1];
				switch(this.props.scene){
					case 'buildings' :
						data = buildings;
						break;
					case 'rooms':
						data = rooms;
						break;
					case 'access_points':
						data = access_points;
						break;
					case 'controllers':
						data = controllers;
						break;
					case 'endpoints':
						data = controllers;
					case 'connections':
						data = controllers;
					default:
						break;
				}
			  	if(responseJson.status == "success"){
				  	
				  	this.setState({       
						data: data,
				  		allData : data,
				  		loaded: true
				  	});
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
		const SpecifiScene = components[this.props.scene].component;
		return (
			<View>
				{
					components[this.props.scene].searchBar && 
					<View style={{marginTop:57}}>
	      				<SearchBarContainer 
			      			onChangeTextHandler={(info) => this.onChangeTextHandler(info) } 
			      		/>	
						<View style={{marginTop:10,marginBottom:10,flexDirection:"row",marginLeft:5,marginRight:5,backgroundColor:"red"}}>	
							
							<TouchableHighlight 
								style={getListViewStyles(this.state.activeView)}
							onPress={() => this.handleKindOfViewChange("list_view")}
							>
								<Text style={getListTextStyles(this.state.activeView)}>List View</Text>
							
							</TouchableHighlight>
							
							<TouchableHighlight 
								style={getGridViewStyles(this.state.activeView)}
								onPress={() => this.handleKindOfViewChange("grid_view")}
							>
								<Text style={getGridTextStyles(this.state.activeView)	}>Grid View</Text>

							</TouchableHighlight>
						</View>
					</View>	
				}
				
				<ScrollView>
					<SpecifiScene
						data={this.state.data} 
						navigator={this.props.navigator}
						route={this.props.route}
						activeView={this.state.activeView}
						showAdd={(value) => this.props.showAdd(value)}
						filters={this.props.filters}
					/>
				</ScrollView>
			</View>
	    );
	}
}