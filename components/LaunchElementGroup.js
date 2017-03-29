import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Button, ListView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import LaunchElement from './LaunchElement';

const styles = StyleSheet.create({
  text:{
    color: "white"
  },
});

function UsersAndGroupScenes(props){
	return (
		<View>
			<LaunchElement tab="users" text="Users" navigator={props.navigator}/>
		    <LaunchElement tab="groups" text="Access Groups" navigator={props.navigator}/>	
		</View>
	)
}

function LocationScenes(props) {
	return (
		<View>
          	<LaunchElement tab="campuses" text="Campuses" navigator={props.navigator}/>
          	<LaunchElement tab="buildings" text="Buildings" navigator={props.navigator}/>
          	<LaunchElement tab="rooms" text="Areas" navigator={props.navigator}/>
          	<LaunchElement tab="access_points" navigator={props.navigator} text="Access Points"/>		
		</View>
	);
}

function DeviceManagementScenes(props) {
	return (
		<View>
            <LaunchElement tab="controllers" text="Controllers" navigator={props.navigator}/>
            <LaunchElement tab="endpoints" text="Endpoints" navigator={props.navigator}/>
            <LaunchElement tab="connections" text="Connections" navigator={props.navigator}/>
		</View>
	);
}

function AccessHistoryScenes(props){
	return (
		<View>
			<LaunchElement tab="user_access" text="Users Access" navigator={props.navigator}/>
            <LaunchElement tab="endpoint_access" text="Endpoint Access" navigator={props.navigator}/>
            <LaunchElement tab="global_history" text="Global History" navigator={props.navigator}/>
		</View>
	);
}

const components = {
	usersandgroups : UsersAndGroupScenes, 
	locations : LocationScenes,
	devicemanagement : DeviceManagementScenes ,
	accesshistory : AccessHistoryScenes
}

function Tags(props) {
	const SpecifiTags = components[props.index];
	return <SpecifiTags navigator={props.navigator} />; 
}

export default class LaunchElementGroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showTabs : false
		}
		this.handleShowTabs = this.handleShowTabs.bind(this);
		this.handleHomeTab = this.handleHomeTab.bind(this);
	}

	handleShowTabs(){
		this.setState({
			showTabs : !this.state.showTabs
		});
	}

	handleHomeTab(){
		this.setState({
			showTabs : !this.state.showTabs
		});
		this.props.navigator.push({index:'home',dataFilter: {}})
	}

	render(){

		var style = {
			borderRadius:0,
			backgroundColor:"#29323C",
			padding:5,
			borderTopColor:"#bfbfbf", 
			borderBottomColor:"#bfbfbf",
			borderBottomWidth:1,
			borderTopWidth:1
		};

		if(this.props.name == 'home'){
			return (
				<View style={{marginBottom:8}}>					
					<View style=
						{
							style
						}> 
						<Icon.Button 
							size={30} 
							name={this.props.name} 
							color="white" 
							style={{backgroundColor:"#29323C" }} 
							onPress={() => this.props.navigator.push({index:'home',dataFilter: {}}) }>
							<Text style={{color:"white"}}>
								{this.props.text}
							</Text>
						</Icon.Button>
					</View>		
				</View>
			)

		}else{
			return (
				<View style={{marginBottom:8}}>					
					<View style=
						{
							style
						}> 
						<Icon.Button size={30} name={this.props.name} color="white" style={{backgroundColor:"#29323C" }} onPress={this.handleShowTabs}>
							<Text style={{color:"white"}}>
								{this.props.text}
							</Text>
						</Icon.Button>
					</View>
					<View>
						{ this.state.showTabs  &&  <Tags index={this.props.index} navigator={this.props.navigator} />}				
					</View>		
				</View>
			)

		}

	}
}