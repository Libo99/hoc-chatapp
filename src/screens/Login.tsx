import { View, Text } from 'react-native';
import React from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuth } from '../context/AuthProvider';

const Login = (() => {
  const { googleLogin } = useAuth();

  return (
    <View>
      <Text>Login</Text>
      <GoogleSigninButton onPress={googleLogin} />
    </View>
  );
}) as React.FC;

export default Login;
