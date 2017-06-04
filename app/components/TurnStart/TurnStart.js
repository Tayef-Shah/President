import React, { Component } from 'react';

import {
  View,
  Button
} from 'react-native';

import styles from '../TurnStart/styles.js'

export default class TurnStart extends Component {

  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
    this.state = {
      playerName : this.props.playerName,
      player : this.props.player,
      playerNum: this.props.playerNum

    }
  }

  navigate(name)
  {
    this.props.navigator.push({name})

    if(this.state.playerNum === 6){
      this.state.playerNum = 1
    }
    else{
      this.state.playerNum + 1
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Button
          title={this.state.playerName}
          style={styles.button}
          onPress={() => this.navigate(('gamePageStart' + this.state.playerState))}>
        </Button>
      </View>
    );
  }
}
