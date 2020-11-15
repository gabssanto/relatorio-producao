import styled from 'styled-components';

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  padding:20px;
  max-width: 1000px;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0;
`;

export const Report = styled.a`
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  color: #333;
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
