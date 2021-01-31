import * as React from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { Text, View } from '../components/Themed';

export default function HomeScreen({ navigation }) {

  const [value, onChangeText] = React.useState('Useless Placeholder');

  function login() {
    axios({
      url: `https://clarityrooms.herokuapp.com/rooms/${value}`,
      method: 'get'
    }).then( (response) => {
      if(response.data.receiver) navigation.navigate('Record')
    }).catch ( (err) => {
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, Name</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image source={require('../assets/images/logo.png')} />
      <TextInput style={{color: 'white'}} value={value} onChangeText={text => onChangeText(text)}></TextInput>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={login}
      >
        <Text style={styles.buttonText}>Call</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#2a7fba",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 60
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
