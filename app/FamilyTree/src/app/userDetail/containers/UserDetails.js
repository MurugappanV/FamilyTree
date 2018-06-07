import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import UserDetailUI from "../components/UserDetailUI";
import { userDetDataActions } from "../actions";

class UserDetails extends PureComponent {
    static navigationOptions =  { 
        header: null
    }

    constructor(props) {
        super(props)
        this.saveUserDetails = this.saveUserDetails.bind(this)
        if(props.userDetails && props.userDetails.photoUrl != null) {
            this.props.setProfilePicUrl(props.userDetails.photoUrl)
        }
    }

    componentWillReceiveProps(props) {
        if(props.userDetails && this.props.userDetails && (props.userDetails.photoUrl != this.props.userDetails.photoUrl)) {
            this.props.setProfilePicUrl(props.userDetails.photoUrl)
        }
    }

    saveUserDetails = (name, email, dob, address, gender) => {
        this.props.saveUserDetails(this.props.userId, name, email, this.props.profilePicUrl, dob, address, gender)
        
    }

    render() {
        // const {profilePicUrl, profilePicStatus, setProfilePicUrl, uploadingImageUrl} = this.props;
        return <UserDetailUI {...this.props } saveUserDetails={this.saveUserDetails}/>
    }
}

function mapStateToProps(state) {
    return {
        profilePicUrl: state.profilePicUrl,
        profilePicStatus: state.profilePicUploadStatus,
        userId: state.userId,
        phoneNumber: state.userRegisteredPhoneNumber,
        userDetailLoadingStatus: state.userProfileDetail.userDetailLoadingStatus,
        userDetails: state.userProfileDetail.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userDetDataActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);