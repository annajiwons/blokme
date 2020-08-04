/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// TODO add types?

// Third Party
import { Button, Card } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { CardProps } from 'antd/lib/card';
import React from 'react';
import styled from 'styled-components';

interface CommonProps {
  readonly margin?: string;
  readonly padding?: string;
}

interface BasicButtonProps extends ButtonProps, CommonProps {
  readonly width?: string;
}

export const BasicButton: React.FC<BasicButtonProps> = styled(Button)<BasicButtonProps>`
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
  padding: ${(props) => (props.padding ? props.padding : 'auto')};
  width: ${(props) => props.width};
`;

interface BasicCardProps extends CardProps, CommonProps {}

export const BasicCard: React.FC<BasicCardProps> = styled(Card)<BasicCardProps>`
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
`;

export const CenterContainer: React.FC = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

type HeaderProps = CommonProps;

export const H1: React.FC<HeaderProps> = styled.h1<HeaderProps>`
  font-family: Open Sans;
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
`;

export const H2: React.FC<HeaderProps> = styled.h2<HeaderProps>`
  font-family: Open Sans;
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
`;
