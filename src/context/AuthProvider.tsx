import React, { useContext, useState, useEffect, createContext } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { WEB_CLIENT_ID } from '@env';

interface AuthProviderProps {
  children: React.ReactNode;
}
interface AuthMode {
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
      webClientId: WEB_CLIENT_ID,
      scopes: ['email', 'profile'],
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}) as React.FC<AuthProviderProps>;

export default AuthProvider;
