import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeftIcon,
  CameraIcon,
  Cog6ToothIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
} from 'react-native-heroicons/solid';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // Navigation will be handled automatically by AppNavigator
              // due to the auth state change
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const menuItems = [
    {
      id: '1',
      title: 'Edit Profile',
      icon: <CameraIcon size={24} color="#374151" />,
    },
    {
      id: '2',
      title: 'Match',
      icon: <HeartIcon size={24} color="#374151" />,
      count: 12,
    },
    {
      id: '3',
      title: 'Messages',
      icon: <ChatBubbleLeftRightIcon size={24} color="#374151" />,
      count: 5,
    },
    {
      id: '4',
      title: 'Notifications',
      icon: <BellIcon size={24} color="#374151" />,
    },
    {
      id: '5',
      title: 'Privacy & Security',
      icon: <ShieldCheckIcon size={24} color="#374151" />,
    },
    {
      id: '6',
      title: 'Help & Support',
      icon: <QuestionMarkCircleIcon size={24} color="#374151" />,
    },
    {
      id: '7',
      title: 'Settings',
      icon: <Cog6ToothIcon size={24} color="#374151" />,
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <ArrowLeftIcon size={20} color="#374151" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Profile</Text>
        <View className="w-10" />
      </View>

      <ScrollView>
        <View className="mt-4 items-center">
          <View className="relative">
            <Image
              source={{ uri: user?.photoURL || 'https://example.com/profile.jpg' }}
              className="h-32 w-32 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 rounded-full bg-colorBlue p-2">
              <CameraIcon size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text className="mt-4 text-2xl font-bold text-gray-900">
            {user?.displayName || user?.email}
          </Text>
          <Text className="text-lg text-gray-600">{user?.location || 'Location not set'}</Text>
        </View>

        <View className="mb-6 mt-8 flex-row justify-around px-4">
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-900">128</Text>
            <Text className="text-gray-600">Matches</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-900">23</Text>
            <Text className="text-gray-600">Likes</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-900">42</Text>
            <Text className="text-gray-600">Messages</Text>
          </View>
        </View>

        <View className="space-y-2 px-4">
          {menuItems.map((item) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.title)}
              key={item.id}
              className="flex-row items-center justify-between rounded-full bg-gray-50 p-4">
              <View className="flex-row items-center space-x-4">
                {item.icon}
                <Text className="text-lg text-gray-900">{item.title}</Text>
              </View>
              {item.count && (
                <View className="rounded-full bg-colorBlue px-2 py-1">
                  <Text className="text-xs font-bold text-white">{item.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          className="mx-4 my-6 rounded-full bg-red-50 p-4"
          onPress={handleLogout}
        >
          <Text className="text-center text-lg font-semibold text-red-500">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
