import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Fix useAuth import
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import TabNavigator from './TabNavigator';

// Import screens
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import MatchScreen from '../screens/MatchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PrivacySecurityScreen from '../screens/PrivacySecurityScreen';
import BlockedUsersScreen from '../screens/BlockedUsersScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Main App Stack
          <>
            {!user.profileCompleted ? (
              <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
            ) : (
              <>
                <Stack.Screen name="TabNavigator" component={TabNavigator} />
                <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
                <Stack.Screen name="Match" component={MatchScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
                <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
