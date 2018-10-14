import React, {PureComponent} from "react";
import {View, TouchableOpacity, Image, Text} from 'react-native';
import { basicStyles, basicCompStyles } from "../../../../../common/styles/styleSheet";

class HeaderUI extends PureComponent {

    renderUserImage = (imageUrl) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={basicStyles.headerImage} source={{uri : imageUrl}}/>
        } else {
            return <Image style={basicStyles.headerImage} source={require('../../../../../../assert/images/family.png')}/>
        }
    }

    render() {
        let {navigate, goBack} = this.props.navigation
        return <View style={[basicStyles.homeHeaderContainer, {backgroundColor: '#00000020'}]}>
            <View style={basicStyles.homeHeaderInnerContainer}>
                <TouchableOpacity onPress={() => goBack()} style={{marginRight: 10}}>
                    <Image tintColor={'#ffffffB0'} style={basicStyles.headerImage} source={require('../../../../../../assert/images/back.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    {this.renderUserImage(this.props.familyImg)}
                </TouchableOpacity>
                <TouchableOpacity style={basicStyles.headerTitle} onPress={() => {}}>
                    <Text style={basicStyles.textWhiteSmall}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

export default HeaderUI;