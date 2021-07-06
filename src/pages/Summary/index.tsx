import React, { useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useEffect } from 'react';
import HeaderComponent from '../../components/common/Header';

import { Container } from './styles';
import { useState } from 'react';

const Summary: React.FC = () => {
  const printRef = useRef(null);
  const [productionSummary, setProductionSummary] = useState({});

  const monthsObj = {
    1: 'Jan',
    2: 'Fev',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
  }

  useEffect(() => {
    const localReports = JSON.parse(localStorage.getItem('relatorios') || '[]');
    const resumoProducaoPorMes =
    localReports.reduce((reports, report) => {
      const month = monthsObj[Number(report.periodo.inicio.split('/')[1])];
      const resumoProducao = report.resumoProducao.reduce((resumos, resumo) => ({
        ...resumos,
        [resumo.label]: resumo.value
      }), {})
      return {
        ...reports,
        [month]: {
          ...resumoProducao,
          month
        }
      };
    }, {})
    setProductionSummary(resumoProducaoPorMes);
    // console.log(localReports.map(report => report));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(Object.keys(productionSummary).map(key => key !== 'month' && productionSummary[String(key)] ));
  return (
    <Container ref={printRef}>
      <HeaderComponent printRef={printRef} />
      <div style={{ height: 400 }}>
        <ResponsiveBar
          data={Object.values(Object.keys(productionSummary).map(key => key !== 'month' && productionSummary[key] ))}
          keys={['Registros identificados', 'Registros não identificados']}
          indexBy='month'
          margin={{ top: 50, right: 50, bottom: 100, left: 50 }}
          padding={0.3}
          colors={{ scheme: 'category10' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Resumo de Produção',
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
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateY: 80,
              itemsSpacing: 2,
              itemWidth: 200,
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
    </Container>
  );
}

export default Summary;
