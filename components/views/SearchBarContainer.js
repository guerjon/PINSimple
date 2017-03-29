import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import GLOBAL from '../Globals';
import Icon from 'react-native-vector-icons/FontAwesome';

var styles = StyleSheet = {
    searchbarContainer :{
        backgroundColor : "#eaebed",
        flexDirection: "row",
        height: 30,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
    searchBar: {
        height: 40,
        fontSize: 15,
        width:320,
    },
    iconSearchContainer: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    }
};

export default class SearchBarContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kindOfView : props.kindOfView,
            onChangeTextHandler : props.onChangeTextHandler
        }
    }

    attachKindOfView(searchText){
        var info = {searchText: searchText, kindOfView: this.props.kindOfView};
        this.props.onChangeTextHandler(info);
    }

    render() {
        return (
            <View style={styles.searchbarContainer}>
                <View style={styles.iconSearchContainer}>    
                    <Icon name="search" size={20}/ >
                </View>
                <View>
                    <TextInput
                        style={styles.searchBar}
                        onChangeText={(text) => this.attachKindOfView(text)} 
                        underlineColorAndroid={'transparent'}
                    />    
                </View>            
            </View>
        );
    }
}
