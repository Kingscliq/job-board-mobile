import { View, Text } from 'react-native';
import React, { ReactNode } from 'react';
import { styled } from 'styled-components/native';

interface WrapperProps {
  children: ReactNode;
}

const StyledWrapper = styled.View`
  width: 100%;
  padding: 15px;
  padding-top: 45px;
  justify-content: center;
  align-items: center;
`;

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
