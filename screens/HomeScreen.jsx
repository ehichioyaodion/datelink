import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native';
import { HeartIcon, CheckBadgeIcon, XMarkIcon, StarIcon, ArrowLeftIcon, AdjustmentsVerticalIcon } from 'react-native-heroicons/solid';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useToast } from '../components/Notification';
import { useAuth } from '../context/AuthContext';
import { FIREBASE_DB, SUPER_LIKES_REF, USERS_REF, PROFILES_REF } from '../FirebaseConfig';
import { doc, updateDoc, arrayUnion, getDoc, setDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { width, height, SUPER_LIKES_DAILY_LIMIT } from '../constants/dimensions';
const SWIPE_THRESHOLD = width * 0.3;

const HomeScreen = () => {
  const { user, updateUserSuperLikes } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [superLikesRemaining, setSuperLikesRemaining] = useState(SUPER_LIKES_DAILY_LIMIT);
  const [lastSuperLikeDate, setLastSuperLikeDate] = useState(null);
  const { showToast } = useToast();
  const navigation = useNavigation();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const [activeFilters, setActiveFilters] = useState({
    distance: 50,
    ageRange: [18, 35],
    interestedIn: 'both',
    location: '',
  });

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
    setIsFilterVisible(false);
    
    // Filter the profiles based on the new filters
    const filteredProfiles = profiles.filter(profile => {
      const meetsDistanceCriteria = profile.distance <= newFilters.distance;
      const meetsAgeCriteria = 
        profile.age >= newFilters.ageRange[0] && 
        profile.age <= newFilters.ageRange[1];
      
      // Add more filtering logic based on your needs
      
      return meetsDistanceCriteria && meetsAgeCriteria;
    });
    
    // Update your profiles state or handling logic here
    // For now, just log the filtered profiles
    console.log('Filtered profiles:', filteredProfiles);
  };

  const nextProfile = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
    translateX.value = 0;
    translateY.value = 0;
    rotate.value = 0;
  }, []);

  const handleMatchSuccess = useCallback(() => {
    navigation.navigate('Match', {
      matchedUser: profiles[currentIndex],
    });
  }, [currentIndex, profiles, navigation]);

  const handleSwipe = useCallback(
    (direction) => {
      const isLike = direction > 0;
      translateX.value = withSpring(direction * width * 1.2, {}, (finished) => {
        if (finished) {
          runOnJS(nextProfile)();
          if (isLike && Math.random() > 0.5) {
            runOnJS(handleMatchSuccess)();
          }
        }
      });
    },
    [nextProfile, handleMatchSuccess]
  );

  const gesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotate.value = event.translationX / 20;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const direction = Math.sign(event.translationX);
        runOnJS(handleSwipe)(direction);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  // Fetch profiles based on filters
  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const userDoc = await getDoc(doc(FIREBASE_DB, USERS_REF, user.uid));
      const userData = userDoc.data();
      
      // Build query based on user preferences and filters
      let profilesQuery = query(
        collection(FIREBASE_DB, PROFILES_REF),
        where('profileCompleted', '==', true),
        where('id', '!=', user.uid)
      );

      // Add filter conditions
      if (activeFilters.interestedIn !== 'both') {
        profilesQuery = query(
          profilesQuery,
          where('gender', '==', activeFilters.interestedIn)
        );
      }

      if (activeFilters.ageRange) {
        profilesQuery = query(
          profilesQuery,
          where('age', '>=', activeFilters.ageRange[0]),
          where('age', '<=', activeFilters.ageRange[1])
        );
      }

      // Limit results for performance
      profilesQuery = query(profilesQuery, limit(50));

      const querySnapshot = await getDocs(profilesQuery);
      const fetchedProfiles = [];

      querySnapshot.forEach((doc) => {
        const profileData = doc.data();
        // Calculate distance if location data is available
        const distance = calculateDistance(
          userData.location?.coordinates,
          profileData.location?.coordinates
        );

        if (distance <= activeFilters.distance) {
          fetchedProfiles.push({
            id: doc.id,
            ...profileData,
            distance: Math.round(distance),
          });
        }
      });

      setProfiles(fetchedProfiles);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      showToast('Failed to load profiles', 'error');
    } finally {
      setLoading(false);
    }
  }, [user.uid, activeFilters]);

  // Calculate distance between two coordinates
  const calculateDistance = (coords1, coords2) => {
    if (!coords1 || !coords2) return 999; // Return large number if coordinates not available
    
    const R = 6371; // Earth's radius in km
    const lat1 = coords1.latitude * Math.PI / 180;
    const lat2 = coords2.latitude * Math.PI / 180;
    const dLat = (coords2.latitude - coords1.latitude) * Math.PI / 180;
    const dLon = (coords2.longitude - coords1.longitude) * Math.PI / 180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Fetch profiles when component mounts or filters change
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  // Load user's Super Like data
  useEffect(() => {
    const loadSuperLikeData = async () => {
      try {
        const userDoc = await getDoc(doc(FIREBASE_DB, USERS_REF, user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setSuperLikesRemaining(userData.superLikesRemaining ?? SUPER_LIKES_DAILY_LIMIT);
          setLastSuperLikeDate(userData.lastSuperLikeDate);
        }
      } catch (error) {
        console.error('Error loading super like data:', error);
        showToast('Failed to load Super Like data', 'error');
      }
    };

    loadSuperLikeData();
  }, [user.uid, showToast]);

  const checkAndResetSuperLikes = useCallback(async () => {
    const now = new Date();
    const lastDate = lastSuperLikeDate ? new Date(lastSuperLikeDate) : null;

    if (!lastDate || now.getDate() !== lastDate.getDate()) {
      const newCount = SUPER_LIKES_DAILY_LIMIT;
      setSuperLikesRemaining(newCount);
      await updateUserSuperLikes(user.uid, newCount);
      return true;
    }
    return false;
  }, [lastSuperLikeDate, user.uid, updateUserSuperLikes]);

  const handleSuperLike = useCallback(async () => {
    try {
      const wasReset = await checkAndResetSuperLikes();

      if (!wasReset && superLikesRemaining <= 0) {
        showToast('No Super Likes remaining today!', 'warning');
        return;
      }

      const currentProfile = profiles[currentIndex];

      // Create Super Like document
      const superLikeRef = doc(FIREBASE_DB, SUPER_LIKES_REF, `${user.uid}_${currentProfile.id}`);
      await setDoc(superLikeRef, {
        fromUserId: user.uid,
        toUserId: currentProfile.id,
        createdAt: new Date().toISOString(),
        matched: false,
      });

      // Update target user's received Super Likes
      const targetUserRef = doc(FIREBASE_DB, USERS_REF, currentProfile.id);
      await updateDoc(targetUserRef, {
        receivedSuperLikes: arrayUnion({
          userId: user.uid,
          timestamp: new Date().toISOString(),
        }),
      });

      // Update remaining super likes
      const newCount = superLikesRemaining - 1;
      setSuperLikesRemaining(newCount);
      await updateUserSuperLikes(user.uid, newCount);
      setLastSuperLikeDate(new Date().toISOString());

      // Special animation
      translateY.value = withSpring(-height, {}, (finished) => {
        if (finished) {
          runOnJS(nextProfile)();
          if (Math.random() > 0.2) {
            runOnJS(handleMatchSuccess)();
          }
        }
      });

      showToast(`Super Liked ${currentProfile.name}!`, 'success');
    } catch (error) {
      console.error('Super Like error:', error);
      showToast('Failed to Super Like. Please try again.', 'error');
    }
  }, [currentIndex, superLikesRemaining, checkAndResetSuperLikes, user.uid, showToast]);

  // Show loading state
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6D53F4" />
      </View>
    );
  }

  // Show empty state
  if (profiles.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-xl text-gray-600 text-center">
          No profiles found matching your criteria
        </Text>
        <TouchableOpacity
          onPress={fetchProfiles}
          className="mt-4 bg-colorBlue px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl text-gray-600">No more profiles to show</Text>
        <TouchableOpacity
          onPress={fetchProfiles}
          className="mt-4 bg-colorBlue px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">Find More</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const profile = profiles[currentIndex];

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-2xl font-bold text-gray-900">Discover</Text>
        <TouchableOpacity
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <AdjustmentsVerticalIcon size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center">
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[rStyle]}
            className="absolute md:w-[400px] w-[90%] h-[75%] rounded-3xl bg-white shadow-xl">
            <View className="relative h-full w-full overflow-hidden rounded-3xl">
              <Image 
                source={{ uri: profile.image }} 
                className="absolute h-full w-full" 
                resizeMode="cover" 
              />
              
              {/* Distance Indicator */}
              <View className="absolute left-4 top-4 rounded-full bg-white/20 px-4 py-1.5">
                <Text className="text-base font-semibold text-white">
                  {profile.distance} km away
                </Text>
              </View>

              {/* Profile Information Gradient Overlay */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                className="absolute bottom-0 h-48 w-full p-6">
                <View className="flex-row items-center space-x-2">
                  <Text className="text-2xl font-bold text-white">{profile.name}</Text>
                  <Text className="text-2xl text-white">{profile.age}</Text>
                  {profile.verified && <CheckBadgeIcon size={24} color="#60A5FA" />}
                </View>

                <Text className="mt-1 text-white">{profile.location}</Text>

                <View className="mt-3 flex-row flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <View key={index} className="rounded-full bg-white/20 px-3 py-1">
                      <Text className="text-sm text-white">{interest}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>

      <View className="absolute bottom-8 left-0 right-0 mx-8 flex-row items-center justify-evenly">
        <TouchableOpacity
          onPress={() => handleSwipe(-1)}
          className="h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
          <XMarkIcon size={30} color="#F87171" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSwipe(1)}
          className="h-16 w-16 items-center justify-center rounded-full bg-purple-600 shadow-lg">
          <HeartIcon size={30} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSuperLike}
          className="h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg"
          disabled={superLikesRemaining <= 0}>
          <View className="relative">
            <StarIcon size={30} color={superLikesRemaining > 0 ? '#FBBF24' : '#CBD5E1'} />
            {superLikesRemaining > 0 && (
              <View className="absolute -right-2 -top-2 h-4 w-4 items-center justify-center rounded-full bg-purple-600">
                <Text className="text-xs font-bold text-white">{superLikesRemaining}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
