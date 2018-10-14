import React, {PureComponent} from "react";
import {View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { basicStyles, basicCompStyles, fullWidth } from "../../../../common/styles/styleSheet";
import Carousel from 'react-native-snap-carousel';

class UserCarousel extends PureComponent {
    constructor(props) {
        super(props)
    }

    renderUserImage = (imageUrl, gender) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 25, width: 50, height: 50}]} source={{uri : imageUrl}}/>
        } else {
            if(gender == "MALE") {
                return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 30, width: 60, height: 60}]} source={require('../../../../../assert/images/man.png')}/>
            } else {
                return <Image style={[ basicCompStyles.defaultPadding, {borderRadius: 30, width: 60, height: 60}]} source={require('../../../../../assert/images/woman.png')}/>
            }
        }
    }

    renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.props.changeUser(item.id)} style={[basicCompStyles.flexColumnCC, basicCompStyles.defaultPadding, {height: 100, backgroundColor: "#ffffff20", borderRadius: 10}]}>
                {this.renderUserImage(item.photoUrl, item.gender)}
                <View>
                    <Text style={{color: '#ffffff'}}>{ item.name }</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const props = this.props;
        return <View style={[basicStyles.deviceFullWidth, basicCompStyles.flexColumnCN, basicCompStyles.defaultPadding, {height: 180, marginBottom: 20, marginTop: 10}]}>
            <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple, {color: '#fff',backgroundColor: "#ffffff20", borderRadius: 10, marginBottom:10, paddingLeft:10, paddingBottom: 5, paddingTop: 5}]}>{props.title}</Text>
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