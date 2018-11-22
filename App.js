import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, } from 'react-native';
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }
  //La app se inicia aquí
  componentDidMount() {
    this.initializeGame();
  }
  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    });
  }

  //Va a retornar 1 si el jugador 1 gana, -1 si el jugador 2 gana y 0 si nadie gana.
  getWinner = () => {
    const NUM_TILES = 3;
    let arr = this.state.gameState;
    let sum;

    //Se itera en filas
    for(let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if(sum == 3) {return 1; }
      else if(sum == -3) {return -1;}
    }
    //Se itera en columnas
    for(let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum == 3) {return 1; }
      else if(sum == -3) {return -1;}
    }
    //Se verifican las diagonales
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum == 3) {return 1; }
      else if(sum == -3) {return -1;}

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if(sum == 3) {return 1; }
      else if(sum == -3) {return -1;}

    //Si nadie gana
    return 0;
  } 

  onTilePress = (row, col) => {
    //Variable para que no se pueda cambiar el valor de "x" o de "o"
    let value = this.state.gameState[row][col];
    if(value !== 0) {
      return;
    }
    //Que siga igual...
    let currentPlayer = this.state.currentPlayer;

    //Establece el jugador correcto
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer; //Se llama al jugador actual
    this.setState({gameState: arr}); //Se actualiza el estado

    //Cambio de jugador
    let otherPlayer = (currentPlayer == 1) ? -1 : 1; 
    this.setState({currentPlayer: otherPlayer}); 

    //Se revisa si algún jugador ganó
    let winner = this.getWinner();
    if(winner == 1) {
      Alert.alert('El jugador 1 ganó');
      this.initializeGame();
    } else if(winner == -1) {
      Alert.alert('El jugador 2 ganó');
      this.initializeGame();
    }
  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch(value) {
      case 1: return <Icon name="football" style={styles.tileX}/>;
      case -1: return <Icon name="football-helmet" style={styles.tileO}/>;
      default: return <View />;
    }
  }

  render() {
    return (
      <View style={styles.container}>

         <Text style={{paddingBottom:30, color:'#FAFAFA', fontSize:45}}>Tic-Tac-Toe</Text>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0 }]}>
          {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, {borderTopWidth: 0 }]}>
          {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0 }]}>
          {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, {borderLeftWidth: 0 }]}>
          {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile, {} ]}>
          {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, {borderRightWidth: 0 }]}>
          {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0 }]}>
          {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, {borderBottomWidth: 0 }]}>
          {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0 }]}>
          {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{paddingTop:50}}/>
        <Button title='New Game' color="#FE642E" onPress={this.onNewGamePress} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#298A08',
    backgroundColor: '#298A08',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 5,
    borderColor: '#FFFF00',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileX: {
    color: 'brown',
    fontSize: 60,
  },
  tileO: {
    color: '#BDBDBD',
    fontSize: 50,
  },
});
