import React, { useState } from 'react';
import { 
    TextField,
    Grid,
    Card,
    Button,
    makeStyles 
}  from '@material-ui/core';
import { Alert } from '@material-ui/lab'

import fire from '../../config/fire';

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [errorMessage, setErrorMessage] = useState('');

    const handleFieldChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async (e) => {  
        e.preventDefault()
        setErrorMessage('')
        fire.auth().createUserWithEmailAndPassword(values.email, values.password)
        .catch((error) => {
            // to access the error message use error.message
           setErrorMessage('Failed to sign in')
        });
    }

    return (
        <>
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: '100vh'}}
        >
            <Card style={{minWidth: '30vw'}}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    style={{ padding: '2em'}}
                >
                    <Grid item>
                        <h2>Register</h2>
                    </Grid>
                    {errorMessage && <Grid>
                        <Alert severity="error">{errorMessage}</Alert>
                    </Grid>}
                    <Grid item style={{width: "100%"}}>
                        <TextField 
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleFieldChange}
                            variant="outlined"
                            label="Username/Email"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item style={{width: "100%"}}>
                        <TextField 
                            name="password"
                            type="text"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleFieldChange}
                            variant="outlined"
                            label="Password"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item style={{width: "100%"}}>
                        <Button variant="contained" color="primary" fullWidth={true} onClick={handleRegister}>Sign Up</Button>
                    </Grid>

                </Grid>
            </Card>

        </Grid>
        </>
    )
}

export default Register
