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
    <Navbar bg="" variant="light" className="w-100 justify-content-between">
      <span className="d-inline-flex">
      <Navbar.Brand href="/"><i class="fas fa-money-bill-wave"></i>Expense Tracker</Navbar.Brand>
      </span>
      <Nav>
        <Link to="profile" className="text-secondary my-auto">Profile</Link>
        <Nav.Link onClick={handleLogout} >Logout</Nav.Link>
      </Nav>

    </Navbar>
  )
}

export default TopBar
