import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity} from 'react-native';
import { basicStyles, basicCompStyles } from "../../../../common/styles/styleSheet";

class EmptyUI extends PureComponent {

    renderLabel(redirectPage) {
        if(redirectPage == "Details") {
            return <Text style={[basicStyles.textSmall]}>Click here to add delivery details</Text>
        } else {
            return <Text style={[basicStyles.textSmall]}>Click here to Login</Text>
        } 
    }

    render() {
        let {navigation, redirectPage} = this.props
        return <View style={basicStyles.tabContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(redirectPage)} style={basicStyles.tabContainer}>
                <Image style={basicStyles.bigImage} source={require('../../../../../assert/images/family.png')} />
                {this.renderLabel(redirectPage)}
            </TouchableOpacity>
        </View>
    }
}

export default EmptyUI;