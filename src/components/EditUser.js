import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/users/${id}`, user)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit User
      </Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
          Update User
        </Button>
      </form>
    </Container>
  );
};

export default EditUser;
