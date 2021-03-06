import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
import ImageResizer from 'react-native-image-resizer'

import ImageSwiper from '../Items/ImageSwiper.js'
import Routes from '../Settings/Routes.js'
import Styles from '../Settings/Styles.js'
import Constants from '../Settings/Constants.js'
import Fetch from '../Actions/Fetch.js'

const styles = Styles.Form

export default class Memo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: "",
      photos: props.photos,
      loading: false
    }
  }

  change(text) {
    this.setState({text: text})
  }

  submit() {
    this.setState({loading: true})
    const formData = new FormData()
    this.state.photos.map((photo, ix) => formData.append("photo" + ix, {uri: photo, name: "photo.png"}))
    formData.append("text", this.state.text)
    formData.append("user", this.props.deviceID)
    Fetch.uploadDiary("/upload", formData).then(data => this.props.navigator.popToTop())
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={15}
        pointerEvents={this.state.loading ? "none" : "auto"}>
        <View style={styles.upper}>
          <TextInput
            autoFocus={true}
            multiline={true}
            placeholder="200文字まで"
            onChangeText={this.change.bind(this)}
            maxLength={Constants.maxMemoLength}
            style={styles.textInput}/>
          <TouchableWithoutFeedback onPress={this.submit.bind(this)}>
            <View style={styles.component}><Text style={styles.text}>投稿</Text></View>
          </TouchableWithoutFeedback>
        </View>
        {this.state.loading ? (
          <ActivityIndicator
            color="white"
            animating={this.state.loading}
            style={styles.loading}
            hidesWhenStopped={true}
            size="large"/>
        ) : null}
      </KeyboardAvoidingView>
    )
  }

}
