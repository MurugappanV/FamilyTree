import React, {PureComponent} from "react";
import { StackNavigator } from "react-navigation";
import {View} from 'react-native';
import Families from "../../families";
import AddFamily from "../../addFamily";
import Family from "../../family";
import Header from "../../family/common/header";
import AddMember from "../../addMember";
import List from "../../family/list";
import Display from "../../family/display";
// import Login from "../../login";
// import AboutUs from "../../aboutUs";
// import UserDetails from "../../userDetail";
// import Confirmation from "../../confirmation";

const BaseNavigator = StackNavigator({
    Families: { 
        screen: Families , 
        // navigationOptions: { 
        //     header: null
        // }
    },
    AddFamily: { 
        screen: AddFamily
    },
    Family: {
        screen: List, 
        // navigationOptions: { 
        //     header: ({navigation}) => <Header navigation={navigation}/>
        // }
    },
    Relation: {
        screen: Display,
    },
    AddMember: {
        screen: AddMember
    }
}, {
    cardStyle: { backgroundColor: "transparent" },
    transitionConfig: () => ({
        containerStyle: {
        backgroundColor: 'transparent',
        },
    }),
});

const defaultGetStateForAction = BaseNavigator.router.getStateForAction;
BaseNavigator.router.getStateForAction = (action, state) => {            
    if (state && action.type === 'GoToRoute') {           
        let index = state.routes.findIndex((item) => {
            return item.routeName === action.routeName
        });
        const routes = state.routes.slice(0, index+1);
        return {
            routes,
            index
        };    
    }       
    return defaultGetStateForAction(action, state);
};



export default class navigator extends PureComponent {
    render() {
        console.log("props nav ", this.props)
        return <BaseNavigator screenProps={this.props}/>;
    }
}

// Login: { screen: Login },
// AboutUs: { screen: AboutUs},
// Details: { screen: UserDetails},
// Confirmation: {screen: Confirmation}


// <View style={{height: 100}}></View>

// navigation={navigation} title={"name"} familyImg={"photo"}