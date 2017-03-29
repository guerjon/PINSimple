import React, {Component} from 'react';
import {Text,View} from 'react-native';
import GlobalStyles from '../GlobalStyles';

export default class LocationInformation extends Component{
	constructor(props) {
		super(props);
	}

	render(){
		var data = this.props.data;
		var navigator = this.props.navigator;
		var styles = GlobalStyles;
		if(!this.props.edit_mode){
			return(
				<View>	
					<View style={styles.item_title_container}>
						<Text style={styles.item_title}>{data.second_title}</Text>
					</View>
					{data.campus &&
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									Campus 
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{data.item_campus_name}
								</Text>
							</View>
						</View>						
					}
					{data.building &&
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									Building 
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{data.item_building_name}
								</Text>
							</View>
						</View>						
					}
					{data.area &&
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									Area 
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{data.item_room_name}
								</Text>
							</View>
						</View>						
					}					
					{data.address &&
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									Address: 
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{data.item_address}
								</Text>
							</View>
						</View>
					}
					{ data.city &&
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									City: 
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{data.item_city}
								</Text>
							</View>
						</View>						
					}
					{
						data.state &&
							<View style={styles.row}>
								<View style={styles.item_name_container}>
									<Text style={styles.item_name}>
										State: 
									</Text>
								</View>
								<View style={styles.item_input_container}>
									<Text style={styles.item_input}>
										{data.item_state}
									</Text>
								</View>
							</View>
					}{
						data.zip &&
						<View style={styles.row}>
							<View style={styles.item_name_container}>
								<Text style={styles.item_name}>
									Zip: 
								</Text>
							</View>
							<View style={styles.item_input_container}>
								<Text style={styles.item_input}>
									{data.item_zip}
								</Text>
							</View>
						</View>
					}

				</View>
			);
		}else{
			return <Text>error en LocationInformation </Text>
		}
	}	
}