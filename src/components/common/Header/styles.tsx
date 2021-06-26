import styled from 'styled-components';

export const BackButton = styled.a`
  font-size: 20px;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: start;
  color:  #4192D4;
  width: 200px;
  background-color: #eee;
  padding: 8px 16px;
  margin-bottom: 20px;
  border-radius: 4px;
  transition: 0.25s;
  &:hover {
    background-color: #4192D4;
    color: #fff;
    transition: 0.25s;
  }
`;

export const SavePDFButton = styled.a`
  font-size: 20px;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: start;
  color:  #4192D4;
  width: 200px;
  background-color: #eee;
  padding: 8px 16px;
  margin-bottom: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    background-color: #4192D4;
    color: #fff;
    transition: 0.25s;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
