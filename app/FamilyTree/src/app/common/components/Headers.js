import React, {PureComponent} from "react";
import {View, TouchableOpacity, Image, Text} from 'react-native';
import { basicStyles, basicCompStyles } from "../../../common/styles/styleSheet";

class Headers extends PureComponent {

    render() {
        let {navigation, style, onCornerBtn} = this.props
        return <View style={[style, {backgroundColor: '#00000020'}]}>
            <View style={basicStyles.homeHeaderInnerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
                    <Image style={basicStyles.headerImage} source={require('../../../../assert/images/family-tree.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={[basicStyles.headerTitle, {flex: 1}]} onPress={() => navigation.navigate("AboutUs")}>
                    <Text style={basicStyles.textWhiteBig}>F
                        <Text style={basicStyles.textWhiteSmall}>AMILIES</Text>
                    </Text>
                </TouchableOpacity>
                {!!onCornerBtn && <TouchableOpacity onPress={onCornerBtn} >
                    <Image tintColor={'#ffffffB0'} style={basicStyles.headerImage} source={require('../../../../assert/images/logout.png')}/>
                    {/* <Text style={{color: '#ffffff', fontSize: 12}}>{"Sign Out"}</Text> */}
                </TouchableOpacity>}
            </View>
        </View>
    }
}

export default Headers;