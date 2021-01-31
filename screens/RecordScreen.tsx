import * as React from 'react';
import { TouchableHighlight, Button, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';

import { Text, View } from '../components/Themed';




export default function RecordScreen({ navigation }) {

  const [recording, setRecording] = React.useState<Audio.Recording>()

  async function startRecord() {
    try {
      // Obtain permission and configure recording settings
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })
      // Begin recording
      console.log("Start Recording")
      const recording = new Audio.Recording()
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
      await recording.startAsync()
      setRecording(recording)
    } catch (err) {
      console.log('Failed to start recording')
      console.log(err)
    }
  }

  async function stopRecord() {
    // Stop recording
    console.log("Stop Recording")
    await recording!.stopAndUnloadAsync()
    const uri = recording!.getURI()
    const { sound } = await Audio.Sound.createAsync({
      uri: uri!
    }, { shouldPlay: true })
    setRecording(undefined)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text2} >{"Incoming"}</Text>
      <Image style={styles.gif} source={require('../assets/images/sound.gif')} />


      <TouchableHighlight onPressIn={startRecord} onPressOut={stopRecord}>
        <View style={styles.button}>
          <Image style={styles.imagestyle} source={require('../assets/images/mic-record.png')} />  
          <Text style={styles.text} >{ recording ? "Release to Stop" : "Hold to Record" }</Text>
        </View>
      </TouchableHighlight>
      <Button title="Back to Home" onPress={() => navigation.navigate("Home")}> </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  
  text2:{
    marginTop: 50,
    paddingBottom: 10,
    fontSize:24,

  },

  gif:{
    marginBottom: 30,

  },

  text: {
    paddingTop: 10,
    fontSize: 24,
  }, 

  imagestyle: {
    marginTop: 60,
    width: 250,
    height: 250,
  },

  button: {
    paddingTop: 30,
    marginBottom: 40,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
