import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { addMemberDataActions } from "../actions";
import { familyDataActions} from "../../family/actions";
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
        let user = null
        console.log("add memb props - ", props)
        if(!!props.navigation.state.params) {
            const { params }  = props.navigation.state;
            user = params.user
        }
        this.state = {user: user}
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
        if(props.addMemLoadingStatus == generalConstants.LOADED) {
            let familyId;
            if(!!props.navigation.state.params) {
                const { params }  = props.navigation.state;
                familyId = params.familyId
            }
            props.getFamilyDetails(familyId)
            props.getUserCloseRelation(this.state.user.id)
            props.navigation.goBack()
        } 
    }

    addMember = (phoneNumber, name, email, dob, address, gender, fatherId, spouceId) => {
        let familyId;
        if(!!this.props.navigation.state.params) {
            const { params }  = this.props.navigation.state;
            console.log("famly id - " , params.familyId)
            familyId = params.familyId
        }
        if(!!this.state.user) {
            this.props.updateSaveUser(this.state.user.id, phoneNumber, name, email, this.props.profilePicUrl, dob, address, gender, fatherId, spouceId)    
        } else {
            this.props.addUser(phoneNumber, name, email, this.props.profilePicUrl, dob, address, gender, familyId, fatherId, spouceId)    
        }
    }

    render() {
        // const {profilePicUrl, profilePicStatus, setProfilePicUrl, uploadingImageUrl} = this.props;
        return <AddMemberUI user={this.state.user} {...this.props } addMember={this.addMember}/>
    }
}

function mapStateToProps(state) {
    return {
        familyDetails: state.familyDetail.familyDetails,
        profilePicUrl: state.addMemPicUrl,
        profilePicStatus: state.addMemPicUploadStatus,
        addMemLoadingStatus: state.addMemDet.addMemLoadingStatus,
        addMemMsg: state.addMemDet.addMemMsg,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, familyDataActions, addMemberDataActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);