import * as React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

import { Text, View } from '../components/Themed';

export default function RecordScreen() {

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
      <TouchableHighlight onPressIn={startRecord} onPressOut={stopRecord}>
        <View style={styles.button}>
          <Text>{ recording ? "Release to Stop" : "Hold to Record" }</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  }
});
