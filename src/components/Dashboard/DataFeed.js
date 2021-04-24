import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import db from '../../config/fire';

import { Card } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';

const DataFeed = () => {
    const [expenses, setExpenses] = useState();
    const [amount, setAmount] = useState(0);
    const [data, setData] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const expenseRef = db.database().ref(`Transactions/${currentUser.uid}/2021/April`);
        expenseRef.on('value', (items) => {
            const expenses = items.val();

            let expenseList = [];
            let sum = 0
            for (let id in expenses) {
                expenseList.push(expenses[id])
                sum += expenses[id].amount
            }
            sum = sum.toFixed(2);

            setAmount(sum)
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
                Total Sum {amount}
                <BootstrapTable keyField='id' data={data} columns={columns} />
            </Card>

        </>
    )
}

export default DataFeed
