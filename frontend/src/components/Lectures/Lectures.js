import React, { useState, useEffect } from 'react'
import { Stack, Typography, Button } from '@mui/material';
import { deleteToken } from '../../utils/localStorage';
import { useNavigate } from 'react-router';
import { Table } from "antd";
import axios from '../../utils/axios';

const Lectures = () => {
  const navigate = useNavigate();
  const [lectureData, setLectureData] = useState()

  const handleLogout = () => {
    deleteToken();
    navigate('/login')
  }

  const getLecturesDetails = () => {
    return axios.get('lecture/list')
      .then((res) => {
        setLectureData(res?.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getLecturesDetails()
  }, [])

  const columns = [
    {
      title: "Lecture",
      dataIndex: 'name',
    },
    {
      title: "Course Name",
      dataIndex: "course",
      render: (value) => <>{value.name}</>
    },
    {
      title: "Lecturer Name",
      dataIndex: "lecture",
      render: (value) => <>{value.name}</>
    }
  ];

  return (
    <>
      <Stack mt={2} direction='row' justifyContent='space-between'>
        <Typography variant='h6'>Lectures</Typography>
        <Typography style={{ flexDirection: 'flex-end', fontSize: '12px', cursor: 'pointer' }} onClick={() => handleLogout()}>Logout</Typography>
      </Stack>

      <Button
        variant="contained"
        color="primary"
        style={{ margin: '25px 0 10px 0', width: '14%', float: 'right' }}
        onClick={() => navigate('/add-lectures')}
      >
        Add Lecture
      </Button>

      <div style={{ margin: '80px 0' }}>
        {
          lectureData && lectureData.length > 0 ?
            <Table
              columns={columns}
              dataSource={lectureData}
            />
            :
            <div>
              No Course data
            </div>
        }
      </div>
    </>
  )
}

export default Lectures