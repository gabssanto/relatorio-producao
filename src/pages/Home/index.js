/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { uniqueId, uniqBy } from 'lodash';
import filesize from 'filesize';
import UploadButton from '../../components/UploadButton';
import FileList from '../../components/FileList'
import { Container, Report, Title, ReportWrapper } from './styles';
import { BsTrashFill } from 'react-icons/bs'

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
        //TODO: this code is horrible, refactor it someday, I know it's ugly
        var json = {
          local: array[0].join(),
          uf: array[0][0],
          municipio: array[0][1],
          ubs: array[0][2],
          periodo: {
            inicio: array[1][0].replace('Período;', '').split(' a ')[0],
            fim: array[1][0].replace('Período;', '').split(' a ')[1],
          },
          equipe: array[1][1].replace('Equipe;', ''),
          resumoProducao: [],
          dadosGerais: [],
          turno: [],
          faixaEtaria: [],
          sexo: [],
          localDeAtendimento: [],
          tiposDeAtendimento: [],
          tipoDeConsulta: [],
          vigilanciaEmSaudeBucal: [],
          procedimentos: [],
          fornecimento: [],
          condutaDesfecho: [],
          encaminhamento: [],
        }
        array.map((element) => {
          if (element[0] === 'Resumo de produção') {
            element.map((el, index) => {
              if (index !== 0)
                json.resumoProducao.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Dados gerais') {
            element.map((el, index) => {
              if (index !== 0)
                json.dadosGerais.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Turno') {
            element.map((el, index) => {
              if (index !== 0)
                json.turno.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Faixa etária') {
            element.map((el, index) => {
              if (el.split(';')[0] === 'Menos de 01 ano') {
                json.faixaEtaria.push({
                  id: '≤ 01',
                  label: '≤ 01',
                  masculino: Number(el.split(';')[1]),
                  feminino: Number(el.split(';')[2]),
                  naoInformado: Number(el.split(';')[3]),
                });
              }
              else if (index !== 0 && index !== 1) {
                if (el.split(';')[0] === 'Não informado') {
                  json.faixaEtaria.push({
                    id: 'Não inform.',
                    label: 'Não inform.',
                    masculino: Number(el.split(';')[1]),
                    feminino: Number(el.split(';')[2]),
                    naoInformado: Number(el.split(';')[3]),
                  });
                }
                else if (el.split(';')[0].replace(' anos', '') === '80 ou mais') {
                  json.faixaEtaria.push({
                    id: '≥ 80',
                    label: '≥ 80',
                    masculino: Number(el.split(';')[1]),
                    feminino: Number(el.split(';')[2]),
                    naoInformado: Number(el.split(';')[3]),
                  });
                }
                else {
                  json.faixaEtaria.push({
                    id: el.split(';')[0].replace(' anos', ''),
                    label: el.split(';')[0].replace(' anos', ''),
                    masculino: Number(el.split(';')[1]),
                    feminino: Number(el.split(';')[2]),
                    naoInformado: Number(el.split(';')[3]),
                  });
                }
              }
            })
          }
          if (element[0] === 'Sexo') {
            element.map((el, index) => {
              if (index !== 0)
                json.sexo.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Local de atendimento') {
            element.map((el, index) => {
              if (index !== 0)
                json.localDeAtendimento.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Tipo de atendimento') {
            element.map((el, index) => {
              if (index !== 0)
                json.tiposDeAtendimento.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Tipo de consulta') {
            element.map((el, index) => {
              if (index !== 0)
                json.tipoDeConsulta.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Vigilância em saúde bucal') {
            element.map((el, index) => {
              if (index !== 0)
                json.vigilanciaEmSaudeBucal.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Procedimentos') {
            element.map((el, index) => {
              if (index !== 0)
                json.procedimentos.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Fornecimento') {
            element.map((el, index) => {
              if (index !== 0)
                json.fornecimento.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Conduta / Desfecho') {
            element.map((el, index) => {
              if (index !== 0)
                json.condutaDesfecho.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
          if (element[0] === 'Encaminhamento') {
            element.map((el, index) => {
              if (index !== 0)
                json.encaminhamento.push({
                  id: el.replace(regex, ''),
                  label: el.replace(regex, ''),
                  value: Number(el.replace(/\D/g, ''))
                });
            })
          }
        })

        /* const fileName = `${json.ubs}/${json.equipe.replace(/['/']/g, '-')}/${json.periodo.inicio.replace(/['/']/g, '-')} a ${json.periodo.fim.replace(/['/']/g, '-')}`; */
        const fileName = `${json.periodo.inicio.replace(/['/']/g, '-')} a ${json.periodo.fim.replace(/['/']/g, '-')}`;

        if (reports && reports.length > 0) {
          const uniqueReports = uniqBy([...reports, json], report => report.periodo.inicio)
          setReports(uniqueReports);
        } else if (!reports) setReports([json])
        setUploadedFiles([...uploadedFiles, { ...uploadedFile, url: fileName }])
      }
    }
    reader.readAsBinaryString(uploadedFile.file)
  }

  const [reports, setReports] = useState();

  React.useEffect(() => {
    if (reports)
      localStorage.setItem('relatorios', JSON.stringify(reports));
  }, [reports]);

  React.useEffect(() => {
    const localReports = JSON.parse(localStorage.getItem('relatorios'));
    if (localReports)
      setReports(localReports);
    return () => reports && localStorage.setItem('relatorios', JSON.stringify(reports));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteReport = (index) => {
    if (!reports) return;

    setReports(reports.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Title>Adicionar novo Relatório</Title>
      <UploadButton onUpload={handleUpload} />
      {!!uploadedFiles.length && (
        <FileList files={uploadedFiles} />
      )}
      {reports && <Title>{reports[0].ubs}</Title>}
      {reports && reports.map((report, index) => (
        <ReportWrapper key={uniqueId()}>
          <Report href={`report/${encodeURIComponent(`${report.periodo.inicio.replace(/['/']/g, '-')} a ${report.periodo.fim.replace(/['/']/g, '-')}`)}`} rel="noopener noreferrer">
            <div>
              Período: {report.periodo.inicio} - {report.periodo.fim}
            </div>
          </Report>
          <BsTrashFill onClick={() => handleDeleteReport(index)} fill="red" size={24} style={{ cursor: 'pointer' }}  />
        </ReportWrapper>
      ))}
      <h2>Obter relatorio geral</h2>
      <Report href='summary' rel="noopener noreferrer">
        Clique aqui para obter o Relatorio Geral
      </Report>
    </Container>
  );
}

export default Home;
