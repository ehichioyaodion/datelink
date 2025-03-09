import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeftIcon,
  LockClosedIcon,
  EyeIcon,
  MapPinIcon,
  BellIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from 'react-native-heroicons/solid';

const PrivacySecurityScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    profileVisibility: true,
    locationSharing: true,
    onlineStatus: true,
    readReceipts: true,
    twoFactorAuth: false,
    blockList: [],
  });

  const privacySettings = [
    {
      id: 'profileVisibility',
      title: 'Profile Visibility',
      description: 'Allow others to see your profile',
      icon: <EyeIcon size={24} color="#374151" />,
      type: 'switch',
      value: settings.profileVisibility,
    },
    {
      id: 'locationSharing',
      title: 'Location Sharing',
      description: 'Share your location with matches',
      icon: <MapPinIcon size={24} color="#374151" />,
      type: 'switch',
      value: settings.locationSharing,
    },
    {
      id: 'onlineStatus',
      title: 'Online Status',
      description: "Show when you're active",
      icon: <UserGroupIcon size={24} color="#374151" />,
      type: 'switch',
      value: settings.onlineStatus,
    },
    {
      id: 'readReceipts',
      title: 'Read Receipts',
      description: "Show when you've read messages",
      icon: <BellIcon size={24} color="#374151" />,
      type: 'switch',
      value: settings.readReceipts,
    },
    {
      id: 'twoFactorAuth',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      icon: <LockClosedIcon size={24} color="#374151" />,
      type: 'switch',
      value: settings.twoFactorAuth,
    },
  ];

  const handleSettingChange = (id, value) => {
    setSettings((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center space-x-4 border-b border-gray-200 p-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <ArrowLeftIcon size={20} color="#374151" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Privacy & Security</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="flex-row items-center space-x-3 p-4">
          <ShieldCheckIcon size={24} color="#8B5CF6" />
          <Text className="text-base text-gray-600">
            Control your privacy settings and keep your account secure
          </Text>
        </View>

        <View className="mt-4">
          {privacySettings.map((setting, index) => (
            <View
              key={setting.id}
              className={`flex-row items-center justify-between p-4 ${
                index > 0 ? 'border-t border-gray-100' : ''
              }`}>
              <View className="flex-1 flex-row items-center">
                <View className="w-10">{setting.icon}</View>
                <View className="ml-3 flex-1">
                  <Text className="text-base font-semibold text-gray-900">{setting.title}</Text>
                  <Text className="mt-1 text-sm text-gray-500">{setting.description}</Text>
                </View>
              </View>
              <Switch
                value={setting.value}
                onValueChange={(value) => handleSettingChange(setting.id, value)}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                thumbColor="#ffffff"
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          className="mx-4 mt-8 flex-row items-center justify-between rounded-xl bg-gray-50 p-4"
          onPress={() => navigation.navigate('BlockedUsers')}>
          <View className="flex-row items-center">
            <UserGroupIcon size={24} color="#374151" />
            <Text className="ml-3 text-base font-semibold text-gray-900">Blocked Users</Text>
          </View>
          <Text className="text-sm text-gray-500">{settings.blockList.length} users</Text>
        </TouchableOpacity>

        <View className="mt-8 p-4">
          <TouchableOpacity
            className="rounded-xl bg-red-500 py-4"
            onPress={() => {
              // Handle account deletion
            }}>
            <Text className="text-center text-lg font-semibold text-white">Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacySecurityScreen;
