import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assets/onboarding1.jpeg'),
    title: 'Find Your Perfect Match',
    description: 'Connect with people who share your interests and values',
  },
  {
    id: '2',
    image: require('../assets/onboarding2.jpeg'),
    title: 'Safe and Secure',
    description: 'Your privacy and security are our top priority',
  },
  {
    id: '3',
    image: require('../assets/onboarding3.jpeg'),
    title: 'Start Your Journey',
    description: 'Begin your journey to find meaningful connections',
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const slidesRef = useRef(null);

  const requestPermissions = async () => {
    try {
      // Request camera and photo library permissions
      const imagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

      // Request location permission
      const locationPermission = await Location.requestForegroundPermissionsAsync();

      // Request contacts permission
      const contactsPermission = await Contacts.requestPermissionsAsync();

      // Check if any permission was denied
      const deniedPermissions = [];

      if (!imagePermission.granted) deniedPermissions.push('photo library');
      if (!cameraPermission.granted) deniedPermissions.push('camera');
      if (!locationPermission.granted) deniedPermissions.push('location');
      if (!contactsPermission.granted) deniedPermissions.push('contacts');

      if (deniedPermissions.length > 0) {
        Alert.alert(
          'Permissions Required',
          `DateLink needs access to your ${deniedPermissions.join(', ')} to provide you with the best experience. Please enable these permissions in your device settings.`,
          [
            {
              text: 'Open Settings',
              onPress: () =>
                Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings(),
            },
            {
              text: 'Continue Anyway',
              onPress: () => navigation.navigate('Auth'),
              style: 'cancel',
            },
          ]
        );
      } else {
        // All permissions granted, proceed to Auth screen
        navigation.navigate('Auth');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      // Proceed to Auth screen even if there's an error
      navigation.navigate('Auth');
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View className="w-screen items-center p-2">
        <Image source={item.image} className="h-80 w-80 rounded-xl" resizeMode="cover" />
        <Text className="mt-8 text-center text-2xl font-bold text-gray-800">{item.title}</Text>
        <Text className="mt-4 px-6 text-center text-lg text-gray-600">{item.description}</Text>
      </View>
    );
  };

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View className="mb-8 flex-row justify-center space-x-2">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`mr-1 h-2 rounded-full ${
              index === currentIndex ? 'w-5 bg-colorBlue' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </View>

      <View className="mb-8 px-4">
        <TouchableOpacity className="rounded-full bg-colorBlue py-4" onPress={requestPermissions}>
          <Text className="text-center text-lg font-semibold text-white">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
