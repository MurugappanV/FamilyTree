import React, {PureComponent} from "react";
import {View} from "react-native";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import EmptyUI from "../components/EmptyUI";
import { userDetDataActions } from "../../../userDetail/actions";
import Header from "../../common/header";

class Profile extends PureComponent {
    static navigationOptions =  { 
        header: null
    }

    constructor(props) {
        super(props)
        let userId;
        if(!!props.navigation.state.params) {
            const { params }  = props.navigation.state;
            // props.getFamilyDetails(params.userId)
            userId = params.userId
        }
        this.state = {userId: userId}
    }

    render() {
        return <View></View>
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userDetDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);