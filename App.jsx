import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <AppNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
