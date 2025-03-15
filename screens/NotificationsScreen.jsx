import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig';
import { useAuth } from '../context/AuthContext';

const NotificationItem = ({ notification }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    switch (notification.type) {
      case 'match':
        navigation.navigate('ChatRoom', { matchId: notification.id });
        break;
      case 'like':
        navigation.navigate('Profile', { userId: notification.id });
        break;
      case 'message':
        navigation.navigate('ChatRoom', { chatId: notification.id });
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`flex-row items-center p-4 ${notification.read ? 'bg-white' : 'bg-purple-50'}`}>
      <Image source={{ uri: notification.image }} className="h-12 w-12 rounded-full" />
      <View className="ml-4 flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-gray-900">{notification.title}</Text>
          <Text className="text-sm text-gray-500">{notification.timestamp}</Text>
        </View>
        <Text className="mt-1 text-gray-600" numberOfLines={2}>
          {notification.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const notificationsQuery = query(
      collection(FIREBASE_DB, 'notifications'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notificationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setNotifications(notificationsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <ArrowLeftIcon size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Notifications</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-base font-semibold text-purple-600">Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
