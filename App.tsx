import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
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

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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
