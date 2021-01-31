import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as firebase from 'firebase';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const firebaseConfig = {
  apiKey: "AIzaSyB0iWBPIONesIUF1V0-8pA0DPfSakZUujM",
  authDomain: "clarity-81765.firebaseapp.com",
  databaseURL: "https://clarity-81765-default-rtdb.firebaseio.com",
  projectId: "clarity-81765",
  storageBucket: "clarity-81765.appspot.com",
  messagingSenderId: "938668156310",
  appId: "1:938668156310:web:635c922c832e0d84d3e9b7",
  measurementId: "G-5YJVP90BGC"
}
firebase.initializeApp(firebaseConfig)

const fetchFonts = () => {
  return Font.loadAsync({
  'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf'),
  'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf')
  });
  };



export default function App() {
  
  const [dataLoaded, setDataLoaded] = useState(false);  
  
  
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!dataLoaded) {
    return(
      <AppLoading
        startAsync = {fetchFonts}
        onFinish = {() => setDataLoaded(true)} 
        onError={console.warn}
      />
    );
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
      
    );
  }
}
