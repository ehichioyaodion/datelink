import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1);
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    }, 5000);
    return () => clearTimeout(timer);
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
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
