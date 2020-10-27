import React from 'react'
import { useRef, useState  } from 'react'
import { Form, Button, Card , Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
  const emailRef = useRef();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { resetPassword } = useAuth();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox')
    } catch (error) {
      setError('Failed to reset');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          { error && <Alert variant="danger">{error}</Alert> }
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
          </Form>

          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
