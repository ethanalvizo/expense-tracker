import React from 'react'
import Transaction from './Transaction';
import DataFeed from './DataFeed';
import Trends from './Trends';

export default function Dashboard() {
    return (
        <>
            <div className="row my-5">
                <div className="col-7 mx-auto">
                    <DataFeed />
                </div>
                <div className="col-5 mx-auto my-auto" style={{ maxWidth: '600px' }}>
                    <Transaction />
                </div>
            </div>
            <hr className="mx-3"></hr>
            <div className="row my-5">
                <div className="col-7 mx-auto">
                    <Trends />
                </div>
                <div className="col-5 mx-auto my-auto" style={{ maxWidth: '600px' }}>

                </div>
            </div>
        </>
    )
}

