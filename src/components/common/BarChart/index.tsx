import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface Props {
  data: object[];
  keys: string[];
  legend: string;
}

const BarChart: React.FC<Props> = ({ data, keys, legend }) => {
  return (
    <div style={{ height: 400 }}>
        <ResponsiveBar
          data={data}
          keys={keys}
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
            legend,
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
  );
}

export default BarChart;
