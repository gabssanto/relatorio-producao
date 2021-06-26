import React, { useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useEffect } from 'react';
import HeaderComponent from '../../components/common/Header';

import { Container } from './styles';
import { useState } from 'react';

const Summary: React.FC = () => {
  const printRef = useRef(null);
  const [productionSummary, setProductionSummary] = useState({});

  useEffect(() => {
    const localReports = JSON.parse(localStorage.getItem('relatorios') || '[]');
    const resumoProducaoPorMes =
    localReports.reduce((reports, report) => {
      const month = Number(report.periodo.inicio.split('/')[1]);
      return {
        ...reports,
        [month]: {
          data: report.resumoProducao,
          month
        }
      };
    }, {})
    setProductionSummary(resumoProducaoPorMes);
    // console.log(localReports.map(report => report));
    console.log(Object.values(resumoProducaoPorMes));
  }, []);

  return (
    <Container ref={printRef}>
      <HeaderComponent printRef={printRef} />
      <ResponsiveBar
              data={[Object.values(productionSummary).map((report: any) => report.data)]}
              keys={['Registros identificados', 'Registros não identificados']}
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
    </Container>
  );
}

export default Summary;
