import React, { Component } from 'react';
import { StyleSheet, Text, TextInput , View} from 'react-native';

const style = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  }
});


export default class CompleteInputComponent extends Component{

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Text style={style.textAlign}>{this.props.text}</Text>
				<TextInput style={style.textAlign} onChangeText={this.props.onChangeText} />
			</View>
		);
	}

}