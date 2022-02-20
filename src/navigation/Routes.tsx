import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import ChatStack from './ChatStack';
import { useAuth } from '../context/AuthProvider';

const Routes = () => {
  const { currentUser } = useAuth();
  return (
    <NavigationContainer>
      {currentUser ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
