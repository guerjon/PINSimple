import React, {Component} from 'react';
import {Text,View,ListView,TouchableHighlight} from 'react-native';
import GlobalStyles from '../GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Pieces extends Component{
	constructor(props) {
		super(props);
    	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
	      	dataSource: ds.cloneWithRows(props.data)
	    };		
	}

	renderButtons(){
		return <Text>Buttons</Text>;
	}

	renderPiece(data){
		var name = null;
		var styles = GlobalStyles;
		var sub_name = false;
		var names = []; // this var is gonna keep the names from fathers 
		switch(this.props.next_route){
			case 'buildings_details':
				name = 	data.building_name;
				break;	
			case 'rooms_details':
				name = data.room_name;
				break;
			case 'access_points_details':
				name = data.device_name;
		
				if(data.device_type_id == 4)
					sub_name = "Access Point";
				else
					sub_name = "Controller";
				break;
			default:
				break;
		}


		return (	
			<TouchableHighlight 
				style={{borderBottomColor:"#F8F9F9",borderBottomWidth:1,padding:10,backgroundColor:"white"}} 
				onPress={() => this.props.navigator.push(
						{
							index:this.props.next_route,
							data : data
						}
					)					
				} 
			>
                <View style={{}}>
                    <Text style={{color:"black", marginLeft:10}}>
                        {name}
                    </Text>
                    <Text style={{marginLeft:10}}>
                    	{sub_name ? sub_name : ''}
         			</Text>
                </View>
            </TouchableHighlight>
		);
	}

	render(){

		var data = this.props.data;
		var styles = GlobalStyles;
		if(data && this.props.next_route){

			return(
				<View>	
					<View style={styles.item_title_container}>
						<Text style={styles.item_title}>{this.props.third_title}</Text>
					</View>
					
					<ListView
				        dataSource={this.state.dataSource}
				        renderRow={(row) => this.renderPiece(row) }
				    />				

					{this.props.edit_mode && this.renderButtons}
				</View>
			);			
		}else{
			return(
				<View>
					{this.props.edit_mode && this.renderButtons}			
				</View>	
			);
		}
	}
}