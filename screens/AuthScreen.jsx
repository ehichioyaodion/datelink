import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4">
        <Image
          source={require('../assets/auth-hero.png')}
          className="h-60 w-60"
          resizeMode="contain"
        />

        <Text className="mx-4 text-center text-3xl font-bold text-colorBlack">
          Find Your Perfect Match
        </Text>
        <Text className="mx-4 px-6 text-center text-lg text-gray-600">
          Join our community and start connecting with amazing people
        </Text>
      </View>

      <View className="px-4 pb-8">
        <TouchableOpacity
          className="my-2 rounded-full bg-colorBlue py-4"
          onPress={() => navigation.navigate('Login')}>
          <Text className="text-center text-lg font-semibold text-white">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="my-2 rounded-full border-2 border-colorBlue bg-white py-4"
          onPress={() => navigation.navigate('Register')}>
          <Text className="text-center text-lg font-semibold text-colorBlue">Create Account</Text>
        </TouchableOpacity>

        <View className="my-4 flex-row items-center">
          <View className="h-[1px] flex-1 bg-gray-300" />
          <Text className="mx-4 text-gray-500">or continue with</Text>
          <View className="h-[1px] flex-1 bg-gray-300" />
        </View>

        <View className="flex-row justify-center space-x-6">
          <TouchableOpacity className="m-2 rounded-full bg-gray-100 p-4">
            <Image source={require('../assets/google.png')} className="h-6 w-6" />
          </TouchableOpacity>
          <TouchableOpacity className="m-2 rounded-full bg-gray-100 p-4">
            <Image source={require('../assets/apple.png')} className="h-6 w-6" />
          </TouchableOpacity>
          <TouchableOpacity className="m-2 rounded-full bg-gray-100 p-4">
            <Image source={require('../assets/facebook.png')} className="h-6 w-6" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;
