import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles, fullWidth } from "../../../../common/styles/styleSheet";
import * as generalConstants from "../../../../common/constants/generalConstants";
import ListItem from "./ListItem";
import colors from "../../../../common/constants/colors";
import Header from "../../common/header";
import Carousel from 'react-native-snap-carousel';

class ListUI extends PureComponent {
    constructor(props) {
        super(props)
        let title = "Family";
        let familyImg = null;
        if(!!this.props.navigation.state) {
            const {params}  = this.props.navigation.state
            title = params.name;
            familyImg = params.photoUrl;
        }
        this.state = {refreshing : false, title : title, familyImg : familyImg}
    }

    componentWillUpdate(nextProps) {
        if(nextProps.familyDetailStatus == generalConstants.LOADED) {
            this.setState({refreshing: false})
        }
    }

    renderItem ({item, index}) {
        return (
            <View style={[basicCompStyles.flexRowSaC, basicCompStyles.defaultPadding, {height: 100, backgroundColor: "#ffffffcc", borderRadius: 10}]}>
                <Image style={[ { width: 50, height: 50}]} source={item.imgSource}/>
                <View>
                    <Text style={basicCompStyles.alignTextCenter}>{ item.count }</Text>
                    <Text >{ item.label }</Text>
                </View>
            </View>
        );
    }

    renderList = (props) => {
        return <View  style={basicStyles.deviceFullView}>
            <Header navigation={props.navigation} title={this.state.title} familyImg={this.state.familyImg}/>
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={props.familyStatisticData}
                renderItem={this.renderItem}
                sliderWidth={fullWidth}
                itemWidth={fullWidth - 160}
                contentContainerCustomStyle={{height: 100}}
                firstItem={1}
                inactiveSlideScale={0.8}
                containerCustomStyle={{paddingTop: 10, paddingBottom: 10 }}
            />
            <View style={{flex: 1000}}>
                
                <View style={[basicCompStyles.defaultPadding, {flex: 1}]}>
                    <FlatList 
                        key={"memberList"}
                        listKey={"memberList"}
                        data={props.familyDetails.users}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({item}) => <ListItem item={item} navigation={props.navigation}/>}
                        horizontal={false}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.props.getFamilyDetails(props.familyId)
                            this.setState({refreshing: true})
                        }}
                    />
                </View>
                <TouchableOpacity style={[basicCompStyles.bgBaseColor, basicCompStyles.defaultPadding, basicCompStyles.defaultMarginTB, {height: 40, borderRadius: 20, backgroundColor: '#ffffff60', marginLeft: 20, marginRight: 20 }]} onPress={() => {props.navigation.navigate("AddMember", {familyId: props.familyId})}} >
                    <Text style={[basicStyles.textWhiteSmall, basicCompStyles.alignTextCenter, {color: '#732673B0'}]}>{"ADD NEW MEMBER"}</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => {props.navigation.goBack()}} > 
                    <Text style={[basicStyles.textSmallerLink, basicCompStyles.aliginSelfC, {paddingBottom: 10, color: '#732673'}]}>{"Back"}</Text>
                </TouchableOpacity> 
            </View>
        </View>
    }

    renderPage = (props) => {
        if(props.familyDetails == null) {
            return <View style={[basicCompStyles.defaultPadding, basicCompStyles.flexColumnCC, {flex: 1}]}>
                <ActivityIndicator size="large" color={colors.PROGRESS_BAR_COLOR} />
            </View>
        } else {
            console.log("det - ", props.familyDetails)
            return this.renderList(props)
        }
    }

    render() {
        return <View style={[basicStyles.deviceFullView,{flex: 1}]}>
            {this.renderPage(this.props)}
        </View>
    }
}

export default ListUI;