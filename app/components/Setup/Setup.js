import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Slider
} from 'react-native';

import styles from '../Setup/styles.js'

class Setup extends Component {
  constructor(){
    super()
    this.navigate = this.navigate.bind(this)
  }

  state = {
     nextPlayer: 3
   };

  navigate(name)
  {
    this.props.navigator.push({name})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Select the number of player in the game
        </Text>
        <Text> Players: {this.state.nextPlayer}</Text>
        <Slider
          style={styles.slider}
          minimumValue={3}
          maximumValue={6}
          step={1}
          onValueChange={(nextPlayer) => this.setState({nextPlayer: nextPlayer})} />
        <Button
          title="Start Game"
          onPress={() => this.navigate('turnstartPass')}
        />
      </View>
    );
  }
}

//https://stackoverflow.com/questions/36660434/how-to-create-slider-in-react-native

export default Setup
