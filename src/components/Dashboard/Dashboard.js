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

    const defaultExpenseCategories = [
        'Food & Dining',
        'Rent & Housing',
        'Health & Hygiene',
        'Transportation',
        'Non-Essentials',
    ]

    useEffect(() => {
        // gets all transactions and sums monthly finances
        const expenseRef = db.database().ref(`Transactions/${currentUser.uid}/${date.year}/${date.month}`);
        expenseRef.on('value', (items) => {
            const expenses = items.val();

            let expenseList = [], incomeList = [], expenseSum = 0, incomeSum = 0
            for (let id in expenses) {
                if (expenses[id].type === 'Expense') {
                    expenseList.push({ id: id, ...expenses[id] })
                    expenseSum += parseFloat(expenses[id].amount)
                }
                else {
                    incomeList.push({ id: id, ...expenses[id] })
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

        // gets expense categories
        const expenseCategoryRef = db.database().ref(`Settings/${currentUser.uid}/Categories/Expense`);
        expenseCategoryRef.on('value', (items) => {
            const categories = items.val();
            if (categories == null) {
                for (let index in defaultExpenseCategories) {
                    db.database().ref(`Settings/${currentUser.uid}/Categories/Expense`).push({
                        category: defaultExpenseCategories[index]
                    })
                }
            }
            else {
                let categoryList = [];
                for (let id in categories) {
                    categoryList.push({ id: id, ...categories[id] })
                }
                setCategory(prevState => ({
                    ...prevState,
                    expenses: categoryList,
                }))
            }
        })

        // gets deposit categories
        const depositCategoryRef = db.database().ref(`Settings/${currentUser.uid}/Categories/Deposit`);
        depositCategoryRef.on('value', (items) => {
            const categories = items.val();

            let categoryList = [];
            for (let id in categories) {
                categoryList.push({ id: id, ...categories[id] })
            }
            setCategory(prevState => ({
                ...prevState,
                deposit: categoryList
            }))
        })
    }, [currentUser.uid]);

    const formatDateString = (dateTime) => {
        if (!dateTime) {
            return 'N/A';
        }

        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        
        dateTime = dateTime.split('T');
        dateTime = dateTime[0].slice(1,11)

        const date = dateTime.slice(0, 10);

        const day = date.slice(8);
        const month = monthNames[Number.parseInt(date.slice(5, 7), 10) - 1];
        const year = date.slice(0, 4);

        return {
            month: month,
            day: day,
            year: year,
            full: dateTime,
            format: `${month} ${day}, ${year}`
        }
    };

    let date = formatDateString(JSON.stringify(new Date()));

    return (
        <>
            <div>
                <TopBar />
            </div>
            <hr className="mt-0 mb-4" />
            <div className="row mt-4 mx-5">
                <MonthlySummary amount={amount} />
            </div>
            <div className="row my-5 mx-5">
                <DataFeed expenses={expenses} income={income} amount={amount} category={category} date={date} />
            </div>
            <hr className="mx-3"></hr>
            <div className="row my-5">
                <div className="col-7 mx-auto">
                    <Trends expenses={expenses} />
                </div>
                <div className="col-5 mx-auto my-auto" style={{ maxWidth: '600px' }}>
                    <MoreTrends expenses={expenses} amount={amount} />
                </div>
            </div>
        </>
    )
}

export default Dashboard

