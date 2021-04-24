import React from 'react'
import Transaction from './Transaction';
import DataFeed from './DataFeed';

export default function Dashboard() {
    return (
        <div className="row">
            <div className="col-7 mx-auto">
                <DataFeed />
            </div>
            <div className="col-5 mx-auto my-auto" style={{maxWidth: '600px'}}>
                <Transaction />
            </div> 
        </div>
    )
}

