import * as React from 'react';
import { StyleSheet, Button, Image} from 'react-native';

import { Text, View, } from '../components/Themed';

export default function SuccessScreen( { navigation } ) {
    
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/success.png')} />
      <Text style={styles.title}>Success!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Button
      title="Download"
      onPress={() =>
        navigation.navigate('Upload')
      }
      />

      <Button
      title="Try Again"
      onPress={() =>
        navigation.navigate('Upload')
      }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 200,
    height: 200,
  },

  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
