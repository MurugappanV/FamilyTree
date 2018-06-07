import React, {PureComponent} from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { pickImage } from "../../common/utils/imagePicker";
import { basicStyles , basicCompStyles , width25pc, width20pc } from "../../../common/styles/styleSheet";
import * as generalConstants from "../../../common/constants/generalConstants";
import colors from '../../../common/constants/colors';
import Toast from 'react-native-simple-toast';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const validateEmail = (emailInput) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return reg.test(emailInput)
}

const today = new Date(); 
const dd = today.getDate(); 
const mm = today.getMonth()+1; //January is 0! 
const yyyy = today.getFullYear(); 
if(dd<10){dd='0'+dd} 
if(mm<10){mm='0'+mm} 
const todayStr = yyyy+"-"+mm+"-"+dd; 

export default class UserDetailUI extends PureComponent {
    
    constructor(props) {
        super(props);
        let userDetails = props.userDetails;
        if(userDetails && userDetails.phoneNo != null) {        
            let userGender = userDetails.gender == "FEMALE" ? 0 : userDetails.gender == "MALE" ? 1 : 2;
            this.state = {
                name: userDetails.name, 
                email: userDetails.email, 
                date: userDetails.dateOfBirth, 
                address: userDetails.address, 
                gender: userGender
            }
        } else {
            this.state = {name: "", email: "", date:"", address: "", gender: 0};
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.userDetails && nextProps.userDetails.name != null && this.setUserDetail(nextProps.userDetails);
    }

    saveManualEntry = () => {
        if(this.state.name.length == 0) {
            Toast.show("Please enter your name", Toast.LONG)
            this.refs.nameInput.focus(); 
        } else if (!validateEmail(this.state.email)) {
            Toast.show("Please enter valid email id", Toast.LONG)
            this.refs.emailInput.focus(); 
        } else if (this.state.date.length == 0) {
            Toast.show("Please select your birth date", Toast.LONG)
            this.refs.scroll.scrollToEnd()
        } else if (this.state.address.length == 0) {
            Toast.show("Please enter your address", Toast.LONG)
            this.refs.scroll.scrollToEnd()
            this.refs.addressInput.focus()
        } else {
            const dob = new Date(this.state.date);
            const dobStr = dob.toISOString();
            const gender = this.state.gender == 0 ? "FEMALE" : this.state.gender == 1 ? "MALE" : "OTHERS" ;
            this.props.saveUserDetails(this.state.name, this.state.email, dobStr, this.state.address, gender);
            // save in db
        }
    }

    setUserDetail = (userDetails) => {
        let userGender = userDetails.gender == "FEMALE" ? 0 : userDetails.gender == "MALE" ? 1 : 2;
        this.setState({
            name: userDetails.name, 
            email: userDetails.email, 
            date: userDetails.dateOfBirth, 
            address: userDetails.address, 
            gender: userGender
        })
    }

    selectImage = () => {
        pickImage("Select profile picture", "profilePic", this.props.setProfilePicUrl, this.props.uploadingImageUrl);
    }

    renderImage = (uploadStatus, profilePicUrl) => {
        if(uploadStatus == 0 || uploadStatus == generalConstants.ERROR) {
            return <TouchableOpacity onPress={this.selectImage}>
                <Image style={[basicStyles.profImage, basicCompStyles.aliginSelfC, basicCompStyles.smallSpacingMarginT, {borderRadius: width20pc}]} source={require('../../../../assert/images/profile.png')}/>
            </TouchableOpacity>
        } else if(uploadStatus == generalConstants.LOADED) {
            return <TouchableOpacity onPress={this.selectImage}>
                <Image style={[basicStyles.profImage, basicCompStyles.aliginSelfC, basicCompStyles.smallSpacingMarginT, {borderRadius: width20pc}]} source={{uri : profilePicUrl}}/>
            </TouchableOpacity>
        } else {
            return <View style={[basicStyles.profImage, basicCompStyles.flexColumnCC, basicCompStyles.aliginSelfC, basicCompStyles.smallSpacingMarginT, {borderRadius: width25pc}]}>
                <ActivityIndicator size="large" color={colors.PROGRESS_BAR_COLOR} />
                <Text style={[basicStyles.textSmallerLink, basicCompStyles.defaultPadding]}>{"Uploading image ..."}</Text>
            </View>
        }
    }

    signOut = () => {
        Alert.alert(
            'Confirmation',
            `Do you want to Sign out ?`,
            [
              {text: 'No', onPress: () => {}},
              {text: 'Yes', onPress: () => {}},
            ],
            { cancelable: true }
        )
    }

    render() {
        const { signOut, saveUserDetails, profilePicStatus,  profilePicUrl} = this.props;
        return <View style={[basicCompStyles.fullSize, basicCompStyles.bgBaseColorLight, basicCompStyles.defaultPadding]}>
            <Text style={[basicStyles.textSmaller, basicCompStyles.alignTextCenter, basicCompStyles.smallSpacingMarginT]}>{"Congrats, Logged in successfully!!!"}</Text>
            <Text style={basicStyles.textBig}>{"User details"}</Text>
            {/* <TouchableOpacity onPress={() => {}}>
                <Image style={[basicStyles.bigImage, basicCompStyles.aliginSelfC, basicCompStyles.smallSpacingMarginT, {borderRadius: width25pc}]} source={require('../../../../assets/images/profile.png')}/>
            </TouchableOpacity> */}
            <ScrollView style={basicCompStyles.fullSize} ref="scroll">
                {this.renderImage(profilePicStatus, profilePicUrl)}
                <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"User name"}</Text>
                <TextInput
                    ref="nameInput"
                    onSubmitEditing={(event) => { 
                        this.refs.emailInput.focus(); 
                    }}
                    returnKeyType={"next"}
                    autoCorrect={false}
                    underlineColorAndroid={colors.UNDERLINE_COLOR} 
                    selectionColor={colors.CURSOR_COLOR}
                    style={basicStyles.textInputSmall}
                    onChangeText={value => this.setState({ name : value })}
                    placeholder={"Name"}
                    placeholderTextColor={colors.PLACEHOLDER_COLOR} 
                    value={this.state.name}
                />
                <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"Email ID"}</Text>
                <TextInput
                    ref="emailInput"
                    onSubmitEditing={(event) => { 
                        this.refs.scroll.scrollToEnd(); 
                    }}
                    returnKeyType={"next"}
                    autoCorrect={false}
                    keyboardType={"email-address"}
                    underlineColorAndroid={colors.UNDERLINE_COLOR} 
                    selectionColor={colors.CURSOR_COLOR}
                    style={basicStyles.textInputSmall}
                    onChangeText={value => this.setState({ email: value })}
                    placeholder={"Email"}
                    placeholderTextColor={colors.PLACEHOLDER_COLOR} 
                    value={this.state.email}
                />
                <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"Date of birth"}</Text>
                <DatePicker
                    ref="datePicker"
                    style={[ basicCompStyles.marginBottom15, {borderWidth : 0, alignSelf: 'flex-start'}]}
                    date={this.state.date}
                    mode="date"
                    placeholder="Date of birth"
                    format="YYYY-MM-DD"
                    maxDate={todayStr}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    // showIcon={false}
                    customStyles={{
                        dateInput: {borderWidth: 0, marginLeft: 36, justifyContent: 'center'},
                        dateText: {color : colors.DARK_TEXT_COLOR},
                        placeholderText: {color : colors.PLACEHOLDER_COLOR},
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"Gender"}</Text>
                <RadioForm formHorizontal={true} animation={true} style={{marginTop: 10, flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    {[
                        {label: 'Female  ', value: 0 },
                        {label: 'Male  ', value: 1 }
                    ].map((obj, i) => {
                        return <RadioButton labelHorizontal={true} key={i}>
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={this.state.gender === i}
                                onPress={(value) => {this.setState({gender:value})}}
                                borderWidth={2}
                                buttonInnerColor={colors.UNDERLINE_COLOR}
                                buttonOuterColor={this.state.gender === i ? colors.UNDERLINE_COLOR : colors.CURSOR_COLOR}
                                buttonSize={8}
                                buttonOuterSize={16}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}
                            />
                            <RadioButtonLabel
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                onPress={(value) => {this.setState({gender:value})}}
                                labelStyle={{fontSize: 16, color: colors.DARK_TEXT_COLOR}}
                                labelWrapStyle={{marginLeft: 1}}
                            /> 
                        </RadioButton>
                    })}
                </RadioForm>
                <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"Address"}</Text>
                <TextInput 
                    style={[basicStyles.textAreaSmall, {textAlignVertical: 'top', borderWidth: 1, borderColor: colors.UNDERLINE_COLOR, marginTop: 5}]} 
                    multiline={true} 
                    numberOfLines={4} 
                    onChangeText={(address) => this.setState({address})} 
                    value={this.state.address}
                    ref="addressInput"
                    returnKeyType={"done"}
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'} 
                    selectionColor={colors.CURSOR_COLOR}
                    placeholder={"Or enter your address manually here..."}
                    placeholderTextColor={colors.PLACEHOLDER_COLOR} 
                />
            </ScrollView>
            <TouchableOpacity style={[basicCompStyles.bgBaseColor, basicCompStyles.defaultPadding, basicCompStyles.defaultMarginTB, basicCompStyles.spacingMarginT, {height: 40, borderRadius: 20 }]} onPress={this.saveManualEntry} >
                <Text style={[basicStyles.textWhiteSmall, basicCompStyles.alignTextCenter]}>{"Save"}</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={this.signOut} > 
                <Text style={[basicStyles.textSmallerLink, basicCompStyles.aliginSelfC, {paddingBottom: 10}]}>{"Sign Out"}</Text>
            </TouchableOpacity> 
        </View>
    }
}