import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles, fullWidth } from "../../../../common/styles/styleSheet";

class CoupleDisplay extends PureComponent {
    constructor(props) {
        super(props)
    }

    renderUserImage = (imageUrl, gender) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 30, width: 60, height: 60}]} source={{uri : imageUrl}}/>
        } else {
            if(gender == "male") {
                return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 30, width: 60, height: 60}]} source={require('../../../../../assert/images/man.png')}/>
            } else {
                return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 30, width: 60, height: 60}]} source={require('../../../../../assert/images/woman.png')}/>
            }
        }
    }

    render() {
        const {title, maleName, maleImg, femaleName, femaleImg, changeUser, maleId, femaleId } = this.props;
        return <View style={[basicStyles.deviceFullWidth, basicCompStyles.flexColumnCN, basicCompStyles.defaultPadding, {height: 110, marginBottom: 20, marginTop: 40}]}>
            <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple, {color: '#fff',backgroundColor: "#ffffff20", borderRadius: 10, marginBottom:10, paddingLeft:10, paddingBottom: 5, paddingTop: 5}]}>{title}</Text>
            <View style={[basicCompStyles.flexRowNC, {paddingLeft: 10, paddingRight: 10}]}>
                <TouchableOpacity onPress={() => changeUser(maleId)} style={[basicCompStyles.flexColumnCC, basicCompStyles.defaultPadding, {backgroundColor: "#ffffff20", borderRadius: 10}]}>
                    {this.renderUserImage(maleImg, "male")}
                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink, {color: '#fff'}]}>{maleName}</Text>
                </TouchableOpacity>
                <View style={{flex : 1}}></View>
                <TouchableOpacity onPress={() => changeUser(femaleId)}  style={[basicCompStyles.flexColumnCC, basicCompStyles.defaultPadding, {backgroundColor: "#ffffff20", borderRadius: 10}]}>
                    {this.renderUserImage(femaleImg, "female")}
                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink, {color: '#fff'}]}>{!femaleName ? "Mother" : femaleName}</Text>
                </TouchableOpacity>
                <View style={{position: 'absolute',paddingBottom: 20,elevation: 20, marginLeft: (fullWidth - 60)/ 2}}>
                    <Image style={[ basicCompStyles.defaultPadding, { width: 40, height: 40}]} source={require('../../../../../assert/images/ring.png')}/>
                </View>
                <View style={[{position: 'absolute', zIndex: -1, width: fullWidth - 90, marginLeft: 30, borderColor: '#ffffff60', borderTopWidth: 0.5, borderStyle: "dotted" }]} />
            </View>
            {/* <View style={[basicCompStyles.flexColumnCC, {backgroundColor: 'white', borderRadius: 10, elevation: 10, marginLeft: 60, paddingLeft: 50, paddingTop: 10, paddingBottom: 10, marginRight:10,  alignSelf: 'stretch'}]}>
                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple]}>{name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</Text>
                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink]}>{email.toLowerCase()}</Text>
                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink]}>{phoneNo}</Text>
            </View>
            <View style={{position: 'absolute',elevation: 20, marginLeft: 10}}>
                {this.renderUserImage(imageUrl)}
            </View> */}
        </View>
    }
}

export default CoupleDisplay;