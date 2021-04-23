import React, { useState } from 'react';
import { 
    TextField,
    Grid,
    Card,
    Button,
    makeStyles 
}  from '@material-ui/core';

import fire from '../../config/fire';

const Login = () => {
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
        console.log(values)
    }

    const handleSignIn = async (e) => {  
        e.preventDefault()
        fire.auth().signInWithEmailAndPassword(values.email, values.password)
        .catch((error) => {
            setErrorMessage(error.message)
        })
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
                        <h2>Login</h2>
                    </Grid>
                    {errorMessage && <Grid>
                        <h5>{errorMessage}</h5>
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
                        <Button variant="contained" color="primary" fullWidth={true} onClick={handleSignIn}>Login</Button>
                    </Grid>

                </Grid>
            </Card>

        </Grid>
        </>
    )
}

export default Login
