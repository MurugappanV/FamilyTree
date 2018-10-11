import React, { PureComponent } from 'react'
import {  View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import ModalFilterPicker from 'react-native-modal-filter-picker'


export class Picker extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      visible: false,
      picked: null,
    };
  }

  render() {
    const { visible, picked,  } = this.state;
    const {style, options} = this.props

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onShow}>
          <Text>{picked ? picked : 'Select from existing users'}</Text>
        </TouchableOpacity>
        <ModalFilterPicker
          visible={visible}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={options}
        />
      </View>
    );
  }

  onShow = () => {
    this.setState({ visible: true });
  }

  onSelect = (picked) => {
    this.setState({
      picked: picked,
      visible: false
    })
  }

  onCancel = () => {
    this.setState({
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
        height: 40
    },
})