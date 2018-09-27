/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {ApolloProvider} from 'react-apollo';
import SplashScreen from 'react-native-splash-screen';
import client from './src/app/common/redux/apollo/client';
import store from './src/app/common/redux/store';
import Navigator from './src/app/navigator';
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
YellowBox.ignoreWarnings(['Module RCTImageLoader requires'])

export default class App extends Component {
    componentDidMount() {
        SplashScreen.hide()
    }

  render() {
    return (
        <ApolloProvider client={client} store={store}>
            <Navigator />
        </ApolloProvider>
    );
  }
}
