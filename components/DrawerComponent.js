import React, { Component } from 'react';
import { View, Text, Button, DrawerLayoutAndroid,TouchableHighlight, ScrollView,Modal,ListView } from 'react-native';
import Scene from './Scene';
import FormCampusModal from './modals/FormCampusModal';

//Elements helpers
import LaunchElement from './LaunchElement';
import LaunchElementGroup  from './LaunchElementGroup';

export default class DrawerComponent extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
			data : new ListView.DataSource({
        		rowHasChanged: (row1, row2) => row1 !== row2,
	      	})
		};
	}

	render() {
		console.log('--------------------------------');
		console.log(this.props.route);
		console.log('--------------------------------');

		//LaunchElement component has the prop name, this name is for the icon name.
		var navigationView = (
			<View style={{flex:1,backgroundColor:"#8F969E"}}>
				<ScrollView style={{marginTop:55}}>
					<LaunchElementGroup name="home"   text="Home" navigator={this.props.navigator} index="home" />   
					<LaunchElementGroup name="users"  text="Users & Groups" navigator={this.props.navigator} index="usersandgroups" />
					<LaunchElementGroup name="map"    text="Locations" navigator={this.props.navigator} index="locations"/>
					<LaunchElementGroup name="mobile" text="Device Management" navigator={this.props.navigator} index="devicemanagement"/>
					<LaunchElementGroup name="book"   text="Access History" navigator={this.props.navigator} index="access_history"/>
					<LaunchElementGroup name="sign-out" text="Logout" />
				 </ScrollView>
			</View>
		);
		
		return (
			<DrawerLayoutAndroid
				drawerWidth={200}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => navigationView}
				ref={(ref) => this.props.getDrawer(ref)}
			>	
				<Scene 
					scene={this.props.route.index} 
					navigator={this.props.navigator} 
					route={this.props.route} 
					data={this.state.data}
					separateData={this.props.separateData}
					loaded={this.props.loaded}
					onChangeTextHandler={(info) => this.props.onChangeTextHandler(info)}
					showAdd = {(value) => this.props.showAdd(value)}
					filters = {this.props.filters}
				/> 
				<FormCampusModal
					onRequestClose={this.props.closeModal} 
					getModal = {(modal) => this.props.getModal(modal)} 
					modalVisible = {this.props.modalVisible}
					closeModal = {this.props.closeModal}
				/>
				
			</DrawerLayoutAndroid> 
		);
	}
}

