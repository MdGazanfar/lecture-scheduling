import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Button, Stack, Typography, Select, MenuItem } from '@mui/material';
import axios from '../../utils/axios';
import { notificationController } from '../../utils/toast';

const AddUsers = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleAddUser = () => {
    const data = {
      name: username,
      userType: userType,
      password: password
    }
    return axios.post('user/sign-up', data)
      .then(() => {
        setTimeout(() => {
          notificationController.success('User Added Successfully')
          navigate("/users");
        }, 1000);
      })
      .catch((error) => {
        notificationController.error(error.response.data.error)
      });
  };

  return (
    <>
      <Typography mt={4} variant='h5'>
        Add User
      </Typography>
      <form>
        <Stack direction='row' style={{ gap: '5rem' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '25px' }}>
            User Name:
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Stack>
        <Stack direction='row' style={{ gap: '5rem' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '10px' }}>
            User Type:
          </Typography>
          <Select
            variant="outlined"
            fullWidth
            margin="normal"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'lecturer'}>Lecturer</MenuItem>
          </Select>
        </Stack>
        <Stack direction='row' style={{ gap: '5rem' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '25px' }}>
            Password:
          </Typography>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Stack direction='row' style={{ gap: '15px' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '30px', width: '15%' }}
            onClick={() => handleAddUser()}
          >
            Add User
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '30px', width: '15%' }}
            onClick={() => navigate('/users')}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default AddUsers;
