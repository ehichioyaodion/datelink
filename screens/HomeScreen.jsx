import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { HeartIcon, CheckBadgeIcon, XMarkIcon, StarIcon } from 'react-native-heroicons/solid';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.6;

const DUMMY_PROFILES = [
  {
    id: '1',
    name: 'Emily Turner',
    age: 25,
    location: 'New York, USA',
    bio: 'Adventure seeker and coffee lover',
    image: 'https://example.com/sarah.jpg',
    interests: ['Travel', 'Coffee', 'Photography'],
    distance: 5,
    verified: true,
  },
  {
    id: '2',
    name: 'James',
    age: 28,
    location: 'London, UK',
    bio: 'Photographer and traveler',
    image: 'https://example.com/james.jpg',
    interests: ['Photography', 'Travel', 'Art'],
    distance: 12,
    verified: false,
  },
  {
    id: '3',
    name: 'Sandra',
    age: 30,
    location: 'London, UK',
    bio: 'Photographer and traveler',
    image: 'https://example.com/james.jpg',
    interests: ['Photography', 'Travel', 'Art', 'Music', 'Food'],
    distance: 10,
    verified: true,
  },
  {
    id: '4',
    name: 'James',
    age: 28,
    location: 'London, UK',
    bio: 'Photographer and traveler',
    image: 'https://example.com/james.jpg',
    interests: ['Photography', 'Travel', 'Art'],
    distance: 12,
    verified: false,
  },
  {
    id: '5',
    name: 'James',
    age: 28,
    location: 'London, UK',
    bio: 'Photographer and traveler',
    image: 'https://example.com/james.jpg',
    interests: ['Photography', 'Travel', 'Art'],
    distance: 12,
    verified: false,
  },
  {
    id: '6',
    name: 'James',
    age: 28,
    location: 'London, UK',
    bio: 'Photographer and traveler',
    image: 'https://example.com/james.jpg',
    interests: ['Photography', 'Travel', 'Art'],
    distance: 12,
    verified: false,
  },
  {
    id: '7',
    name: 'James',
    age: 28,
    location: 'London, UK',
    bio: 'Photographer and traveler',
    image: 'https://example.com/james.jpg',
    interests: ['Photography', 'Travel', 'Art'],
    distance: 12,
    verified: false,
  },
  {
    id: '8',
    name: 'James',
    age: 28,
    location: 'London, UK',
    bio: 'Photographer and traveler',
    image: 'https://example.com/james.jpg',
    interests: ['Photography', 'Travel', 'Art'],
    distance: 12,
    verified: false,
  },
  {
    id: '9',
    name: 'James Matthew',
    age: 22,
    location: 'London, England',
    bio: 'Photographer and traveler',
    image: 'https://example.com/james.jpg',
    interests: ['Photography', 'Travel', 'Art', 'Music', 'Food', 'Sports', 'Gaming'],
    distance: 1,
    verified: true,
  },
  // Add more dummy profiles
];

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  const nextProfile = () => {
    setCurrentIndex((prev) => prev + 1);
    translateX.value = 0;
    translateY.value = 0;
    rotate.value = 0;
    scale.value = 1;
  };

  const handleSwipe = (direction) => {
    // Scale down slightly when swiping
    scale.value = withTiming(0.95, { duration: 100 });

    // Animate translation and rotation
    translateX.value = withSpring(direction * width * 1.5, {
      velocity: 1000,
      damping: 15,
    });
    rotate.value = withSpring(direction * 30, {
      velocity: 1000,
      damping: 15,
    });

    // Add a small vertical movement
    translateY.value = withSpring(-50, {
      damping: 15,
    });

    // Wait for animation to complete before moving to next profile
    setTimeout(() => {
      runOnJS(nextProfile)();
    }, 500);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotate.value = (event.translationX / width) * 30;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > width * 0.4) {
        translateX.value = withSpring(Math.sign(event.translationX) * width * 1.5);
        translateY.value = withSpring(event.translationY);
        runOnJS(nextProfile)();
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  const currentProfile = DUMMY_PROFILES[currentIndex];

  if (!currentProfile) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-center text-2xl font-bold text-gray-900">
          No more profiles to show
        </Text>
        <Text className="mt-2 text-center text-gray-600">Check back later for more matches</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-2xl font-bold text-gray-900">Discover</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[rStyle]} className="absolute h-full w-[95%]">
            <View className="h-full w-full overflow-hidden rounded-3xl shadow-lg">
              <Image
                source={require('../assets/EmilyTurner.jpg')}
                className="h-full w-full"
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                className="absolute bottom-0 left-0 right-0 h-[40%] justify-end p-6">
                <View className="space-y-2">
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-2xl font-bold text-white">
                      {currentProfile.name}, {currentProfile.age}
                    </Text>
                    {currentProfile.verified && (
                      <View className="ml-1 rounded-full bg-white">
                        <CheckBadgeIcon size={24} color="#6D53F4" />
                      </View>
                    )}
                  </View>
                  <Text className="text-base text-white opacity-90">
                    {currentProfile.location} • {currentProfile.distance}km away
                  </Text>
                  <Text className="text-sm text-white opacity-80">{currentProfile.bio}</Text>
                  <View className="mt-2 flex-row flex-wrap gap-2">
                    {currentProfile.interests.map((interest, index) => (
                      <View key={index} className="rounded-full bg-colorGray px-3 py-1">
                        <Text className="text-sm text-white">{interest}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>

      <View className="absolute bottom-2 left-0 right-0 mx-8 flex-row items-center justify-evenly p-1">
        <TouchableOpacity
          onPress={() => {
            handleSwipe(-1);
          }}
          className="h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
          <XMarkIcon size={30} color="#F87171" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleSwipe(1);
          }}
          className="h-16 w-16 items-center justify-center rounded-full bg-purple-600 shadow-lg">
          <HeartIcon size={30} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity className="h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
          <StarIcon size={30} color="#FBBF24" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
