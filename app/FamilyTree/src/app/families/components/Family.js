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
        
        return <View style={[{backgroundColor: '#ffffff40', alignSelf: 'stretch', borderRadius: 10, padding: 10, width: this.itemWidth}, index%2==0 ? { marginRight: 5 } : { marginLeft: 5 }, index/2>=1 ? { marginTop: 10 } : { marginTop: 0 }]}>
            <TouchableOpacity onPress={() => {navigation.navigate("Family", {id: item.id, name: name, photoUrl: item.photoUrl})}}>
                <View style={[ basicCompStyles.flexColumnCC]}>
                    {this.renderUserImage(item.photoUrl)}
                    {/* <View style={[basicCompStyles.flexColumnCC]}> */}
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple, {color: '#e1f5febb'}]}>{name}</Text>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink, {color: '#b3e5fcbb'}]}>{ item._usersMeta.count + (item._usersMeta.count>1 ? " Members" : " Member") }</Text>
                    {/* </View> */}
                    {/* <View style={{elevation: 20}}> */}
                    {/* </View> */}
                </View>
            </TouchableOpacity>
        </View>
    }
}

export default Family;