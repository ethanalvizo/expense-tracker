import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Profile() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail, updateDisplayName } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError("")
        if(nameRef.current.value !== currentUser.displayName) {
            promises.push(updateDisplayName(nameRef.current.value))
        }
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value && passwordConfirmRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        
        Promise.all(promises).then (() => {
            history.push('/');
        }).catch (() => {
            setError('Failed to update account')
        }).finally (() => {
            setLoading(false)
        })

    }

    return (
        <>
        <Card className="mx-auto" style={{ maxWidth: '400px'}}> 
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required defaultValue={currentUser.displayName} placeholder={currentUser.displayName ? currentUser.displayName : 'Enter first name...'}/>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
        </div>            
        </>
    )
}
