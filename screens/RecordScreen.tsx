import * as React from 'react';
import { TouchableHighlight, Button, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import * as firebase from 'firebase';

import { Text, View } from '../components/Themed';

export default function RecordScreen({ navigation }) {

  const [recording, setRecording] = React.useState<Audio.Recording>()
  const [sound, setSound] = React.useState<Boolean>()
  let incoming = false

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

    let formData = new FormData()
    let file = {
      uri: uri,
      name: 'mixed.caf',
      type: 'audio/caf',
    }
    formData.append('file', file)

    axios({
      url: "https://clarityaudio.herokuapp.com/upload",
      method: "post",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    }).then( async (response) => {
      console.log('Request thru')
      console.log(response.data)
      initSoundListener(response.data.name)
    }).catch( (err) => {
      console.log(err)
    })

    setRecording(undefined)
  }

  function initSoundListener(soundId) {
    firebase.database().ref('files/' + soundId).on('value', async (snapshot) => {
      setSound(true)
      const { sound } = await Audio.Sound.createAsync({
        uri: await firebase.storage().refFromURL('gs://clarity-81765.appspot.com/' + snapshot.val().next).getDownloadURL()
      })
      sound.setOnPlaybackStatusUpdate( (status) => {
        if(status.didJustFinish === true) {
          setSound(false)
        }
      })
      await sound.playAsync()
    })
  }

  return (
    <View style={styles.container}>
      {sound ? (<View><Text style={styles.text2} >{"Incoming"}</Text><Image style={styles.gif} source={require('../assets/images/sound.gif')} />
      </View>) : null}


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
    fontFamily: 'montserrat-bold',
    textAlign: 'center'
  },

  gif:{
    marginBottom: 30,
    width: 150,
    height: 125
  },

  text: {
    paddingTop: 10,
    fontSize: 20,
    fontFamily: 'montserrat-regular',
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
    alignItems: 'center'
  }
});
