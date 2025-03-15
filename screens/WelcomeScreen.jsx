import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { attemptAutoLogin } = useAuth();
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1);

    const checkAuthAndNavigate = async () => {
      try {
        // Wait for animation to complete (minimum 3 seconds)
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for animation to complete (minimum 3 seconds)
        // Check if user has a valid session
        const isAutoLoginSuccessful = await attemptAutoLogin();

        if (isAutoLoginSuccessful) {
          // User has valid session, navigate to TabNavigator
          navigation.reset({
            index: 0,
            routes: [{ name: 'TabNavigator' }],
          });
        } else {
          // No valid session, navigate to Onboarding
          navigation.reset({
            index: 0,
            routes: [{ name: 'Onboarding' }],
          });
        }
      } catch (error) {
        // console.error('Auto login check failed:', error);
        // On error, navigate to Onboarding
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding' }],
        });
      }
    };

    checkAuthAndNavigate();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="flex-1 items-center justify-center bg-colorBlue">
      <Animated.View style={animatedStyle}>
        <View className="items-center">
          <Image source={require('../assets/DATELINK_ICON.png')} className="h-32 w-32" />
          <Text className="mt-4 text-3xl font-bold text-white">DateLink</Text>
          <Text className="mt-2 text-center text-white">
            Connecting people, one match at a time
          </Text>
          <ActivityIndicator size="large" color="#ffffff" className="mt-4" />
        </View>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
