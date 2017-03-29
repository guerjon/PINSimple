import React , {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import GLOBAL from '../Globals';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageHelper from '../helpers/ImageHelper';

var styles = StyleSheet.create({
  	container: {
	    flex: 1,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: 'white',
	    padding:5
  	},
  	rightContainer: {
    	flex: 1
  	},
  	thumbnail_container :{
	    elevation: 2,
	    borderWidth: 1,
  		marginRight:10,
  		borderRadius: 5
  	},
  	thumbnail: {
	    width: 80,
	    height: 80,
  	},
  	listView: {
    	paddingTop: 20,
    	backgroundColor: '#F5FCFF',
  	},
  	item_name : {
  		fontSize : 20,
  		color: "black"
  	},
  	thumbnailPlaceHolder: {

	    width: 80,
	    height: 80,
	    marginRight:10,
	    borderRadius: 5,
	    zIndex:-1
  	}
});

export default class ListItem extends Component {

	constructor(props) {
		super(props);
	}

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.thumbnail_container}>
			        <ImageHelper
			        	id={this.props.item_id}
			        	defaultImage = {this.props.defaultImage}
			        	route={this.props.image_route} 
			        	styles={styles.thumbnail}
			        />
		        </View>
		        <View style={styles.rightContainer}>
		          	<Text style={styles.item_name}>{this.props.item_name} </Text>	
		          	{this.props.text}
		        </View>
                <Icon
                    size={25}
                    name="angle-right" 
                    color="#D0D3D4"
                    style={{backgroundColor:"#ffffff",marginRight:5}}
                />		        	
	      	</View>
	    );
	}	
}