import React, {PureComponent} from "react";
import {View, ScrollView, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles, fullWidth } from "../../../../common/styles/styleSheet";
import * as generalConstants from "../../../../common/constants/generalConstants";
// import ListItem from "./ListItem";
import colors from "../../../../common/constants/colors";
import Header from "../../common/header";
import UserDisplay from "./UserDisplay";
import CoupleDisplay from "./CoupleDisplay";
import UserCarousel from "./UserCarousel";
// import Carousel from 'react-native-snap-carousel';

class FamilyDisplay extends PureComponent {
    constructor(props) {
        super(props)
    }

    componentWillUpdate(nextProps) {

    }

    changeUser = (userId) => {
        this.props.getUserCloseRelation(userId)
    }


    renderRelation = (props) => {
        const user = props.userCloseRelation
        return <View style={basicStyles.deviceFullView}>
            <Header navigation={props.navigation} title={"Close Relations"} familyImg={""}/>
            <ScrollView>
                <UserDisplay familyId={props.familyId} navigation={props.navigation} user={user} id={user.id} gender={user.gender} name={user.name} imageUrl={user.photoUrl} email={user.email} phoneNo={user.phoneNumber}/>
                {user.father && <CoupleDisplay changeUser={this.changeUser} maleId={user.father.id} femaleId={!user.mother ? null : user.mother.id} title={"Parents"} maleName={user.father.name} maleImg={user.father.photoUrl} femaleName={!user.mother ? null : user.mother.name} femaleImg={!user.mother ? null : user.mother.photoUrl}/>}
                {user.husband && user.wife && <CoupleDisplay changeUser={this.changeUser} maleId={user.husband.id} femaleId={user.wife.id} title={"Spouce"} maleName={user.husband.name} maleImg={user.husband.photoUrl} femaleName={user.wife.name} femaleImg={user.wife.photoUrl}/>}
                {user.children.length > 0 && <UserCarousel changeUser={this.changeUser} title={"Children"} users={user.children}/>}
                {user.siblings.length > 0 && <UserCarousel changeUser={this.changeUser} title={"Siblings"} users={user.siblings}/>}
            </ScrollView>
        </View>
    }
    
    renderPage = (props) => {
        if(props.userCloseRelationStatus == generalConstants.LOADED) {
            return this.renderRelation(props)
        } else {
            return <View style={[basicCompStyles.defaultPadding, basicCompStyles.flexColumnCC, {flex: 1}]}>
                <ActivityIndicator size="large" color={colors.PROGRESS_BAR_COLOR} />
            </View>
        }
    }

    render() {
        return <View style={[basicStyles.deviceFullView,{flex: 1}]}>
            {this.renderPage(this.props)}
        </View>
    }
}

export default FamilyDisplay;