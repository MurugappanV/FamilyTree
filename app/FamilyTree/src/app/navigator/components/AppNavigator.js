/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View, Image, Text, NetInfo, ActivityIndicator} from 'react-native';
import BaseNavigator from './BaseNavigator';
import Login from '../../login';
import UserDetails from '../../userDetail';
import { basicCompStyles } from '../../../common/styles/styleSheet';
import colors from '../../../common/constants/colors';


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {status: true}
    }
    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    
        NetInfo.isConnected.fetch().then(
          (isConnected) => { this.setState({ status: isConnected }); }
        );
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }
    
    handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
    }

    renderLoading = () => {
        return <View style={[basicCompStyles.defaultPadding, basicCompStyles.flexColumnCC, {flex: 1}]}>
            <ActivityIndicator size="large" color={colors.PROGRESS_BAR_COLOR} />
        </View>
    }

    renderOffline = () => {
        return <View style={[basicCompStyles.defaultPadding, basicCompStyles.flexColumnCC, {flex: 1}]}>
            <Image style={{width: 150, height: 150}} source={require('../../../../assert/images/internet.png')}/>
            <Text style={{padding: 20, textAlign: 'center',color: 'white', fontSize: 18, fontWeight: 'bold'}}>{'This app needs internet, please check your internet connection'}</Text>
        </View>
    }

    renderPage = (status, userId, userDetails, startupStatus, userDetailStatus) => {
        console.log("in usr id - ", userId)
        if(!status) {
            return this.renderOffline()
        } else if(startupStatus == 1 || startupStatus == 0) {
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
        return this.renderPage(this.state.status, userId, userDetails, startupStatus, userDetailStatus)
  }
}
