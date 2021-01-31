import * as React from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Text } from 'react-native';
import { Header } from '@react-navigation/stack';
import axios from 'axios';



import { View } from '../components/Themed';


export default function HomeScreen({ navigation }) {

  
  const [value, onChangeText] = React.useState('');

  
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
    <KeyboardAvoidingView keyboardVerticalOffset = {100} style={{flex: 1}}behavior="padding">

   
    <View style={styles.container}>
      <Text style={styles.title}> Hi, Clary Tea!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <Image source={require('../assets/images/logo.png')} />
      
      <TextInput style={styles.text} placeholder={'Code'} value={value} onChangeText={text => onChangeText(text)}></TextInput>
      <View style={styles.space} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={login}
      >
        <Text style={styles.buttonText}>Call</Text>
      </TouchableOpacity>
      
      
    </View>

    </KeyboardAvoidingView>
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
    fontFamily: 'montserrat-regular',
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  text:{
    color: 'black', 
    height: 40, 
    borderColor: '#2a7fba', 
    borderWidth: 3, 
    paddingHorizontal: 45, 
    fontSize: 24,
    fontFamily: 'montserrat-regular',
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
    fontFamily: 'montserrat-regular',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
