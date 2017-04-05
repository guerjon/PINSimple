import Autocomplete from 'react-native-autocomplete-input';
import React, { Component} from 'react';
import {} from 'react-native';
import GLOBAL from '../../Globals';
import GlobalStyles from '../../GlobalStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  ListView,
  TextInput
} from 'react-native';
import * as Keychain from 'react-native-keychain';
var moment = require('moment');


Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }

function InputWithRow(props){
	return(	<TouchableOpacity 
            style={{backgroundColor:"#ffffff",borderBottomColor:"#F8F9F9",borderBottomWidth:1,marginBottom:20}} 
			onPress={
					() => props.onPress() 
			} 
        >
            <View style={{ justifyContent: 'space-between',alignItems:"center", flexDirection: 'row'}}>
                <Text style={{color:"black",padding:10, marginLeft:15}}>
                    {props.text}
                </Text>
                <Icon
                    size={25}
                    name="angle-right" 
                    color="#D0D3D4"
                    style={{backgroundColor:"#ffffff",marginRight:5}}
                />
            </View>
        </TouchableOpacity>		
    );							
							
}

export default class AccessHistory extends Component {
  
  	constructor(props) {
		super(props);
		this.state = {
	  		loaded : false,
	  		data : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		};
  	}

  	componentWillReceiveProps(nextProps) {  		
  		this.getHistoryDataFetch(nextProps.filters);
  	}

  	componentDidMount() {
  		this.getHistoryDataFetch(null);
  	}
  	
