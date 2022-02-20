import React, { useContext, useState, useEffect, createContext } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

interface AuthProviderProps {
  children: React.ReactNode;
}
interface AuthMode {
  googleLogin: () => void;
  currentUser: any;
  signOut: () => void;
}
const AuthContext = createContext({} as AuthMode);

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = (({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    GoogleSignin.configure({
      //cannot read from .env file for some reason
      //but it works with a string
      webClientId: process.env.ANDROID_CLIENT_ID,
      iosClientId: process.env.IOS_CLIENT_ID,
      scopes: ['email', 'profile'],
    });
  }, []);

  //Handle user state changes
  const onAuthStateChanged = (user: any) => {
    setCurrentUser(user);
    if (loading) setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => Alert.alert('Your are signed out!'));
    } catch (error) {
      console.error(error);
    }
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      console.log(idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
    // Get the users ID token
  };

  const value = {
    currentUser,
    googleLogin,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}) as React.FC<AuthProviderProps>;

export default AuthProvider;
