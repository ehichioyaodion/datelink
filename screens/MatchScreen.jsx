import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';

const MatchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View className="flex-1 bg-colorBlue">
      <LinearGradient
        colors={['rgba(109, 40, 217, 0.9)', 'rgba(109, 40, 217, 0.6)']}
        className="flex-1 items-center justify-center px-4">
        <View className="items-center">
          <HeartIcon size={60} color="#ffffff" />
          <Text className="mt-6 text-center text-3xl font-bold text-white">It's a Match!</Text>
          <Text className="mt-2 text-center text-lg text-white/80">
            You and Sarah have liked each other
          </Text>
        </View>

        <View className="mt-12 flex-row items-center justify-center space-x-4">
          <View className="items-center">
            <Image
              source={{ uri: 'https://example.com/your-profile.jpg' }}
              className="h-32 w-32 rounded-full border-4 border-white"
            />
            <Text className="mt-2 text-lg font-semibold text-white">You</Text>
          </View>
          <View className="items-center">
            <Image
              source={{ uri: 'https://example.com/sarah.jpg' }}
              className="h-32 w-32 rounded-full border-4 border-white"
            />
            <Text className="mt-2 text-lg font-semibold text-white">Sarah</Text>
          </View>
        </View>

        <View className="mt-12 w-full space-y-4">
          <TouchableOpacity
            className="rounded-full bg-white py-4"
            onPress={() => navigation.navigate('ChatRoom', { matchId: '123' })}>
            <Text className="text-center text-lg font-semibold text-colorBlue">Send Message</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full border-2 border-white py-4"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'TabNavigator' }],
              })
            }>
            <Text className="text-center text-lg font-semibold text-white">Keep Swiping</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default MatchScreen;
