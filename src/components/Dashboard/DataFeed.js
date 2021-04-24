import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import db from '../../config/fire';

import { Card } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';

const DataFeed = () => {
    const [expenses, setExpenses] = useState();
    const [amount, setAmount] = useState(0);
    const [data, setData] = useState([{

    }]);
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
        })

        for (let index in expenses){
            let temp = data;
            console.log('temp', temp)
            const newObj = {
                    'id': index, 
                    'name': expenses[index].name,
                    'amount': expenses[index].amount,
                    'category': expenses[index].category,
                    'type': expenses[index].type,
                    'date': expenses[index].date 
                
            }
            temp.push(newObj);
            setData(temp);
        }

        console.log()
    }, [])

    return (
        <>
        <Card>
            Total Sum {amount}
            {/* <BootstrapTable keyField='id' data={} columns={columns} /> */}
        </Card>
            
        </>
    )
}

export default DataFeed
