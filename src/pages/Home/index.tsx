import React, { useState, useEffect } from 'react';
import UploadButton from '../../components/UploadButton';
import FileList from '../../components/FileList'
import { Container, Button } from './styles';
import { firebaseFirestore } from '../../Firebase/firebase';

const Home: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState('');

  /* const getFiles = async () => {
    const data = {
      name: 'Brasili',
      state: 'DF',
      country: 'BR'
    };

    const res = firebaseFirestore.collection('cities').doc('DF').set(data);
  } */

  useEffect(() => {
    setUploadedFiles('teste');
  }, []);

  const handleUpload = (files: any) => {
    console.log(files);
  }

  return (
    <Container>
      <h1>{uploadedFiles}</h1>
      <UploadButton onUpload={handleUpload} />
      <FileList />

      <Button onClick={() => { console.log('hello') }}>
        Enviar Arquivo
      </Button>
    </Container>
  );
}

export default Home;