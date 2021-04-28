import React, { useState, useEffect } from 'react'
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Animation } from '@devexpress/dx-react-chart';

const Trends = ({ expenses }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (expenses.length !== 0) {
      let newData = [];
      for (let index in expenses) {
        if (newData.some(expense => expense.category === expenses[index].category)) {
          let position = newData.findIndex((item) => item.category === expenses[index].category);
          let newSum = newData[position].amount + expenses[index].amount;
          newData[position].amount = newSum;
        }
        else {
          newData.push({ category: expenses[index].category, amount: expenses[index].amount})
        }
      }
      setChartData(newData)
    }
  }, [expenses])

  return (
    (expenses.length !== 0) ? <div className="card">
      <Chart
        data={chartData}
        rotated={true}
      >
        <ArgumentAxis />
        <ValueAxis max={1000} />

        <BarSeries
          valueField="amount"
          argumentField="category"
          color="#23AFEC"
        />
        <Title text="Expenses for April" />
        <Animation />
      </Chart>
    </div> : null
  )
}

export default Trends
