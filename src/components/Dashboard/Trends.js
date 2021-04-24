import React, { useState } from 'react'
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
    { category: 'Food & Dining', amount: 279.43 },
    { category: 'Groceries', amount: 16.25 },
    { category: 'Rent & Housing', amount: 286.96 },
    { category: 'Personal Development', amount: 255.13 },
    { category: 'School', amount: 49.01 },
    { category: 'Utilities', amount: 109.80 },
];

const Trends = () => {
    const [chartData, setChartData] = useState(data);

    return (
        <div className="card">
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={500} />

          <BarSeries
            valueField="amount"
            argumentField="category"
          />
          <Title text="Expenses for April" />
          <Animation />
        </Chart>
      </div>
    )
}

export default Trends
