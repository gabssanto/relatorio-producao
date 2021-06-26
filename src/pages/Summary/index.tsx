import React, { useRef } from 'react';
import HeaderComponent from '../../components/common/Header';

import { Container } from './styles';

const Summary: React.FC = () => {
  const printRef = useRef(null);
  const localReports = JSON.parse(localStorage.getItem('relatorios') || '[]');
  console.log(localReports);

  return (
    <Container ref={printRef}>
      <HeaderComponent printRef={printRef} />
    </Container>
  );
}

export default Summary;
