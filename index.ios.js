import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View
} from 'react-native';

import Splash from './app/components/Splash/Splash'
import Game from './app/components/Game/Game.js'
import Setup from './app/components/Setup/Setup.js'
import TurnStart from './app/components/TurnStart/TurnStart.js'
import Player from './app/components/Player/Player.js'
import Card from './app/components/Card/Card.js'

export default class President extends Component {
  constructor(props){
    super(props)
    this.renderScene = this.renderScene.bind(this)
    /*An 2d array of values that represents the deck
      Each array is a card
      1st number is card value
      2nd number is card index
    */
    var cards = [
      [12, 0],[12, 1],[12, 2],[12, 3],
      [13, 4],[13, 5],[13, 6],[13, 7],
      [1, 8],[1, 9],[1, 10],[1, 11],
      [2, 12],[2, 13],[2, 14],[2, 15],
      [3, 16],[3, 17],[3, 18],[3, 19],
      [4, 20],[4, 21],[4, 22],[4, 23],
      [5, 24],[5, 25],[5, 26],[5, 27],
      [6, 28],[6, 29],[6, 30],[6, 31],
      [7, 32],[7, 33],[7, 34],[7, 35],
      [8, 36],[8, 37],[8, 38],[8, 39],
      [9, 40],[9, 41],[9, 42],[9, 43],
      [10, 44],[10, 45],[10, 46],[10, 47],
      [11, 48],[11, 49],[11, 50],[11, 51],
      [14, 52],[14, 53]
    ]
    cards.sort(function(a, b){return 0.5 - Math.random()});

    this.state = {

      /*
      p1Hand: [],
      p2Hand: [],
      p3Hand: [],
      p4Hand: [],
      players : [
        <Player hand={this.state.p1Hand} name="Player1"/>,
        <Player hand={this.state.p2Hand} name="Player2"/>,
        <Player hand={this.state.p3Hand} name="Player3"/>,
        <Player hand={this.state.p4Hand} name="Player4"/>
      ],*/
      playerNames : ["Player 1","Player 2","Player 3","Player 4","Player 5","Player 6"],
      currentPlayerNum: 1,

      lastPlayedCards : [
        [6,1]
      ],
      remainingPlayers : [1,2,3,4,5,6],

      inGamePlayers : [1,2,3,4,5,6],
      gameEnd : false,

      hands: [
        cards.splice(0,9),
        cards.splice(0,9),
        cards.splice(0,9),
        cards.splice(0,9),
        cards.splice(0,9),
        cards.splice(0,9)
      ]
    }
  }

  startGame() {
      this.state.deck.sort(function(a, b){return 0.5 - Math.random()});

      for(let j = 0; j < 13; j++) {
        this.state.p1Hand.push(this.state.deck[j])
      }
      for(let j = 0; j < 13; j++) {
        this.state.p2Hand.push(this.state.deck[j+13])
      }
      for(let j = 0; j < 13; j++) {
        this.state.p3Hand.push(this.state.deck[j+26])
      }
      for(let j = 0; j < 13; j++) {
        this.state.p4Hand.push(this.state.deck[j+39])
      }
  }

  getHand(array) {
    var newArray = [];
    var sortedArray = this.sort(array);
    var lowestOverlap = sortedArray.length/2 * -1;
    for(var i = 0; i < sortedArray.length; i++) {
      var selected = false;
      //Checking selected
      if(sortedArray[i][0] >= this.state.lastPlayedCards[0][0]) {
        selected = true
      }
      newArray.push(
        <Card value={sortedArray[i][0]}
              imageIndex={sortedArray[i][1]}
              overlap={lowestOverlap+i}
              selected={selected}
              onPress={()=> {this.state.lastPlayedCards.push(sortedArray[i])}}
        />)
    }
    return newArray
  }
//recursive method to break down the array
//returns sorted array
  sort(array) {
    var length = array.length,
        mid    = Math.floor(length * 0.5),
        left   = array.slice(0, mid),
        right  = array.slice(mid, length);
    if(length === 1) {return array;}

    return this.merge(this.sort(left), this.sort(right));
  }
  //returns array that is merged of the other two arrays
  merge(left, right) {
    var result = [];

    while(left.length || right.length) {

      if(left.length && right.length) {
        if(left[0][0] < right[0][0]) {
          result.push(left.shift());
        }
        else {
          result.push(right.shift());
        }
      }
      else if (left.length) {
        result.push(left.shift());
      }
      else {
        result.push(right.shift());
      }
    }
    return result;
  }


  getActivePlayer() {
    return this.state.activePlayer;
  }
  getLastPlayed() {
    //Since its returning the last element in the 2d array, the returned value is a 1d array
    return this.state.lastPlayedCards[this.state.lastPlayedCards.length() - 1];
  }
  getNextPlayer() {
    if(this.state.currentPlayerNum > 5){
      this.setState({currentPlayerNum: 1})
    }
    else{
      this.state.currentPlayerNum = this.state.currentPlayerNum + 1
    }
  }
  renderScene(route, navigator)
  {
    switch(route.name) {
      case 'splashPage':
        return <Splash navigator={navigator} />
      case 'setupPage':
        return <Setup navigator={navigator} />
      case 'gamePageStart':
        return <Game navigator={navigator} player={this.getHand(this.state.hands[this.state.currentPlayerNum - 1])}
                     eventIndex={1}
                />
      case 'gamePageContinue':
        return <Game navigator={navigator} player={this.getHand(this.state.hands[this.state.currentPlayerNum - 1])}
                     eventIndex={0}
                />
      case 'gamePagePass':
        return <Game navigator={navigator} player={this.getHand(this.state.hands[this.state.currentPlayerNum - 1])}
                     lastPlayedCards={()=> {this.getLastPlayed()}} //Its returning the last element in the 2d array, which is just a 1d array
                     eventIndex={0}/>
        return <TurnStart navigator={navigator} playerName={this.state.playerNames[this.state.currentPlayerNum - 1] + "  Start"} playerState='Start' />
      case 'turnstartContinue':

        return <TurnStart navigator={navigator} playerName={this.state.playerNames[this.state.currentPlayerNum - 1] + "  Start"} playerState='Continue' />
      case 'turnstartPass':
        this.getNextPlayer()
        return <TurnStart navigator={navigator} playerName={this.state.playerNames[this.state.currentPlayerNum - 1] + "  Start"} playerState='Pass' />
      default:
        break;
    }
  }
  render() {

    return (
      <Navigator
        initialRoute={{name:'splashPage'}}
        renderScene = {this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        />
    );
  }
}

AppRegistry.registerComponent('President', () => President);
