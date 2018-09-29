import React, { PureComponent } from 'react';
import { View, Button, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { basicCompStyles, basicStyles } from '../../../common/styles/styleSheet';
import colors from '../../../common/constants/colors';

export default class VerificationCodeInput extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {codeInput: ''};
    }

    render() {
        return (
            // <ScrollView style={basicStyles.deviceFullViewLight}>
            <KeyboardAvoidingView style={[basicCompStyles.fullSize, basicCompStyles.bgBaseColorLight, basicCompStyles.defaultPadding, basicCompStyles.flexColumnCN]} behavior="padding" >
                <Text style={[basicStyles.textBig, basicCompStyles.spacingMarginT]}>OTP verification</Text>
                
                <Image style={[basicStyles.bigImage, basicCompStyles.aliginSelfC, basicCompStyles.spacingMarginT]} source={require('../../../../assert/images/msg.png')}/>
            
                <Text style={[basicStyles.textSmall, basicCompStyles.spacingMarginT, {paddingLeft: 5}]}>Please enter your received OTP number</Text>
                <TextInput
                    onSubmitEditing={() => this.props.confirmCode(this.state.codeInput)}
                    underlineColorAndroid={colors.UNDERLINE_COLOR} 
                    selectionColor={colors.CURSOR_COLOR}
                    style={basicStyles.textInputSmall}
                    onChangeText={value => this.setState({ codeInput: value })}
                    placeholder={"OTP NUMBER"}
                    keyboardType={"numeric"}
                    placeholderTextColor={colors.PLACEHOLDER_COLOR} 
                    value={this.state.codeInput}
                />
                <TouchableOpacity onPress={this.props.resendCode} >
                    <Text style={[basicStyles.textSmallerLink, basicCompStyles.alignTextRight, {color: '#ffffcc'}]}>Not received your OTP ?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[basicCompStyles.bgDarkColor, basicCompStyles.defaultPadding, basicCompStyles.defaultMarginTB, basicCompStyles.spacingMarginT, {height: 40, borderRadius: 20, backgroundColor: 'white' }]} onPress={() => this.props.confirmCode(this.state.codeInput)} >
                    <Text style={[ basicStyles.textWhiteSmall, basicCompStyles.alignTextCenter, {color: 'purple'}]}>Confirm OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.changeNumber} >
                    <Text style={[basicStyles.textSmallerLink, basicCompStyles.aliginSelfC, {paddingBottom: 10, color: '#ffffcc'}]}>Need to change phone number ?</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            // </ScrollView>
        );
    }
     
}