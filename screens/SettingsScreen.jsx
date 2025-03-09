import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import Slider from '@react-native-community/slider';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: false,
    darkMode: false,
    locationServices: true,
    distanceRange: 50,
    ageRange: [18, 35],
    showOnline: true,
  });

  const settingsSections = [
    {
      title: 'Account',
      settings: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          type: 'switch',
          value: settings.notifications,
        },
        {
          id: 'emailNotifications',
          title: 'Email Notifications',
          type: 'switch',
          value: settings.emailNotifications,
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          type: 'switch',
          value: settings.darkMode,
        },
      ],
    },
    {
      title: 'Privacy',
      settings: [
        {
          id: 'locationServices',
          title: 'Location Services',
          type: 'switch',
          value: settings.locationServices,
        },
        {
          id: 'showOnline',
          title: 'Show Online Status',
          type: 'switch',
          value: settings.showOnline,
        },
      ],
    },
    {
      title: 'Discovery',
      settings: [
        {
          id: 'distanceRange',
          title: 'Maximum Distance',
          type: 'slider',
          value: settings.distanceRange,
          min: 1,
          max: 100,
          step: 1,
          unit: 'km',
        },
      ],
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
        <Text className="text-2xl font-bold text-gray-900">Settings</Text>
      </View>

      <ScrollView className="flex-1">
        {settingsSections.map((section, index) => (
          <View key={section.title} className={index > 0 ? 'mt-8' : 'mt-4'}>
            <Text className="mb-2 px-4 text-lg font-semibold text-gray-900">{section.title}</Text>
            <View className="bg-white">
              {section.settings.map((setting, settingIndex) => (
                <View
                  key={setting.id}
                  className={`flex-row items-center justify-between p-4 ${
                    settingIndex > 0 ? 'border-t border-gray-100' : ''
                  }`}>
                  <View>
                    <Text className="text-base text-gray-900">{setting.title}</Text>
                    {setting.type === 'slider' && (
                      <Text className="mt-1 text-sm text-gray-500">
                        {setting.value} {setting.unit}
                      </Text>
                    )}
                  </View>
                  {setting.type === 'switch' ? (
                    <Switch
                      value={setting.value}
                      onValueChange={(value) => handleSettingChange(setting.id, value)}
                      trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                      thumbColor="#ffffff"
                    />
                  ) : setting.type === 'slider' ? (
                    <View className="ml-4 flex-1">
                      <Slider
                        value={setting.value}
                        onValueChange={(value) => handleSettingChange(setting.id, value)}
                        minimumValue={setting.min}
                        maximumValue={setting.max}
                        step={setting.step}
                        minimumTrackTintColor="#8B5CF6"
                        maximumTrackTintColor="#D1D5DB"
                        thumbTintColor="#8B5CF6"
                      />
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View className="mt-8 p-4">
          <TouchableOpacity
            className="rounded-xl bg-red-500 py-4"
            onPress={() => navigation.navigate('Auth')}>
            <Text className="text-center text-lg font-semibold text-white">Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
