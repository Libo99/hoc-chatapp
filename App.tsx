import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AuthProvider from './src/context/AuthProvider';
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
