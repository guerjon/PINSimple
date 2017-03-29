//C:\Users\HiddenButler\AppData\Local\Android\Sdk\tools\emulator.exe -netdelay none -netspeed full -avd Galaxy_Nexus_API_23
import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import MainComponent from './components/MainComponent';

class PINsimple	 extends Component {
	render() {
	    return (
	      <MainComponent/>
	    );
	  }
};


AppRegistry.registerComponent('PINsimple', () => PINsimple);



