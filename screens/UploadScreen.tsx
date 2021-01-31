import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { Text, View, } from '../components/Themed';

export default function UploadScreen( { navigation } ) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Tab</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Button
      title="Upload"
      
      onPress={() =>
        navigation.navigate('Success', { name: 'Jane' })
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
