import React, { useState } from 'react';
import Transaction from './Transaction';

import {
    Card,
    Modal,
    Button
} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'

const DataFeed = ({ expenses, income, amount, category }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            <Card className="border-0 shadow min-vh-50">
                <Card.Header as="h3">
                    <div className="row justify-content-between px-3">
                        <div>Recent Payments</div>
                        <Button variant="outline-success" onClick={handleShow} >Add Transaction</Button>
                    </div>
                </Card.Header>
                <Card.Body>

                    <BootstrapTable bootstrap4 keyField='id' data={expenses} columns={columns} pagination={paginationFactory()} />
                </Card.Body>

            </Card>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body><Transaction handleClose={handleClose} category={category} /></Modal.Body>
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
