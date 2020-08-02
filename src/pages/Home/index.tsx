import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import UploadButton from '../../components/UploadButton';
import FileList from '../../components/FileList'
import { Container, Button } from './styles';
import { firebaseFirestore } from '../../firebase';
import { usePrevious } from '../../utils';

const Home = () => {
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [blankLine, setBlankLine] = useState<any>(-1);
  var prevBlankLine = usePrevious(blankLine);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { /* console.log(prevBlankLine, blankLine) */ }, [blankLine]);

  const handleUpload = (files: any) => {
    const UFiles = files.map((file: any) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));
    setUploadedFiles(uploadedFiles.concat(UFiles));
    UFiles.forEach(processUpload);
  }

  const processUpload = (uploadedFile: any) => {
    const reader = new FileReader()
    var parsedFile: any;
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      if (typeof (binaryStr) === 'string') {
        parsedFile = binaryStr.split('\n').filter((line: any) => line !== 'Descrição;Quantidade;')
        console.log(typeof (parsedFile))
        // eslint-disable-next-line array-callback-return
        parsedFile.map((line: any, index: number) => {
          if (line === '') {
            setBlankLine(index);
          }
        })
        firebaseFirestore.collection('relatorios').doc(uploadedFile.name).set({ name: uploadedFile.name });
        /* console.log(parsedFile.filter((line: any) => line !== 'Descrição;Quantidade;')); */
      }
    }
    reader.readAsBinaryString(uploadedFile.file)
  }

  return (
    <Container>
      <h1>Hello World</h1>
      <UploadButton onUpload={handleUpload} />
      {!!uploadedFiles.length && (
        <FileList files={uploadedFiles} />
      )}

      <Button onClick={() => { console.log('hello') }}>
        Enviar Arquivo
      </Button>
    </Container>
  );
}

export default Home;
