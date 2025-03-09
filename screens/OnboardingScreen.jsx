import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
        <TouchableOpacity
          className="rounded-full bg-colorBlue py-4"
          onPress={() => navigation.navigate('Auth')}>
          <Text className="text-center text-lg font-semibold text-white">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
