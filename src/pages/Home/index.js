import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import UploadButton from '../../components/UploadButton';
import FileList from '../../components/FileList'
import { Container, Button } from './styles';
import { firebaseFirestore } from '../../firebase';
import { usePrevious } from '../../utils';

const Home = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  /* const [array, setarray] = useState<any>([]); */
  var blankLine = 0;
  var prevBlankLine = usePrevious(blankLine);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  /* useEffect(() => { console.log(prevBlankLine, blankLine) }, [blankLine]); */
  /*   useEffect(() => { console.log(array) }, [array]); */

  const handleUpload = (files) => {
    const UFiles = files.map((file) => ({
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

  const processUpload = (uploadedFile) => {
    const reader = new FileReader()
    var parsedFile;
    var array = [];
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      if (typeof (binaryStr) === 'string') {
        parsedFile = binaryStr.split('\n').filter((line) => (
          line !== 'Descrição;Quantidade;'
          && line !== 'e-SUS - Atenção Básica'
          && line !== 'MINISTÉRIO DA SAÚDE'
          && line !== 'FILTROS'
          && line !== 'Profissional;Todos'
          && line !== 'CBO;Todos'
          && line !== 'Filtros personalizados;Nenhum'
          && line !== 'Relatório de atendimento odontológico - Analítico'
        ))
        /*         console.log(parsedFile) */
        // eslint-disable-next-line array-callback-return
        parsedFile.map((line, index) => {
          if (line === '') {
            let arr = [];
            for (var i = blankLine; i < index; i++) {
              if (parsedFile[i] !== '') {
                arr.push(parsedFile[i]);
              }
            }
            if (arr.length !== 0) {
              array.push(arr);
            }
            blankLine = index;

          }
        })
        /*        console.log(array); */
        var productionReport = {};
        var generalData = {};
        var json = {};
        array.map((element) => {
          if (element[0] === 'Resumo de produção') {
            element.map((el, index) => {
              if (index !== 0)
                productionReport[el.replace(/[^a-zA-Z' ''ã']+/g, '')] = Number(el.replace(/\D/g, ''))
            })
            /* productionReport = {
              identifiedRegisters: Number(element[1].replace('Registros identificados;', '').replace(';', '')),
              unidentifiedRegisters: Number(element[2].replace('Registros não identificados;', '').replace(';', '')),
            } */
          }
          if (element[0] === 'Dados gerais') {
            generalData = {
              pregnant: Number(element[1].replace('Gestante;', '').replace(';', '')),
              specialNeededPacients: Number(element[2].replace('Paciente com necessidades especiais;', '').replace(';', '')),
            }
          }
          if (element[0] === 'Turno') {
            console.log(element);

          }
          if (element[0] === 'Faixa etária') { }
          if (element[0] === 'Sexo') { }
          if (element[0] === 'Local de atendimento') { }
          if (element[0] === 'Tipo de atendimento') { }
          if (element[0] === 'Vigilância em saúde bucal') { }
          if (element[0] === 'Procedimentos') { }
          if (element[0] === 'Fornecimento') { }
          if (element[0] === 'Conduta / Desfecho') { }
          if (element[0] === 'Encaminhamento') { }
        })
        /* json["place"] = array[0].join() */
        json = {
          place: array[0].join(),
          period: {
            start: array[1][0].replace('Período;', '').split(' a ')[0],
            end: array[1][0].replace('Período;', '').split(' a ')[1],
          },
          team: array[1][1].replace('Equipe;', ''),
          productionReport,
          generalData
        }

        console.log(json);
        firebaseFirestore.collection('relatorios').doc(uploadedFile.name).set(json);
        /* console.log(parsedFile.filter((line) => line !== 'Descrição;Quantidade;')); */
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
