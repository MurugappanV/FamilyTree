import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity} from 'react-native';
import { basicStyles, basicCompStyles } from "../../../common/styles/styleSheet";
import *  as generalConstants from '../../../common/constants/generalConstants';
import colors from "../../../common/constants/colors";

class Family extends PureComponent {

    renderUserImage = (imageUrl) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 10, width: 100, height: 100}]} source={{uri : imageUrl}}/>
        } else {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 10, width: 100, height: 100}]} source={require('../../../../assert/images/family.png')}/>
        }
    }

    render() {
        const {item, navigation} = this.props;
        const name = item.name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
        console.log("hhh---- ", item.name + "" + name);
        return <View>
            <TouchableOpacity onPress={() => {navigation.navigate("Family", {id: item.id, name: name, photoUrl: item.photoUrl})}}>
                <View style={[ basicCompStyles.flexColumnCN, {height: 100, marginBottom: 20}]}>
                    <View style={[basicCompStyles.flexColumnCC, {backgroundColor: '#ffffffcc', borderRadius: 10, elevation: 10, marginLeft: 60, paddingLeft: 50, paddingTop: 10, paddingBottom: 10,  alignSelf: 'stretch'}]}>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple]}>{name}</Text>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink]}>{ item._usersMeta.count + " Members" }</Text>
                    </View>
                    <View style={{position: 'absolute',elevation: 20}}>
                        {this.renderUserImage(item.photoUrl)}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    }
}

export default Family;