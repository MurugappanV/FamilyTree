import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import AddFamilyUI from "../components/AddFamilyUI";
import {addFamilyDataActions} from "../actions";

class AddFamily extends PureComponent {
    static navigationOptions =  { 
        header: null
    }

    saveFamilyDetails = (name) => {
        this.props.saveFamilyDetails(this.props.userId, name, this.props.familyPicUrl)
        this.props.navigation.dispatch({
            routeName: 'Families',
            type: 'GoToRoute',
        })
    }

    render() {
        return <AddFamilyUI {...this.props} saveFamilyDetails={this.saveFamilyDetails}/>
    }
}

function mapStateToProps(state) {
    return {
        familyPicUrl: state.familyPicUrl,
        familyPicUploadStatus: state.familyPicUploadStatus,
        userId: state.userId,
        addFamilyLoadingStatus: state.addFamilyDetail.addFamilyLoadingStatus,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(addFamilyDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFamily);