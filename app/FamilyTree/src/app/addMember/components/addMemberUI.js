import React, {PureComponent} from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { pickImage } from "../../common/utils/imagePicker";
import { basicStyles , basicCompStyles , width25pc, width20pc } from "../../../common/styles/styleSheet";
import * as generalConstants from "../../../common/constants/generalConstants";
import colors from '../../../common/constants/colors';
import Toast from 'react-native-simple-toast';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Picker } from "./picker";

const fatherOptions = (users) => {
    const fathers = users.filter(user => user.gender == "MALE")
    return fathers.map(user => {
        return {
            ...user,
            key: user.id,
            label: user.name
        }
    })
}

const spouceOptions = (users, gender) => {
    const fathers = users.filter(user => user.gender != gender && user.husband.length == 0 && user.wife.length == 0)
    return fathers.map(user => {
        return {
            ...user,
            key: user.id,
            label: user.name
        }
    })
}

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

export default class AddMemberUI extends PureComponent {
    
    constructor(props) {
        super(props);
        // let userDetails = props.userDetails;
        // if(userDetails && userDetails.phoneNo != null) {        
        //     let userGender = userDetails.gender == "FEMALE" ? 0 : userDetails.gender == "MALE" ? 1 : 2;
        //     this.state = {
        //         name: userDetails.name, 
        //         email: userDetails.email, 
        //         date: userDetails.dateOfBirth, 
        //         address: userDetails.address, 
        //         gender: userGender
        //     }
        // } else {

            // }
        if(!!props.user) {
            this.state ={
                phoneNumber: props.user.phoneNumber,
                name: props.user.name,
                gender: props.user.gender == "MALE" ? 1 : 0,
                date: props.user.dateOfBirth,
                email: props.user.email,
                address: props.user.address,
                text: 'Update user',
                fatherId: !!props.user.father ? props.user.father.id : null,
                spouceId: props.user.gender == "MALE" ? (!!props.user.wife ? props.user.wife.id : null) : (!!props.user.husband ? props.user.husband.id : null),
                fatherPicked: !!props.user.father ? props.user.father.name : null,
                spoucePicked: props.user.gender == "MALE" ? (!!props.user.wife ? props.user.wife.name : null) : (!!props.user.husband ? props.user.husband.name : null),
                showMore: true
            }
            props.setProfilePicUrl(props.user.photoUrl)
        } else {
            this.state = {phoneNumber: "", name: "", email: "", date:"", address: "", gender: 0, showMore: false, spouceId: null, fatherId: null, fatherPicked: null, spoucePicked: null, text: 'Add member'};
        
        }
    }

    componentWillReceiveProps(nextProps) {
        // nextProps.userDetails && nextProps.userDetails.name != null && this.setUserDetail(nextProps.userDetails);
    }

    saveManualEntry = () => {
        if(this.state.name.length == 0) {
            Toast.show("Please enter name", Toast.LONG)
            this.refs.nameInput.focus(); 
        } else if(this.state.phoneNumber.length == 0) {
            Toast.show("Please enter phone number", Toast.LONG)
            this.refs.phInput.focus(); 
        } else if (this.state.email.trim().length != 0 && !validateEmail(this.state.email)) {
            Toast.show("Please enter valid email id", Toast.LONG)
            this.refs.emailInput.focus(); 
        } else if (this.state.date.length == 0) {
            Toast.show("Please select birth date", Toast.LONG)
            this.refs.scroll.scrollToEnd()
        } else {
            const dob = new Date(this.state.date);
            const dobStr = dob.toISOString();
            const gender = this.state.gender == 0 ? "FEMALE" : this.state.gender == 1 ? "MALE" : "OTHERS" ;
            this.props.addMember(this.state.phoneNumber, this.state.name, this.state.email, dobStr, this.state.address, gender, this.state.fatherId, this.state.spouceId);
            // save in db
        }
    }

    // setUserDetail = (userDetails) => {
    //     let userGender = userDetails.gender == "FEMALE" ? 0 : userDetails.gender == "MALE" ? 1 : 2;
    //     this.setState({
    //         name: userDetails.name, 
    //         email: userDetails.email, 
    //         date: userDetails.dateOfBirth, 
    //         address: userDetails.address, 
    //         gender: userGender
    //     })
    // }

    selectImage = () => {
        pickImage("Select profile picture", "profilePic", this.props.setProfilePicUrl, this.props.uploadingImageUrl);
    }

    renderImage = (uploadStatus, profilePicUrl) => {
        if(uploadStatus == 0 || uploadStatus == generalConstants.ERROR) {
            return <TouchableOpacity style={[basicCompStyles.aliginSelfC, basicCompStyles.smallSpacingMarginT,basicStyles.profImage]} onPress={this.selectImage}>
                <Image style={[basicStyles.profImage,  {borderRadius: width20pc}]} source={require('../../../../assert/images/profile.png')}/>
                <Image tintColor={'#ffffffA0'} style={{position: 'absolute', width: 40, height: 40, bottom: 10, right: width20pc-20}} source={require('../../../../assert/images/camera.png')}/>
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
        const {  profilePicStatus,  profilePicUrl} = this.props;
        return <View style={[basicCompStyles.fullSize, basicCompStyles.bgBaseColorLight]}>
            <View style={[{flexDirection: 'row', paddingBottom: 5}, basicCompStyles.defaultPadding]}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{marginRight: 10, alignSelf: 'flex-end', paddingBottom: 5}}>
                    <Image tintColor={'#ffffffB0'} style={basicStyles.headerImage} source={require('../../../../assert/images/back.png')}/>
                </TouchableOpacity>
                <Text style={basicStyles.textBig}>{this.state.text}</Text>
            </View>
            {/* <TouchableOpacity onPress={() => {}}>
                <Image style={[basicStyles.bigImage, basicCompStyles.aliginSelfC, basicCompStyles.smallSpacingMarginT, {borderRadius: width25pc}]} source={require('../../../../assets/images/profile.png')}/>
            </TouchableOpacity> */}
            <ScrollView style={[basicCompStyles.fullSize, basicCompStyles.defaultPadding]} ref="scroll">
                {this.renderImage(profilePicStatus, profilePicUrl)}
                {/* <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"User name"}</Text> */}
                <View style={{flexDirection: 'row', alignSelf: 'stretch', marginTop: 20}}>
                    <Image style={[{width: 30, height: 30, alignSelf: 'center'}]} source={require('../../../../assert/images/boy.png')}/>
                    <TextInput
                        ref="nameInput"
                        onSubmitEditing={(event) => { 
                            this.refs.phInput.focus(); 
                        }}
                        returnKeyType={"next"}
                        autoCorrect={false}
                        underlineColorAndroid={colors.UNDERLINE_COLOR} 
                        selectionColor={colors.CURSOR_COLOR}
                        style={[basicStyles.textInputSmall, {flex: 1, marginLeft: 15}]}
                        onChangeText={value => this.setState({ name : value })}
                        placeholder={"Enter member name..."}
                        placeholderTextColor={colors.PLACEHOLDER_COLOR} 
                        value={this.state.name}
                    />
                </View>
                {/* <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"Phone number"}</Text> */}
                <View style={{flexDirection: 'row', alignSelf: 'stretch', marginTop: 20}}>
                    <Image style={[{width: 30, height: 30, alignSelf: 'center'}]} source={require('../../../../assert/images/phone.png')}/>
                    <TextInput
                        ref="phInput"
                        onSubmitEditing={(event) => { 
                            // this.refs.emailInput.focus(); 
                        }}
                        returnKeyType={"next"}
                        autoCorrect={false}
                        keyboardType={'numeric'}
                        underlineColorAndroid={colors.UNDERLINE_COLOR} 
                        selectionColor={colors.CURSOR_COLOR}
                        style={[basicStyles.textInputSmall,  {flex: 1, marginLeft: 15}]}
                        onChangeText={value => this.setState({ phoneNumber : value })}
                        placeholder={"Enter member's phone number..."}
                        placeholderTextColor={colors.PLACEHOLDER_COLOR} 
                        value={this.state.phoneNumber}
                    />
                </View>
                <DatePicker
                    ref="datePicker"
                    style={[ basicCompStyles.marginBottom15, {borderWidth : 0, marginTop: 20, alignSelf: 'flex-start'}]}
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
                        dateText: {color: '#ffd1a9'},
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
                {/* <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"Father name"}</Text> */}
                
                
                {/* <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"Date of birth"}</Text> */}
                <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'stretch', marginTop: 20}}>
                    <Image style={[{width: 30, height: 30, alignSelf: 'center'}]} source={require('../../../../assert/images/gender.png')}/>
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
                                    labelStyle={{fontSize: 16, color: '#ffd1a9'}}
                                    labelWrapStyle={{marginLeft: 1}}
                                /> 
                            </RadioButton>
                        })}
                    </RadioForm>
                </View>
                <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'stretch', marginTop: 20}}>
                    <Image style={[{width: 30, height: 30, alignSelf: 'center'}]} source={require('../../../../assert/images/father.png')}/>
                    <Picker picked={this.state.fatherPicked} onSelect={(id) => this.setState({fatherId: id})} text={'Select father from existing users'} style={{marginLeft: 20, alignContent: 'center', alignSelf: 'center'}} options={fatherOptions(this.props.familyDetails.users)}/>
                </View>
                {/* <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"Gender"}</Text> */}
                {!this.state.showMore && <TouchableOpacity onPress={() => {this.setState({showMore: true})}} style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'stretch', marginTop: 20}}>
                        <Image tintColor={'#ffffff'} style={[{marginLeft: 5, width: 20, height: 20, alignSelf: 'center'}]} source={require('../../../../assert/images/checkBox.png')}/>
                        <Text style={{marginLeft: 25, color: '#fd6a33', fontSize: 16}}>{'Enter full details'}</Text>
                </TouchableOpacity>}
                {this.state.showMore && <View>
                    
                    <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'stretch', marginTop: 20}}>
                        <Image style={[{width: 30, height: 30, alignSelf: 'center'}]} source={require('../../../../assert/images/spouce.png')}/>
                        <Picker picked={this.state.spoucePicked} onSelect={(id) => this.setState({spouceId: id})} text={'Select spouce from existing users'} style={{marginLeft: 20, alignContent: 'center', alignSelf: 'center'}} options={spouceOptions(this.props.familyDetails.users, this.state.gender == 0 ? "FEMALE" : "MALE")}/>
                    </View>
                    <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'stretch', marginTop: 20}}>
                        <Image style={[{width: 30, height: 30, alignSelf: 'center'}]} source={require('../../../../assert/images/email.png')}/>
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
                            style={[basicStyles.textInputSmall, {flex: 1, marginLeft: 15}]}
                            onChangeText={value => this.setState({ email: value })}
                            placeholder={"Email"}
                            placeholderTextColor={colors.PLACEHOLDER_COLOR} 
                            value={this.state.email}
                        />
                    </View>
                    {/* <Text style={[basicStyles.textSmaller, basicCompStyles.smallSpacingMarginT]}>{"Email ID"}</Text> */}
                    <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'stretch', marginTop: 20}}>
                        <Image style={[{width: 30, height: 30, alignSelf: 'flex-start'}]} source={require('../../../../assert/images/address.png')}/>
                        <TextInput 
                            style={[basicStyles.textAreaSmall, {flex: 1, marginLeft: 15, textAlignVertical: 'top', borderWidth: 1, color: '#ffd1a9', borderColor: colors.UNDERLINE_COLOR, marginTop: 5}]} 
                            multiline={true} 
                            numberOfLines={4} 
                            onChangeText={(address) => this.setState({address})} 
                            value={this.state.address}
                            ref="addressInput"
                            returnKeyType={"done"}
                            autoCorrect={false}
                            underlineColorAndroid={'transparent'} 
                            selectionColor={colors.CURSOR_COLOR}
                            placeholder={"Enter address..."}
                            placeholderTextColor={colors.PLACEHOLDER_COLOR} 
                        />
                    </View>
                </View>}
                
                <TouchableOpacity style={[basicCompStyles.bgDarkColor, basicCompStyles.defaultPadding, basicCompStyles.defaultMarginTB, {marginTop: 30, marginBottom: 20, height: 40, borderRadius: 20, backgroundColor: '#ffffffB0' }]} onPress={this.saveManualEntry} >
                    <Text style={[basicStyles.textWhiteSmall, basicCompStyles.alignTextCenter, {color: '#732673B0'}]}>{this.state.text}</Text>
                </TouchableOpacity> 
                {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()} > 
                    <Text style={[basicStyles.textSmallerLink, basicCompStyles.aliginSelfC, {paddingBottom: 10, color: '#732673'}]}>{"Back"}</Text>
                </TouchableOpacity>  */}
            </ScrollView>
            
        </View>
    }
}


// const options = [
//     {
//       key: 'kenya',
//       label: 'Kenya',
//       searchKey: 'Africa',
//     },
//     {
//       key: 'uganda',
//       label: 'Uganda',
//       searchKey: 'Africa',
//     },
//     {
//       key: 'libya',
//       label: 'Libya',
//       searchKey: 'Africa',
//     },
//     {
//       key: 'japan',
//       label: 'Japan',
//       searchKey: 'Asia',
//     },
//     {
//       key: 'estonia',
//       label: 'Estonia',
//       searchKey: 'Europe',
//     },
//   ];