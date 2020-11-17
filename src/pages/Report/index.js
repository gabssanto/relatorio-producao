import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveWaffle } from '@nivo/waffle';
import { ResponsiveBar } from '@nivo/bar';
import { Container, Title, HeaderContainer, BackButton, SavePDFButton, Header } from './styles';
import { useParams } from 'react-router-dom';
/* import { firebaseFirestore } from '../../firebase'; */
import ReactToPrint from 'react-to-print';
import PieChart from './PieChart';
import { MdArrowBack, MdPrint } from 'react-icons/md';

const Report = () => {
  const { fileName } = useParams();
  const [file, setFile] = useState();
  const printRef = useRef(null);

  function getFile() {
    /* const res = await firebaseFirestore.collection('relatorios').doc(decodeURIComponent(fileName)).get();
    setFile(res.data()); */
    const decodedUri = decodeURIComponent(fileName);
    const files = JSON.parse(localStorage.getItem('relatorios'));
    const uriParser = decodedUri.replaceAll('-', '/').split(' a ');
    setFile(files.filter(file => file.periodo.inicio === uriParser[0] && file.periodo.fim === uriParser[1])[0])
  }

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* const handlePrint = (e) => {
    e.preventDefault();
    // is getElementById an anti pattern even if I'm not modyfying the DOM?
    const node = document.getElementById("printableReport");
    window.open(node, "PRINT", "height=400,width=600");
  } */

  return (
    <Container ref={printRef}>
      <Header>
        <BackButton href="/"><MdArrowBack /> Voltar</BackButton>
        <ReactToPrint
          trigger={() => <SavePDFButton><MdPrint /> Salvar PDF</SavePDFButton>}
          content={() => printRef.current}
        />
      </Header>
      {!!file && (
        <>
          <HeaderContainer>
            <h1>UBS: {file.ubs}</h1>
            <h2>Local: {`${file.uf}, ${file.municipio}`}</h2>
            <h3>Equipe: {file.equipe}</h3>
            <h4>Período: {file.periodo.inicio} a {file.periodo.fim}</h4>
          </HeaderContainer>
          <PieChart title="Resumo de Produção" data={file.resumoProducao} />
          <PieChart title="Dados Gerais" data={file.dadosGerais} />
          <PieChart title="Turno" data={file.turno} />
          <Title>Faixa Etária</Title>
          <div style={{ height: 300 }}>
            <ResponsiveBar
              data={file.faixaEtaria}
              keys={['masculino', 'feminino', 'naoInformado']}
              indexBy="label"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: 'category10' }}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Idade (em anos)',
                legendPosition: 'middle',
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Total',
                legendPosition: 'middle',
                legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </div>
          <PieChart title="Sexo" data={file.sexo} />

          <Title>Local de Atendimento</Title>
          <div style={{ height: 300 }}>
            <ResponsiveWaffle
              data={file.localDeAtendimento}
              total={file.localDeAtendimento.reduce((total, num) => total + num.value, 0)}
              rows={18}
              columns={14}
              margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
              colors={{ scheme: 'nivo' }}
              borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
              animate={true}
              motionStiffness={90}
              motionDamping={11}
              legends={[
                {
                  anchor: 'top-left',
                  direction: 'column',
                  justify: false,
                  translateX: -100,
                  translateY: 0,
                  itemsSpacing: 4,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  itemTextColor: '#777',
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                        itemBackground: '#f7fafb'
                      }
                    }
                  ]
                }
              ]}
            />
          </div>
          <PieChart title="Tipo de Atendimento" data={file.tiposDeAtendimento} />
          <PieChart title="Tipo de Consulta" data={file.tipoDeConsulta} />
          <PieChart title="Vigilância em saúde bucal" data={file.vigilanciaEmSaudeBucal} />
          <PieChart title="Procedimentos" data={file.procedimentos} />
          <PieChart title="Fornecimento" data={file.fornecimento} />
          <PieChart title="Conduta / Desfecho" data={file.condutaDesfecho} />
          <PieChart title="Encaminhamento" data={file.encaminhamento} />
        </>
      )}

    </Container>
  );
}

export default Report;
