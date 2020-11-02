import styled from 'styled-components';

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  padding:20px;
  max-width: 1000px;
`;

export const Button = styled.div`
  display: flex;
  max-width: 300px;
  width: 100%;
  margin: 30px;
  padding: 20px;
  background-color: #efde9e;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Report = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  transition: 0.25s;
  &:hover {
    background-color: #4192D4;
    color: #fff;
    transition: 0.25s;
  }
`;
