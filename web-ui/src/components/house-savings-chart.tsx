import { observer } from 'mobx-react';
import React from 'react';
import { HouseSavingsStore } from 'stores/house-savings-store';

interface HouseSavingsChartProps {
    store: HouseSavingsStore;
}

interface TransactionDataPoint {
    date: string;
    dollarAmount: number;
}

const HouseSavingsChart = observer((props: HouseSavingsChartProps): JSX.Element => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);


    return (
        <canvas id="house-savings-chart" ref={canvasRef} />
    )
});

export { HouseSavingsChart };