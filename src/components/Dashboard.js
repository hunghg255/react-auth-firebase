import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'

import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const [error, setError] = useState('');

  const { currentUser, logOut } = useAuth();

  const history = useHistory();

  const handleLogout = async () => {
    setError('');

    try {
      await logOut();
      history.push('/login');
    } catch (error) {
      setError(error);
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {  error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  )
}
