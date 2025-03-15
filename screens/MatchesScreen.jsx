import React, { useState, useEffect } from "react";
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
import { collection, query, where, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB, MATCHES_REF, USERS_REF } from '../FirebaseConfig';
import { useAuth } from '../context/AuthContext';

const MatchesScreen = () => {
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const matchesQuery = query(
      collection(FIREBASE_DB, MATCHES_REF),
      where('users', 'array-contains', user.uid)
    );

    const unsubscribe = onSnapshot(matchesQuery, async (snapshot) => {
      const matchesData = [];
      
      for (const doc of snapshot.docs) {
        const matchData = doc.data();
        const otherUserId = matchData.users.find(id => id !== user.uid);
        
        // Get other user's profile data
        const userDoc = await getDoc(doc(FIREBASE_DB, USERS_REF, otherUserId));
        const userData = userDoc.data();

        matchesData.push({
          id: doc.id,
          ...matchData,
          name: userData.name,
          age: userData.age,
          image: userData.photoURL,
          lastActive: userData.lastActive || null,
          isOnline: userData.isOnline || false,
          matchDate: matchData.createdAt,
        });
      }

      setMatches(matchesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const GridItem = ({ match }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatRoom", { matchId: match.id })}
      className="w-full md:w-[48%] lg:w-[31%] bg-white rounded-2xl overflow-hidden mb-4 shadow-sm"
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
    <View className="flex-1 bg-white md:bg-gray-50">
      <View className="px-4 py-3 flex-row items-center justify-between bg-white">
        <Text className="text-2xl font-bold text-gray-900">Matches</Text>
      </View>

      <View className="flex-row justify-between items-center px-4 py-2 bg-white">
        <Text className="text-base text-gray-600">
          {matches.length} matches
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
        <ScrollView className="flex-1 md:px-4">
          <View className="flex-row flex-wrap justify-between p-4">
            {matches.map((match) => (
              <GridItem key={match.id} match={match} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView className="flex-1 md:px-4">
          <View className="p-4 space-y-2">
            {matches.map((match) => (
              <ListItem key={match.id} match={match} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MatchesScreen;
