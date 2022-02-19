import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AuthProvider, { useAuth } from './src/context/AuthProvider';
import AuthStack from './src/navigation/AuthStack';
import ChatStack from './src/navigation/ChatStack';
import Routes from './src/navigation/Routes';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
