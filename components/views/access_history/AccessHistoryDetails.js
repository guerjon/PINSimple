import Autocomplete from 'react-native-autocomplete-input';
import React, { Component} from 'react';
import {} from 'react-native';
import GLOBAL from '../../Globals';
import GlobalStyles from '../../GlobalStyles'
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

function Element(props){
	return (
		<TouchableOpacity style={GlobalStyles.row}>
			<View style={{padding:5,marginLeft:30,alignItems:"flex-end",minWidth:100}}>
				<Text>
					{props.name} :
				</Text>
			</View>
			<View style={{padding:5}}>
				<Text>
					{props.value}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

export default class AccessHistoryDetails extends Component {
	
	constructor(props) {
		super(props);
	}

	render(){
		var data = this.props.route.data;

		return(
			<View style={{marginTop:56}}>
				<Element name="ID" value={data.history_id} />
				<Element name="Device" value={data.device_id} />
				<Element name="Type" value={data.history_type} />
				<Element name="Time" value={data.history_time} />
				<Element name="Direction" value={data.history_direction} />
				<Element name="Result" value={data.history_result} />
				<Element name="Facility" value={data.history_facility} />
				<Element name="Code" value={data.history_code} />
				<Element name="User ID" value={data.history_user_id} />
				<Element name="Schedule ID" value={data.history_schedule_id} />
				<Element name="Title" value={data.history_title} />
				<Element name="Message" value={data.history_message} />
			</View>
		);
	}

}
