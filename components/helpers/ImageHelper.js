import React, { Component } from 'react';
import styles from '../GlobalStyles';
import GLOBAL from '../Globals';
import { Image} from 'react-native';



export default class ImageHelper extends Component{

	constructor(props) {
		super(props);
		//props: id, route , style, defaultImage
		
		var global_route = GLOBAL.BASE_URL + props.route + props.id;
		this.state = {
			image: { uri: global_route } 
		}
	}

	onError(error){
		this.setState({ image: this.props.defaultImage });
	}

	componentWillReceiveProps(nextProps) {
		
		if(this.props.id != nextProps.id){
			var global_route = GLOBAL.BASE_URL + nextProps.route + nextProps.id;
			this.setState({
				image : {uri : global_route}
			});
		}
	}

	render() {
		return (
			<Image 
				source={this.state.image}
				style={this.props.styles}
				onError={this.onError.bind(this)}
			/>
		)
	}
}