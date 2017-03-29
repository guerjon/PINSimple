import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet,TextInput, Image, ScrollView} from 'react-native';
import ItemDetails from './ItemDetails';
import LocationInformation from './LocationInformation';
import Pieces from './Pieces';
import GLOBAL from '../Globals';
import GlobalStyles from '../GlobalStyles';
import ImageHelper from '../helpers/ImageHelper';

export default class GeneralFrom extends Component{

	constructor(props) {
		super(props);

		var global_route = GLOBAL.BASE_URL + props.image_route + props.item_id;
		
		this.state = {
			edit_mode : false,
		}
	}

	render(){

		var edit_mode = this.state.edit_mode;
		var data = this.props;
		var styles = GlobalStyles;
		//item prices is the variable where we put the references to the childres
		// in this context  campuses > buildings > rooms > devices > access points
		// if the last click was in campus item_pices should be a buldings array
		var item_pieces = this.props.item_pieces;
		var next_route = this.props.next_route;
		var flag = this.props.item_pieces ? (this.props.item_pieces.length ? true : false) : false;
		return (
			<ScrollView style={{marginTop:10}}>
				<View style={styles.thumbnail_container} >
					<ImageHelper 
						id={this.props.item_id}
						route={this.props.image_route}
						styles={styles.thumbnail}
						defaultImage={this.props.defaultImage}
					/>
				</View>
				<View style={{marginTop:10}}>
					<ItemDetails 
						edit_mode={edit_mode} 
						data={this.props}
					/>
				</View>
				<View>
					<LocationInformation 
						edit_mode={edit_mode} 
						data={this.props}
					/>
				</View>
				<View style={{marginBottom:100}}>
					{this.props.next_route && flag  && 
						<Pieces 
						navigator={this.props.navigator} 
						edit_mode={edit_mode} 
						data={this.props.item_pieces} 
						next_route={this.props.next_route}
						third_title={this.props.third_title}
					/>}
				</View>
			</ScrollView>
		);
	}
}