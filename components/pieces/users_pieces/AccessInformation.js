import React, { Component } from 'react';
import {Text,View} from 'react-native';
import styles from '../../GlobalStyles';

export default class AccessInformation extends Component{
	
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<View>	
				<View style={styles.item_title_container}>
					<Text style={styles.item_title}>ACCESS INFORMATION</Text>
				</View>
				<View style={styles.row}>
					<View style={styles.item_name_container}>
						<Text style={styles.item_name}>
							PIN
						</Text>
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{this.props.pin}
						</Text>
					</View>
				</View>	
				<View style={styles.row}>
					<View style={styles.item_name_container}>
						<Text style={styles.item_name}>
							Fob ID
						</Text>
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{this.props.fob}
						</Text>
					</View>
				</View>	
				<View style={styles.row}>
					<View style={styles.item_name_container}>
						<Text style={styles.item_name}>
							Fob Facility
						</Text>
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{this.props.fob_facility}
						</Text>
					</View>
				</View>	
			</View>
		);
	}
}