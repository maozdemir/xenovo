import React, { useState } from 'react';
import { Container, Form, Button, FormGroup, Label, Input, Card, CardHeader, CardBody, FormFeedback } from 'reactstrap';

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            return;
        }
        fetch('http://localhost:8000/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Registration failed');
                } else {
                    return response.json();
                }
            })
            .then(data => {
                localStorage.setItem('token', data.access_token);
                setSuccess('Registration successful');
            })
            .catch(error => {
                setError(error.message);
            });
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '300px' }}>
                <CardHeader className="text-center">
                    <h4>Register</h4>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Label for="name">Name:</Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </FormGroup>
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
                        <FormGroup>
                            <Label for="passwordConfirm">Confirm Password:</Label>
                            <Input
                                type="password"
                                id="passwordConfirm"
                                placeholder="Confirm your password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                            />
                        </FormGroup>
                        {error && <FormFeedback className="d-block text-danger">{error}</FormFeedback>}
                        {success && <FormFeedback className="d-block text-success">{success}</FormFeedback>}
                        <Button color="primary" block>Register</Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
}

export default Register;
