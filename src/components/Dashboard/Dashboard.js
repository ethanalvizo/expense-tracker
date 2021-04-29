import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import db from '../../config/fire';

import Transaction from './Transaction';
import DataFeed from './DataFeed';
import Trends from './BarTrends';
import MoreTrends from './PieTrends';
import TopBar from './TopBar';
import MonthlySummary from './MonthlySummary';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);
    const [category, setCategory] = useState({
        expenses: [],
        deposit: []
    });
    const [amount, setAmount] = useState({
        expenses: 0,
        income: 0
    });
    const { currentUser } = useAuth();

    useEffect(() => {
        const expenseRef = db.database().ref(`Transactions/${currentUser.uid}/2021/April`);
        expenseRef.on('value', (items) => {
            const expenses = items.val();

            let expenseList = [], incomeList = [], expenseSum = 0, incomeSum = 0
            for (let id in expenses) {
                if (expenses[id].type === 'Expense') {
                    expenseList.push({id: id, ...expenses[id]})
                    expenseSum += expenses[id].amount
                }
                else {
                    incomeList.push({id: id, ...expenses[id]})
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
            setIncome(incomeList);
        })

        const expenseCategoryRef = db.database().ref(`Settings/${currentUser.uid}/Categories/Expense`);
        expenseCategoryRef.on('value', (items) => {
            const categories = items.val();

            let categoryList = [];
            for (let id in categories) {
                categoryList.push({id: id, ...categories[id]})
            }
            setCategory({
                expenses: categoryList
            })
        })

        const depositCategoryRef = db.database().ref(`Settings/${currentUser.uid}/Categories/Deposit`);
        depositCategoryRef.on('value', (items) => {
            const categories = items.val();

            let categoryList = [];
            for (let id in categories) {
                categoryList.push({id: id, ...categories[id]})
            }
            setCategory({
                deposit: categoryList
            })
        })
    }, [currentUser.uid]);

    return (
        <>
            <div>
                <TopBar />
            </div>
            <hr className="mt-0 mb-4"/>
            <div className="row mt-4 mx-5">
                <MonthlySummary amount={amount} />
            </div>
            <div className="row my-5 mx-5">
                <DataFeed expenses={expenses} income={income} amount={amount} category={category}/>
            </div>
            <hr className="mx-3"></hr>
            <div className="row my-5">
                <div className="col-7 mx-auto">
                    <Trends expenses={expenses} />
                </div>
                <div className="col-5 mx-auto my-auto" style={{ maxWidth: '600px' }}>
                    <MoreTrends expenses={expenses} amount={amount}/>
                </div>
            </div>
        </>
    )
}

export default Dashboard

