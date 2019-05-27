import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';

export default class FetchExample extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.dataSource = {};
  }

  componentDidMount() {
    this.loadDataSource();
    this.pickRandomCocktaill();
  }

  loadDataSource = () => {
    // var url = 'https://raw.githubusercontent.com/teijo/iba-cocktails/master/recipes.json';
    // fetch(url)
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   this.dataSource = responseJson;
    //   this.pickRandomCocktaill();
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    this.dataSource = require('../data/cocktails.json');
  }

  pickRandomCocktaill = () => {
    var index = Math.floor(Math.random() * this.dataSource.length)
    var cocktail = this.dataSource[index];
    cocktail.category = (cocktail.category || '').toLowerCase();

    this.setState({
      isLoading: false,
      cocktail: cocktail,
    });
  }

  onPress = () => {
    this.pickRandomCocktaill();
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.container}>
          <Text style={[styles.textBig]}>{this.state.cocktail.name}</Text>
          <Text style={[styles.textMedium, styles.textMuted]}>
            {this.state.cocktail.category}
          </Text>
          <View style={styles.nestedList}>
            {this.state.cocktail.ingredients.map((item, i) =>
              <Text style={[styles.textSmall, styles.textMuted]} key={i}>{item.ingredient}</Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  textMedium: {
    fontSize: 25
  },
  textSmall: {
    fontSize: 20
  },
  textMuted: {
    color: 'gray'
  },
  nestedList: {
    paddingTop: 20,
    alignItems: 'center'
  },
});
