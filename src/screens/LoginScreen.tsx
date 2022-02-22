import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthProvider';
import SocialButton from '../components/SocialButton/SocialButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = (() => {
  const { googleLogin, facebookLogin } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.top}>
        <Text style={styles.herotext}>Rage Chat</Text>
      </View>
      <View style={styles.imagewrapper}>
        <ImageBackground
          source={require('../../assets/hero.png')}
          style={styles.heroimage}
        >
          <Text style={styles.imagetext}>Connect with Friends and Family!</Text>
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
    </SafeAreaView>
  );
}) as React.FC;

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  top: {
    alignItems: 'center',
  },
  imagewrapper: {
    flex: 2.5,
    justifyContent: 'center',
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
  imagetext: {
    fontSize: 17,
    fontWeight: '400',
    marginTop: 2,
    color: 'black',
  },
  spacer: {
    marginBottom: 10,
  },
  buttonscontainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
