import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthProvider';
import SocialButton from '../components/SocialButton/SocialButton';

const Login = (() => {
  const { googleLogin, facebookLogin } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <Text style={styles.herotext}>Rage Chat</Text>
        <ImageBackground
          source={require('../../assets/hero.png')}
          style={styles.heroimage}
        >
          <Text style={styles.subherotext}>
            Connect with Friends and Family!
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.buttonscontainer}>
        <SocialButton
          type="google"
          title="Log in with Google"
          onPress={googleLogin}
        />
        <View style={styles.spacer} />
        <SocialButton
          type="facebook"
          title="Log in with Facebook"
          onPress={facebookLogin}
        />
      </View>
    </View>
  );
}) as React.FC;

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topcontainer: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroimage: {
    height: 300,
    width: 400,
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  herotext: {
    fontSize: 27,
    fontWeight: '900',
    color: 'green',
  },
  subherotext: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 2,
    color: 'black',
  },
  spacer: {
    marginBottom: 10,
  },
  buttonscontainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30,
  },
});
