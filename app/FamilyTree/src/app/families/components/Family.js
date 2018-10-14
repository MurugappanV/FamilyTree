import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity} from 'react-native';
import { basicStyles, basicCompStyles, fullWidth } from "../../../common/styles/styleSheet";
import *  as generalConstants from '../../../common/constants/generalConstants';
import colors from "../../../common/constants/colors";

class Family extends PureComponent {

    constructor(props) {
        super(props)
        let itemWidth = ((fullWidth - 20) / 2) - 5  // 20 for padding, 10 for margin
        this.itemWidth = itemWidth
    }

    renderUserImage = (imageUrl) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 10, width: 100, height: 100}]} source={{uri : imageUrl}}/>
        } else {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 10, width: 100, height: 100}]} source={require('../../../../assert/images/family.png')}/>
        }
    }

    render() {
        const {item, index, navigation} = this.props;
        const name = item.name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
        
        return <View style={[{backgroundColor: '#ffffff30', alignSelf: 'stretch', borderRadius: 20, padding: 10, marginBottom: 10}]}>
            <TouchableOpacity onPress={() => {navigation.navigate("Family", {id: item.id, name: name, photoUrl: item.photoUrl})}}>
                <View style={[ basicCompStyles.flexRowNC]}>
                    {this.renderUserImage(item.photoUrl)}
                    <View style={{flex:1, paddingLeft: 20, paddingTop: 10, alignSelf: "flex-start"}}>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple, {color: '#ffffffff', fontSize: 27}]}>{name}</Text>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink, {color: '#ffffffff', fontSize: 16}]}>{ item._usersMeta.count + (item._usersMeta.count>1 ? " Members" : " Member") }</Text>
                    </View>
                    <TouchableOpacity onPress={() => {navigation.navigate("TreeView", {id: item.id})}} style={{padding: 10}}>
                        <Image style={{width:40, height: 40}} source={require('../../../../assert/images/tree.png')}/>
                    </TouchableOpacity>
                    {/* <Image style={{width:50, height: 50}} source={require('../../../../assert/images/tree.png')}/> */}
                    {/* <View style={{elevation: 20}}> */}
                    {/* </View> */}
                </View>
            </TouchableOpacity>
        </View>
    }
}

export default Family;// "Family", {id: item.id, name: name, photoUrl: item.photoUrl}