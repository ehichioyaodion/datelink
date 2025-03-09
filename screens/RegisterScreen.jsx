import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <ArrowLeftIcon size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="pt-4">
          <Text className="text-center text-3xl font-bold text-gray-900">Create Account</Text>
          <Text className="mt-2 text-center text-lg text-gray-600">
            Join our community and start connecting
          </Text>
        </View>

        <View className="mt-8 space-y-4">
          <View>
            <Text className="mb-2 text-base text-gray-700">Full Name</Text>
            <TextInput
              className="rounded-xl bg-gray-100 p-4 text-gray-900"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(value) => handleChange('fullName', value)}
            />
          </View>

          <View>
            <Text className="mb-2 text-base text-gray-700">Email</Text>
            <TextInput
              className="rounded-xl bg-gray-100 p-4 text-gray-900"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="mb-2 text-base text-gray-700">Password</Text>
            <TextInput
              className="rounded-xl bg-gray-100 p-4 text-gray-900"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              secureTextEntry
            />
          </View>

          <View>
            <Text className="mb-2 text-base text-gray-700">Confirm Password</Text>
            <TextInput
              className="rounded-xl bg-gray-100 p-4 text-gray-900"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              secureTextEntry
            />
          </View>
        </View>

        <View className="mb-4 mt-8">
          <TouchableOpacity
            className="rounded-full bg-colorBlue py-4"
            onPress={() => navigation.navigate('ProfileSetup')}>
            <Text className="text-center text-lg font-semibold text-white">Create Account</Text>
          </TouchableOpacity>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="font-semibold text-colorBlue">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
