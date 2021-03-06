import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import db from '../../config/fire';

import {
    Card,
    Form,
    Button,
    ButtonGroup,
    ToggleButton,
} from 'react-bootstrap';

export default function Transaction({ handleClose, category }) {
    const nameRef = useRef();
    const amountRef = useRef();
    const categoryRef = useRef();
    const newCategoryRef = useRef();
    const [newCategory, setNewCategory] = useState('');
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

    let expenseCategories = category.expenses;
    expenseCategories = expenseCategories.map((item) => <option>{item.category}</option>)
    let depositCategories = category.deposit;
    depositCategories = depositCategories.map((item) => <option>{item.category}</option>)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(newCategory === 'Add New Category') {
            db.database().ref(`Settings/${currentUser.uid}/Categories/${radioValue.name}`).push({
                category: newCategoryRef.current.value
            })
            db.database().ref(`Transactions/${currentUser.uid}/${date.year}/${date.month}`).push({
                name: nameRef.current.value,
                type: radioValue.name,
                category: newCategoryRef.current.value,
                amount: parseFloat(amountRef.current.value),
                date: date.full
            })
        }
        else {
            db.database().ref(`Transactions/${currentUser.uid}/${date.year}/${date.month}`).push({
                name: nameRef.current.value,
                type: radioValue.name,
                category: categoryRef.current.value,
                amount: parseFloat(amountRef.current.value),
                date: date.full
            })
        }

        //resets form after submission
        e.target.reset()
        handleClose();
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
                                <Form.Control as="select" ref={categoryRef} onChange={(e) => setNewCategory(e.target.value)} required>
                                    {expenseCategories}
                                    <option>Add New Category</option>
                                </Form.Control>
                                :
                                <Form.Control as="select" ref={categoryRef} onChange={(e) => setNewCategory(e.target.value)} required>
                                    {depositCategories}
                                    <option>Add New Category</option>
                                </Form.Control>

                            }
                            {newCategory === 'Add New Category' && <Form.Control type="text" placeholder="Enter new category..." className="mt-3" ref={newCategoryRef} />}
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
                        <hr />
                        <div className="d-flex justify-content-between">
                            <Button className="bg-light border-0 text-dark shadow-sm" style={{width: '40%'}} type="reset" onClick={handleClose}>Cancel</Button>
                            <Button className=" shadow-sm" style={{width: '40%'}} type="submit">Add</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

