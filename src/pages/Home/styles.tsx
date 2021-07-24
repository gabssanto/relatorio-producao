import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  background-color: #fff;
  padding:20px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContributeContent = styled.a`
  cursor: pointer;
  margin: 10px 0;
  margin-right: 16px;
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

export const Report = styled.a`
  cursor: pointer;
  margin: 10px 0;
  margin-right: 16px;
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

export const ReportWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
`;

export const DeleteWrapper = styled.div`

`;
