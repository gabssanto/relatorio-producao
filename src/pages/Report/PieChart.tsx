import React from 'react';
import { Title } from './styles';
import { ResponsivePie, PieDatum } from '@nivo/pie';

interface Props {
  title: string;
  data: PieDatum[];
}

const PieChart: React.FC<Props> = ({ title, data }) => {
  return (
    <>
      <Title>{title}</Title>
      <div style={{ height: 300 }}>
        <ResponsivePie
          data={data}
          enableSlicesLabels={false}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          colors={{ scheme: 'category10' }}
          borderWidth={1}
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
      </div>
    </>
  );
}

export default PieChart;
