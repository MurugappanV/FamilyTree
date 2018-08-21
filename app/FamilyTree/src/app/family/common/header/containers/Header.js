import React, {PureComponent} from "react";
import {connect} from "react-redux";
import HeaderUI from '../components/HeaderUI';
import {View, Text} from 'react-native';

class Header extends PureComponent {
    
    render() {
        
        return <HeaderUI {...this.props} />
    }
}

export default Header

//<HeaderUI title={title} familyImg={familyImg} navigation={this.props.navigation}/>

//<Header navigation={navigation} title={navigation.state.params.name} familyImg={navigation.state.params.photoUrl}/>
            