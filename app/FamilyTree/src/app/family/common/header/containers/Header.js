import React, {PureComponent} from "react";
import {connect} from "react-redux";
import HeaderUI from '../components/HeaderUI';
import {View, Text} from 'react-native';

class Header extends PureComponent {
    
    render() {
        let title = "Family";
        let familyImg = null;
        if(!!this.props.navigation.state.routes) {
            const { params }  = this.props.navigation.state.routes.find(function(element) {
                return element.routeName == "Family";
              });
            title = params.name;
            familyImg = params.photoUrl;
        }
        return <HeaderUI {...this.props} title={title} familyImg={familyImg}/>
    }
}

export default Header

//<HeaderUI title={title} familyImg={familyImg} navigation={this.props.navigation}/>

//<Header navigation={navigation} title={navigation.state.params.name} familyImg={navigation.state.params.photoUrl}/>
            