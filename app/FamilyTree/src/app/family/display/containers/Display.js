import React, {PureComponent} from "react";
import {View} from "react-native";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { familyDataActions } from "../../actions";
import FamilyDisplay from "../components/FamilyDisplay";

class Profile extends PureComponent {
    static navigationOptions =  { 
        header: null
    }

    constructor(props) {
        super(props)
        let userId;
        if(!!props.navigation.state.params) {
            const { params }  = props.navigation.state;
            props.getUserCloseRelation(params.userId)
            userId = params.userId
        }
        this.state = {userId: userId}
    }

    render() {
        return <FamilyDisplay {...this.props}/>
    }
}

function mapStateToProps(state) {
    return {
        userCloseRelation: state.userCloseRelation.userCloseRelation,
        userCloseRelationStatus: state.userCloseRelation.userCloseRelationStatus
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(familyDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);