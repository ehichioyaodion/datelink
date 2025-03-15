import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useAuth } from '../context/AuthContext';
// Import useNotification instead of useToast
import { useNotification } from '../hooks/useNotification';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.popToTop();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      showError('Please fill in all fields');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Please enter a valid email address');
      return false;
    }

    // Password validation
    if (password.length < 6) {
      showError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      console.log('Login attempt with:', email); // Add this log
      setLoading(true);
      await login(email, password);
      showSuccess('Welcome back! Successfully logged in.');

      // Reset navigation stack and go to TabNavigator
      navigation.reset({
        index: 0,
        routes: [{ name: 'TabNavigator' }],
      });
    } catch (error) {
      console.error('Login error details:', error); // Add this log
      // Handle specific error cases
      let errorMessage = 'An unexpected error occurred';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
        default:
          errorMessage = error.message || 'Failed to log in. Please try again';
      }

      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          className="flex-1"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="p-4">
            <TouchableOpacity
              onPress={() => navigation.popToTop()}
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
                  autoComplete="email"
                  textContentType="emailAddress"
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
                  autoComplete="password"
                  textContentType="password"
                />
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text className="text-right text-base text-colorBlue">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-8">
              <TouchableOpacity
                className={`rounded-full ${loading ? 'bg-gray-400' : 'bg-colorBlue'} py-4`}
                onPress={handleLogin}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text className="text-center text-lg font-semibold text-white">Log In</Text>
                )}
              </TouchableOpacity>
            </View>

            <View className="my-8 flex-row justify-center">
              <Text className="text-gray-600">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="font-semibold text-colorBlue">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
