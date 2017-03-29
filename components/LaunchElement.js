import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Button, ListView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LaunchElement extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <TouchableHighlight 
                style={{backgroundColor:"#ffffff",borderBottomColor:"#F8F9F9",borderBottomWidth:1}} 
                onPress={ () => this.props.navigator.push({index:this.props.tab,dataFilter: {}}) } 
            >
                <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={{color:"black",padding:10, marginLeft:15}}>
                        {this.props.text}
                    </Text>
                    <Icon
                        size={25}
                        name="angle-right" 
                        color="#D0D3D4"
                        style={{backgroundColor:"#ffffff",marginRight:5}}
                    />
                </View>
            </TouchableHighlight>
        )
    }
}