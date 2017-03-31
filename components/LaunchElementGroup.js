import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Button, ListView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import LaunchElement from './LaunchElement';

const styles = StyleSheet.create({
  	text:{
    	color: "white"
  	},
  	groupElement: {
		borderRadius:0,
		backgroundColor:"#29323C",
		padding:5,
		borderTopColor:"#bfbfbf", 
		borderBottomColor:"#bfbfbf",
		borderBottomWidth:1,
		borderTopWidth:1  	
  	}
});

function SingleElement(props){
	return (	
		<View style={{marginBottom:8}}>					
			<View style=
				{
					styles.groupElement
				}> 
				<Icon.Button 
					size={30} 
					name={props.name} 
					color="white" 
					style={{backgroundColor:"#29323C" }} 
					onPress={() => props.navigator.push({index:props.index}) }>
					<Text style={{color:"white"}}>
						{props.text}
					</Text>
				</Icon.Button>
			</View>		
		</View>
	);
}

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

const components = {
	usersandgroups : UsersAndGroupScenes, 
	locations : LocationScenes,
	devicemanagement : DeviceManagementScenes
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

	shouldComponentUpdate(nextProps, nextState){
	    if(this.state === nextState)
	    	return false;

	    return true;
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
		var props = this.props;

		switch(props.index){
			case "home":
				return <SingleElement navigator={props.navigator} name={props.name} text={props.text} index="home" />
			break;
			case "access_history":
				return <SingleElement navigator={props.navigator} name={props.name} text={props.text} index="access_history" /> 
			break;
			default:
				return (
					<View style={{marginBottom:8}}>					
						<View style=
							{
								styles.groupElement
							}> 
							<Icon.Button size={30} name={props.name} color="white" style={{backgroundColor:"#29323C" }} onPress={this.handleShowTabs}>
								<Text style={{color:"white"}}>
									{props.text}
								</Text>
							</Icon.Button>
						</View>
						<View>
							{ this.state.showTabs  &&  <Tags index={props.index} navigator={props.navigator} />}				
						</View>		
					</View>
				);
			break;
		}
	}
}