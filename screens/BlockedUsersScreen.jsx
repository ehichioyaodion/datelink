import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const DUMMY_BLOCKED_USERS = [
  {
    id: '1',
    name: 'John Smith',
    image: 'https://example.com/john.jpg',
    blockedDate: '2 days ago',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    image: 'https://example.com/emma.jpg',
    blockedDate: '1 week ago',
  },
  // Add more blocked users
];

const BlockedUserItem = ({ user, onUnblock }) => {
  return (
    <View className="flex-row items-center justify-between border-b border-gray-100 p-4">
      <View className="flex-row items-center space-x-3">
        <Image source={{ uri: user.image }} className="h-12 w-12 rounded-full" />
        <View>
          <Text className="text-base font-semibold text-gray-900">{user.name}</Text>
          <Text className="text-sm text-gray-500">Blocked {user.blockedDate}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onUnblock(user.id)}
        className="rounded-xl border border-purple-600 px-4 py-2">
        <Text className="font-semibold text-purple-600">Unblock</Text>
      </TouchableOpacity>
    </View>
  );
};

const BlockedUsersScreen = () => {
  const navigation = useNavigation();

  const handleUnblock = (userId) => {
    // Handle unblocking user
    console.log('Unblock user:', userId);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center space-x-4 border-b border-gray-200 p-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <ArrowLeftIcon size={20} color="#374151" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Blocked Users</Text>
      </View>

      {DUMMY_BLOCKED_USERS.length > 0 ? (
        <ScrollView className="flex-1">
          {DUMMY_BLOCKED_USERS.map((user) => (
            <BlockedUserItem key={user.id} user={user} onUnblock={handleUnblock} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-center text-lg text-gray-600">
            You haven't blocked any users yet
          </Text>
        </View>
      )}
    </View>
  );
};

export default BlockedUsersScreen;
