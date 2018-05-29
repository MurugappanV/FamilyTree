/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import BaseNavigator from './BaseNavigator';
import Login from '../../login';


export default class App extends Component {
    componentDidMount() {
        
    }

    renderPage = (userId) => {
        if(userId) {
            return <BaseNavigator {...this.props}/>
        } else {
            return <Login {...this.props}/>
        }
    }

    render() {
        let {userId} = this.props
        return this.renderPage(userId)
  }
}
