import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity} from 'react-native';
import { basicStyles, basicCompStyles } from "../../../../common/styles/styleSheet";
import *  as generalConstants from '../../../../common/constants/generalConstants';
import colors from "../../../../common/constants/colors";
import { getAge } from "../../../../common/utils/dateUtils";

class ListItem extends PureComponent {

    renderUserImage = (imageUrl) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={[ {borderRadius: 25, marginLeft: 5, width: 50, height: 50}]} source={{uri : imageUrl}}/>
        } else {
            return <Image style={[ {borderRadius: 25, width: 50, height: 50}]} source={require('../../../../../assert/images/family.png')}/>
        }
    }

    render() {
        const {item, navigation} = this.props;
        const name = item.name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
        const age = getAge(item.dateOfBirth)
        console.log("hhh---- ", item.name + "" + name);
        return <View>
            <TouchableOpacity onPress={() => {}}>
                <View style={[ basicCompStyles.flexRowNC, basicCompStyles.defaultPadding, {backgroundColor: '#ffffff40', borderRadius: 10,  alignSelf: 'stretch'}]}>
                    <View>
                        {this.renderUserImage(item.photoUrl)}
                    </View>
                    {/* <View style={[basicCompStyles.flexColumnCC, ]}> */}
                    <View style={basicCompStyles.flexColumnCN}>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple, {paddingLeft: 15, color: '#e1f5febb'}]}>{name}</Text>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={[ {paddingLeft: 15, color: '#b3e5fcbb'}]}>{`Age : ${age}`}</Text>
                    </View>
                        {/* <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textSmallerLink]}>{ item._usersMeta.count + " Members" }</Text> */}
                    {/* </View> */}
                </View>
            </TouchableOpacity>
        </View>
    }
}

export default ListItem;