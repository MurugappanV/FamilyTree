import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles, fullWidth } from "../../../../common/styles/styleSheet";

class UserDisplay extends PureComponent {
    constructor(props) {
        super(props)
    }

    renderUserImage = (imageUrl, gender) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 55, width: 110, height: 110}]} source={{uri : imageUrl}}/>
        } else {
            
            if(gender == "MALE") {
                return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 55, width: 110, height: 110}]} source={require('../../../../../assert/images/man.png')}/>
            } else {
                return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 55, width: 110, height: 110}]} source={require('../../../../../assert/images/woman.png')}/>
            }
        }
    }

    render() {
        const {name, imageUrl, email, phoneNo, gender, user, navigation, familyId} = this.props;
        return <TouchableOpacity onPress={() => {navigation.navigate("AddMember", {user: user, familyId: familyId})}} style={[basicStyles.deviceFullWidth, basicCompStyles.flexColumnCN, {height: 110, marginBottom: 10, marginTop: 10}]}>
            <View  style={[basicCompStyles.flexColumnCC, {backgroundColor: 'white', borderRadius: 10, elevation: 10, marginLeft: 60, paddingLeft: 50, paddingTop: 10, paddingBottom: 10, marginRight:10,  alignSelf: 'stretch'}]}>
                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple]}>{name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</Text>
                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink, {color: '#840084'}]}>{email.toLowerCase()}</Text>
                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink, {color: '#840084'}]}>{phoneNo}</Text>
            </View>
            <View style={{position: 'absolute',elevation: 20, marginLeft: 10}}>
                {this.renderUserImage(imageUrl, gender)}
            </View>
        </TouchableOpacity>
    }
}

export default UserDisplay;