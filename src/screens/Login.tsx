import { View, Text, Button } from 'react-native';
import React from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { LoginButton } from 'react-native-fbsdk-next';

import { useAuth } from '../context/AuthProvider';

const Login = (() => {
  const { googleLogin, facebookLogin, currentUser } = useAuth();

  return (
    <View>
      <Text>Login</Text>
      <GoogleSigninButton onPress={googleLogin} />
      <Button title="fb login" onPress={facebookLogin} />
    </View>
  );
}) as React.FC;

export default Login;
