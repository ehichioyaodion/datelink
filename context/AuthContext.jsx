import React, { createContext, useState, useContext, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB, USERS_REF } from '../FirebaseConfig';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const SUPER_LIKES_DAILY_LIMIT = 5;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Store user session
  const storeUserSession = async (user, token) => {
    try {
      const sessionData = {
        token,
        lastLoginTime: new Date().toISOString(),
        userId: user.uid,
      };
      await AsyncStorage.setItem('@user_session', JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error storing session:', error);
    }
  };

  // Login with email/password
  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', email); // Add this log
      setError(null);
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log('Login response:', response); // Add this log
      
      const token = await response.user.getIdToken();
      await storeUserSession(response.user, token);
      
      const userDoc = await getDoc(doc(FIREBASE_DB, 'users', response.user.uid));
      if (userDoc.exists()) {
        setUser({ ...response.user, ...userDoc.data() });
      } else {
        setUser(response.user);
      }
    } catch (error) {
      console.error('Login error:', error); // Add this log
      setError(error.message);
      throw error;
    }
  };

  // Register with email/password
  const register = async (email, password, userData) => {
    try {
      console.log('Attempting registration with:', email); // Add this log
      setError(null);
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log('Registration response:', response); // Add this log
      
      const token = await response.user.getIdToken();
      await storeUserSession(response.user, token);
      
      await setDoc(doc(FIREBASE_DB, USERS_REF, response.user.uid), {
        ...userData,
        createdAt: new Date().toISOString(),
        profileCompleted: false,
        superLikesRemaining: SUPER_LIKES_DAILY_LIMIT,
        lastSuperLikeDate: null,
        receivedSuperLikes: [],
      });

      setUser({ 
        ...response.user, 
        ...userData, 
        profileCompleted: false,
        superLikesRemaining: SUPER_LIKES_DAILY_LIMIT,
      });
    } catch (error) {
      console.error('Registration error:', error); // Add this log
      setError(error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      await AsyncStorage.removeItem('@user_session');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUserSuperLikes = async (userId, remaining) => {
    try {
      const userRef = doc(FIREBASE_DB, USERS_REF, userId);
      await updateDoc(userRef, {
        superLikesRemaining: remaining,
        lastSuperLikeDate: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating super likes:', error);
      throw error;
    }
  };

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        await storeUserSession(user, token);
        
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', user.uid));
        if (userDoc.exists()) {
          setUser({ ...user, ...userDoc.data() });
        } else {
          setUser(user);
        }
      } else {
        await AsyncStorage.removeItem('@user_session');
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUserSuperLikes,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
