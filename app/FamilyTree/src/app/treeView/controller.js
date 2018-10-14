import React, { Component } from 'react';
import { WebView } from 'react-native';

export class TreeView extends Component {
    static navigationOptions =  { 
        header: null
    }

    render() {
        return (
        <WebView
            style={{backgroundColor: 'transparent'}}
            source={{uri: `https://familytree-f6684.firebaseapp.com?id=${this.props.navigation.state.params.id}`}}
        />
        );
    }
}