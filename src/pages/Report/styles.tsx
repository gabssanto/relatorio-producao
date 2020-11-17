import styled from 'styled-components';

export const Title = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 4px;
  font-size: 28px;
`;

export const HeaderContainer = styled.header`
  background-color: #eee;
  color: #333;
  padding: 16px 32px;
  border-radius: 8px;
  h1, h2, h3, h4 {
    font-size: 28px;
  }
`;

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  padding: 20px;
`;

export const Hint = styled.div`
  background-color: #000;
  opacity: 0.61;
  color: #fff;
  border-radius: 4px;
  display: flex;
  position: fixed;
  max-width: 50px;
  padding: 8px 16px;
  font-weight: bold;
  justify-content: center;

`;

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
