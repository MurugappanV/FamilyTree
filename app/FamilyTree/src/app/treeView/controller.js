import React, { Component } from 'react';
import { WebView } from 'react-native';

export class TreeView extends Component {
    static navigationOptions =  { 
        header: null
    }
  render() {
    return (
      <WebView
        source={{uri: 'http://172.23.230.33:3000/'}}
      />
    );
  }
}