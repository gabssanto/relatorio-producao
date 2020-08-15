import React, { useEffect, useState } from 'react';
import { RadialChart, DiscreteColorLegend } from 'react-vis';
import { ResponsivePie } from '@nivo/pie'
import { Container, Hint } from './styles';
import { useParams } from 'react-router-dom';
import { firebaseFirestore } from '../../firebase';

const Report = () => {
  const { fileName } = useParams();
  const [file, setFile] = useState();
  const [hover, setHover] = useState();

  async function getFile() {
    const res = await firebaseFirestore.collection('relatorios').doc(decodeURIComponent(fileName)).get();
    setFile(res.data());
  }
  useEffect(() => {
    getFile();
  }, []);
  useEffect(() => {
    console.log(file);
  }, [file]);
  return (
    <Container>
      {!!file ? <h1>{file.local}</h1> : <h1>Carregando local</h1>}
      {!!hover && hover !== false && <Hint>{hover.label}</Hint>}
      {/* <RadialChart
        animation
        data={!!file ? [{ angle: file.resumoProducao.registrosIdentificados, label: `${file.resumoProducao.registrosIdentificados}` }, { angle: file.resumoProducao.registrosNaoIdentificados, label: `${file.resumoProducao.registrosNaoIdentificados}` }] : [{ angle: 10 }, { angle: 10 }]}
        onValueMouseOver={v => setHover(v)}
        onSeriesMouseOut={() => setHover(false)}
        width={300}
        height={300} />
      <DiscreteColorLegend height={100} width={300} items={['Registros Identificados', 'Registros Não Identificados']} /> */}
      <div style={{ height: 300 }}>
        {!!file && (
          <ResponsivePie
            data={[
              {
                "id": 'Registros Identificados',
                "label": 'Registros Identificados',
                "value": file.resumoProducao.registrosIdentificados,
              },
              {
                "id": 'Registros Não Identificados',
                "label": 'Registros Não Identificados',
                "value": file.resumoProducao.registrosNaoIdentificados,
              },
            ]}
            enableSlicesLabels={false}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            padAngle={0.7}
            innerRadius={0.5}
            colors={{ scheme: 'category10' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                translateY: 70,
                itemWidth: 150,
                itemHeight: 22,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000'
                    }
                  }
                ]
              }
            ]}
          />
        )}
      </div>

    </Container>
  );
}

export default Report;
