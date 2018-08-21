import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles, fullWidth } from "../../../../common/styles/styleSheet";

class UserDisplay extends PureComponent {
    constructor(props) {
        super(props)
    }

    renderUserImage = (imageUrl) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 55, width: 110, height: 110}]} source={{uri : imageUrl}}/>
        } else {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 55, width: 110, height: 110}]} source={require('../../../../../assert/images/profile.png')}/>
        }
    }

    render() {
        const {name, imageUrl, email, phoneNo} = this.props;
        return <View style={[basicStyles.deviceFullWidth, basicCompStyles.flexColumnCN, {height: 110, marginBottom: 20, marginTop: 10}]}>
            <View style={[basicCompStyles.flexColumnCC, {backgroundColor: 'white', borderRadius: 10, elevation: 10, marginLeft: 60, paddingLeft: 50, paddingTop: 10, paddingBottom: 10, marginRight:10,  alignSelf: 'stretch'}]}>
                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple]}>{name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</Text>
                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink]}>{email.toLowerCase()}</Text>
                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink]}>{phoneNo}</Text>
            </View>
            <View style={{position: 'absolute',elevation: 20, marginLeft: 10}}>
                {this.renderUserImage(imageUrl)}
            </View>
        </View>
    }
}

export default UserDisplay;