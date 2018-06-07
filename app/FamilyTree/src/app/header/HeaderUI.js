import React, {PureComponent} from "react";
import {View, TouchableOpacity, Image, Text} from 'react-native';
import { basicStyles, basicCompStyles } from "../../common/styles/styleSheet";

class HeaderUI extends PureComponent {

    renderUserImage = (imageUrl) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={basicStyles.headerImage} source={{uri : imageUrl}}/>
        } else {
            return <Image style={basicStyles.headerImage} source={require('../../../assert/images/family.png')}/>
        }
    }

    render() {
        let {navigate} = this.props.navigation
        return <View style={basicStyles.homeHeaderContainer}>
            <View style={basicStyles.homeHeaderInnerContainer}>
                <TouchableOpacity onPress={() => {let x = 5}}>
                    {this.renderUserImage(this.props.familyImg)}
                </TouchableOpacity>
                <TouchableOpacity style={basicStyles.headerTitle} onPress={() => {let x = 5}}>
                    <Text style={basicStyles.textWhiteSmall}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

export default HeaderUI;