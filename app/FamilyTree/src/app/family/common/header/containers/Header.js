import React, {PureComponent} from "react";
import {connect} from "react-redux";
import HeaderUI from '../components/HeaderUI';
import {View} from 'react-native';

class Header extends PureComponent {
    
    render() {
        console.log("header props - " , this.props)
        const title = "Family";
        const familyImg = null;
        if(!!this.props.navigation.state.routes) {
            const { params }  = this.props.navigation.state.routes.find(function(element) {
                return element.routeName == "Family";
              });
            title = params.name;
            familyImg = params.photoUrl;
        }
        
        return <View style={{backgroundColor: "red", height: 100}}>

        </View>
    }
}

export default Header

//<HeaderUI title={title} familyImg={familyImg} navigation={this.props.navigation}/>