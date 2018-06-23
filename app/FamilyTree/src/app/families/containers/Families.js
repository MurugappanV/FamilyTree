import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import FamiliesUI from "../components/FamiliesUI";
import {familyDataActions} from "../actions";

class Families extends PureComponent {
    static navigationOptions =  { 
        header: null
    }

    constructor(props) {
        super(props)
        props.getFamilyByUserId(props.userId)
    }

    render() {
        console.log("props ", this.props)
        return <FamiliesUI {...this.props} signOut={this.props.screenProps.signOut}/>
    }
}

function mapStateToProps(state) {
    return {
        familyPicUrl: state.familyPicUrl,
        familyPicUploadStatus: state.familyPicUploadStatus,
        userId: state.userId,
        familyListStatus: state.familyList.familyDetailLoadingStatus,
        familyList: state.familyList.familyList,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(familyDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Families);