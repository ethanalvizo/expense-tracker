import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import db from '../../config/fire';

import Transaction from './Transaction';
import DataFeed from './DataFeed';
import Trends from './Trends';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState({
        expenses: 0,
        income: 0
    });
    const { currentUser } = useAuth();

    useEffect(() => {
        const expenseRef = db.database().ref(`Transactions/${currentUser.uid}/2021/April`);
        expenseRef.on('value', (items) => {
            const expenses = items.val();

            let expenseList = [], expenseSum = 0, incomeSum = 0
            for (let id in expenses) {
                expenseList.push({id: id, ...expenses[id]})
                if (expenses[id].type === 'Expense') {
                    expenseSum += expenses[id].amount
                }
                else {
                    incomeSum += expenses[id].amount
                }
            }

            expenseSum = expenseSum.toFixed(2);
            incomeSum = incomeSum.toFixed(2);

            setAmount({
                expenses: expenseSum,
                income: incomeSum
            })
            setExpenses(expenseList);
        })
    }, [currentUser.uid]);

    return (
        <>
            <div className="row my-5">
                <div className="col-7 mx-auto">
                    <DataFeed expenses={expenses} amount={amount}/>
                </div>
                <div className="col-5 mx-auto my-auto" style={{ maxWidth: '600px' }}>
                    <Transaction />
                </div>
            </div>
            <hr className="mx-3"></hr>
            <div className="row my-5">
                <div className="col-7 mx-auto">
                    <Trends expenses={expenses} />
                </div>
                <div className="col-5 mx-auto my-auto" style={{ maxWidth: '600px' }}>

                </div>
            </div>
        </>
    )
}

export default Dashboard

