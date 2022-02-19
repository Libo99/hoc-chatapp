import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/navigation/AuthStack';
import ChatStack from './src/navigation/ChatStack';

const App = () => {
  const [user, setUser] = useState<boolean>(false);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  setTimeout(() => {
    setUser(true);
  }, 5000);
  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
