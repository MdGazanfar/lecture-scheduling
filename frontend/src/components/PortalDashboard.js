import React from 'react';
import { Stack, Typography } from '@mui/material';
import { deleteToken, deleteUserData } from '../utils/localStorage';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteToken();
    deleteUserData()
    navigate('/login')
  }

  return (
    <>
      <Stack mt={2} direction='row' justifyContent='space-between'>
        <Typography variant='h6'>Dashboard</Typography>
        <Typography style={{ flexDirection: 'flex-end', fontSize: '12px', cursor: 'pointer' }} onClick={() => handleLogout()}>Logout</Typography>
      </Stack>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '200px',
          textAlign: 'center',
        }}>
        <Typography variant="h3" style={{ color: 'gray', marginBottom: '15px' }}>
          Welcome!!!
        </Typography>
        <Typography variant="h4" style={{ color: 'gray', marginBottom: '15px' }}>
          Its a lecture scheduling portal
        </Typography>
      </div>
    </>
  );
};

export default Dashboard;
