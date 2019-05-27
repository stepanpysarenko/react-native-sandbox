import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

export default class Touch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      X: 0,
      Y: 0,
    };
  }

  // handlePress(){
  //   alert('press');
  // }

  handleLongPress(){
    alert('longPress');
  }

  handlePress(evt){
    this.setState({
      X: evt.nativeEvent.locationX,
      Y: evt.nativeEvent.locationY,
    });
  }

  handleMove(e){
      alert(JSON.stringify(e));
  }

  onStartShouldSetResponder(e) {
    return true;
  }

  onMoveShouldSetResponder(e) {
    return true;
  }

  onResponderMove(e) {
    var evt = e.nativeEvent;
    this.setState({
      X: evt.locationX,
      Y: evt.locationY,
    });
  }

  render() {
    return (
          <View
            style={styles.container}
            onStartShouldSetResponder={this.onStartShouldSetResponder}
            onMoveShouldSetResponder={this.onMoveShouldSetResponder}
            onResponderMove={e => this.onResponderMove(e)}>
          >
            <Text style={styles.textBig}>
              {`X: ${this.state.X}\nY: ${this.state.Y}`}
            </Text>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBig: {
    fontSize: 30
  },
});
