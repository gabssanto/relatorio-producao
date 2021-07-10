import React, { useRef, useState } from 'react';
import { useEffect } from 'react';

import HeaderComponent from '../../components/common/Header';
import BarChart from '../../components/common/BarChart';

import { Container } from './styles';
import { mapToArray, parseFaixaEtaria } from './utils';
import { flattenDeep } from 'lodash';

type SummaryValues = {
  data: object;
  keys: string[];
  legend: string;
}

type SummaryData = {
  resumoProducao: SummaryValues;
  dadosGerais: SummaryValues;
  turno: SummaryValues;
  faixaEtaria: SummaryValues;
};

const summaryTemplate: SummaryData = {
  resumoProducao: {
    data: {},
    keys: ['Registros identificados', 'Registros não identificados'],
    legend: 'Resumo de Produção'
  },
  dadosGerais: {
    data: {},
    keys: ['Gestante', 'Paciente com necessidades especiais'],
    legend: 'Dados Gerais'
  },
  turno: {
    data: {},
    keys: ['Manhã', 'Tarde', 'Noite', 'Não informado'],
    legend: 'Turno'
  },
  faixaEtaria: {
    data: {},
    keys: [],
    legend: 'Faixa Etaria',
  }
}

const Summary: React.FC = () => {
  const printRef = useRef(null);
  const [summary, setSummary] = useState<SummaryData>(summaryTemplate);

  useEffect(() => {
    const localReports = JSON.parse(localStorage.getItem('relatorios') || '[]');
    const resumoProducaoPorMes = mapToArray(localReports, 'resumoProducao');
    const dadosGeraisMes = mapToArray(localReports, 'dadosGerais');
    const shiftMes = mapToArray(localReports, 'turno');
    const faixaEtaria = parseFaixaEtaria(localReports, 'faixaEtaria');
    // console.log(faixaEtaria);


    setSummary({
      ...summary,
      resumoProducao: {
        ...summary.resumoProducao,
        data: resumoProducaoPorMes,
      },
      dadosGerais: {
        ...summary.dadosGerais,
        data: dadosGeraisMes,
      },
      turno: {
        ...summary.turno,
        data: shiftMes,
      },
      faixaEtaria: {
        ...summary.faixaEtaria,
        data: faixaEtaria,
      }
    });
    // console.log(shiftMes);

    // console.log(localReports.map(report => report.dadosGerais), resumoProducaoPorMes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(Object.keys(summary).map(type => summary[type]));


  // console.log(Object.keys(productionSummary).map(key => key !== 'month' && productionSummary[String(key)] ));
  return (
    <Container ref={printRef}>
      <HeaderComponent printRef={printRef} />
      {Object.keys(summary).map(type => {
        if (type === 'faixaEtaria') {
          // console.log(summary[type].data)
          console.log(Array.from(new Set(flattenDeep(Object.values(summary[type].data).map(month => month.data.map(age => Object.keys(age)))))))
          return (
            <BarChart
              key={type}
              data={Object.values(Object.keys(summary[type].data).map(key => summary[type].data[key]['data']))}
              keys={Array.from(new Set(flattenDeep(Object.values(summary[type].data).map(month => month.data.map(age => Object.keys(age))))))}
              legend={summary[type].legend}
            />
            )
          }
          return (
            <BarChart
              key={type}
              data={Object.values(Object.keys(summary[type].data).map(key => summary[type].data[key]))}
              keys={summary[type].keys}
              legend={summary[type].legend}
            />
          )
      })}
    </Container>
  );
}

export default Summary;
