import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import icons from '../constants/icons';

type HomeIconProps = {
  onPress?: () => void;
};

const HomeIcon = ({ onPress }: HomeIconProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icons.location}
        resizeMode="cover"
        style={styles.btnImage}
        alt="menu-icon"
      />
    </TouchableOpacity>
  );
};

export default HomeIcon;

const styles = StyleSheet.create({
  btnImage: {
    height: 35,
    width: 35,
  },
});
