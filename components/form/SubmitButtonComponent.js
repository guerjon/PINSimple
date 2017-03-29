import React, { Component } from 'react';
import { Button, Alert } from 'react-native';

export default class SubmitButtonComponent extends Component{
	
	constructor(props) {
		super(props);		
	}

	render() {
		return (
			<Button
			  title="Log in"
			  color="deepskyblue"
			  accessibilityLabel="Learn more about this purple button"
			  onPress = {this.props.handleOnPress}
			/>			
		);
	}	
}
