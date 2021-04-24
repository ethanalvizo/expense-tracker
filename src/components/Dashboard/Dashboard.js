import React from 'react'
import Transaction from './Transaction';
import DataFeed from './DataFeed';

export default function Dashboard() {
    return (
        <div className="row">
            <div className="col-6 mx-auto">
                <DataFeed />
            </div>
            <div className="col-6 mx-auto" style={{maxWidth: '600px'}}>
                <Transaction />
            </div> 
        </div>
    )
}

