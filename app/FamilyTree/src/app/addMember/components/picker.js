import React, { PureComponent } from 'react'
import {  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { basicStyles , basicCompStyles , width25pc, width20pc } from "../../../common/styles/styleSheet";

import { getAge } from "../../../common/utils/dateUtils";
const { width, height } = Dimensions.get('window')
import ModalFilterPicker from 'react-native-modal-filter-picker'


export class Picker extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      visible: false,
      picked: props.picked,
    };
  }

    renderUserImage = (imageUrl, gender) => {
        if(imageUrl && imageUrl.length > 0) {
            return <Image style={[ {borderRadius: 25, marginLeft: 5, width: 50, height: 50}]} source={{uri : imageUrl}}/>
        } else {
            if(gender == "MALE") {
                return <Image style={[ {borderRadius: 25, width: 50, height: 50}]} source={require('../../../../assert/images/man.png')}/>
            } else {
                return <Image style={[ {borderRadius: 25, width: 50, height: 50}]} source={require('../../../../assert/images/woman.png')}/>
            }
        }
    }

  renderOption = (option, isSelected) => {
    return <TouchableOpacity onPress={() => this.onSelect(option.id, option.name)} style={[ basicCompStyles.flexRowNC, basicCompStyles.defaultPadding, {marginTop: 10, backgroundColor: '#ffffff40', borderRadius: 10,  alignSelf: 'stretch'}]}>
        <View>
            {this.renderUserImage(option.photoUrl, option.gender)}
        </View>
        <View style={basicCompStyles.flexColumnCN}>
            <Text ellipsizeMode={'tail'} numberOfLines={1} style={[basicStyles.textBigSimple, {paddingLeft: 15, color: '#000000'}]}>{option.name}</Text>
            <Text ellipsizeMode={'tail'} numberOfLines={1} style={[ {paddingLeft: 15, color: '#000000'}]}>{`Age : ${getAge(option.dateOfBirth)}`}</Text>
        </View>
    </TouchableOpacity>
  }

  render() {
    const { visible, picked,  } = this.state;
    const {style, options, text} = this.props

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity style={[styles.buttonContainer, {justifyContent: 'center'}]} onPress={this.onShow}>
          <Text style={{color: '#fd6a33', fontSize: 16}}>{picked ? picked : text}</Text>
        </TouchableOpacity>
        <ModalFilterPicker
          visible={visible}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={options}
          overlayStyle={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          listContainerStyle={{
            flex: 1,
            width: width * 0.8,
            maxHeight: height * 0.7,
            backgroundColor: '#ffffff', 
            borderRadius: 10,
            marginBottom: 15
          }}
          renderOption={this.renderOption}
          modal={{transparent:true, animationType: 'slide'}}
          cancelButtonStyle={{backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10, paddingLeft: 30, paddingRight: 30, borderRadius: 10}}
          cancelButtonTextStyle={{color: '#732673B0', fontWeight: 'bold'}}
        />
      </View>
    );
  }

  onShow = () => {
    this.setState({ visible: true });
  }

  onSelect = (id, name) => {
      this.props.onSelect(id)
    this.setState({
      picked: name,
      visible: false
    })
  }

  onCancel = () => {
    this.props.onSelect(null)
    this.setState({
        picked: null,
      visible: false
    });
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center'
    },
    buttonContainer: {
        height: 40,
    },
})