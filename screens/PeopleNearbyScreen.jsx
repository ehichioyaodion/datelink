import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  MapPinIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/solid";

const DUMMY_NEARBY_USERS = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 25,
    distance: "2 km away",
    image: "https://example.com/sarah.jpg",
    interests: ["Travel", "Photography", "Music"],
    isOnline: true,
  },
  {
    id: "2",
    name: "James Wilson",
    age: 28,
    distance: "3 km away",
    image: "https://example.com/james.jpg",
    interests: ["Sports", "Movies", "Food"],
    isOnline: false,
  },
  // Add more users
];

const UserCard = ({ user }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile", { userId: user.id })}
      className="bg-white rounded-2xl shadow-sm overflow-hidden mr-4 w-64"
    >
      <Image
        source={{ uri: user.image }}
        className="w-full h-48"
        resizeMode="cover"
      />
      <View className="p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Text className="text-lg font-semibold text-gray-900">
              {user.name}, {user.age}
            </Text>
            {user.isOnline && (
              <View className="w-2 h-2 rounded-full bg-green-500" />
            )}
          </View>
        </View>
        <View className="flex-row items-center mt-1">
          <MapPinIcon size={16} color="#6B7280" />
          <Text className="text-gray-500 text-sm ml-1">{user.distance}</Text>
        </View>
        <View className="flex-row flex-wrap mt-2 gap-1">
          {user.interests.map((interest, index) => (
            <View key={index} className="px-2 py-1 bg-purple-100 rounded-full">
              <Text className="text-purple-600 text-xs">{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PeopleNearbyScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4 flex-row items-center justify-between bg-white">
        <Text className="text-2xl font-bold text-gray-900">People Nearby</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
        >
          <AdjustmentsVerticalIcon size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 pt-4">
        <View className="px-4">
          <Text className="text-base text-gray-600 mb-4">
            People in your area
          </Text>
          <FlatList
            data={DUMMY_NEARBY_USERS}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <UserCard user={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>

        <View className="mt-8 px-4">
          <Text className="text-base text-gray-600 mb-4">Recently Active</Text>
          <View className="flex-row flex-wrap justify-between">
            {DUMMY_NEARBY_USERS.map((user) => (
              <TouchableOpacity
                key={user.id}
                onPress={() =>
                  navigation.navigate("Profile", { userId: user.id })
                }
                className="w-[48%] bg-white rounded-xl overflow-hidden mb-4"
              >
                <Image
                  source={{ uri: user.image }}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                <View className="p-2">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base font-semibold text-gray-900">
                      {user.name}
                    </Text>
                    {user.isOnline && (
                      <View className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                  </View>
                  <Text className="text-sm text-gray-500">{user.distance}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PeopleNearbyScreen;
