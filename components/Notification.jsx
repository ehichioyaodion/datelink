import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon, XMarkIcon } from 'react-native-heroicons/solid';

// Create Toast Context
const ToastContext = createContext();

// Toast Types Configuration
const NOTIFICATION_TYPES = {
  success: {
    icon: CheckCircleIcon,
    bgColor: 'bg-green-500',
    textColor: 'text-green-900',
  },
  error: {
    icon: XCircleIcon,
    bgColor: 'bg-red-500',
    textColor: 'text-red-900',
  },
  warning: {
    icon: ExclamationCircleIcon,
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-900',
  },
};

// Toast Reducer
const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      console.log('Adding toast:', action.payload); // Debug log
      return [...state, { id: Date.now(), ...action.payload }];
    case 'REMOVE_TOAST':
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return state;
  }
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = useCallback((message, type = 'success') => {
    console.log('showToast called:', message, type); // Debug log
    dispatch({
      type: 'ADD_TOAST',
      payload: { message, type, duration: 4000 },
    });
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {toasts.map((toast) => (
        <NotificationComponent
          key={toast.id}
          toast={toast}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

// Notification Component
const NotificationComponent = ({ toast, onDismiss }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(-100)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 50,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      handleDismiss();
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: -100,
        tension: 50,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  const type = NOTIFICATION_TYPES[toast.type || 'success'];
  const Icon = type.icon;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }],
      }}
      className="absolute left-4 right-4 top-12 z-50 overflow-hidden rounded-lg shadow-lg"
    >
      <View className={`flex-row items-center justify-between ${type.bgColor} p-4`}>
        <View className="flex-row items-center flex-1">
          <Icon size={24} color="white" />
          <Text className="ml-3 flex-1 text-base font-medium text-white" numberOfLines={2}>
            {toast.message}
          </Text>
        </View>
        <TouchableOpacity onPress={handleDismiss} className="ml-4">
          <XMarkIcon size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// Custom Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    console.error('useToast must be used within a ToastProvider'); // Debug log
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
