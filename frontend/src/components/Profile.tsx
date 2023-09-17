import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Header from './Header';

const Profile: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/users/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const data = await response.json();
                setName(data.name);
                setEmail(data.email);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:8000/api/v1/users/profile', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to update profile');
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };

    return (
        <Container><Header />
            <h1 className="display-5">Profile</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="password">New Password:</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm New Password:</Label>
                    <Input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                </FormGroup>
                <Button color="primary" type="submit">Save Changes</Button>
            </Form>
        </Container>
    );
};

export default Profile;
