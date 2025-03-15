import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, Platform, View } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Notification';

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {Platform.OS === 'web' ? (
            <View className="min-h-screen max-w-screen-xl mx-auto bg-white">
              <View className="flex-1 w-full max-w-md mx-auto">
                <AppNavigator />
              </View>
            </View>
          ) : (
            <SafeAreaView style={{ flex: 1 }}>
              <AppNavigator />
            </SafeAreaView>
          )}
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
