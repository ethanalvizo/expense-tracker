import React, { useState, useEffect } from 'react';

import {
    Card,
    Badge
} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'

const DataFeed = ({expenses, amount}) => {
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
                        {amount && <h5>Monthly Expenses <Badge variant="light">{amount.expenses}</Badge></h5>}
                        {amount && <h5>Monthly Income <Badge variant="light">{amount.income}</Badge></h5>}
                    </div>
                    <BootstrapTable bootstrap4 keyField='id' data={expenses} columns={columns} pagination={paginationFactory()} />
                </Card.Body>

            </Card>

        </>
    )
}

export default DataFeed
