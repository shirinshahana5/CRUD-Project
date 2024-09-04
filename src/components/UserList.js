import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, Container, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User List
      </Typography>
      <List>
        {users.map(user => (
          <ListItem key={user.id} secondaryAction={
            <>
              <IconButton edge="end" component={Link} to={`/edit/${user.id}`}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(user.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserList;
