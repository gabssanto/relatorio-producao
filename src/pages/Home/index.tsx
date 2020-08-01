import React from 'react';
import UploadButton from '../../components/UploadButton';

import { Container, Button } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <h1>Hello World</h1>
      <UploadButton />

      <Button onClick={() => { console.log('hello') }}>
        Enviar Arquivo
      </Button>
    </Container>
  );
}

export default Home;