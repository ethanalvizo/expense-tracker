import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import db from '../../config/fire';

import {
    Card,
    Form,
    Button,
    ButtonGroup,
    ToggleButton,
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

    const formatDateString = (dateTime) => {
        if (!dateTime) {
            return 'N/A';
        }

        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        
        dateTime = dateTime.split('T');
        dateTime = dateTime[0].slice(1,11)

        const date = dateTime.slice(0, 10);

        const day = date.slice(8);
        const month = monthNames[Number.parseInt(date.slice(5, 7), 10) - 1];
        const year = date.slice(0, 4);

        return {
            month: month,
            day: day,
            year: year,
            full: dateTime,
            format: `${month} ${day}, ${year}`
        }
    };

    let date = formatDateString(JSON.stringify(new Date()));

    const handleSubmit = (e) => {
        e.preventDefault()

        db.database().ref(`Transactions/${currentUser.uid}/${date.year}/${date.month}`).push({
            name: nameRef.current.value,
            type: radioValue.name,
            category: categoryRef.current.value,
            amount: parseFloat(amountRef.current.value),
            date: date.full
        })

        //resets form after submission
        e.target.reset()
    }

    return (
        <>
            <Card className="border-0 ">
                <Card.Body>
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
                            <Button className="bg-light border-0 text-dark shadow-sm" style={{width: '40%'}} type="reset">Cancel</Button>
                            <Button className=" shadow-sm" style={{width: '40%'}} type="submit">Add</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

