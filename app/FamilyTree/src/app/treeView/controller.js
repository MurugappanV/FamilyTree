import React, { Component } from 'react';
import { WebView } from 'react-native';

export class TreeView extends Component {
    static navigationOptions =  { 
        header: null
    }
  render() {
    return (
      <WebView
        source={{uri: 'http://192.168.43.59:3000/'}}
      />
    );
  }
}