import React, {Component} from 'react';
import { TextInput, Text, View } from 'react-native';
import GlobalStyles from '../GlobalStyles';


export default class ItemDetails extends Component{

	constructor(props) {
		super(props);
	}

	render(){
		var data = this.props.data;
		var navigator = this.props.navigator;
		var styles = GlobalStyles;
		var type = (
			<View style={styles.row}>
				<View style={styles.item_name_container}>
					<Text style={styles.item_name}>
						Type: 
					</Text>
				</View>
				<View style={styles.item_input_container}>
					<Text style={styles.item_input}>
						{data.item_type}
					</Text>
				</View>
			</View>			
		);

		return (
			<View>	
				<View style={styles.item_title_container}>
					<Text style={styles.item_title}>{data.title}</Text>
				</View>
				<View style={styles.row}>
					<View style={styles.item_name_container}>
						<Text style={styles.item_name}>
							Name: 
						</Text>
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{data.item_name}
						</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.item_name_container}>
						<Text style={styles.item_name}>
							Description: 
						</Text>
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{data.item_description}
						</Text>
					</View>
				</View>
				<View>
					{this.props.type && type}
				</View>
			</View>
		);
	}
}