import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid';

const DUMMY_CHATS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    image: 'https://example.com/sarah.jpg',
    lastMessage: 'Hey, how are you doing?',
    timestamp: '2 min ago',
    unread: 2,
  },
  {
    id: '2',
    name: 'James Wilson',
    image: 'https://example.com/james.jpg',
    lastMessage: 'Would you like to meet for coffee?',
    timestamp: '1 hour ago',
    unread: 0,
  },
  // Add more dummy chats
];

const ChatListScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center space-x-4 p-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <ArrowLeftIcon size={20} color="#374151" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Messages</Text>
      </View>

      <View className="mb-4 px-4">
        <View className="flex-row items-center rounded-xl bg-gray-100 px-4">
          <MagnifyingGlassIcon size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 px-2 py-3 text-gray-900"
            placeholder="Search messages"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView className="flex-1">
        {DUMMY_CHATS.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() => navigation.navigate('ChatRoom', { chatId: chat.id })}
            className="flex-row items-center space-x-4 p-4">
            <Image source={{ uri: chat.image }} className="h-16 w-16 rounded-full" />
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-gray-900">{chat.name}</Text>
                <Text className="text-sm text-gray-500">{chat.timestamp}</Text>
              </View>
              <View className="mt-1 flex-row items-center justify-between">
                <Text className="mr-4 flex-1 text-gray-600" numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
                {chat.unread > 0 && (
                  <View className="h-6 w-6 items-center justify-center rounded-full bg-purple-600">
                    <Text className="text-xs font-bold text-white">{chat.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatListScreen;
