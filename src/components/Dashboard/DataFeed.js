import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import db from '../../config/fire';

import { 
    Card,
    Badge
} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'

const DataFeed = () => {
    const [expenses, setExpenses] = useState([]); //expenses is similar to data variable but without the id
    const [amount, setAmount] = useState({
        expenses: 0,
        income: 0
    });
    const [data, setData] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const expenseRef = db.database().ref(`Transactions/${currentUser.uid}/2021/April`);
        expenseRef.on('value', (items) => {
            const expenses = items.val();

            let expenseList = [], expenseSum = 0, incomeSum = 0
            for (let id in expenses) {
                expenseList.push(expenses[id])
                if(expenses[id].type === 'Expense'){
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

            setData([])
            for (let index in expenses){
                setData( prevState => [
                    ...prevState, {
                        'id': index,
                        'name': expenses[index].name,
                        'amount': expenses[index].amount,
                        'category': expenses[index].category,
                        'type': expenses[index].type,
                        'date': expenses[index].date
                    }
                ])
            }
        })
    }, []);

    const columns = [{
        dataField: 'name',
        text: 'Name',
        sort: true
    }, {
        dataField: 'amount',
        text: 'Amount',
        sort: true
    }, {
        dataField: 'category',
        text: 'Category',
        sort: true
    }, {
        dataField: 'type',
        text: 'Type',
        sort: true
    }, {
        dataField: 'date',
        text: 'Date',
        sort: true
    }

    ];

    return (
        <>
            <Card className="border-0 shadow">
                <Card.Body>
                    <h3 className="text-center mb-4 p-2 bg-light">Recent Expenses</h3>
                    <div className="row d-flex justify-content-around">
                        <h5>Monthly Expenses <Badge variant="light">{amount.expenses}</Badge></h5>
                        <h5>Monthly Income <Badge variant="light">{amount.income}</Badge></h5>
                    </div>
                    <BootstrapTable bootstrap4 keyField='id' data={data} columns={columns} pagination={paginationFactory()} />
                </Card.Body>
                
            </Card>

        </>
    )
}

export default DataFeed
