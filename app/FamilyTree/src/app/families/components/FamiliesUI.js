import React, {PureComponent} from "react";
import {View, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles } from "../../../common/styles/styleSheet";
import * as generalConstants from "../../../common/constants/generalConstants";
import Headers from "../../common/components/Headers";
import Family from "./Family";
import colors from "../../../common/constants/colors";

class FamiliesUI extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {refreshing : false}
    }

    componentDidUpdate(prevProps) {
        if(this.props.familyListStatus == generalConstants.LOADED) {
            this.setState({refreshing: false})
        }
    }

    renderFamilies = () => {
        if(this.props.familyList.length != 0) {
            return <View style={{flex: 1}}>
                <FlatList 
                    key={"family"}
                    listKey={"family"}
                    numColumns={1}
                    data={this.props.familyList}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({item, index}) => <Family item={item} index={index} navigation={this.props.navigation}/>}
                    horizontal={false}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.props.getFamilyByUserId(this.props.userId)
                        this.setState({refreshing: true})
                    }}
                />
            </View>
        } else {
            return <View style={[basicCompStyles.defaultPadding, basicCompStyles.flexColumnCC, {flex: 1}]}>
                <ActivityIndicator size="large" color={colors.PROGRESS_BAR_COLOR} />
            </View>
        }
    }
    
    render() {
        let {navigation} = this.props
        return <View style={[basicStyles.deviceFullView]}>
            <Headers {...this.props} style={[basicStyles.homeHeaderContainer]} onCornerBtn={this.props.signOut} />
            <View style={[basicCompStyles.defaultPadding, {flex: 1}]}>
                {this.renderFamilies()}
                {/* <TouchableOpacity style={[basicCompStyles.bgBaseColor, basicCompStyles.defaultPadding, basicCompStyles.defaultMarginTB, {height: 40, borderRadius: 20, backgroundColor: '#ffffff60'}]} onPress={() => {navigation.navigate("AddFamily")}} >
                    <Text style={[basicStyles.textWhiteSmall, basicCompStyles.alignTextCenter, {color: '#732673B0'}]}>{"ADD NEW FAMILY"}</Text>
                </TouchableOpacity>  */}
                <TouchableOpacity style={styles.floatButton} onPress={() => {navigation.navigate("AddFamily")}}>
                    <Text style={{color: '#732673B0', fontSize: 30}}>{"+"}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => {this.props.signOut()}} > 
                    <Text style={[basicStyles.textSmallerLink, basicCompStyles.aliginSelfC, {paddingBottom: 10, color: '#732673'}]}>{"Sign Out"}</Text>
                </TouchableOpacity>  */}
            </View>
        </View>
    }
}

export default FamiliesUI;

const styles = StyleSheet.create({
    floatButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        bottom: 20,
        right: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#ffffff60',
        position: 'absolute',
        borderColor: '#cccccc',
        borderWidth: 0.5
    },
})