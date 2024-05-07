import styled from 'styled-components/native';
import { DARK_TEXT, PRIMARY_GREEN } from '../../../../../../resources/constants/colors';

export const TextContent = styled.Text<{ other?: boolean }>`
  font-family: 'Open Sans';
  color: ${({ other }) => (other ? PRIMARY_GREEN : '#fbfbfd')};
  line-height: 19px;
`;

export const TextContainer = styled.View`
  flex-shrink: 1;
`;

export const TimeContent = styled.Text<{ other?: boolean }>`
  font-family: 'Open Sans';
  color: ${({ other }) => (other ? DARK_TEXT : '#fbfbfd')};
  font-size: 11px;
  line-height: 15px;
`;

export const TimeContainer = styled.View`
  float: right;
  margin-top: -4px;
  margin-bottom: -8px;
  margin-left: 30px;
  vertical-align: baseline;
`;

export const Container = styled.View<{
  loading?: boolean;
  last?: boolean;
  other?: boolean;
}>`
  padding: 6px 9px 8px 7px;
  width: fit-content;
  max-width: 95%;
  border: 1px solid ${PRIMARY_GREEN};
  opacity: ${({ loading }) => (loading ? 0.6 : 1)};
  border-radius: ${({ last, other }) => (last && other ? '7px 7px 7px 0' : last ? '7px 7px 0 7px' : '7px')};
  align-self: ${({ other }) => (other ? 'flex-start' : 'flex-end')};
  background-color: ${({ other }) => (other ? '#fbfbfd' : PRIMARY_GREEN)};
  flex-direction: row;
  align-items: flex-end;
  flex-shrink: 1;
`;
