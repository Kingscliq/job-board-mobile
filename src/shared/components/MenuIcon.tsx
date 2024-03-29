import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import icons from '../constants/icons';

type MenuItemProps = {
  onPress?: () => void;
};

const MenuIcon = ({ onPress }: MenuItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icons.menu}
        resizeMode="cover"
        style={styles.btnImage}
        alt="menu-icon"
      />
    </TouchableOpacity>
  );
};

export default MenuIcon;

const styles = StyleSheet.create({
  btnImage: {
    height: 35,
    width: 35,
  },
});
