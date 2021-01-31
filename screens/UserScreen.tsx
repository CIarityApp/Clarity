import * as React from 'react';
import { StyleSheet, Image, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={require('../assets/images/doctor.png')} />
      <Text style={styles.title}>Clary Tea</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.text}>
        Personal Code:
        {'\n'}
        <Text style={{fontStyle:'italic'}}>ZYXW</Text>
        {'\n'}
        {'\n'}
        Share
  </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageStyle: {
    width: 200,
    height: 200,
    
  },

  title: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  text:{
    fontSize:20,
    borderColor: 'black', 
    borderWidth: 3,
    paddingHorizontal: 45, 
    textAlign: 'center',
    paddingVertical: 10,
  }
});
