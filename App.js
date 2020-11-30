import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      response: []
    }
  }

  handlerText(text) {
    var pais = text;
    this.setState({ value: pais });
  }


  handlerButton (){
    var buscar = this.state.value;
    axios.get('https://restcountries.eu/rest/v2/name/'+buscar)
    .then(res => {
      console.log(res);
      if (res.data != false) {
        this.setState({
          response: res.data[0],
          done: true
        })
      } else {
        console.log("Error");
      }
    });
  }

  render() {

    if (this.state.done !== true) {
      return (
        
        <View style={styles.container}>
          <Image resizeMode="contain" style={styles.formatoImagen} source={require('./logodata.png')}/>
          <Text style={styles.texto1}>Ingrese el país que busca: </Text>
          <Text style={styles.texto1}>En inglés por favor</Text>
          <TextInput
            style={{
              height: 40,
              width: 250,
              borderColor: 'white',
              borderWidth: 1,
              backgroundColor: '#ffebee'
            }}
            placeholder='Escriba aquí...'
            onChangeText={this.handlerText.bind(this)}
          />
          <Button
            title="Buscar"
            color="#78002e"
            onPress={this.handlerButton.bind(this)}
          />
        </View>)
    } else {
      return (
        <View style={styles.container2}>
          <Text style={styles.texto1}>Ingrese el país que busca</Text>
          <Text style={styles.texto1}>(In english please)</Text>
          <TextInput
            style={{
              height: 40,
              width: 250,
              borderColor: 'white',
              borderWidth: 1,
              color: '#ffebee',
              marginBottom: 10,
            }}
            placeholder='Escriba aquí'
            onChangeText={this.handlerText.bind(this)}
          />
          <Button title="Buscar" color="#78002e" onPress={this.handlerButton.bind(this)} />
          <Text style={{color: '#ffebee', fontSize: 20, margin: 5}}>Nombre: {this.state.response.name} </Text>
          <Text style={{color: '#ffebee', fontSize: 20, margin: 5}}>Capital: {this.state.response.capital}</Text>
          <Text style={{color: '#ffebee', fontSize: 20, margin: 5}}>Población: {this.state.response.population} habitantes</Text>
          <Text style={{color: '#ffebee', fontSize: 20, margin: 5}}>Idioma: {this.state.response.languages[0].name} habitantes</Text>
          <Text style={{color: '#ffebee', fontSize: 20, margin: 5}}>Moneda: {this.state.response.currencies[0].name}</Text>
          <Text style={{color: '#ffebee', fontSize: 20, margin: 5}}>Continente: {this.state.response.region} </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ad1457',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  texto2: {
    textAlign: 'center',
    padding: '5px'
  },
  texto1: {
    fontSize: 20,
    justifyContent: 'center',
    color: '#fce4ec',
    marginTop: 50,
    
  },
  formatoImagen: {

    flex: 0.2,
  },
  container2: {
    flex: 1,
    backgroundColor: '#ad1457',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

