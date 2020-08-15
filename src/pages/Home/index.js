/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { uniqueId, camelCase } from 'lodash';
import filesize from 'filesize';
import UploadButton from '../../components/UploadButton';
import FileList from '../../components/FileList'
import { Container } from './styles';
import { firebaseFirestore } from '../../firebase';

const regex = /[^a-zA-Z' ''ã''á''à''í''ú''ç']+/g;

const Home = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  var blankLine = 0;

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

  const processUpload = (uploadedFile, index) => {
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
        var resumoProducao = {};
        var dadosGerais = {};
        var turno = {};
        var faixaEtaria = {};
        var sexo = {};
        var localDeAtendimento = {};
        var tiposDeAtendimento = {};
        var vigilanciaEmSaudeBucal = {};
        var procedimentos = {};
        var fornecimento = {};
        var condutaDesfecho = {};
        var encaminhamento = {};
        var json = {};
        array.map((element) => {
          if (element[0] === 'Resumo de produção') {
            element.map((el, index) => {
              if (index !== 0)
                resumoProducao[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
          if (element[0] === 'Dados gerais') {
            element.map((el, index) => {
              if (index !== 0)
                dadosGerais[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
          if (element[0] === 'Turno') {
            element.map((el, index) => {
              if (index !== 0)
                turno[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
          if (element[0] === 'Faixa etária') {
            element.map((el, index) => {
              if (index !== 0 && index !== 1) {
                faixaEtaria[camelCase(el.split(';')[0])] = {
                  masculino: Number(el.split(';')[1]),
                  feminino: Number(el.split(';')[2]),
                  naoInformado: Number(el.split(';')[3]),
                }
              }
            })
          }
          if (element[0] === 'Sexo') {
            element.map((el, index) => {
              if (index !== 0)
                sexo[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
          if (element[0] === 'Local de atendimento') {
            element.map((el, index) => {
              if (index !== 0)
                localDeAtendimento[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
          if (element[0] === 'Tipo de atendimento') {
            element.map((el, index) => {
              if (index !== 0)
                tiposDeAtendimento[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
          if (element[0] === 'Vigilância em saúde bucal') {
            element.map((el, index) => {
              if (index !== 0)
                vigilanciaEmSaudeBucal[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
          if (element[0] === 'Procedimentos') {
            element.map((el, index) => {
              if (index !== 0)
                procedimentos[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
          if (element[0] === 'Fornecimento') {
            element.map((el, index) => {
              if (index !== 0)
                fornecimento[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
          if (element[0] === 'Conduta / Desfecho') {
            element.map((el, index) => {
              if (index !== 0)
                condutaDesfecho[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
          if (element[0] === 'Encaminhamento') {
            element.map((el, index) => {
              if (index !== 0)
                encaminhamento[camelCase(el.replace(regex, ''))] = Number(el.replace(/\D/g, ''))
            })
          }
        })
        json = {
          local: array[0].join(),
          uf: array[0][0],
          municipio: array[0][1],
          ubs: array[0][2],
          periodo: {
            inicio: array[1][0].replace('Período;', '').split(' a ')[0],
            fim: array[1][0].replace('Período;', '').split(' a ')[1],
          },
          equipe: array[1][1].replace('Equipe;', ''),
          resumoProducao,
          dadosGerais,
          turno,
          faixaEtaria,
          sexo,
          localDeAtendimento,
          tiposDeAtendimento,
          vigilanciaEmSaudeBucal,
          procedimentos,
          fornecimento,
          condutaDesfecho,
          encaminhamento
        }

        const fileName = `${json.ubs}/${json.equipe.replace(/['/']/g, '-')}/${json.periodo.inicio.replace(/['/']/g, '-')} a ${json.periodo.fim.replace(/['/']/g, '-')}`;

        firebaseFirestore.collection('relatorios').doc(fileName).set(json);

        setUploadedFiles([...uploadedFiles, { ...uploadedFile, url: fileName }])
      }
    }
    reader.readAsBinaryString(uploadedFile.file)
  }

  return (
    <Container>
      <UploadButton onUpload={handleUpload} />
      {!!uploadedFiles.length && (
        <FileList files={uploadedFiles} />
      )}
    </Container>
  );
}

export default Home;
