import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
  StyleProp,
} from 'react-native';
import React, { ReactNode } from 'react';

interface ITextInputProps {
  placeholder: string;
  label?: string;
  iconLeft?: string;
  iconRight?: string;
  value: string;
  onChange: (text: string) => void;
  onClick?: () => void;
  error?: boolean;
  name?: string;
  success?: boolean;
  inputRef?: string;
  message?: string;
  disabled?: boolean;
  icon?: ReactNode;
  style?: StyleProp<any>;
}
const TextField = ({
  placeholder,
  label,
  iconLeft,
  iconRight,
  onChange,
  style,
  value,
}: ITextInputProps) => {
  return (
    // <View style={styles.container}>
    //   {label && <Text>{label}</Text>}
    <TextInput
      style={Object.assign({}, styles.input, style)}
      value={value}
      placeholder={placeholder}
      onChangeText={onChange}
    />
    // </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'hsl(0, 0%, 70%)',
    borderWidth: 1,
    borderRadius: 2,
    // flexDirection: 'row',
    height: 50,
  },
  input: {
    height: 48,
    backgroundColor: '#F9F9FB',
    padding: 16,
  },
});
