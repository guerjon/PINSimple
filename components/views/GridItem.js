import React , {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import GLOBAL from '../Globals';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageHelper from '../helpers/ImageHelper';

var styles = StyleSheet.create({
  	textContainer:{
		backgroundColor: "rgba(0,0,0,0.6)",
		bottom:0,
		position: "absolute",
		width: 150,
		justifyContent:"center",
		alignItems: "center",
		height: 25
	},
	text: {
		color: "white"
	}
});

export default class GridItem extends Component {

	constructor(props) {
		super(props);
		var global_route = GLOBAL.BASE_URL + props.image_route + props.item_id;
		this.state = { image: { uri: global_route  } }
	}

	onError(error){
		this.setState({ image: this.props.defaultImageRoute});
	}

	render(){
		return(
			<View>
				<ImageHelper
					id={this.props.item_id}
					defaultImage = {this.props.defaultImage}
					route={this.props.image_route} 
					styles={{width: 150, height: 150}}
				/>
				<View style={styles.textContainer}>
					<Text style={styles.text}>
						{this.props.item_name}
					</Text>
				</View>						
	      	</View>
	    );
	}	
}