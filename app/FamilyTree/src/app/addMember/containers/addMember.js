import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { addMemberDataActions } from "../actions";
import AddMemberUI from "../components/addMemberUI";
import Toast from 'react-native-simple-toast';
import * as generalConstants from "../../../common/constants/generalConstants";

class AddMember extends PureComponent {
    static navigationOptions =  { 
        header: null
    }

    constructor(props) {
        super(props)
        // this.saveUserDetails = this.saveUserDetails.bind(this)
        // if(props.userDetails && props.userDetails.photoUrl != null) {
        //     this.props.setProfilePicUrl(props.userDetails.photoUrl)
        // }
        console.log("add memb props - ", props)
        
    }

    componentWillUnmount() {
        this.props.clearAddUser();
    }

    componentWillReceiveProps(props) {
        // if(props.userDetails && this.props.userDetails && (props.userDetails.photoUrl != this.props.userDetails.photoUrl)) {
        //     this.props.setProfilePicUrl(props.userDetails.photoUrl)
        // }
        if(props.addMemMsg) {
            Toast.show(props.addMemMsg, Toast.LONG)
        }
        if(props.userDetailLoadingStatus == generalConstants.LOADED) {
            props.navigation.goBack()
        } 
    }

    addMember = (phoneNumber, name, email, dob, address, gender) => {
        let familyId;
        if(!!this.props.navigation.state.params) {
            const { params }  = this.props.navigation.state;
            console.log("famly id - " , params.familyId)
            familyId = params.familyId
        }
        this.props.addUser(phoneNumber, name, email, this.props.profilePicUrl, dob, address, gender, familyId)
    }

    render() {
        // const {profilePicUrl, profilePicStatus, setProfilePicUrl, uploadingImageUrl} = this.props;
        return <AddMemberUI {...this.props } addMember={this.addMember}/>
    }
}

function mapStateToProps(state) {
    return {
        profilePicUrl: state.addMemPicUrl,
        profilePicStatus: state.addMemPicUploadStatus,
        userDetailLoadingStatus: state.addMemDet.addMemLoadingStatus,
        addMemMsg: state.addMemDet.addMemMsg,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(addMemberDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);