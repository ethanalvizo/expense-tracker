import React from 'react';
import Login from './Forms/Login';
import Signup from './Forms/Signup';
import Dashboard from './Dashboard/Dashboard';

import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import { 
    Container 
} from 'react-bootstrap';

const App = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
      <div className="w-100" style={{ maxWidth: '400px'}}>
        
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
