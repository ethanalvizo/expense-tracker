import React, { useState, useEffect } from 'react'
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Animation } from '@devexpress/dx-react-chart';

const dummyData = [
  { category: 'Food & Dining', amount: 279.43 },
  { category: 'Groceries', amount: 16.25 },
  { category: 'Rent & Housing', amount: 286.96 },
  { category: 'Personal Development', amount: 255.13 },
  { category: 'School', amount: 49.01 },
  { category: 'Utilities', amount: 109.80 },
];

const Trends = ({ expenses }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (expenses.length !== 0) {
      console.log('expenses is not empty')
      let temp = [];
      for (let index in expenses) {
        if (temp.some(expense => expense.category === expenses[index].category)) {
          let position = temp.findIndex((item) => item.category === expenses[index].category);
          let newSum = temp[position].amount + expenses[index].amount;
          temp[position].amount = newSum;
        }
        else {
          temp.push({ category: expenses[index].category, amount: expenses[index].amount})
        }
      }
      setChartData(temp)
    }
    else {
      console.log('expenses is empty')
    }
  }, [expenses])

  return (
    (expenses.length !== 0) ? <div className="card">
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
    </div> : null
  )
}

export default Trends
