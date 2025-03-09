import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, CameraIcon } from 'react-native-heroicons/solid';

const ProfileSetupScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({
    bio: '',
    age: '',
    location: '',
    occupation: '',
    interests: [],
  });

  const interests = [
    'Music',
    'Travel',
    'Food',
    'Sports',
    'Art',
    'Reading',
    'Movies',
    'Photography',
    'Gaming',
    'Fitness',
  ];

  const handleInterestToggle = (interest) => {
    setProfileData((prev) => {
      const currentInterests = [...prev.interests];
      if (currentInterests.includes(interest)) {
        return {
          ...prev,
          interests: currentInterests.filter((i) => i !== interest),
        };
      } else {
        return {
          ...prev,
          interests: [...currentInterests, interest],
        };
      }
    });
  };

  const handleCompleteSetup = () => {
    // Reset navigation state and move to main app
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
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
        <Text className="text-3xl font-bold text-gray-900">Complete Your Profile</Text>
        <Text className="mt-2 text-lg text-gray-600">Let others know more about you</Text>

        <View className="mt-8 items-center">
          <View className="relative">
            <Image
              source={require('../assets/Default-avatar.jpeg')}
              className="h-32 w-32 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 rounded-full bg-colorBlue p-2">
              <CameraIcon size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-8 space-y-4">
          <View>
            <Text className="mb-2 text-base text-gray-700">About Me</Text>
            <TextInput
              className="rounded-xl bg-gray-100 p-4 text-gray-900"
              placeholder="Write a short bio..."
              value={profileData.bio}
              onChangeText={(value) => setProfileData((prev) => ({ ...prev, bio: value }))}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View>
            <Text className="mb-2 text-base text-gray-700">Age</Text>
            <TextInput
              className="rounded-xl bg-gray-100 p-4 text-gray-900"
              placeholder="Your age"
              value={profileData.age}
              onChangeText={(value) => setProfileData((prev) => ({ ...prev, age: value }))}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text className="mb-2 text-base text-gray-700">Location</Text>
            <TextInput
              className="rounded-xl bg-gray-100 p-4 text-gray-900"
              placeholder="Where are you based?"
              value={profileData.location}
              onChangeText={(value) => setProfileData((prev) => ({ ...prev, location: value }))}
            />
          </View>

          <View>
            <Text className="mb-2 text-base text-gray-700">Occupation</Text>
            <TextInput
              className="rounded-xl bg-gray-100 p-4 text-gray-900"
              placeholder="What do you do?"
              value={profileData.occupation}
              onChangeText={(value) => setProfileData((prev) => ({ ...prev, occupation: value }))}
            />
          </View>

          <View>
            <Text className="mb-2 text-base text-gray-700">Interests</Text>
            <View className="flex-row flex-wrap gap-2">
              {interests.map((interest) => (
                <TouchableOpacity
                  key={interest}
                  onPress={() => handleInterestToggle(interest)}
                  className={`rounded-full px-4 py-2 ${
                    profileData.interests.includes(interest) ? 'bg-colorBlue' : 'bg-gray-100'
                  }`}>
                  <Text
                    className={`${
                      profileData.interests.includes(interest) ? 'text-white' : 'text-gray-700'
                    }`}>
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View className="mb-8 mt-8">
          <TouchableOpacity
            className="rounded-full bg-colorBlue py-4"
            onPress={handleCompleteSetup}>
            <Text className="text-center text-lg font-semibold text-white">Complete Setup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSetupScreen;
