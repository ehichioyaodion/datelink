import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const userData = {
        displayName: formData.fullName,
        email: formData.email,
        createdAt: new Date().toISOString(),
        // Add any additional user data you want to store
        photoURL: null,
        bio: '',
        location: '',
        interests: [],
      };

      await register(formData.email, formData.password, userData);
      navigation.reset({
        index: 0,
        routes: [{ name: 'ProfileSetup' }],
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
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
              autoCapitalize="words"
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
            onPress={handleRegister}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">Create Account</Text>
            )}
          </TouchableOpacity>

          {error && <Text className="mt-4 text-center text-red-500">{error}</Text>}

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
