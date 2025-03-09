import React, { createContext, useState, useContext, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

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

  // Check session validity
  const isSessionValid = (lastLoginTime) => {
    const lastLogin = new Date(lastLoginTime);
    const now = new Date();
    const diffTime = Math.abs(now - lastLogin);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays < 7;
  };

  // Get stored session
  const getUserSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem('@user_session');
      if (sessionData) {
        return JSON.parse(sessionData);
      }
      return null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  };

  // Clear session
  const clearUserSession = async () => {
    try {
      await AsyncStorage.removeItem('@user_session');
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  // Auto login
  const attemptAutoLogin = async () => {
    try {
      const sessionData = await getUserSession();
      if (!sessionData) return false;

      if (!isSessionValid(sessionData.lastLoginTime)) {
        await clearUserSession();
        return false;
      }

      // Session is valid, get user data from Firestore
      const userDoc = await getDoc(doc(FIREBASE_DB, 'users', sessionData.userId));
      if (userDoc.exists()) {
        setUser({ uid: sessionData.userId, ...userDoc.data() });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Auto login error:', error);
      return false;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const token = await response.user.getIdToken();
      
      // Store session data
      await storeUserSession(response.user, token);
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(FIREBASE_DB, 'users', response.user.uid));
      if (userDoc.exists()) {
        setUser({ ...response.user, ...userDoc.data() });
      } else {
        setUser(response.user);
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Register
  const register = async (email, password, userData) => {
    try {
      setError(null);
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const token = await response.user.getIdToken();
      
      await storeUserSession(response.user, token);
      
      // Add profileCompleted flag when creating user document
      await setDoc(doc(FIREBASE_DB, 'users', response.user.uid), {
        ...userData,
        createdAt: new Date().toISOString(),
        profileCompleted: false, // Add this flag
      });

      setUser({ ...response.user, ...userData, profileCompleted: false });
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      await clearUserSession();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Update user profile
  const updateUserProfile = async (updatedProfile) => {
    try {
      setError(null);
      // Update the user state
      setUser(updatedProfile);
      
      // Update Firebase Auth profile if display name or photo URL changed
      if (updatedProfile.displayName !== user.displayName || 
          updatedProfile.photoURL !== user.photoURL) {
        await updateProfile(FIREBASE_AUTH.currentUser, {
          displayName: updatedProfile.displayName,
          photoURL: updatedProfile.photoURL,
        });
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        await storeUserSession(user, token);
        
        // Get user data from Firestore
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({ ...user, ...userData });
          setLoading(false);
        } else {
          setUser(user);
          setLoading(false);
        }
      } else {
        await clearUserSession();
        setUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout, 
      updateUserProfile,
      attemptAutoLogin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
