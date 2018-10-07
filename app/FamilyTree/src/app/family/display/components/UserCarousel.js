import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles, fullWidth } from "../../../../common/styles/styleSheet";
import Carousel from 'react-native-snap-carousel';

class UserCarousel extends PureComponent {
    constructor(props) {
        super(props)
    }

    renderUserImage = (imageUrl) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 25, width: 50, height: 50}]} source={{uri : imageUrl}}/>
        } else {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 25, width: 50, height: 50}]} source={require('../../../../../assert/images/profile.png')}/>
        }
    }

    renderItem = ({item, index}) => {
        return (
            <View style={[basicCompStyles.flexColumnCC, basicCompStyles.defaultPadding, {height: 110, backgroundColor: "#fffffff20", borderRadius: 10}]}>
                {this.renderUserImage(item.photoUrl)}
                <View>
                    <Text style={{color: '#ffffffaa'}}>{ item.name }</Text>
                </View>
            </View>
        );
    }

    render() {
        const props = this.props;
        return <View style={[basicStyles.deviceFullWidth, basicCompStyles.flexColumnCN, basicCompStyles.defaultPadding, {height: 160, marginBottom: 20, marginTop: 10}]}>
            <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple, {color: '#fff'}]}>{props.title}</Text>
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={props.users}
                renderItem={this.renderItem}
                sliderWidth={fullWidth}
                itemWidth={fullWidth - (fullWidth / 2)}
                contentContainerCustomStyle={{height: 110}}
                firstItem={0}
                inactiveSlideScale={0.8}
                containerCustomStyle={{paddingTop: 10, paddingBottom: 10 }}
            />
        </View>
    }
}

export default UserCarousel;