import React, { useContext, useState, useEffect, createContext } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}
interface AuthMode {
  googleLogin: () => void;
  currentUser: any;
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
      webClientId: process.env.WEB_CLIENT_ID,
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

  const googleLogin = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
    // Get the users ID token
  };

  const value = {
    currentUser,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}) as React.FC<AuthProviderProps>;

export default AuthProvider;
