import React, { Component } from 'react';
import {Text,View} from 'react-native';
import styles from '../../GlobalStyles';

export default class ContactInformation extends Component{
	constructor(props) {
		super(props);		
	}

	render() {
		if(this.props.address || this.props.city || this.props.state || this.props.zip || this.props.phone || this.props.email)
			var content = true;
		else 
			var content = false;
					
		var title =	(
						<View style={styles.item_title_container}>
							<Text style={styles.item_title}>CONTACT INFORMATION</Text>
						</View>
					);

		if(content){
			return(
				<View>	
					{title}
					{this.props.address !== ''  &&
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									Address
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{this.props.address}
								</Text>
							</View>
						</View>	
					}			
					{this.props.city !== '' &&

						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									City
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{this.props.city}
								</Text>
							</View>
						</View>	
					}
					{this.props.state !== ''  &&
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									State
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{this.props.state}
								</Text>
							</View>
						</View>	
					}
					{this.props.zip !== '' &&
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									Zip
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{this.props.zip}
								</Text>
							</View>
						</View>
					}
					{this.props.phone !== '' && 
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									Phone
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{this.props.phone}
								</Text>
							</View>
						</View>
					}
					{this.props.email !== '' && 
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									Email
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{this.props.email}
								</Text>
							</View>
						</View>
					}
				</View>
			);			
		}else{
			return (
				<View>
					{title}
					<View style={styles.row}>
						<View style={styles.item_input_container}>
							<Text style={styles.item_input}>
								No Contact Information
							</Text>
						</View>
					</View>	
				</View>
				)
		}
	}
}