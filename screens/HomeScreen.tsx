import * as React from 'react';
import { StyleSheet, Button, TextInput } from 'react-native';
import axios from 'axios';

import { Text, View } from '../components/Themed';

export default function HomeScreen({ navigation }) {

  const [value, onChangeText] = React.useState('Useless Placeholder');

  function login() {
    console.log('asdf')
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
      <Text>Enter Code</Text>
      <TextInput style={{ color: 'white', height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => onChangeText(text)} value={value}></TextInput>
      <Button title="Dial In" onPress={login}></Button>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
