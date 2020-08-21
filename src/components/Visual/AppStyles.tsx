/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// TODO add types?

// Third Party
import { Button, Card } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { CardProps } from 'antd/lib/card';
import React from 'react';
import styled from 'styled-components';

interface CommonProps {
  readonly border?: string;
  readonly fontWeight?: string;
  readonly height?: string;
  readonly margin?: string;
  readonly padding?: string;
  readonly width?: string;
}

interface BasicButtonProps extends ButtonProps, CommonProps {
  readonly border?: string;
}

export const BasicButton: React.FC<BasicButtonProps> = styled(Button)<BasicButtonProps>`
  border: ${(props) => props.border};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
  padding: ${(props) => (props.padding ? props.padding : 'auto')};
  width: ${(props) => props.width};
`;

interface BasicCardProps extends CardProps, CommonProps {}

export const BasicCard: React.FC<BasicCardProps> = styled(Card)<BasicCardProps>`
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
  padding: ${(props) => (props.padding ? props.padding : 'auto')};
`;

export const CenterContainer: React.FC = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const H1: React.FC<CommonProps> = styled.h1<CommonProps>`
  font-family: Open Sans;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
`;

export const H2: React.FC<CommonProps> = styled.h2<CommonProps>`
  font-family: Open Sans;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
`;

export const H3: React.FC<CommonProps> = styled.h3<CommonProps>`
  font-family: Open Sans;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
`;

export const H4: React.FC<CommonProps> = styled.h4<CommonProps>`
  font-family: Open Sans;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
`;

export const Table: React.FC<CommonProps> = styled.table<CommonProps>`
  border: 1px solid black;
  border-collapse: collapse;
`;
export const TableRow: React.FC<CommonProps> = styled.tr<CommonProps>`
  border: 1px solid black;
  border-collapse: collapse;
`;
export const TableData: React.FC<CommonProps> = styled.td<CommonProps>`
  border: 1px solid black;
  border-collapse: collapse;
  &.style {
    padding: 4%;
  }
`;
