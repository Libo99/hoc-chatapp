import { View, Text } from 'react-native';
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
      <SocialIcon title={title} type={type} button onPress={onPress} />
    </View>
  );
}) as React.FC<SocialButtonProps>;

export default SocialButton;
