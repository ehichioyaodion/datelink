import React, { useState } from "react";
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
  Squares2X2Icon,
  ListBulletIcon,
  ChatBubbleLeftRightIcon,
} from "react-native-heroicons/solid";

const DUMMY_MATCHES = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 25,
    image: "https://example.com/sarah.jpg",
    lastActive: "2 min ago",
    isOnline: true,
    matchDate: "Today",
  },
  {
    id: "2",
    name: "Emma Wilson",
    age: 28,
    image: "https://example.com/emma.jpg",
    lastActive: "1 hour ago",
    isOnline: false,
    matchDate: "Yesterday",
  },
  {
    id: "3",
    name: "Jessica Brown",
    age: 24,
    image: "https://example.com/jessica.jpg",
    lastActive: "3 hours ago",
    isOnline: true,
    matchDate: "Yesterday",
  },
  // Add more matches
];

const MatchesScreen = () => {
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const GridItem = ({ match }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatRoom", { matchId: match.id })}
      className="w-[48%] bg-white rounded-2xl overflow-hidden mb-4 shadow-sm"
    >
      <View className="relative">
        <Image
          source={{ uri: match.image }}
          className="w-full h-48"
          resizeMode="cover"
        />
        {match.isOnline && (
          <View className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
        )}
      </View>
      <View className="p-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-gray-900">
            {match.name}, {match.age}
          </Text>
        </View>
        <Text className="text-sm text-gray-500 mt-1">
          Matched {match.matchDate}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ListItem = ({ match }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatRoom", { matchId: match.id })}
      className="flex-row items-center bg-white p-4 mb-2 rounded-xl shadow-sm"
    >
      <View className="relative">
        <Image
          source={{ uri: match.image }}
          className="w-16 h-16 rounded-full"
        />
        {match.isOnline && (
          <View className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
        )}
      </View>
      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-gray-900">
            {match.name}, {match.age}
          </Text>
          <Text className="text-sm text-gray-500">{match.lastActive}</Text>
        </View>
        <Text className="text-sm text-gray-500 mt-1">
          Matched {match.matchDate}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">Matches</Text>
      </View>

      <View className="flex-row justify-between items-center px-4 py-2 bg-white">
        <Text className="text-base text-gray-600">
          {DUMMY_MATCHES.length} matches
        </Text>
        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid" ? "bg-purple-100" : "bg-gray-100"
            }`}
          >
            <Squares2X2Icon
              size={20}
              color={viewMode === "grid" ? "#8B5CF6" : "#6B7280"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setViewMode("list")}
            className={`p-2 rounded-lg ${
              viewMode === "list" ? "bg-purple-100" : "bg-gray-100"
            }`}
          >
            <ListBulletIcon
              size={20}
              color={viewMode === "list" ? "#8B5CF6" : "#6B7280"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === "grid" ? (
        <ScrollView className="flex-1 p-4">
          <View className="flex-row flex-wrap justify-between">
            {DUMMY_MATCHES.map((match) => (
              <GridItem key={match.id} match={match} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView className="flex-1 p-4">
          {DUMMY_MATCHES.map((match) => (
            <ListItem key={match.id} match={match} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MatchesScreen;
