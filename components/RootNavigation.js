import React, { Component } from 'react';
import { View, Text, Navigator, Image, TouchableHighlight,ListView, StyleSheet, Modal } from 'react-native';
import Home from './views/Home';
import DrawerComponent from './DrawerComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBAL from './Globals';
import * as Keychain from 'react-native-keychain';

function ModalComponent(props){
	return(
		<Modal
	      	animationType={"slide"}
	      	transparent={false}
	      	visible={this.state.modalVisible}
	      	onRequestClose={() => {alert("Modal has been closed.")}}
	      >
	     	<View style={{marginTop: 22}}>
		      	<View>
		        	<Text>Hello World!</Text>

		        	<TouchableHighlight onPress={() => {
		          		this.setModalVisible(!this.state.modalVisible)
		        	}}>
		          		<Text>Hide Modal</Text>
		        	</TouchableHighlight>
		      	</View>
	     	</View>
	    </Modal>
	);
}

export default class RootNavigation extends Component {
  
	constructor(props) {
		super(props);
		
		this.state = {
		  	data: new ListView.DataSource({
        		rowHasChanged: (row1, row2) => row1 !== row2,
	      	}),
	      	allData : new ListView.DataSource({
        		rowHasChanged: (row1, row2) => row1 !== row2,
	      	}), 
	      	separateData : [],
	      	loaded: false,
	      	openDrawer: true,
	      	modalVisible: false,
	      	showAdd: false,
	      	filters: {}
		}		

		this.handleChangeDrawerState = this.handleChangeDrawerState.bind(this);	
		this.handleChangeModalState = this.handleChangeModalState.bind(this);	
	}

	getDrawer(drawer){
		this.drawer = drawer;
	}

	getModal(modal){
		this.modal = modal;
	}

	setModalVisible(visible,currentScene){
		this.setState({modalVisible:visible});	
	}

	handleChangeDrawerState(){
		
		var drawer = this.drawer;

		if(this.state.openDrawer){
			drawer.openDrawer();
			this.setState({
				openDrawer: false
			});
		}else{
			drawer.closeDrawer();
			this.setState({
				openDrawer: true
			});
		}
	}

	handleChangeModalState(){
		var modal = this.modal;
		if(this.state.modalVisible){
			this.setState({
				modalVisible: false
			});
		}else{
			this.setState({
				modalVisible: true
			});
		}	
	}

	showAdd(value){
		if(value){
			
			this.setState({
				showAdd: value[0],
				filters: value[1]
			});
		}
	}

  	render() {
  		
	  	const routes = [
			{ index : "home", title : "Home"},
			{ index : "users", title:"User Directory",add:true},
			{ index : "groups", title: "Group Directory",add:true},
			{ index : "campuses",title: "Campus Directory",add:true},
			{ index : "buildings", title: "Building Directory",add:true},
			{ index : "rooms", title: "Area Directory",add:true},
			{ index : "access_points", title: "Access Point Directory",add:true},
			{ index : "controllers", title: "Controller Directory"},
			{ index : "endpoints", title: "Endpoint Directory"},
			{ index : "connections", title: "Device Connections"},
			{ index : "access_history", title: "Access History"},
			{ index : "access_history_filters", title: "Add Filters"},
			{ index : "users_details", title: "User Details"},
			{ index : "groups_details", title: "Groups Details"},
			{ index : "campuses_details", title: "Campus Details"},
			{ index : "buildings_details", title: "Building Details"},
			{ index : "rooms_details", title: "Area details"},
			{ index : "access_points_details", title: "Access Points Details"},
			{ index : "controllers_details", title : "Controller Details"},
			{ index : "endpoints_details", title : "Endpoint Details"}
	  	];
	  	
	    return (
	    	<Navigator
	    		initialRoute={routes[10]}
	    		style={{backgroundColor:"white"}}
	    		ref={(navigator) => {this.navigator = navigator}}
	      		renderScene={(route, navigator) => {
	      			return (
	      				<DrawerComponent 
	      					navigator={navigator}  
	      					route={route}
	      					data = {this.state.data}
	      					separateData = {this.state.separateData}
	      					loaded = {this.state.loaded}
	      					getDrawer = {(drawer) => this.getDrawer(drawer)}
	      					getModal = {(modal) => this.getModal(modal)}
	      					modalVisible= {this.state.modalVisible}
	      					onChangeTextHandler={(info) => this.onChangeTextHandler(info)}
	      					closeModal={this.handleChangeModalState}
	      					showAdd={(value) => this.showAdd(value)}
	      					filters = {this.state.filters}
	      				/> 
	      			)  			
	      		}}
	      		configureScene={(route, routeStack) =>
    				Navigator.SceneConfigs.FadeAndroid}
	      		navigationBar={
					<Navigator.NavigationBar
						style={{backgroundColor: '#29323C'}}
						routeMapper={{
							LeftButton: (route, navigator, index, navState) =>
							  	{
								    if (route.index === "home") {
								    	var accion = "";
								    	if(this.state.openDrawer)
								    		accion = "openMenu";
								    	else
								    		accion ="closeMenu";

								    	return ( 
								    		<View style={styles.leftItem}> 
								    			<Icon.Button 
								    				name="bars" 
								    				margin={0} 
								    				backgroundColor={"#29323C"} 
								    				padding={0} 
								    				size={25} 
								    				onPress={this.handleChangeDrawerState} />	
								    		</View>
								    	);
								    } else {
								      	return (
								      		<View style={styles.leftItem} >
					      		                <TouchableHighlight style={styles.leftItem} onPress={() => navigator.pop()}>
						      		                <Icon
								                        size={25}
								                        name="angle-left" 
								                        color="#ffffff"
								                    />
								                </TouchableHighlight >
						                    </View>
								      	);
								    }
							  	},
						 	RightButton: (route, navigator, index, navState) =>
						   	{
						   		if(route.index === "home"){
						   			return null;
						   		}else{

									/*var object = routes.filter(function(obj){
						   				return obj.index == route.index;
						   			});
									*/

									if(route.index == "access_history_filters"){
										if(this.state.showAdd){
											return(
												<View style={styles.rightItem}>
									   	 			<TouchableHighlight 
									   	 				style={styles.rightItem} 
									   	 				onPress={() => navigator.pop()}
									   	 			>
										   	 			<Text style={{color:"white"}}>Add</Text>
									   	 			</TouchableHighlight>
								   	 			</View>
							   	 			)										
										}
									}
						   		}
						   	},
						 	Title: (route, navigator, index, navState) =>
						   	{ 
						   		var object = routes.filter(function(obj){
						   			return obj.index == route.index;
						   		});

						   		if(route.index === "home"){
						   			return (
						   					<View style={styles.centerItem}>
						   						<Image source={require('./sources/logo.png')} />
						   					</View>
						   				);
						   		}else{
						   			return (
						   				<View style={styles.centerItem}>	
							   				<Text style={styles.centerTextItem} >
							   					{object[0].title}
							   				</Text>
						   				</View>
						   			) 
						   		}
						   	},
						}}
					/>
				}
		    />
	    )
  	}
}

const styles = StyleSheet.create({
	centerItem : {
		flexDirection: 'column',
		alignItems:"center",
		justifyContent: 'center',
		flex:1,
		width:220
	},
	centerTextItem : {
		color:"white",
		fontSize: 21
	},
	rightItem : {
		flex:1,
		flexDirection:"column",
		alignItems:"center",
		justifyContent:"center",
		width:50
	},
	leftItem: {
		flex:1,
		flexDirection:"column",
		alignItems:"center",
		justifyContent:"center",
		width:50,
	},
});