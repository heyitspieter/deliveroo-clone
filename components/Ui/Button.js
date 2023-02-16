import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

const Button = ({ children, disabled, onPress = () => {} }) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => pressed && styles.pressed}
      >
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
  },
});

export default Button;
