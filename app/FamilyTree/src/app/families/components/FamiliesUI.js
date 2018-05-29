import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity} from 'react-native';
import { basicStyles, basicCompStyles } from "../../../common/styles/styleSheet";
import Headers from "../../common/components/Headers";

class FamiliesUI extends PureComponent {

    render() {
        
        let {navigation} = this.props
        return <View style={basicStyles.deviceFullView}>
            <Headers {...this.props} style={[basicStyles.homeHeaderContainer, {elevation: 10}]}/>
            <Text style={{color: 'white'}}>Hello</Text>
        </View>
    }
}

export default FamiliesUI;