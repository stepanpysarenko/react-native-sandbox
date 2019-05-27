import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Easing,
  StyleSheet,
  Dimensions,
  Button,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import Svg, {G} from 'react-native-svg';
import * as shape from 'd3-shape';
import Slice from "./RouletteSector";

const d3 = {shape};
const { width, height } = Dimensions.get('window');

const radius = width;
const outerRadius = (radius / 2) * 0.85;
const innerRadius = outerRadius * 0.2;

const demoData = [
    {
        text: 'first',
        number: 35,
        color: '#581845'
    },
    {
        text: 'second',
        number: 25,
        color: '#900c3f'
    },
    {
        text: 'third',
        number: 20,
        color: '#c70039'
    },
    {
        text: 'fourth',
        number: 10,
        color: '#ff5733'
    },
    {
        text: 'fifth',
        number: 10,
        color: '#ffc30f'
    }
];

export default class Roulette extends Component {
  constructor(props) {
    super(props);

    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
        spinValue: new Animated.Value(0),
        theta: 0,
        locationX: 0,
        locationY: 0,
    };
  }

  reset() {
    this.setState(this.getDefaultState());
  }

  componentWillMount() {
    const centerX = radius/2;
    const centerY = radius/2;

    this._initialLocationX = 0;
    this._initialLocationY = 0;

    this._getAngle = (gestureStateDx, gestureStateDy) => {
      let locationX = this._initialLocationX + gestureStateDx;
      let locationY = this._initialLocationY + gestureStateDy;
      let dx = locationX - centerX;
      let dy = locationY - centerY;
      let theta = Math.atan2(dy, dx) + 0.5*Math.PI;
      theta *= 180/Math.PI;
      return theta;
    };

    // this._spinValue = 0;
    // this.state.spinValue.addListener((value) => this._spinValue = value.value);

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._initialLocationX = e.nativeEvent.locationX;
        this._initialLocationY = e.nativeEvent.locationY;

        this._initialTheta = this.state.theta;
        // this.state.spinValue.setOffset(this.state.spinValue);
        // this.state.spinValue.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        //alert(`x:${event.nativeEvent.locationX} y:${event.nativeEvent.locationY}`);

        //alert(theta);
        let theta = this._getAngle(gestureState.dx, gestureState.dy);// - this._initialTheta;
        this.state.spinValue.setValue(theta);
        this.setState({
          theta: Math.floor(theta),
          locationX: Math.floor(this._initialLocationX + gestureState.dx),
          locationY: Math.floor(this._initialLocationY + gestureState.dy),
        });
      },
      // onPanResponderRelease: () => {
      //   this.state.spinValue.flattenOffset();
      //   Animated.spring(this.state.spinValue, {
      //     toValue: 0,
      //     bounciness: 10
      //   }).start();
      // }
    });
  }

  componentWillUnmount() {
    this.state.spinValue.removeAllListeners();
  }

  componentDidMount() {
    // Animated.loop(
    //   Animated.timing(
    //     this.state.spinValue,
    //     {
    //       toValue: 1,
    //       duration: 7000,
    //       easing: Easing.linear,
    //       useNativeDriver: true
    //     }
    //   )
    // ).start();
  }

  render() {

    const arcs = d3.shape.pie()
        .value((item) => item.number) // TODO
        .startAngle(0)
        .endAngle(2*Math.PI)
        (demoData);

    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg']
    });

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View
              {...this._panResponder.panHandlers}
            >
              <Animated.View style={{
                  width: radius,
                  height: radius,
                  transform: [ { rotate: spin }],

                }}
              >
                  <Svg
                        width={radius}
                        height={radius}
                        viewBox={`${-radius/2} ${-radius/2} ${radius} ${radius}`}
                  >
                      <G>
                          {
                              arcs.map( (arc) => {
                                  return (
                                      <Slice
                                        index={arc.index}
                                        innerRadius={innerRadius}
                                        outerRadius={outerRadius}
                                        startAngle={arc.startAngle}
                                        endAngle={arc.endAngle}
                                        padAngle={arc.padAngle}
                                        color={arc.data.color}
                                        key={arc.index}
                                        text={arc.text}
                                      />
                                  )
                              })
                          }
                      </G>
                  </Svg>
              </Animated.View>
            </View>
            <View>
                <Text>angle: {this.state.theta}</Text>
                <Text>X: {this.state.locationX}</Text>
                <Text>Y: {this.state.locationY}</Text>
                <Button
                  onPress={this.reset.bind(this)}
                  title="Reset"
                />
            </View>
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
  alignLeft: {
    textAlign: 'left'
  },
});
