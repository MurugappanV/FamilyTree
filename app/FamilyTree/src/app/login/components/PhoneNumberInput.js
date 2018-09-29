import React, { PureComponent } from 'react';
import { View, Button, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { basicCompStyles, basicStyles } from '../../../common/styles/styleSheet';
import colors from '../../../common/constants/colors';

export default class PhoneNumberInput extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {phoneNumber: props.phoneNumber.length > 0 ? props.phoneNumber : "+91 "};
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={[basicCompStyles.fullSize, basicCompStyles.bgBaseColorLight, basicCompStyles.defaultPadding]}>
                <Text style={basicStyles.textBig}>Phone number verification</Text>
                <View style={[basicCompStyles.fullSize, basicCompStyles.flexColumnCN]}>
                    <Image style={[basicStyles.bigImage, basicCompStyles.aliginSelfC]} source={require('../../../../assert/images/send.png')}/>
                    <Text style={[basicStyles.textSmall, {paddingLeft: 5, marginTop: 20}]}>Please enter your phoneNumber</Text>
                    <TextInput
                        onSubmitEditing={() => this.props.signIn(this.state.phoneNumber)}
                        underlineColorAndroid={colors.UNDERLINE_COLOR} 
                        selectionColor={colors.CURSOR_COLOR}
                        returnKeyType={"send"}
                        style={basicStyles.textInputSmall}
                        keyboardType={"phone-pad"}
                        onChangeText={value => this.setState({ phoneNumber: value })}
                        placeholder={"PHONE NUMBER"}
                        placeholderTextColor={colors.PLACEHOLDER_COLOR} 
                        value={this.state.phoneNumber}
                    />
                    <Text style={[basicStyles.textSmaller, {paddingLeft: 5}]}>We require phonenumber for customer communication and identification</Text>
                </View>
                <TouchableOpacity style={[{backgroundColor: 'white'}, basicCompStyles.defaultPadding, basicCompStyles.defaultMarginTB, {height: 40, borderRadius: 20 }]} onPress={() => this.props.signIn(this.state.phoneNumber)}>
                    <Text style={[basicStyles.textWhiteSmall, basicCompStyles.alignTextCenter, {color: 'purple'}]}>Send OTP</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
     
}

// 
// 