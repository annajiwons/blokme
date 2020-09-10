/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// Third Party
import { Button, Card } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { CardProps } from 'antd/lib/card';
import React from 'react';
import styled from 'styled-components';

export const MAIN_BLUE = '#1890ff';
export const DARK_BLUE = `#0050b3`;

export const MAIN_CYAN = '#13c2c2';

export const MAIN_GREEN = '#a0d911';

export const MAIN_RED = '#f5222d';

export const MAIN_YELLOW = '#faad14';

interface CommonProps {
  readonly backgroundColor?: string;
  readonly border?: string;
  readonly borderRadius?: string;
  readonly fontWeight?: string;
  readonly height?: string;
  readonly margin?: string;
  readonly padding?: string;
  readonly textAlign?: string;
  readonly width?: string;
}
interface BasicButtonProps extends ButtonProps, CommonProps {}
interface BasicCardProps extends CardProps, CommonProps {}
interface ClickableProps extends CommonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: () => void;
}

export const AntButton: React.FC<BasicButtonProps> = styled(Button)<BasicButtonProps>`
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  height: ${(props) => (props.height ? props.height : 'auto')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
  padding: ${(props) => (props.padding ? props.padding : 'auto')};
  width: ${(props) => (props.width ? props.width : 'auto')};
`;

export const AntCard: React.FC<BasicCardProps> = styled(Card)<BasicCardProps>`
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
  .ant-card-body {
    padding: ${(props) => (props.padding ? props.padding : 'auto')};
  }
  width: ${(props) => (props.width ? props.width : 'auto')};
`;

export const CenterContainer: React.FC = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const Div: React.FC<CommonProps> = styled.div<CommonProps>`
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  height: ${(props) => (props.height ? props.height : 'auto')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
  padding: ${(props) => (props.padding ? props.padding : 'auto')};
  width: ${(props) => (props.width ? props.width : 'auto')};
`;

export const H1: React.FC<CommonProps> = styled.h1<CommonProps>`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
  text-align: ${(props) => props.textAlign};
`;

export const H2: React.FC<CommonProps> = styled.h2<CommonProps>`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
`;

export const H3: React.FC<CommonProps> = styled.h3<CommonProps>`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
`;

export const H4: React.FC<CommonProps> = styled.h4<CommonProps>`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
`;

export const Table: React.FC<CommonProps> = styled.table<CommonProps>`
  border: ${(props) => (props.border ? props.border : 'transparent')};
  border-collapse: collapse;
  height: ${(props) => (props.height ? props.height : 'auto')};
  margin: ${(props) => (props.margin ? props.margin : 'auto')};
  table-layout: fixed;
  width: ${(props) => (props.width ? props.width : 'auto')};
`;

export const TableBody: React.FC<CommonProps> = styled.tbody<CommonProps>``;

export const TableRow: React.FC<CommonProps> = styled.tr<CommonProps>`
  border: ${(props) => (props.border ? props.border : 'transparent')};
  border-collapse: collapse;
`;

export const TableData: React.FC<CommonProps> = styled.td<CommonProps>`
  border: ${(props) => (props.border ? props.border : 'transparent')};
  border-collapse: collapse;
  height: ${(props) => (props.height ? props.height : 'auto')};
  font-size: 1px;
  padding: ${(props) => (props.padding ? props.padding : 'auto')};
  white-space: nowrap;
  width: ${(props) => (props.width ? props.width : 'auto')};
`;
