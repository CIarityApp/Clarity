import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';

import { Text, View, } from '../components/Themed';

export default function UploadScreen( { navigation } ) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload an Audio to Clarify!</Text>
      <Image style={{width: 200, height: 200}} source={require('../assets/images/listen.png')} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.navigate('Success')
        }
      >
        <Text style={styles.buttonText}>Upload</Text>
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
    fontFamily: 'montserrat-bold',
    marginBottom: 30,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#2a7fba",
    borderRadius: 10,
    marginVertical: 30,
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
});
