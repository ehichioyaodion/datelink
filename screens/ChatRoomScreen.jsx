import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
} from 'react-native-heroicons/solid';

const DUMMY_MESSAGES = [
  {
    id: '1',
    text: 'Hey there! How are you?',
    timestamp: '10:30 AM',
    sender: 'other',
  },
  {
    id: '2',
    text: "I'm doing great, thanks! How about you?",
    timestamp: '10:31 AM',
    sender: 'me',
  },
  {
    id: '3',
    text: 'Would you like to grab coffee sometime this week?',
    timestamp: '10:32 AM',
    sender: 'other',
  },
  // Add more dummy messages
];

const ChatRoomScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim().length > 0) {
      // Add message sending logic here
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white">
      <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity
            onPress={() => navigation.popToTop()}
            className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <ArrowLeftIcon size={20} color="#374151" />
          </TouchableOpacity>
          <View className="flex-row items-center space-x-3">
            <Image
              source={{ uri: 'https://example.com/sarah.jpg' }}
              className="h-10 w-10 rounded-full"
            />
            <View>
              <Text className="text-lg font-semibold text-gray-900">Sarah Johnson</Text>
              <Text className="text-sm text-gray-500">Online</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <EllipsisHorizontalIcon size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 16 }}>
        {DUMMY_MESSAGES.map((msg) => (
          <View
            key={msg.id}
            className={`flex-row ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}>
            <View
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.sender === 'me'
                  ? 'rounded-tr-none bg-purple-600'
                  : 'rounded-tl-none bg-gray-100'
              }`}>
              <Text className={`text-base ${msg.sender === 'me' ? 'text-white' : 'text-gray-900'}`}>
                {msg.text}
              </Text>
              <Text
                className={`mt-1 text-xs ${
                  msg.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                }`}>
                {msg.timestamp}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="border-t border-gray-200 p-4">
        <View className="flex-row items-center space-x-4">
          <View className="flex-1 rounded-full bg-gray-100 px-4 py-2">
            <TextInput
              className="flex-1 text-gray-900"
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
          </View>
          <TouchableOpacity
            onPress={handleSend}
            className={`h-12 w-12 items-center justify-center rounded-full ${
              message.trim().length > 0 ? 'bg-purple-600' : 'bg-gray-300'
            }`}
            disabled={message.trim().length === 0}>
            <PaperAirplaneIcon size={24} color="#ffffff" className="rotate-90" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoomScreen;
