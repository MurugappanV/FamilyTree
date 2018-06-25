import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles, fullWidth } from "../../../../common/styles/styleSheet";
// import * as generalConstants from "../../../../common/constants/generalConstants";
// import ListItem from "./ListItem";
import colors from "../../../../common/constants/colors";
// import Header from "../../common/header";
// import Carousel from 'react-native-snap-carousel';

class FamilyDisplay extends PureComponent {
    constructor(props) {
        super(props)
    }

    componentWillUpdate(nextProps) {

    }

    
    renderPage = (props) => {
        // if(props.familyDetails == null) {
            return <View style={[basicCompStyles.defaultPadding, basicCompStyles.flexColumnCC, {flex: 1}]}>
                <ActivityIndicator size="large" color={colors.PROGRESS_BAR_COLOR} />
            </View>
        // } else {
        //     return this.renderList(props)
        // }
    }

    render() {
        return <View style={[basicStyles.deviceFullView,{flex: 1}]}>
            {this.renderPage(this.props)}
        </View>
    }
}

export default FamilyDisplay;