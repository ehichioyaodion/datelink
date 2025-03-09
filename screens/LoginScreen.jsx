import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
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

      <View className="flex-1 px-4 pt-8">
        <Text className="text-center text-3xl font-bold text-gray-900">Welcome Back!</Text>
        <Text className="mt-2 text-center text-lg text-gray-600">Sign in to continue</Text>

        <View className="mt-8 space-y-4">
          <View>
            <Text className="mb-2 text-base text-gray-700">Email</Text>
            <TextInput
              className="rounded-xl bg-gray-100 p-4 text-gray-900"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="mb-2 text-base text-gray-700">Password</Text>
            <TextInput
              className="rounded-xl bg-gray-100 p-4 text-gray-900"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity>
            <Text className="text-right text-base text-colorBlue">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <TouchableOpacity 
            className="rounded-full bg-colorBlue py-4" 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">
                Log In
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {error && (
          <Text className="mt-4 text-center text-red-500">{error}</Text>
        )}

        <View className="mt-8 flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="font-semibold text-colorBlue">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
