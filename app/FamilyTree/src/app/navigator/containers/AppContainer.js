import React, { PureComponent } from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { StatusBar, View, Text, Image } from "react-native";
import { basicStyles } from "../../../common/styles/styleSheet";
// import BaseNavigator from "../components/BaseNavigator";
import { startUpDataActions } from "../actions";

class AppContainer extends PureComponent {
    constructor(props) {
        super(props);
        props.setUserIdStartUp();
    }

    render() {
        return <View style={basicStyles.deviceFullView}>
            <StatusBar
                backgroundColor="rgba(0, 0, 0, 0.2)"
                barStyle="light-content"
                translucent={true}
            />
            <Image style={[ basicStyles.deviceFullView, {position: 'absolute'}]}
                source={require('../../../../assert/images/pattern.png')}
            />
            <Image style={[ basicStyles.deviceFullView, {position: 'absolute', tintColor: 'rgba(0, 0, 0, 0.5)'}]}
                source={require('../../../../assert/images/pattern.png')}
            />
            <View>
                <Text style={{color: 'white'}}>Welcome</Text>
                </View>
        </View>        
    }    
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(startUpDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);