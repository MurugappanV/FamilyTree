import React, {PureComponent} from "react";
import {View, Image, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles ,width20pc} from "../../../common/styles/styleSheet";
import *  as generalConstants from '../../../common/constants/generalConstants';
import colors from "../../../common/constants/colors";
import Toast from 'react-native-simple-toast';
import { pickImage } from "../../common/utils/imagePicker";

class AddFamilyUI extends PureComponent {

    constructor(props) {
        super(props);
        let userDetails = props.userDetails;
            this.state = {name: ""};
    
    }

    selectImage = () => {
        pickImage("Select family picture", "familyPic", this.props.setFamilyPicUrl, this.props.uploadingImageUrl);
    }

    saveManualEntry = () => {
        if(this.state.name.length == 0) {
            Toast.show("Please enter family name", Toast.LONG)
            this.refs.nameInput.focus(); 
        } else {
            this.props.saveFamilyDetails(this.state.name);
            // save in db
        }
    }

    renderImage = (uploadStatus, profilePicUrl) => {
        if(uploadStatus == 0 || uploadStatus == generalConstants.ERROR) {
            return <TouchableOpacity onPress={this.selectImage}>
                <Image style={[basicStyles.profImage, basicCompStyles.aliginSelfC, basicCompStyles.smallSpacingMarginT, {borderRadius: 10}]} source={require('../../../../assert/images/family.png')}/>
            </TouchableOpacity>
        } else if(uploadStatus == generalConstants.LOADED) {
            return <TouchableOpacity onPress={this.selectImage}>
                <Image style={[basicStyles.profImage, basicCompStyles.aliginSelfC, basicCompStyles.smallSpacingMarginT, {borderRadius: 10}]} source={{uri : profilePicUrl}}/>
            </TouchableOpacity>
        } else {
            return <View style={[basicStyles.profImage, basicCompStyles.flexColumnCC, basicCompStyles.aliginSelfC, basicCompStyles.smallSpacingMarginT, {borderRadius: 10}]}>
                <ActivityIndicator size="large" color={colors.PROGRESS_BAR_COLOR} />
                <Text style={[basicStyles.textSmallerLink, basicCompStyles.defaultPadding]}>{"Uploading image ..."}</Text>
            </View>
        }
    }


    render() {
        const { saveUserDetails, familyPicUploadStatus,  familyPicUrl} = this.props;
        return <View style={[basicCompStyles.fullSize, basicCompStyles.bgBaseColorLight, basicCompStyles.defaultPadding]}>
            <Text style={basicStyles.textBig}>{"Family details"}</Text>
            <View style={[basicCompStyles.fullSize, {justifyContent: 'center'}]} ref="scroll">
                {this.renderImage(familyPicUploadStatus, familyPicUrl)}
                <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT, {marginLeft: 30, marginRight: 30}]}>{"Family name"}</Text>
                <TextInput
                    ref="nameInput"
                    onSubmitEditing={(event) => { 
                        this.saveManualEntry; 
                    }}
                    returnKeyType={"send"}
                    autoCorrect={false}
                    underlineColorAndroid={colors.UNDERLINE_COLOR} 
                    selectionColor={colors.CURSOR_COLOR}
                    style={[basicStyles.textInputSmall, {marginLeft: 30, marginRight: 30}]}
                    onChangeText={value => this.setState({ name : value })}
                    placeholder={"Name"}
                    placeholderTextColor={colors.PLACEHOLDER_COLOR} 
                    value={this.state.name}
                />
            </View>
            <TouchableOpacity style={[basicCompStyles.bgDarkColor, basicCompStyles.defaultPadding, basicCompStyles.defaultMarginTB, basicCompStyles.spacingMarginT, {height: 40, borderRadius: 20, backgroundColor: '#ffffff60' }]} onPress={this.saveManualEntry} >
                <Text style={[basicStyles.textWhiteSmall, basicCompStyles.alignTextCenter, {color: '#732673B0'}]}>{"Save"}</Text>
            </TouchableOpacity> 
        </View>
    }
}

export default AddFamilyUI;