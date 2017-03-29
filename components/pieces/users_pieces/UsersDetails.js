import React, { Component } from 'react';
import {Text,View} from 'react-native';
import styles from '../../GlobalStyles';

export default class UsersDetails extends Component{
	constructor(props) {
		super(props);
		
	}

	render() {
		return(
			<View>	
				<View style={styles.item_title_container}>
					<Text style={styles.item_title}>USER DETAILS</Text>
				</View>
				<View style={styles.row}>
					<View style={styles.item_name_container}>
						<Text style={styles.item_name}>
							Login
						</Text>
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{this.props.login}
						</Text>
					</View>
				</View>	
				<View style={styles.row}>
					<View style={styles.item_name_container}>
						<Text style={styles.item_name}>
							First Name
						</Text>
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{this.props.first_name}
						</Text>
					</View>
				</View>	
				<View style={styles.row}>
					<View style={styles.item_name_container}>
						<Text style={styles.item_name}>
							Last Name
						</Text>
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{this.props.last_name}
						</Text>
					</View>
				</View>	
				<View style={styles.row}>
					<View style={styles.item_name_container}>
						<Text style={styles.item_name}>
							Status
						</Text>
					</View>
					<View style={styles.item_input_container}>
						<Text style={styles.item_input}>
							{this.props.status ? "Active" : "No Active"}
						</Text>
					</View>
				</View>	

			</View>
		);
	}
}