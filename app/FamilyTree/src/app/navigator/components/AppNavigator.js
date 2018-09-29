/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View, ActivityIndicator} from 'react-native';
import BaseNavigator from './BaseNavigator';
import Login from '../../login';
import UserDetails from '../../userDetail';
import { basicCompStyles } from '../../../common/styles/styleSheet';
import colors from '../../../common/constants/colors';


export default class App extends Component {
    componentDidMount() {
        
    }

    renderLoading = () => {
        return <View style={[basicCompStyles.defaultPadding, basicCompStyles.flexColumnCC, {flex: 1}]}>
            <ActivityIndicator size="large" color={colors.PROGRESS_BAR_COLOR} />
        </View>
    }

    renderPage = (userId, userDetails, startupStatus, userDetailStatus) => {
        console.log("in usr id - ", userId)
        if(startupStatus == 1 || startupStatus == 0) {
            return this.renderLoading()
        } else if(userId) {
            if(userDetailStatus == 1 || userDetailStatus == 0) {
                return this.renderLoading()
            } else {
                if(!!userDetails && !!userDetails.name) {
                    return <BaseNavigator {...this.props}/>
                } else {
                    return <UserDetails {...this.props}/>
                }
            }
        } else {
            return <Login {...this.props}/>
        }
    }

    render() {
        let {userId, userDetails, startupStatus, userDetailStatus} = this.props
        console.log("in usr id 1 - ", userId)
        return this.renderPage(userId, userDetails, startupStatus, userDetailStatus)
  }
}
