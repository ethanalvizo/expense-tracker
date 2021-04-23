import React from 'react';
import Login from './Forms/Login';
import Signup from './Forms/Register';
import Dashboard from './Dashboard/Dashboard';

import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import {
    Container
} from '@material-ui/core'

const App = () => {
    return (
        <Container style={{minHeight: '100vh', minWidth: '100vw'}}>
            <div>
                <AuthProvider>
                    <Switch>
                    <PrivateRoute exact path="/" component={Dashboard} />
                    {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
                    </Switch>
                </AuthProvider>
            </div>
        </Container>
    )
}

export default App
