import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

export class AuthService {
  //google login
  public static async googleLogin() {
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
  }
  //signout
  public static async signOut() {
    try {
      auth()
        .signOut()
        .then(() => Alert.alert("You're signed out!"));
    } catch (error) {
      console.error(error);
    }
  }
  //facebook login
  public static async facebookLogin() {
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
  }
}
