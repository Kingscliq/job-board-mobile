import React, { ComponentProps, ReactNode } from 'react';
import {
  TextInput,
  StyleSheet,
  StyleProp,
  TextInputProps,
  Text,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { COLORS } from '../constants/theme';

interface CustomInputProps {
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: ReactNode;
  iconColor?: string;
}

type InputProps = TextInputProps & CustomInputProps;
const TextFieldWrapper = styled.View`
  width: 100%;
`;

const LeftIcon = styled.View`
  position: absolute;
  border-right-width: 2px;
  border-color: ${COLORS.gray2};
  z-index: 1;
  left: 15px;
  top: 35px;
  padding-right: 10px;
`;

const StyledInput = styled.TextInput`
  border-width: 2px;
  border-color: ${COLORS.primary};
  height: 60px;
  border-radius: 5px;
  padding: 15px;
  padding-left: 65px;
  margin-bottom: 10px;
  padding-right: 55px;
  font-size: 20px;
  color: ${COLORS.black};
`;

const InputField: React.FC<InputProps> = ({
  icon,
  label,
  iconColor,
  ...props
}) => {
  return (
    <TextFieldWrapper>
      {icon && (
        <LeftIcon>
          <MaterialCommunityIcons
            name={icon}
            size={30}
            color={iconColor ?? COLORS.primary}
          />
        </LeftIcon>
      )}
      {label && <Text style={{ marginBottom: 30 }}>Email</Text>}
      <StyledInput {...props} />
    </TextFieldWrapper>
  );
};

export default InputField;
