import React, {PureComponent} from "react";
import {View} from "react-native";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import Header from "../../common/header";
import {familyDataActions} from "../../actions";
import ListUI from "../components/ListUI";

class List extends PureComponent {

    constructor(props) {
        super(props)
        console.log("in list", props)
        if(!!props.navigation.state.params) {
            const { params }  = props.navigation.state;
            console.log("in id - " , params.id)
            props.getFamilyDetails(params.id)
        }
        
    }

    render() {
        const {navigation} = this.props;
        return <ListUI {...this.props}/>
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        userDetailLoadingStatus: state.userProfileDetail.userDetailLoadingStatus,
        userDetails: state.userProfileDetail.userDetails,
        familyDetailStatus: state.familyDetail.familyDetailsStatus,
        familyDetails: state.familyDetail.familyDetails
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(familyDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);