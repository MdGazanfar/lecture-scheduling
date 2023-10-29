import React, { useState, useEffect } from 'react'
import { Stack, Typography, Button } from '@mui/material';
import { deleteToken, deleteUserData } from '../../utils/localStorage';
import { useNavigate } from 'react-router';
import { Table } from "antd";
import axios from '../../utils/axios';

const Courses = () => {
  const navigate = useNavigate();
  const [courseData, setCoursesData] = useState([])

  const handleLogout = () => {
    deleteToken();
    deleteUserData();
    navigate('/login')
  }

  const getCoursesDetails = () => {
    return axios.get('course/list')
      .then((res) => {
        setCoursesData(res?.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getCoursesDetails()
  }, [])

  const columns = [
    {
      title: "Course Name",
      dataIndex: 'name',
    },
    {
      title: "Level",
      dataIndex: "level",
    },
    {
      title: "Batches",
      dataIndex: "batches",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];


  return (
    <>
      <Stack mt={2} direction='row' justifyContent='space-between'>
        <Typography variant='h6'>Courses</Typography>
        <Typography style={{ flexDirection: 'flex-end', fontSize: '12px', cursor: 'pointer' }} onClick={() => handleLogout()}>Logout</Typography>
      </Stack>

      <Button
        variant="contained"
        color="primary"
        style={{ margin: '25px 0 10px 0', width: '12%', float: 'right' }}
        onClick={() => navigate('/add-courses')}
      >
        Add Course
      </Button>

      <div>
        {
          courseData && courseData.length > 0 ?
            <Table
              columns={columns}
              dataSource={courseData}
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

export default Courses