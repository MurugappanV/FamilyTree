import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import LoginUI from "../components/LoginUI";
import {loginDataActions} from "../actions";

class Login extends PureComponent {
    static navigationOptions =  { 
        header: null
    }

    setUserPhoneNumber = (phoneNumber) => {
        this.props.setPhoneNumber(phoneNumber);
    }

    setTokenId = (token, phoneNumber) => {
        this.props.setTokenId(token, phoneNumber);
    }

    render() {
        return <LoginUI userPhoneNumber={this.props.userRegisteredPhoneNumber} graphcoolTokenStatus={this.props.graphcoolTokenStatus} setPhoneNumber={this.setUserPhoneNumber} setTokenId={this.setTokenId} clearTokenId={this.props.clearTokenId} navigation={this.props.navigation}/>
    }
}

function mapStateToProps(state) {
    return {
        userRegisteredPhoneNumber: state.userRegisteredPhoneNumber,
        graphcoolTokenStatus: state.isGraphcoolTokenObtained
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(loginDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);