import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';


export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {

       return (
       		<View style={{marginTop:70,alignItems:"center"}}>
                
            	<View>
                    <Text style={{color:"black"}}> 
                		3000 South Vista Way 
    				</Text>
    				<Text style={{color:"black"}}>
    					Provo UT 84606
    				</Text>
                </View>
            </View>
        );
    }
}