import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import { basicStyles, basicCompStyles } from "../../../common/styles/styleSheet";
import Headers from "../../common/components/Headers";
import Family from "./Family";

class FamiliesUI extends PureComponent {
    
    render() {
        let {navigation} = this.props
        return <View style={[basicStyles.deviceFullView]}>
            <Headers {...this.props} style={[basicStyles.homeHeaderContainer, {elevation: 10}]}/>
            <View style={[basicCompStyles.defaultPadding, {flex: 1}]}>
                <View style={{flex: 1}}>
                    <FlatList 
                        key={"family"}
                        listKey={"family"}
                        data={this.props.familyList}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({item}) => <Family item={item} navigation={this.props.navigation}/>}
                        horizontal={false}
                    />
                </View>
                <TouchableOpacity style={[basicCompStyles.bgBaseColor, basicCompStyles.defaultPadding, basicCompStyles.defaultMarginTB, {height: 40, borderRadius: 20 }]} onPress={() => {navigation.navigate("AddFamily")}} >
                    <Text style={[basicStyles.textWhiteSmall, basicCompStyles.alignTextCenter]}>{"ADD NEW FAMILY"}</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => {navigation.navigate("AddFamily")}} > 
                    <Text style={[basicStyles.textSmallerLink, basicCompStyles.aliginSelfC, {paddingBottom: 10}]}>{"Sign Out"}</Text>
                </TouchableOpacity> 
            </View>
        </View>
    }
}

export default FamiliesUI;