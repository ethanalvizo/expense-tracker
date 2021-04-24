import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import db from '../../config/fire';

import { 
    Card, 
    Form, 
    Button, 
    ButtonGroup,
    ToggleButton,
    Alert 
} from 'react-bootstrap';

export default function Transaction() {
    const nameRef = useRef();
    const amountRef = useRef();
    const categoryRef = useRef();
    const { currentUser } = useAuth();

    const [radioValue, setRadioValue] = useState({ name: 'Expense', value: '1' });
    const radios = [
        { name: 'Expense', value: '1' },
        { name: 'Deposit', value: '2' },
    ];
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(nameRef.current.value)
        console.log(parseInt(amountRef.current.value))
        console.log(categoryRef.current?.value)
        console.log(radioValue.name)        
        db.database().ref('Transactions/' + currentUser.uid).push({
            name: nameRef.current.value,
            type: radioValue.name,
            category: categoryRef.current.value,
            amount: parseInt(amountRef.current.value),
        })
    }
    return (
        <>
        <Card>
            <Card.Body>
                <h3 className="text-center mb-4 bg-light">Add Transaction</h3>
                {/* {error && <Alert variant="danger">{error}</Alert>} */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" step="0.01" ref={amountRef} required />
                        <Form.Label>Category</Form.Label>
                        {radioValue.value === '1' ? 
                            <Form.Control as="select" ref={categoryRef} required>
                                <option>Food and Dining</option>
                                <option>Groceries</option>
                                <option>Rent and Housing</option>
                                <option>Personal Development</option>
                            </Form.Control>
                            :
                            <Form.Control as="select" ref={categoryRef} required>
                                <option>Job</option>
                                <option>Side Business</option>
                                <option>Investment</option>
                            </Form.Control>

                        }
                        <ButtonGroup className="w-100 mt-4 mb-2" toggle>
                            {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                type="radio"
                                variant="light"
                                name={radio.name}
                                value={radio.value}
                                checked={radioValue.value === radio.value}
                                onChange={(e) => setRadioValue({
                                    name: e.target.name,
                                    value: e.target.value
                                })}
                            >
                                {radio.name}
                            </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Button className="w-25 bg-light border-0 text-dark shadow-sm" type="reset">Cancel</Button>
                        <Button className="w-50 shadow-sm" type="submit">Add</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
        </>
    )
}

