/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import BaseNavigator from './BaseNavigator';
import Login from '../../login';
import UserDetails from '../../userDetail';


export default class App extends Component {
    componentDidMount() {
        
    }

    renderPage = (userId, userDetails) => {
        console.log("in usr id - ", userId)
        if(userId) {
            console.log("in usr id - ", userDetails.name)
            if(!!userDetails && !!userDetails.name) {
                return <BaseNavigator {...this.props}/>
            } else {
                return <UserDetails {...this.props}/>
            }
        } else {
            return <Login {...this.props}/>
        }
    }

    render() {
        let {userId, userDetails} = this.props
        console.log("in usr id 1 - ", userId)
        return this.renderPage(userId, userDetails)
  }
}
