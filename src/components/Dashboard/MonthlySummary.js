import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

import {
    Jumbotron,
    Button
} from 'react-bootstrap'

const MonthlySummary = ({ amount }) => {
    const { currentUser } = useAuth();

    return (
        <Jumbotron fluid style={{ backgroundColor: '#f0f0f0', minWidth: '100%'}}>
            <div className="row mx-2 justify-content-between">
                <div>
                    <h1 className="display-4">Hello, {currentUser.displayName}!</h1>
                    <p className="lead">
                        Welcome to your personal finance dashboard.
                    </p>
                    {!currentUser.displayName && <p>
                        <Button className="btn-lg" variant="primary">Learn more</Button>
                    </p>}
                </div>
                <div className="d-flex flex-column justify-content-center px-3 ">
                    <div className="lead my-2">
                        Monthly Expenses: <span style={{fontSize: '30px', fontWeight: 'bolder'}}>${amount.expenses}</span>
                    </div>
                    <div className="lead my-2" >
                        Monthly Income: <span style={{fontSize: '30px', fontWeight: 'bolder'}}>${amount.income}</span>
                    </div>
                </div>
            </div>


        </Jumbotron>
    )
}

export default MonthlySummary
