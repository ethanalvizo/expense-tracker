import React, { useState } from 'react';
import Transaction from './Transaction';
import db from '../../config/fire';
import { useAuth } from '../../contexts/AuthContext';

import {
    Card,
    Modal,
    Button
} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';

const DataFeed = ({ expenses, income, amount, category }) => {
    const [show, setShow] = useState(false);
    const { currentUser } = useAuth();
    const [deleteTransactions, setDeleteTransactions] = useState([]);
    const [deleteOption, setDeleteOption] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        for (let index in deleteTransactions){
            console.log('deleting', deleteTransactions[index])
            db.database().ref(`Transactions/${currentUser.uid}/2021/April/${deleteTransactions[index]}`).set(null)
        }
    }

    const columns = [{
        dataField: 'name',
        text: 'Name',
        sort: true,
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
        sort: true,
    }];

    return (
        <>
            <Card className="border-0 shadow min-vh-50">
                <Card.Header as="h3">
                    <div className="row justify-content-between px-3">
                        <div>Recent Payments</div>
                        <span>
                            {deleteOption && <Button variant="outline-danger" onClick={handleDelete} className="mr-3">Delete</Button>}
                            <Button variant="outline-success" onClick={handleShow} >Add Transaction</Button>
                        </span>
                    </div>
                </Card.Header>
                <Card.Body>
                    <BootstrapTable
                        bootstrap4
                        keyField='id'
                        data={expenses}
                        columns={columns}
                        pagination={paginationFactory()}
                        cellEdit={cellEditFactory({
                            mode: 'click',
                            afterSaveCell: (oldValue, newValue, row, column) => {
                                console.log(`Changed ${oldValue} to ${newValue} in ${column.name}`)
                                db.database().ref(`Transactions/${currentUser.uid}/2021/April/${row.id}`).set({
                                    amount: row.amount,
                                    category: row.category,
                                    date: row.date,
                                    name: row.name,
                                    type: row.type
                                })
                            }
                        })}
                        selectRow={{
                            mode: 'checkbox',
                            clickToSelect: true,
                            onSelect: (row) => {               
                                if (deleteTransactions.includes(row.id)) {
                                    let index = deleteTransactions.indexOf(row.id);
                                    if (index > -1) {
                                        deleteTransactions.splice(index, 1)
                                    }
                                }
                                else {
                                    deleteTransactions.push(row.id)
                                }
                                setDeleteOption(deleteTransactions.length !== 0)
                            }
                        }}
                    />
                </Card.Body>

            </Card>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Transaction handleClose={handleClose} category={category} />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>

        </>
    )
}

export default DataFeed
