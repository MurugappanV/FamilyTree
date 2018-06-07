import React, { PureComponent } from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { StatusBar, View, Text, Image } from "react-native";
import { basicStyles } from "../../../common/styles/styleSheet";
import AppNavigator from "../components/AppNavigator";
import { startUpDataActions } from "../actions";

class AppContainer extends PureComponent {
    constructor(props) {
        super(props);
        props.setUserIdStartUp();
    }

    render() {
        
        console.log("in usr id 99 - ")
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
            <AppNavigator {...this.props}/>
            
        </View>        
    }    
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        userDetails: state.userProfileDetail.userDetails
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(startUpDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

// <BaseNavigator style={basicStyles.deviceFullView}/>
// <View>
//                 <Text style={{color: 'white'}}>Welcome</Text>
//                 </View>