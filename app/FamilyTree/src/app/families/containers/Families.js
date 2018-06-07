import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import FamiliesUI from "../components/FamiliesUI";
import {familyDataActions} from "../actions";

class Families extends PureComponent {
    static navigationOptions =  { 
        header: null
    }

    render() {
        return <FamiliesUI {...this.props}/>
    }
}

function mapStateToProps(state) {
    return {
        familyPicUrl: state.familyPicUrl,
        familyPicUploadStatus: state.familyPicUploadStatus,
        userId: state.userId,
        familyList: state.userProfileDetail.userDetails.families,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(familyDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Families);