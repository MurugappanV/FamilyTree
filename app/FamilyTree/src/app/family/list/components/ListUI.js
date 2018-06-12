import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles } from "../../../../common/styles/styleSheet";
import * as generalConstants from "../../../../common/constants/generalConstants";
import ListItem from "./ListItem";
import colors from "../../../../common/constants/colors";


class ListUI extends PureComponent {

    renderList = (props) => {
        return <View style={[basicCompStyles.defaultPadding, {flex: 1}]}>
            <View style={{flex: 1}}>
                <FlatList 
                    key={"memberList"}
                    listKey={"memberList"}
                    data={props.familyDetails.users}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({item}) => <ListItem item={item} navigation={props.navigation}/>}
                    horizontal={false}
                />
            </View>
            <TouchableOpacity style={[basicCompStyles.bgBaseColor, basicCompStyles.defaultPadding, basicCompStyles.defaultMarginTB, {height: 40, borderRadius: 20 }]} onPress={() => {props.navigation.navigate("AddFamily")}} >
                <Text style={[basicStyles.textWhiteSmall, basicCompStyles.alignTextCenter]}>{"ADD NEW MEMBER"}</Text>
            </TouchableOpacity> 
            {/* <TouchableOpacity onPress={() => {props.navigation.navigate("AddFamily")}} > 
                <Text style={[basicStyles.textSmallerLink, basicCompStyles.aliginSelfC, {paddingBottom: 10}]}>{"Back"}</Text>
            </TouchableOpacity>  */}
        </View>
    }

    renderPage = (props) => {
        if(props.familyDetailStatus == generalConstants.LOADED && props.familyDetails != null) {
            console.log("det - ", props.familyDetails)
            return this.renderList(props)
        } else {
            return <View style={[basicCompStyles.defaultPadding, {flex: 1}]}>
                <ActivityIndicator size="large" color={colors.PROGRESS_BAR_COLOR} />
            </View>
        }
    }

    render() {
        return <View style={[{flex: 1}]}>
            {this.renderPage(this.props)}
        </View>
    }
}

export default ListUI;