// src/components/Login.tsx
import React, { useState } from 'react';
import { Container, Form, Button, FormGroup, Label, Input, Card, CardHeader, CardBody, FormFeedback } from 'reactstrap';


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    e.preventDefault();

    fetch('http://localhost:8000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        } else {
          return response.json();
        }
      })
      .then(data => {
        localStorage.setItem('token', data.access_token);
        setSuccess('Login successful');
        window.location.href = '/';
      })
      .catch(error => {
        setError(error.message);
      });
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '300px' }}>
        <CardHeader className="text-center">
          <h4>Login</h4>
        </CardHeader>
        <CardBody>
          <Form onSubmit={submitForm}>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            {error && <FormFeedback className="d-block text-danger">{error}</FormFeedback>}
            {success && <FormFeedback className="d-block text-success">{success}</FormFeedback>}
            <Button color="primary" block>Login</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Login;
