import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  HeartIcon,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  MapPinIcon as MapPinIconSolid,
  HeartIcon as HeartIconSolid,
} from 'react-native-heroicons/solid';

import HomeScreen from '../screens/HomeScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PeopleNearbyScreen from '../screens/PeopleNearbyScreen';
import MatchesScreen from '../screens/MatchesScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#6B7280',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <HomeIconSolid color={color} size={24} />
            ) : (
              <HomeIcon color={color} size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="PeopleNearby"
        component={PeopleNearbyScreen}
        options={{
          title: 'Nearby',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <MapPinIconSolid color={color} size={24} />
            ) : (
              <MapPinIcon color={color} size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <HeartIconSolid color={color} size={24} />
            ) : (
              <HeartIcon color={color} size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <ChatBubbleLeftRightIconSolid color={color} size={24} />
            ) : (
              <ChatBubbleLeftRightIcon color={color} size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <UserIconSolid color={color} size={24} />
            ) : (
              <UserIcon color={color} size={24} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
