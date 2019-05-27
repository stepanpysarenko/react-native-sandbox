import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
//import FetchExample from './components/FetchExample';
import Roulette from './components/Roulette';
//import Touch from './components/Touch';
//import AnimatedFlick from './components/AnimatedFlick';

export default class ReactSandboxApp extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Roulette />
      </SafeAreaView>
    );
  }
}

//
// import React, { Component } from 'react';
// import { View, Animated, Easing, StyleSheet, Button } from 'react-native';
// import Svg, {G} from 'react-native-svg';
// import Slice from "./components/Slice";
//
// const AnimatedSlice = Animated.createAnimatedComponent(Slice);
// const demoData = [
//     {
//         number: 60,
//         color: '#0d2f51'
//     },
//     {
//         number: 20,
//         color: '#28BD8B'
//     },
//     {
//         number: 20,
//         color: '#F66A6A'
//     }
// ];
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
//
// export default class App extends Component<Props> {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             animValue: new Animated.Value(0.1),
//         };
//
//     }
//
//     resetPie = ()=>{
//         this.state.animValue.setValue(0.1);
//     };
//
//     animate = ()=>{
//
//         Animated.timing(
//             this.state.animValue,
//             {
//                 toValue: 2,
//                 duration: 500,
//                 easing: Easing.inOut(Easing.quad)
//             }
//         ).start(()=>{
//             setTimeout(this.resetPie, 5000);
//         });
//     };
//
//     render() {
//         let endAngle = Animated.multiply(this.state.animValue, Math.PI);
//         return (
//             <View style={styles.container}>
//                 <Svg
//                     width={200}
//                     height={200}
//                     viewBox={`-100 -100 200 200`}
//                 >
//                     <G>
//                         {
//                             demoData.map( (item, index) =>{
//                                 return (
//                                     <AnimatedSlice
//                                         index={index}
//                                         endAngle={endAngle}
//                                         color={item.color}
//                                         data={demoData}
//                                         key={'pie_shape_' + index}
//                                     />
//                                 )
//                             })
//                         }
//                     </G>
//                 </Svg>
//                 <View style={{marginTop: 20}}>
//                     <Button title={'Animate'} onPress={this.animate}/>
//                 </View>
//
//             </View>
//         );
//     }
// }
