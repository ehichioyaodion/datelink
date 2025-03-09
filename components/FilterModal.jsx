import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Switch } from 'react-native';
import Slider from '@react-native-community/slider';

import {
  XMarkIcon,
  AdjustmentsVerticalIcon,
  MapPinIcon,
  UserIcon,
  HeartIcon,
} from 'react-native-heroicons/solid';

const FilterModal = ({ isVisible, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    distance: 50,
    ageRange: [18, 35],
    showVerifiedOnly: false,
    showWithBioOnly: true,
    showWithPhotosOnly: true,
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
    setFilters((prev) => {
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

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View className="flex-1 bg-black/50">
        <View className="mt-20 flex-1 rounded-t-3xl bg-white">
          <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
            <View className="flex-row items-center space-x-2">
              <AdjustmentsVerticalIcon size={24} color="#8B5CF6" />
              <Text className="text-xl font-bold text-gray-900">Filters</Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <XMarkIcon size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-4">
            {/* Distance Filter */}
            <View className="mb-8">
              <View className="mb-4 flex-row items-center justify-between">
                <View className="flex-row items-center space-x-2">
                  <MapPinIcon size={24} color="#374151" />
                  <Text className="text-lg font-semibold text-gray-900">Maximum Distance</Text>
                </View>
                <Text className="font-semibold text-purple-600">{filters.distance} km</Text>
              </View>
              {/* <Slider
                value={filters.distance}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, distance: value }))}
                minimumValue={1}
                maximumValue={100}
                step={1}
                minimumTrackTintColor="#8B5CF6"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#8B5CF6"
              /> */}
            </View>

            {/* Age Range Filter */}
            <View className="mb-8">
              <View className="mb-4 flex-row items-center space-x-2">
                <UserIcon size={24} color="#374151" />
                <Text className="text-lg font-semibold text-gray-900">Age Range</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="font-semibold text-purple-600">
                  {filters.ageRange[0]} - {filters.ageRange[1]} years
                </Text>
              </View>
              <View className="mt-2">
                {/* <Slider
                  value={filters.ageRange}
                  onValueChange={(values) => setFilters((prev) => ({ ...prev, ageRange: values }))}
                  minimumValue={18}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#8B5CF6"
                  maximumTrackTintColor="#E5E7EB"
                  thumbTintColor="#8B5CF6"
                /> */}
              </View>
            </View>

            {/* Additional Filters */}
            <View className="mb-8 space-y-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-base text-gray-900">Show verified profiles only</Text>
                <Switch
                  value={filters.showVerifiedOnly}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, showVerifiedOnly: value }))
                  }
                  trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                  thumbColor="#ffffff"
                />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-base text-gray-900">Show profiles with bio only</Text>
                <Switch
                  value={filters.showWithBioOnly}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, showWithBioOnly: value }))
                  }
                  trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                  thumbColor="#ffffff"
                />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-base text-gray-900">Show profiles with photos only</Text>
                <Switch
                  value={filters.showWithPhotosOnly}
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      showWithPhotosOnly: value,
                    }))
                  }
                  trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>

            {/* Interests Filter */}
            <View className="mb-8">
              <View className="mb-4 flex-row items-center space-x-2">
                <HeartIcon size={24} color="#374151" />
                <Text className="text-lg font-semibold text-gray-900">Interests</Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {interests.map((interest) => (
                  <TouchableOpacity
                    key={interest}
                    onPress={() => handleInterestToggle(interest)}
                    className={`rounded-full px-4 py-2 ${
                      filters.interests.includes(interest) ? 'bg-purple-600' : 'bg-gray-100'
                    }`}>
                    <Text
                      className={`${
                        filters.interests.includes(interest) ? 'text-white' : 'text-gray-700'
                      }`}>
                      {interest}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View className="border-t border-gray-200 p-4">
            <TouchableOpacity
              className="rounded-xl bg-purple-600 py-4"
              onPress={() => {
                onApply(filters);
                onClose();
              }}>
              <Text className="text-center text-lg font-semibold text-white">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
