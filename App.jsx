import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, Platform } from 'react-native';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {require('react-native').Platform.OS === 'web' ? (
          <div style={{ flex: 1 }}>
            <AppNavigator />
          </div>
        ) : (
          <SafeAreaView style={{ flex: 1 }}>
            <AppNavigator />
          </SafeAreaView>
        )}
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default App;
