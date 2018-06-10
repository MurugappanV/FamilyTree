import React, {PureComponent} from "react";
import {View} from "react-native";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import EmptyUI from "../components/EmptyUI";
import { userDetDataActions } from "../../../userDetail/actions";
import Header from "../../common/header";

class Profile extends PureComponent {

    constructor(props) {
        super(props)
        this.renderItem = this.renderItem.bind(this)
        if(props.userId != null && props.userDetailLoadingStatus == 0) {
            props.getUserById(props.userId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.userId != null && nextProps.userDetailLoadingStatus == 0) {
            nextProps.getUserById(nextProps.userId)
        }
    }

    renderItem = () => {
        if(this.props.userId == null) {
            return <EmptyUI navigation = {this.props.navigation} redirectPage={"Login"}/>
        } else if(this.props.userDetails) {
            // if(this.props.userDetails.phoneNo != null) {
            //     return <ProfileUI {...this.props}/>
            // } else {
                return <EmptyUI navigation = {this.props.navigation} redirectPage={"Details"}/>
            // }
        } else {
            return <View></View>
        }
    }

    render() {
        const {navigation} = this.props;
        return <View>
            {this.renderItem()}
        </View>;
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        userDetailLoadingStatus: state.userProfileDetail.userDetailLoadingStatus,
        userDetails: state.userProfileDetail.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userDetDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);