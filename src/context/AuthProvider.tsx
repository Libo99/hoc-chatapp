import React, { useContext, useState, useEffect, createContext } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { WEB_CLIENT_ID } from '@env';

interface AuthProviderProps {
  children: React.ReactNode;
}
interface AuthMode {
  googleLogin: () => void;
  currentUser: any;
  signOut: () => void;
  facebookLogin: () => void;
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
      webClientId: WEB_CLIENT_ID,
      scopes: ['email', 'profile'],
    });
  }, []);

  //Handle user state changes
  // const onAuthStateChanged = (user: any) => {
  //   setCurrentUser(user);
  //   if (loading) setLoading(false);
  // };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Signin cancelled');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => Alert.alert("You're signed out!"));
    } catch (error) {
      console.error(error);
    }
  };

  const facebookLogin = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        Alert.alert('login process was cancelled');
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data?.accessToken
      );

      // Sign-in the user with the credential
      await auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    currentUser,
    googleLogin,
    signOut,
    facebookLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}) as React.FC<AuthProviderProps>;

export default AuthProvider;
