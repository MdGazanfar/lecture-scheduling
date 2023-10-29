import React, { useEffect, useState } from 'react'
import { Stack, Typography, Button } from '@mui/material';
import { deleteToken, deleteUserData } from '../../utils/localStorage';
import { useNavigate } from 'react-router';
import { Table } from "antd";
import axios from '../../utils/axios';

const Users = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([])

  const handleLogout = () => {
    deleteToken();
    deleteUserData();
    navigate('/login')
  }

  const getUserDetails = () => {
    return axios.get('user/list')
      .then((res) => {
        setUserData(res?.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  const columns = [
    {
      title: "Username",
      dataIndex: 'name',
    },
    {
      title: "User Type",
      dataIndex: "userType",
    },
  ];

  return (
    <>
      <Stack mt={2} direction='row' justifyContent='space-between'>
        <Typography variant='h6'>Users</Typography>
        <Typography style={{ flexDirection: 'flex-end', fontSize: '12px', cursor: 'pointer' }} onClick={() => handleLogout()}>Logout</Typography>
      </Stack>

      <Button
        variant="contained"
        color="primary"
        style={{ margin: '25px 0 10px 0', width: '10%', float: 'right' }}
        onClick={() => navigate('/add-users')}
      >
        Add User
      </Button>

      <div>
        {
          userData && userData.length > 0 ?
            <Table
              columns={columns}
              dataSource={userData}
            />
            :
            <div>
              No User data
            </div>
        }
      </div>
    </>
  )
}

export default Users