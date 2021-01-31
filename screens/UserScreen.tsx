import * as React from 'react';
import { StyleSheet, Image, TouchableHighlight, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import { Share } from "react-native"






export default function UserScreen() {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'My Clarity Personal Code is ZYXW.',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  

  return (

    <View style={styles.container}>

      <Image style={styles.imageStyle} source={require('../assets/images/doctor.png')} />
      <Text style={styles.title}>Clary Tea</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      
        <View style={styles.textContainer}>
          <Text style={styles.text}>
          Personal Code:
          {'\n'}
          <Text style={{fontStyle:'italic'}}>ZYXW</Text>
          </Text>
          <TouchableHighlight onPress={onShare}>
            <View>
                <Image style={styles.image} source={require('../assets/images/share.png')} />
                
            </View>
          </TouchableHighlight>
          
        </View>
     

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  setImage:{
    width: 30,
    height: 30,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },

  imageStyle: {
    width: 200,
    height: 200,
    
  },

  image:{
    width: 30,
    height: 30,
  },

  textContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
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
    paddingHorizontal: 45, 
    textAlign: 'center',
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
