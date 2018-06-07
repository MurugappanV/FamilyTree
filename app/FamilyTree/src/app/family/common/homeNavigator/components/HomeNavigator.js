import React, { PureComponent } from "react";
import { Text, Image } from 'react-native';
import { TabNavigator, TabBarBottom } from "react-navigation";
import List from "../../../list";
import Display from "../../../display";
import { basicStyles } from "../../../../../common/styles/styleSheet";
import colors from "../../../../../common/constants/colors";
import Headers from "../../header";

const HomeNavigator = TabNavigator({
        List: { screen: List, navigationOptions: { header: null} },
        Display: { screen: Display, navigationOptions: { header: null} }
    }, {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'List') {
                    return <Image style={basicStyles.tabImage} tintColor={tintColor} source={require('../../../../../../assert/images/list.png')} />;
                } else if (routeName === 'Display') {
                    return <Image style={basicStyles.tabImage} tintColor={tintColor} source={require('../../../../../../assert/images/family-tree.png')} />;
                }
                return <Image style={basicStyles.tabImage} tintColor={tintColor} source={require('../../../../../../assert/images/list.png')} />;
            },
            tabBarLabel: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                return <Text style={[{fontSize: focused ? 12 : 10, color: tintColor, alignSelf: 'center'}]} >routeName</Text>;
            },
          }),
        animationEnabled: true,
        tabBarOptions: {
            showLabel: false,
            activeTintColor: colors.DARK_IMAGE_COLOR,
            inactiveTintColor: colors.LIGHT_IMAGE_COLOR,
            style: basicStyles.tabBar,
            // indicatorStyle: basicStyles.activeBackGround
        },
        tabBarPosition: 'bottom',
        tabBarComponent: TabBarBottom,
        lazy: false
    }
);

export default HomeNavigator;

//({navigation}) => <Header navigation={navigation} title={navigation.state.params.name} familyImg={navigation.state.params.photoUrl}/>