  	getHistoryDataFetch(filters){
  		this.setState({
  			loaded:false
  		});

  		return	Keychain
			  	.getGenericPassword()
			  	.then((credentials) => {
				    var headers = new Headers({
						'username': credentials.username,
						'password': credentials.password
					});

					var data = new FormData();

					if(filters && Object.keys(filters).length !== 0 && filters.constructor === Object){
						console.log(filters.direction);
						if(filters.type)
							data.append ("history_type",filters.type);
						if(filters.device)
							data.append ("history_device_id",filters.device.device_id)
						if(filters.user)
							data.append( "history_user_id",filters.user.user_id)
						if(filters.direction){
							var direction = filters.direction == 'opening' ? 0 : (filters.direction == "closing" ? 1 : 2);
							data.append("history_direction",direction );
						}
						
						if(filters.result){
							var result = 0;
							switch(filters.result){
								case  "denied" :
									result = 0;
									break;
								case "granted":
									result = 1;
									break;
								case "restricted":
									result = 2;
									break;
								case  "conflict":
									result = 3;
									break;
								case "no change":
									result = 4
									break;
								default:
									break;
							}
							
							data.append("history_result",result);
						}
						
						if(filters.pin_code)
							data.append("history_is_devicepin",filters.pin_code)

						data.append( "record_count", 50 );

					}else{
						
				    	data.append( "record_count", 50 );
					}


					var res = fetch(GLOBAL.BASE_URL + 'history/get', {
						method: 'POST',
						headers: headers,
						body: data 
					})
					.then((response) => response.json())
					.then((responseJson) => {
						this.setState({
			  				loaded: true,
			  				data : this.state.data.cloneWithRows(responseJson.data.events) 
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

	
  	convertUnixTime(time){
		var times = moment.unix(time);
	
		return times.format("MM/D/YY, h:mm A");  		
  	}

  	renderInfo(info){
  		var history_title = "";
  		var history_device = "";
  		var date = 0;
  		var styles = {
  			row : {
				backgroundColor: "white",
				flexDirection: 'row',
				borderBottomWidth: 0.5,
				padding:10
			},
			yellow_row: {
				backgroundColor: "#FFFFE0",
				flexDirection: 'row',
				borderBottomWidth: 0.5,
				padding:10				
			},
			red_row: {
				backgroundColor: "#FFB6C1",
				flexDirection: 'row',
				borderBottomWidth: 0.5,
				padding:10								
			}
  		}

  		switch(info.history_type){
  			case "Code":
  					history_title = info.history_title;
  					styles = styles.yellow_row;
  				break;
  			case "Fob":
  					if(info.history_result == 0){
  						styles = styles.red_row;
  						history_title = info.history_message;
  					}
  					
  					if(info.history_result == 4){
  						styles = styles.yellow_row;
  						history_title = info.history_title;
  					}
  					
  					if(info.history_result == 1){
  						styles = styles.row;
  						history_title = info.history_title;
  					}

  				break;
  			case "Sensor":
  				history_title = info.history_direction ? "Sensor Close" : "Sensor Open";
  				styles = styles.row;
  				break;
  			case "Schedule":
  				history_title = info.history_direction ? "Schedule Close" : "Schedule Open";
  				styles = styles.row;
  				break;
  			case "Auto":
  					history_title = info.history_direction ? "Automatic Close" : "Automatic Open";
  					styles = styles.yellow_row;
  				break;
  			case "Info":
  					history_title = info.history_message;
  					styles = styles.row;
  				break;
  			case "Manual":
  				history_title = info.history_message;
  				styles = styles.row;
  				break;
  		}

  		return (
  			<View style={styles}>
  				<View>
  					<Text> image </Text>
  				</View>
  				<View style={{flex:1,flexDirection:"column"}}>
  					<Text style={{fontSize:14,color:"black"}}>{history_title}</Text>
  					<Text>{info.history_device_name}</Text>
  					
  				</View>
  				<View style={{alignItems:"center",justifyContent:"center"}}>
  					<Text style={{fontSize:10,color:"black"}}>
  						{this.convertUnixTime(info.history_time)}
  					</Text>
  				</View>
  			</View>
  		);
  	}
	
	capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}

	render() {
		var filters = this.props.filters;
		
		var list_view = (
			<View>
				<Text style={{color:"white",marginBottom:5,marginLeft:5}}>History</Text>
				<ListView
					dataSource={this.state.data}
					renderRow={(info) => this.renderInfo(info)}
				/>
			</View>
		);
		var navigator =  this.props.navigator;
		var index = "access_history_filters";
		var newRowStyles = GlobalStyles.row;
		
		if(this.state.loaded) {	
			if(Object.keys(filters).length !== 0 && filters.constructor === Object){
				return (
				  	<View style={styles.container}>
						<View style={{paddingTop:5}}>
							<Text style={{color:"white",marginLeft:5,marginBottom:5}}>Search Parameters</Text>
							{filters.type &&
								<TouchableOpacity style={newRowStyles} onPress={() => navigator.push({index: index,selected_filter:"type",filters:filters})}>
									<Text style={{marginLeft:40}}>Type :  {this.capitalizeFirstLetter(filters.type)}  </Text>
								</TouchableOpacity>
							}
							{filters.device &&
								<TouchableOpacity style={GlobalStyles.row} onPress={() => navigator.push({index: index,selected_filter:"device",filters:filters})}>
									<Text style={{marginLeft:40}}>Devices : {this.capitalizeFirstLetter(filters.device.device_name)} </Text>
								</TouchableOpacity>
							}
							{filters.user &&
								<TouchableOpacity style={GlobalStyles.row} onPress={() => navigator.push({index: index,selected_filter:"user",filters:filters})}>
									<Text style={{marginLeft:40}}>User : {filters.user.full_name} </Text>
								</TouchableOpacity>						
							}
							{filters.direction &&
								<TouchableOpacity style={GlobalStyles.row} onPress={() => navigator.push({index: index,selected_filter:"direction",filters:filters})}>
									<Text style={{marginLeft:40}}>Direction : {this.capitalizeFirstLetter(filters.direction)} </Text>
								</TouchableOpacity>						
							}
							{filters.result &&
								<TouchableOpacity style={GlobalStyles.row} onPress={() => navigator.push({index: index,selected_filter:"result",filters:filters})}>
									<Text style={{marginLeft:40}}>Result : {this.capitalizeFirstLetter(filters.result)} </Text>
								</TouchableOpacity>						
							}
							{filters.pin_code &&
								<TouchableOpacity style={GlobalStyles.row} onPress={() => navigator.push({index: index,selected_filter:"pin_code",filters:filters})}>
									<Text style={{marginLeft:40}}>PIN CODE : {filters.pin_code} </Text>
								</TouchableOpacity>
							}
							<InputWithRow 
								onPress={() => navigator.push({index: index,filters:filters})}
								text="Add new Search Parameter"
							/>

						</View>
						{list_view}
				  	</View>
				);							

			}else{
				return (
				  	<View style={styles.container}>
						<View style={{paddingTop:5}}>
							<Text style={{color:"white"}}>Search Parameter</Text>
				            <InputWithRow 
				            	onPress={() => navigator.push({index:index})} 
				            	text="Add new Search Parameter" 
				            />				
						</View>
						{list_view}
				  	</View>
				);				
			}
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
		padding: 50,
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