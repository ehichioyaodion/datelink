import React from 'react';
import { View, Text } from 'react-native';
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
  // You should replace these with actual data from your state management system
  const unreadMessages = 5; // Get this from your chat context/state
  const recentMatches = 2;  // Get this from your matches context/state

  const TabBarIcon = ({ focused, color, icon: Icon, solidIcon: SolidIcon }) => {
    const IconComponent = focused ? SolidIcon : Icon;
    return <IconComponent color={color} size={24} />;
  };

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
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              icon={HomeIcon}
              solidIcon={HomeIconSolid}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PeopleNearby"
        component={PeopleNearbyScreen}
        options={{
          title: 'Nearby',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              icon={MapPinIcon}
              solidIcon={MapPinIconSolid}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View>
              <TabBarIcon
                focused={focused}
                color={color}
                icon={HeartIcon}
                solidIcon={HeartIconSolid}
              />
              {recentMatches > 0 && (
                <View className="absolute -right-3 -top-2 h-5 min-w-[20px] rounded-full bg-red-500 items-center justify-center px-1">
                  <Text className="text-xs font-bold text-white">
                    {recentMatches}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused, color }) => (
            <View>
              <TabBarIcon
                focused={focused}
                color={color}
                icon={ChatBubbleLeftRightIcon}
                solidIcon={ChatBubbleLeftRightIconSolid}
              />
              {unreadMessages > 0 && (
                <View className="absolute -right-3 -top-2 h-5 min-w-[20px] rounded-full bg-red-500 items-center justify-center px-1">
                  <Text className="text-xs font-bold text-white">
                    {unreadMessages}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              icon={UserIcon}
              solidIcon={UserIconSolid}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
