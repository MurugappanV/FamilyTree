import React, {PureComponent} from "react";
import { StackNavigator } from "react-navigation";
import HomeNavigator from "../../home";
import Login from "../../login";
import AboutUs from "../../aboutUs";
import UserDetails from "../../userDetail";
import Confirmation from "../../confirmation";

const BaseNavigator = StackNavigator({
    Home: { screen: HomeNavigator }
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

export default BaseNavigator;


// Login: { screen: Login },
// AboutUs: { screen: AboutUs},
// Details: { screen: UserDetails},
// Confirmation: {screen: Confirmation}