import React, { useState, useEffect } from 'react'
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-bootstrap4';
// import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';

const MoreTrends = ({ expenses }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (expenses.length !== 0) {
      let temp = [];
      for (let index in expenses) {
        if (temp.some(expense => expense.category === expenses[index].category)) {
          let position = temp.findIndex((item) => item.category === expenses[index].category);
          let newSum = temp[position].amount + expenses[index].amount;
          temp[position].amount = newSum;
        }
        else {
          temp.push({ category: expenses[index].category, amount: expenses[index].amount })
        }
      }
      setChartData(temp)
    }
  }, [expenses])

  return (
    (expenses.length !== 0) ? <div className="card">
      <Chart
        data={chartData}
      >
        <PieSeries
          valueField="amount"
          argumentField="category"
        />
        <Title
          text="Expenses for April"
        />
        <Animation />
      </Chart>
    </div> : null
  )
}

export default MoreTrends

