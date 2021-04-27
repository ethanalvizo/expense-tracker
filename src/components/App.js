import React from 'react';
import Login from './Forms/Login';
import Signup from './Forms/Signup';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Profile';

import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import { 
    Container 
} from 'react-bootstrap';

function App() {
    return (
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', minWidth: '100vw', backgroundColor: '#f0f0f0'}}>
        <div className="w-100">
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/profile" component={Profile} />
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
