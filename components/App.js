import React, { Component } from 'react';
import {Text, ActivityIndicator, View, TouchableOpacity, Image} from 'react-native';
import { Router, Scene, NavBar, Actions } from 'react-native-router-flux';

import Home from './views/Home';
import UsersAndGroups from './views/users_and_groups/UsersAndGroups';
import Locations from './views/locations/Locations';
import DeviceManagement from './views/device_management/DeviceManagement';
import AccessHistory from './views/access_history/AccessHistory';
import Clients from './views/users_and_groups/Clients';
import Users from './views/users_and_groups/Users';
import AccessGroups from './views/users_and_groups/AccessGroups';
import Navigation from './Navigation';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
      petitionSuccess : false
    }
  }

  componentWillMount() {

    var headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'username': this.props.username,
        'password': this.props.password
    });

    fetch('http://admin.pinsimple.com/api/client/get/tree', {
        method: 'GET',
        headers: headers
        })
    .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.status == "success"){
            this.setState({
              data: responseJson.data,
              petitionSuccess : true
            });
            return responseJson;            
          }
        })
    .catch((error) => {
      console.warn(error);
    });
  } 

  render() {
   
    if (this.state.petitionSuccess) {
      return (
        <Router>
            <Scene key="drawer" component={Navigation} open={false}>
                <Scene key="home" component={Home} />
                <Scene key="usersandgroups" component={UsersAndGroups} />
                <Scene key="locations" component={Locations}/>
                <Scene key="accesshistory" component={AccessHistory} />
                <Scene key="clients" component={Clients} />
                <Scene key="users" component={Users} />
                <Scene key="accessgroups" component={AccessGroups} />
            </Scene>
        </Router>
      );
    }else{
      return <View><ActivityIndicator /></View>
    }
  }
}