import React, { useRef, useState } from 'react';
import { useEffect } from 'react';

import HeaderComponent from '../../components/common/Header';
import BarChart from '../../components/common/BarChart';

import { Container } from './styles';
import { mapToArray, parseFaixaEtaria, summaryTemplate } from './utils';
import { SummaryData } from './types';

const Summary: React.FC = () => {
  const printRef = useRef(null);
  const [summary, setSummary] = useState<SummaryData>(summaryTemplate);

  useEffect(() => {
    const localReports = JSON.parse(localStorage.getItem('relatorios') || '[]');
    const resumoProducaoPorMes = mapToArray(localReports, 'resumoProducao');
    const dadosGeraisMes = mapToArray(localReports, 'dadosGerais');
    const shiftMes = mapToArray(localReports, 'turno');
    const faixaEtaria = parseFaixaEtaria(localReports, 'faixaEtaria');
    const sexo = mapToArray(localReports, 'sexo');
    const tiposDeAtendimento = mapToArray(localReports, 'tiposDeAtendimento');
    const tipoDeConsulta = mapToArray(localReports, 'tipoDeConsulta');
    const vigilanciaEmSaudeBucal = mapToArray(localReports, 'vigilanciaEmSaudeBucal');
    const procedimentos = mapToArray(localReports, 'procedimentos');
    const fornecimento = mapToArray(localReports, 'fornecimento');
    const condutaDesfecho = mapToArray(localReports, 'condutaDesfecho');
    const encaminhamento = mapToArray(localReports, 'encaminhamento');

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
      },
      sexo: {
        ...summary.sexo,
        data: sexo,
      },
      tiposDeAtendimento: {
        ...summary.tiposDeAtendimento,
        data: tiposDeAtendimento,
      },
      tipoDeConsulta: {
        ...summary.tipoDeConsulta,
        data: tipoDeConsulta,
      },
      vigilanciaEmSaudeBucal: {
        ...summary.vigilanciaEmSaudeBucal,
        data: vigilanciaEmSaudeBucal,
      },
      procedimentos: {
        ...summary.procedimentos,
        data: procedimentos,
        keys: localReports[0].procedimentos?.map(e => e.label),
      },
      fornecimento: {
        ...summary.fornecimento,
        data: fornecimento,
      },
      condutaDesfecho: {
        ...summary.condutaDesfecho,
        data: condutaDesfecho,
      },
      encaminhamento: {
        ...summary.encaminhamento,
        data: encaminhamento,
        keys: localReports[0].encaminhamento?.map(e => e.label),
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container ref={printRef}>
      <HeaderComponent printRef={printRef} />
      {Object.keys(summary).map(type => {
        if (type !== 'faixaEtaria')
          return (
            <BarChart
              key={type}
              data={Object.values(Object.keys(summary[type].data).map(key => summary[type].data[key]))}
              keys={summary[type].keys}
              legend={summary[type].legend}
            />
          )
        return null;
      })}
    </Container>
  );
}

export default Summary;
