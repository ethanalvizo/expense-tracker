import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value && passwordConfirmRef.current.value !== '') {
            return setError('Passwords do not match')
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/")
        }   catch {
            setError('Failed to create an account')
        }

        setLoading(false)

    }

    return (
        <>
        <Card className="mx-auto" style={{ maxWidth: '400px'}}>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="login">Log In</Link>
        </div>            
        </>
    )
}
