import React, { Component } from 'react';
import { View, Text, Button, DrawerLayoutAndroid } from 'react-native';


export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {

       return (
       		<View style={{flex:1,flexDirection: 'column',justifyContent: 'flex-end',alignItems: 'center',margin:20}}>
            	<Text style={{color:"black"}}> 
            		3000 South Vista Way 
				</Text>
				<Text style={{color:"black"}}>
					Provo UT 84606
				</Text>
            </View>
        );
    }
}