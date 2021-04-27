import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';

import {
  Navbar,
  Nav,
} from 'react-bootstrap'

const TopBar = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
      setError('')

      try {
          await logout();
          history.pushState("/login");
      }   catch {
          setError("Failed to log out")
      }
  }

  return (
    <Navbar fixed="top" bg="light" variant="light" className="w-100">
      <Navbar.Brand href="/"><i class="fas fa-money-bill-wave"></i>Expense Tracker</Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="profile" className="text-dark">Profile</Link>
      </Nav>
      <Nav>
        <Nav.Link onClick={handleLogout} >Logout</Nav.Link>
      </Nav>

    </Navbar>
  )
}

export default TopBar
