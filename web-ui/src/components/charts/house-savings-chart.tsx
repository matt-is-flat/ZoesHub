import React from 'react';
import Chart, { ChartDataSets, ChartPoint } from 'chart.js';
import { observer } from 'mobx-react';
import { DataGetter, TransactionDataPoint } from '../../../../common/models';

interface HouseSavingsChartProps {
    dataGetters: DataGetter[];
}

const HouseSavingsChart = observer((props: HouseSavingsChartProps): JSX.Element => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {        
        Promise.all(props.dataGetters.map(async (dataGetter): Promise<ChartDataSets> => {
            return {
                label: dataGetter.label,
                backgroundColor: dataGetter.backgroundColour,
                data: (await dataGetter.getData()).map((data): ChartPoint => {
                    return {
                        x: data.date,
                        y: data.dollarAmount
                    };
                })
            };
        })).then(datasets => {
            if (!canvasRef.current) {
                console.error('Cannot find div to mount chart on')
                return;
            }

            new Chart(canvasRef.current, {
                type: 'line',
                data: {
                    datasets
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true
                        }],
                        xAxes: [{
                            type: 'time'
                        }]
                    }
                }
            });
        });
    });

    return <>
        <canvas id="house-savings-chart" ref={canvasRef} />
    </>;
});

export { HouseSavingsChart };