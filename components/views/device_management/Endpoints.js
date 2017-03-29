import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, ListView, StyleSheet,TouchableHighlight,Modal, Image} from 'react-native';
import GLOBAL from '../../Globals';
import ListItem from '../ListItem';
import GridItem from '../GridItem';

var styles = StyleSheet.create({
    listView: {
      backgroundColor: '#F5FCFF',
    }
});

const image_route = "device/get/image/";
const default_image = require("../../sources/default_access_point_icon.imageset/default_endpoint_icon.png");

export default class EndPoints extends Component {

    constructor(props) {
      	super(props);
      	this.state = {
        	endpoints : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      	} 
    }

  	componentWillReceiveProps(nextProps) {
	    if(nextProps.data){
	      	this.setState({
	        	endpoints : this.state.endpoints.cloneWithRows(nextProps.data) ,
	      	});
	    }
  	}

    renderText(endpoint){
      	return (
        	<View>
          		<Text>{endpoint.campus_name} - {endpoint.building_name} </Text>
        	</View>
      	);
    }
 
    renderEndpoint(endpoint){
	    var data = {
	      index:"endpoints_details",
	      endpoint: endpoint    
	    }

	    return (  
	      	<View>
		        <TouchableHighlight  
		           
		          onPress={
		            () => this.props.navigator.push(data)
		          }
		        >
		              <View>
		                <ListItem 
		                  image_route={image_route} 
		                  item_name={endpoint.device_name} 
		                  item_id={endpoint.endpoint_id} 
		                  text={this.renderText(endpoint)} 
		                  defaultImage = {default_image}
		                />  
		              </View>
		        </TouchableHighlight >
	      	</View>
	    );      
    }

    renderEndpointGrid(endpoint){
	    var data = {
	      index:"endpoints_details",
	      endpoint: endpoint    
	    }

	    var styles = {
	          item: {
	            margin: 10,
	            width: 150,
	            height: 150,
	            borderWidth: 1,
	            elevation: 2
	    	},
    	}
	    return (
	      	<TouchableHighlight
	        	onPress={
	          	() => this.props.navigator.push(data)
	        }
	        	style={styles.item}
	      	>
		        <View>
		          	<GridItem 
		                image_route={image_route} 
		                item_name={endpoint.device_name} 
		                item_id={endpoint.endpoint_id} 
		                defaultImage = {default_image}
		          	/>
		        </View>
	      	</TouchableHighlight>
	    );
    }

  render() {


    if(this.props.activeView == "list_view"){
      return (
        <View style={{marginBottom:150}}>
          <ListView 
            dataSource={this.state.endpoints}
            renderRow={(endpoint) => this.renderEndpoint(endpoint)}
            enableEmptySections={true}
            key={this.props.activeView}
          />        
        </View>
      );    
      }else{  
        var styles = {
        list: {
              flexDirection: 'row',
              flexWrap: 'wrap'
          },   
      }
          
        return (
          <View style={{marginBottom:150}}>
            <ListView 
                contentContainerStyle={styles.list}
                dataSource={this.state.endpoints}
                renderRow={(endpoint) => this.renderEndpointGrid(endpoint)}
                enableEmptySections={true}
                key={this.props.separateData}
            />  
          </View>
        );
        
      }
  }
}

/*

*/