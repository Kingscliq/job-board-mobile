import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BFE1F2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  text: {
    color: 'black',
    fontSize: 12,
    textTransform: 'capitalize',
  },
});

export default Badge;
