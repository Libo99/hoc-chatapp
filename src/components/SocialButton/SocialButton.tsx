import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { SocialIcon } from 'react-native-elements';

interface SocialButtonProps {
  type: 'google' | 'facebook';
  onPress: () => void;
  title: string;
}

const SocialButton = (({ type, onPress, title }) => {
  return (
    <View>
      <SocialIcon
        title={title}
        type={type}
        button
        onPress={onPress}
        style={styles.button}
        iconStyle={type === 'facebook' ? { marginLeft: 13 } : null}
      />
    </View>
  );
}) as React.FC<SocialButtonProps>;

export default SocialButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: Platform.OS === 'android' ? 0 : 46,
  },
});
